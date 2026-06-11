export interface DirectoryItem {
  id: string;
  name?: string;
  role?: string;
  extension?: string;
  isSubheading?: boolean;
  tag?: string; // e.g., "DIRETOR"
}

export interface DirectoryCard {
  id: string;
  title: string;
  iconName: string; // From Lucide-react
  items: DirectoryItem[];
  category: "directoria" | "unidade" | "outro";
}

export interface UnitDetail {
  name: string;
  extension: string;
  role?: string;
}

export interface UnitSubGroup {
  id: string;
  name: string;
  items: UnitDetail[];
  // Sometimes a group just has a direct extension without sub-items (e.g., Padaria-Escola - 596)
  directExtension?: string;
}

export interface UnitSection {
  id: string;
  title: string; // e.g., "INOVAÇÃO", "ESPECIAIS", "NORTE / CENTRO / OESTE"
  groups: UnitSubGroup[];
}

export interface UnitColumn {
  id: string;
  title: string; // e.g. "INOVAÇÃO & ESPECIAIS", "ZONA SUL"
  sections: UnitSection[];
}
