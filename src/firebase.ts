import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, onSnapshot, getDocFromServer } from "firebase/firestore";
import firebaseConfig from "../firebase-applet-config.json";
import { DirectoryCard, UnitColumn } from "./types";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: []
    },
    operationType,
    path
  };
  console.error("Firestore Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection check on boot as mandated by Phase 1 helper
export async function validateConnection() {
  try {
    await getDocFromServer(doc(db, "directories", "test_connection"));
  } catch (error) {
    if (error instanceof Error && error.message.includes("offline")) {
      console.error("Please check your Firebase configuration or network status.");
    }
  }
}

// Fetch all initial data as fallback if documents do not exist yes
export async function fetchDirectoryDoc<T>(docId: string, fallback: T): Promise<T> {
  const docRef = doc(db, "directories", docId);
  try {
    const s = await getDoc(docRef);
    if (s.exists()) {
      const data = s.data();
      return (data.list ?? data.password ?? fallback) as T;
    }
    return fallback;
  } catch (e) {
    handleFirestoreError(e, OperationType.GET, `directories/${docId}`);
    return fallback;
  }
}

// Listen to a document in real time
export function subscribeToDoc<T>(docId: string, fallback: T, onUpdate: (data: T) => void) {
  const docRef = doc(db, "directories", docId);
  return onSnapshot(
    docRef,
    (s) => {
      if (s.exists()) {
        const data = s.data();
        if (docId === "settings") {
          onUpdate((data.password ?? fallback) as T);
        } else {
          onUpdate((data.list ?? fallback) as T);
        }
      } else {
        onUpdate(fallback);
      }
    },
    (e) => {
      handleFirestoreError(e, OperationType.GET, `directories/${docId}`);
    }
  );
}

// Write a document to Firestore
export async function saveDirectoryDoc(docId: string, list: DirectoryCard[] | UnitColumn[] | string) {
  const docRef = doc(db, "directories", docId);
  try {
    if (docId === "settings") {
      await setDoc(docRef, { password: list });
    } else {
      await setDoc(docRef, { list });
    }
  } catch (e) {
    handleFirestoreError(e, OperationType.WRITE, `directories/${docId}`);
  }
}

// Seed the database with initial values if they do not exist
export async function seedInitialDataIfEmpty(
  fallbackCards: DirectoryCard[],
  fallbackUnits: UnitColumn[],
  fallbackCephas: DirectoryCard[]
) {
  try {
    const fundhasRef = doc(db, "directories", "fundhas");
    const docSnap = await getDoc(fundhasRef);
    if (!docSnap.exists()) {
      console.log("Seeding initial Fundhas Directory cards to Firestore...");
      await saveDirectoryDoc("fundhas", fallbackCards);
    }

    const unitsRef = doc(db, "directories", "units");
    const unitsSnap = await getDoc(unitsRef);
    if (!unitsSnap.exists()) {
      console.log("Seeding initial Unit columns to Firestore...");
      await saveDirectoryDoc("units", fallbackUnits);
    }

    const cephasRef = doc(db, "directories", "cephas");
    const cephasSnap = await getDoc(cephasRef);
    if (!cephasSnap.exists()) {
      console.log("Seeding initial Cephas Directory cards to Firestore...");
      await saveDirectoryDoc("cephas", fallbackCephas);
    }

    const settingsRef = doc(db, "directories", "settings");
    const settingsSnap = await getDoc(settingsRef);
    if (!settingsSnap.exists()) {
      console.log("Seeding initial administrative password '1234' to Firestore...");
      await saveDirectoryDoc("settings", "1234");
    }
  } catch (e) {
    console.error("Failed to seed initial data:", e);
  }
}
