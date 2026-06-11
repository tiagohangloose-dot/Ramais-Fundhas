import React, { useState, useEffect, useRef } from "react";
import {
  Building2,
  Receipt,
  FolderHeart,
  Gavel,
  Users,
  Smile,
  GraduationCap,
  Wrench,
  Search,
  Phone,
  Plus,
  Trash2,
  Edit2,
  Save,
  RotateCcw,
  Printer,
  Info,
  X,
  Check,
  Copy,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Home,
  CheckCircle,
  HelpCircle,
  AlertCircle
} from "lucide-react";
import * as Icons from "lucide-react";
import { DirectoryCard, DirectoryItem, UnitColumn, UnitDetail, UnitSubGroup } from "./types";
import { initialDirectoryCards, initialUnitColumns, initialCephasDirectoryCards } from "./data";

// Helper to render Lucide Icons dynamically
function DynamicIcon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const IconComp = (Icons as any)[name];
  if (IconComp) {
    return <IconComp className={className} />;
  }
  return <Icons.Phone className={className} />;
}

export default function App() {
  // State for high-density directory cards and bottom units
  const [cards, setCards] = useState<DirectoryCard[]>([]);
  const [unitColumns, setUnitColumns] = useState<UnitColumn[]>([]);
  const [cephasCards, setCephasCards] = useState<DirectoryCard[]>([]);
  const [activeMainTab, setActiveMainTab] = useState<"fundhas" | "cephas">("fundhas");
  const [selectedCephasCategory, setSelectedCephasCategory] = useState<string>("todos");

  // Editing state
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  
  // UI states
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [notification, setNotification] = useState<{ type: "success" | "info" | "warn"; text: string } | null>(null);

  // Password validation states
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [inputPassword, setInputPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  
  // Custom dialog confirmations instead of window.confirm
  const [cardIdToDelete, setCardIdToDelete] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [deletingCardId, setDeletingCardId] = useState<string | null>(null);
  
  // Custom Change Password state
  const [showChangePasswordModal, setShowChangePasswordModal] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [changePasswordError, setChangePasswordError] = useState<string>("");

  // Load from local storage or fallback to defaults
  useEffect(() => {
    try {
      // Garantir que a senha de edição administrativa padrão '1234' exista no início
      if (!localStorage.getItem("fundhas_edit_password")) {
        localStorage.setItem("fundhas_edit_password", "1234");
      }

      const savedCards = localStorage.getItem("fundhas_directory_cards");
      const savedUnits = localStorage.getItem("fundhas_unit_columns");
      const savedCephas = localStorage.getItem("fundhas_cephas_cards");

      if (savedCards) {
        setCards(JSON.parse(savedCards));
      } else {
        setCards(initialDirectoryCards);
      }

      if (savedUnits) {
        setUnitColumns(JSON.parse(savedUnits));
      } else {
        setUnitColumns(initialUnitColumns);
      }

      if (savedCephas) {
        setCephasCards(JSON.parse(savedCephas));
      } else {
        setCephasCards(initialCephasDirectoryCards);
      }
    } catch (e) {
      console.error("Erro ao carregar dados do LocalStorage", e);
      setCards(initialDirectoryCards);
      setUnitColumns(initialUnitColumns);
      setCephasCards(initialCephasDirectoryCards);
    }
  }, []);

  // Save updates helper
  const handleSaveChanges = (updatedCards: DirectoryCard[], updatedUnits: UnitColumn[]) => {
    try {
      localStorage.setItem("fundhas_directory_cards", JSON.stringify(updatedCards));
      localStorage.setItem("fundhas_unit_columns", JSON.stringify(updatedUnits));
      setCards(updatedCards);
      setUnitColumns(updatedUnits);
      triggerNotification("success", "Alterações salvas e sincronizadas com sucesso!");
    } catch (e) {
      triggerNotification("warn", "Erro ao salvar alterações no navegador.");
    }
  };

  const handleSaveCephasChanges = (updatedCephasCards: DirectoryCard[]) => {
    try {
      localStorage.setItem("fundhas_cephas_cards", JSON.stringify(updatedCephasCards));
      setCephasCards(updatedCephasCards);
      triggerNotification("success", "Alterações do CEPHAS salvas com sucesso!");
    } catch (e) {
      triggerNotification("warn", "Erro ao salvar alterações do CEPHAS no navegador.");
    }
  };

  // Reset helper triggers confirmation modal
  const handleResetToDefaults = () => {
    setShowResetConfirm(true);
  };

  const confirmResetToDefaults = () => {
    localStorage.removeItem("fundhas_directory_cards");
    localStorage.removeItem("fundhas_unit_columns");
    localStorage.removeItem("fundhas_cephas_cards");
    localStorage.removeItem("fundhas_edit_password");
    setCards(initialDirectoryCards);
    setUnitColumns(initialUnitColumns);
    setCephasCards(initialCephasDirectoryCards);
    setShowResetConfirm(false);
    setIsEditMode(false);
    triggerNotification("info", "Dados restaurados para a versão padrão de fábrica e senha de administração resetada para '1234'.");
  };

  // Helper for notification timers
  const triggerNotification = (type: "success" | "info" | "warn", text: string) => {
    setNotification({ type, text });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // Helper to parse strings the user wants to dial, adding prefix if appropriate
  const getDialableNumber = (text: string): string => {
    // Keep only numbers
    const digits = text.replace(/\D/g, "");
    
    // If it's the short-code emergency line "153"
    if (digits === "153") {
      return "153";
    }

    // 3-digit internal extensions like "583" -> dials 39320583
    if (digits.length === 3) {
      return `39320${digits}`;
    }

    // 4-digit internal extensions if they ever occur
    if (digits.length === 4) {
      return `3932${digits}`;
    }

    // Otherwise dial standard number digits directly
    return digits;
  };

  // Toast notification specifically for copies and mobile phone dialing
  const triggerCopyToast = (text: string) => {
    // 1. Clean number & copy to clipboard
    try {
      navigator.clipboard.writeText(text);
    } catch (e) {
      console.warn("Failed to copy to clipboard", e);
    }
    setCopiedText(text);

    // 2. Identify clean digits and dial number
    const digits = text.replace(/\D/g, "");
    const dialable = getDialableNumber(text);

    // 3. Build descriptive toast message
    let toastMsg = "";
    if (digits === "153") {
      toastMsg = "Iniciando ligação para Emergência CSI (153)...";
    } else if (digits.length === 3) {
      toastMsg = `Ligando para: 3932-0${digits} (Ramal ${digits} copiado!)`;
    } else if (dialable && dialable.length > 0) {
      // Format number elegantly for display in toast if it looks like an 8-digit number
      let displayDial = text;
      if (digits.length === 8 && !text.includes("-")) {
        displayDial = `${digits.substring(0, 4)}-${digits.substring(4)}`;
      }
      toastMsg = `Ligando para: ${displayDial} (Número copiado!)`;
    } else {
      toastMsg = `Copiado para a área de transferência: ${text}`;
    }

    setToastMessage(toastMsg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);

    // 4. Trigger dialer instantly
    if (dialable && dialable.length > 0) {
      window.location.href = `tel:${dialable}`;
    }
  };

  // Search logic helper: filters items or returns boolean
  const highlightMatch = (text: string, search: string) => {
    if (!search.trim()) return <span>{text}</span>;
    
    const parts = text.split(new RegExp(`(${search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")})`, "gi"));
    return (
      <span>
        {parts.map((part, index) => 
          part.toLowerCase() === search.toLowerCase() ? (
            <mark key={index} className="bg-amber-100 text-amber-950 font-medium px-0.5 rounded-sm">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  // Check if a card matches search
  const isCardMatchingSearch = (card: DirectoryCard, search: string) => {
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    
    // Check card title
    if (card.title.toLowerCase().includes(term)) return true;
    
    // Check items
    return card.items.some(
      item => 
        (item.name && item.name.toLowerCase().includes(term)) ||
        (item.role && item.role.toLowerCase().includes(term)) ||
        (item.extension && item.extension.toLowerCase().includes(term))
    );
  };

  // Update specific item properties (inline edit)
  const handleUpdateItem = (cardId: string, itemId: string, field: keyof DirectoryItem, value: string) => {
    if (activeMainTab === "cephas") {
      const updated = cephasCards.map(c => {
        if (c.id === cardId) {
          return {
            ...c,
            items: c.items.map(item => {
              if (item.id === itemId) {
                return { ...item, [field]: value };
              }
              return item;
            })
          };
        }
        return c;
      });
      handleSaveCephasChanges(updated);
    } else {
      const updated = cards.map(c => {
        if (c.id === cardId) {
          return {
            ...c,
            items: c.items.map(item => {
              if (item.id === itemId) {
                return { ...item, [field]: value };
              }
              return item;
            })
          };
        }
        return c;
      });
      handleSaveChanges(updated, unitColumns);
    }
  };

  // Delete an item from a card
  const handleDeleteItem = (cardId: string, itemId: string) => {
    if (activeMainTab === "cephas") {
      const updated = cephasCards.map(c => {
        if (c.id === cardId) {
          return {
            ...c,
            items: c.items.filter(item => item.id !== itemId)
          };
        }
        return c;
      });
      handleSaveCephasChanges(updated);
    } else {
      const updated = cards.map(c => {
        if (c.id === cardId) {
          return {
            ...c,
            items: c.items.filter(item => item.id !== itemId)
          };
        }
        return c;
      });
      handleSaveChanges(updated, unitColumns);
    }
  };

  // Add item to card
  const handleAddItem = (cardId: string, isSubheading: boolean) => {
    const newItem: DirectoryItem = isSubheading
      ? {
          id: `item-${Date.now()}`,
          name: "NOVO SUBTÍTULO",
          isSubheading: true
        }
      : {
          id: `item-${Date.now()}`,
          name: "Novo Colaborador",
          role: "Cargo / Setor",
          extension: "123"
        };

    if (activeMainTab === "cephas") {
      const updated = cephasCards.map(c => {
        if (c.id === cardId) {
          return {
            ...c,
            items: [...c.items, newItem]
          };
        }
        return c;
      });
      handleSaveCephasChanges(updated);
    } else {
      const updated = cards.map(c => {
        if (c.id === cardId) {
          return {
            ...c,
            items: [...c.items, newItem]
          };
        }
        return c;
      });
      handleSaveChanges(updated, unitColumns);
    }
  };

  // Add custom new Card
  const handleAddCard = () => {
    const newCard: DirectoryCard = {
      id: `card-${Date.now()}`,
      title: "NOVA DIRETORIA / SETOR",
      iconName: "Building2",
      items: [
        { id: `item-${Date.now()}-1`, name: "Responsável", role: "Chefia", extension: "100" }
      ],
      category: "directoria"
    };
    if (activeMainTab === "cephas") {
      setSelectedCephasCategory("todos");
      handleSaveCephasChanges([...cephasCards, newCard]);
    } else {
      setSelectedCategory("todos"); // auto switch to "todos" category so the user sees the new card instantly
      handleSaveChanges([...cards, newCard], unitColumns);
    }
  };

  // Delete Card triggers confirmation modal
  const handleDeleteCard = (cardId: string) => {
    if (activeMainTab === "cephas") {
      const updated = cephasCards.filter(c => c.id !== cardId);
      handleSaveCephasChanges(updated);
    } else {
      const updated = cards.filter(c => c.id !== cardId);
      handleSaveChanges(updated, unitColumns);
    }
  };

  const confirmDeleteCard = () => {
    if (cardIdToDelete) {
      const updated = cards.filter(c => c.id !== cardIdToDelete);
      handleSaveChanges(updated, unitColumns);
      setCardIdToDelete(null);
      triggerNotification("success", "Setor removido com sucesso!");
    }
  };

  // Bottom units edit handlers
  const handleUpdateUnitDetail = (colIdx: number, secIdx: number, grpIdx: number, itemIdx: number, field: keyof UnitDetail, value: string) => {
    const updated = [...unitColumns];
    const item = updated[colIdx].sections[secIdx].groups[grpIdx].items[itemIdx];
    if (item) {
      item[field] = value;
      handleSaveChanges(cards, updated);
    }
  };

  const handleUpdateGroupDirectExtension = (colIdx: number, secIdx: number, grpIdx: number, value: string) => {
    const updated = [...unitColumns];
    const group = updated[colIdx].sections[secIdx].groups[grpIdx];
    if (group) {
      group.directExtension = value;
      handleSaveChanges(cards, updated);
    }
  };

  const handleDeleteUnitItem = (colIdx: number, secIdx: number, grpIdx: number, itemIdx: number) => {
    const updated = [...unitColumns];
    updated[colIdx].sections[secIdx].groups[grpIdx].items.splice(itemIdx, 1);
    handleSaveChanges(cards, updated);
  };

  const handleAddUnitItem = (colIdx: number, secIdx: number, grpIdx: number) => {
    const updated = [...unitColumns];
    updated[colIdx].sections[secIdx].groups[grpIdx].items.push({
      name: "Nome Novo",
      role: "Função",
      extension: "0000-0000"
    });
    handleSaveChanges(cards, updated);
  };

  // Filter categorization rules
  const getFilteredCards = () => {
    if (activeMainTab === "cephas") {
      return cephasCards.filter(card => {
        if (selectedCephasCategory !== "todos") {
          if (selectedCephasCategory === "direcao" && (card.id !== "cep-direcao" && card.id !== "cep-administrativo" && card.id !== "cep-ramais")) return false;
          if (selectedCephasCategory === "ensino" && (card.id !== "cep-pedagogico" && card.id !== "cep-diee" && card.id !== "cep-qualifica" && card.id !== "cep-secretaria" && card.id !== "cep-carreiras")) return false;
          if (selectedCephasCategory === "aprendiz" && (card.id !== "cep-aprendiz" && card.id !== "cep-polos" && card.id !== "cep-ligacoes")) return false;
        }
        return isCardMatchingSearch(card, searchQuery);
      });
    }

    return cards.filter(card => {
      // Special routing for 'telefones-externos' card
      if (card.id === "telefones-externos") {
        if (selectedCategory === "externos") {
          return isCardMatchingSearch(card, searchQuery);
        }
        if (selectedCategory === "todos") {
          return isCardMatchingSearch(card, searchQuery);
        }
        return false;
      }

      // Category filter matching
      if (selectedCategory !== "todos" && selectedCategory !== "unidades") {
        if (selectedCategory === "presidencia" && card.id !== "presidencia" && card.id !== "juridico") return false;
        if (selectedCategory === "daf" && card.id !== "daf" && card.id !== "suprimentos") return false;
        if (selectedCategory === "rh_operacoes" && card.id !== "drh" && card.id !== "modernizacao") return false;
        if (selectedCategory === "deca_cephas" && card.id !== "deca" && card.id !== "cephas") return false;
        if (selectedCategory === "externos") return false; // Other cards do not show up in 'externos'
      }
      if (selectedCategory === "unidades") {
        // Hide standard grid cards if specifically looking at units at the bottom
        return false;
      }
      
      // Search matching
      return isCardMatchingSearch(card, searchQuery);
    });
  };

  // Printer click handler
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1C1E] selection:bg-[#E6F0FA] selection:text-[#0059bb] flex flex-col font-sans transition-all duration-200">
      
      {/* 1. TOP BAR BRAND HEADER */}
      <header className="bg-[#001937] text-white py-4 px-6 sticky top-0 z-40 shadow-md no-print">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Logo Brand Title */}
          <div className="flex items-center gap-3">
            <div className="bg-[#0059bb] p-2 rounded-lg text-white shadow-inner flex items-center justify-center">
              <Building2 className="h-6 w-6" id="brand-logo" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Diretório de Ramais Fundhas
                <span className="hidden md:inline-block text-xs bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/40">
                  Validado
                </span>
              </h1>
              <p className="text-xs text-slate-300">Fundação Hélio Augusto de Souza</p>
            </div>
          </div>

          {/* Navigation Items (Middle) */}
          <nav className="flex items-center gap-6 text-sm text-slate-200 font-medium my-2 sm:my-0">
            <button 
              onClick={() => { setSelectedCategory("todos"); setSearchQuery(""); }} 
              className={`hover:text-white transition-colors flex items-center gap-1 py-1 px-2.5 rounded-md ${selectedCategory === "todos" ? "bg-white/10 text-white font-semibold" : ""}`}
            >
              <Home className="h-4 w-4" /> Início
            </button>
            <button 
              onClick={() => setSelectedCategory("daf")} 
              className={`hover:text-white transition-colors py-1 px-2.5 rounded-md ${selectedCategory === "daf" ? "bg-white/10 text-white font-semibold" : ""}`}
            >
              Diretorias
            </button>
            <button 
              onClick={() => setSelectedCategory("unidades")} 
              className={`hover:text-white transition-colors py-1 px-2.5 rounded-md ${selectedCategory === "unidades" ? "bg-white/10 text-white font-semibold" : ""}`}
            >
              Unidades
            </button>
            <button 
              onClick={() => setShowHelp(!showHelp)} 
              className={`hover:text-white transition-colors flex items-center gap-1 py-1 px-2.5 rounded-md text-amber-300 ${showHelp ? "bg-amber-300/10" : ""}`}
              title="Guia de Utilização"
            >
              <HelpCircle className="h-4 w-4" /> Instruções
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Quick Toggle Edit Mode */}
            <button
              id="edit-mode-toggle"
              onClick={() => {
                if (!isEditMode) {
                  // Requisitar senha de 4 dígitos do administrador
                  setShowPasswordModal(true);
                  setInputPassword("");
                  setPasswordError("");
                } else {
                  setIsEditMode(false);
                  triggerNotification("success", "Modo de visualização restaurado.");
                }
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 shadow-sm cursor-pointer ${
                isEditMode
                  ? "bg-[#D32F2F] hover:bg-[#B71C1C] text-white ring-2 ring-red-300"
                  : "bg-[#0059bb] hover:bg-[#004bb0] text-white translate-y-0"
              }`}
            >
              <Edit2 className="h-4 w-4" />
              {isEditMode ? "Modo Leitura" : "Modo Edição"}
            </button>

            {/* Print Trigger */}
            <button
              onClick={handlePrint}
              title="Imprimir Guia de Ramais"
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 hover:text-white transition-all shadow-sm flex items-center justify-center cursor-pointer"
            >
              <Printer className="h-4 w-4" />
            </button>
          </div>

        </div>
      </header>

      {/* 2. SUBBAR ALERT OR BROADCAST INFO */}
      {notification && (
        <div className={`py-2 px-4 text-center text-sm font-medium transition-all duration-300 shadow-sm flex items-center justify-center gap-2 no-print ${
          notification.type === "success" 
            ? "bg-emerald-50 text-emerald-800 border-b border-emerald-200" 
            : notification.type === "warn"
            ? "bg-rose-50 text-rose-800 border-b border-rose-200"
            : "bg-blue-50 text-blue-800 border-b border-blue-200"
        }`}>
          {notification.type === "success" && <CheckCircle className="h-4 w-4 text-emerald-600" />}
          {notification.type === "warn" && <AlertCircle className="h-4 w-4 text-red-600" />}
          {notification.type === "info" && <Info className="h-4 w-4 text-blue-600" />}
          <span>{notification.text}</span>
        </div>
      )}

      {/* Collapsible Instructional Help Panel */}
      {showHelp && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 p-6 no-print">
          <div className="max-w-[1280px] mx-auto relative">
            <button 
              onClick={() => setShowHelp(false)}
              className="absolute top-0 right-0 p-2 text-slate-500 hover:text-slate-800"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-bold text-[#002D5C] flex items-center gap-2 mb-3">
              <Info className="h-5 w-5 text-[#0059bb]" /> Guia Rápido de Discagem & Ramais Fundhas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700">
              <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                <span className="font-bold text-[#0059bb] block mb-1">📞 Ligações Internas (Entre Ramais)</span>
                Apenas digite o número do ramal desejado diretamente no aparelho (Ex: <strong className="text-blue-700">540</strong> para falar com a Presidência). Ligações internas são gratuitas.
              </div>
              <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                <span className="font-bold text-[#0059bb] block mb-1">🏢 Ligações para Unidades Externas</span>
                Para ligações externas, <strong>disque 0</strong> primeiro para dar linha e em seguida disque o número completo desejado (Ex: disque 0 + número listado na parte inferior).
              </div>
            </div>

            {/* INSTRUÇÕES PABX matching the user screenshot perfectly */}
            <div className="mt-6 bg-[#001937] rounded-2xl p-6 text-white shadow-xl border border-blue-950">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                {/* Left Header */}
                <div className="text-center lg:text-left">
                  <h4 className="text-sm font-extrabold tracking-wider uppercase text-blue-200">
                    INSTRUÇÕES PABX
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Comandos rápidos para o sistema de telefonia Fundhas.
                  </p>
                </div>

                {/* Right Cards list */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full lg:w-auto">
                  {/* Card 1 */}
                  <div className="bg-[#ffffff]/5 border border-white/10 rounded-xl px-5 py-4 text-center min-w-[140px] shadow-sm hover:bg-white/10 transition-all duration-200 flex flex-col justify-between h-[84px]">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                      PUXAR LIGAÇÃO
                    </span>
                    <span className="text-[#3b82f6] text-lg font-black tracking-tight block mt-1.5 font-mono">
                      8
                    </span>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-[#ffffff]/5 border border-white/10 rounded-xl px-5 py-4 text-center min-w-[140px] shadow-sm hover:bg-white/10 transition-all duration-200 flex flex-col justify-between h-[84px]">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                      TRANSFERIR
                    </span>
                    <span className="text-white text-[13px] font-black tracking-wide block mt-2">
                      Flash + Ramal
                    </span>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-[#ffffff]/5 border border-white/10 rounded-xl px-4 py-4 text-center min-w-[140px] shadow-sm hover:bg-white/10 transition-all duration-200 flex flex-col justify-between h-[84px]">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                      EM ESPERA
                    </span>
                    <span className="text-[#3b82f6] text-lg font-black tracking-tight block mt-1.5 font-mono">
                      6
                    </span>
                  </div>

                  {/* Card 4 */}
                  <div className="bg-[#ffffff]/5 border border-white/10 rounded-xl px-5 py-4 text-center min-w-[140px] shadow-sm hover:bg-white/10 transition-all duration-200 flex flex-col justify-between h-[84px]">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                      INTERURBANO
                    </span>
                    <span className="text-emerald-400 text-sm font-black tracking-wide block mt-2">
                      015 (Vivo)
                    </span>
                  </div>

                  {/* Card 5 */}
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-4 text-center min-w-[140px] shadow-md hover:bg-red-500/20 transition-all duration-200 flex flex-col justify-between h-[84px] cursor-pointer" onClick={() => triggerCopyToast("153")}>
                    <span className="text-[9px] font-extrabold text-red-300 uppercase tracking-widest block flex items-center justify-center gap-1">
                      🚨 CSI EMERGÊNCIA
                    </span>
                    <span className="text-red-400 text-lg font-black tracking-tight block mt-1.5 font-mono animate-pulse">
                      153
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. MAIN HERO TITLE AND BREADCRUMB */}
      <main className="flex-1 py-6 px-4 md:px-8 max-w-[1280px] mx-auto w-full print-container">
        
        {/* Breadcrumb path */}
        <div className="text-xs text-[#74777F] tracking-wide mb-2 flex items-center gap-1.5 no-print">
          <span className="hover:underline cursor-pointer">Fundhas</span>
          <span>/</span>
          <span className="text-[#1A1C1E] font-medium">
            {activeMainTab === "cephas" ? "Diretório Cephas" : "Diretório Institucional Completo"}
          </span>
        </div>

        {/* Tab Switcher - Segmented control */}
        <div className="flex bg-slate-200/50 p-1.5 rounded-2xl max-w-md mb-8 no-print border border-slate-200/35 shadow-sm">
          <button
            onClick={() => {
              setActiveMainTab("fundhas");
              setSelectedCategory("todos");
              setSearchQuery("");
            }}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              activeMainTab === "fundhas"
                ? "bg-[#001937] text-white shadow-md font-extrabold"
                : "text-slate-600 hover:text-[#001937] hover:bg-slate-100/50"
            }`}
          >
            <Building2 className="h-4 w-4" /> Diretório Fundhas
          </button>
          <button
            onClick={() => {
              setActiveMainTab("cephas");
              setSelectedCephasCategory("todos");
              setSearchQuery("");
            }}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              activeMainTab === "cephas"
                ? "bg-[#0059bb] text-white shadow-md font-extrabold"
                : "text-slate-600 hover:text-[#0059bb] hover:bg-slate-100/50"
            }`}
          >
            <GraduationCap className="h-4 w-4" /> Diretório Cephas
          </button>
        </div>

        {/* Branding & Subtitle */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#001937]" id="main-title">
              {activeMainTab === "cephas" ? "Guia Cephas de Ramais" : "Guia Corporativo de Ramais"}
            </h2>
            <p className="text-sm md:text-base text-[#44474E] mt-1 font-light">
              {activeMainTab === "cephas" 
                ? "Rua Tsunessaburu Makiguti, 399 - Floradas de S. José | CEP 12230-084 - SJC" 
                : "Busca completa de ramais, diretorias, divisões e unidades externas sob gestão da Fundhas."}
            </p>
          </div>

          {/* Interactive Live Search Box */}
          <div className="w-full md:w-auto relative no-print">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
              <Search className="h-5 w-5" />
            </span>
            <input
              type="text"
              placeholder="Nome, cargo/setor ou ramal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-80 pl-11 pr-10 py-3 bg-white text-slate-800 placeholder-slate-400 border border-[#DEE2E6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0059bb] focus:border-transparent shadow-sm transition-all text-sm font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Filters */}
        {activeMainTab === "cephas" ? (
          <div className="flex flex-wrap items-center gap-2 mb-8 no-print border-b border-slate-200 pb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2 flex items-center gap-1">
              <SlidersHorizontal className="h-3 w-3" /> Filtrar Por:
            </span>
            <button
              onClick={() => setSelectedCephasCategory("todos")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCephasCategory === "todos"
                  ? "bg-[#002D5C] text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              Todos os Ramais Cephas
            </button>
            <button
              onClick={() => setSelectedCephasCategory("direcao")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCephasCategory === "direcao"
                  ? "bg-[#002D5C] text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              Direção, PABX & Apoio (Opções 5 e 6)
            </button>
            <button
              onClick={() => setSelectedCephasCategory("ensino")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCephasCategory === "ensino"
                  ? "bg-[#002D5C] text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              Pedagógico, Secretaria & DIEE (Opções 1 e 4)
            </button>
            <button
              onClick={() => setSelectedCephasCategory("aprendiz")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCephasCategory === "aprendiz"
                  ? "bg-[#002D5C] text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              Programa Aprendiz & Polos (Opção 2)
            </button>

            {/* If edits were made, show fallback reset button */}
            <div className="ml-auto">
              <button
                onClick={handleResetToDefaults}
                className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 px-2.5 py-1.5 rounded-md hover:bg-red-50 hover:border-red-100 border border-transparent transition-all font-medium cursor-pointer"
                title="Restaurar dados originais"
              >
                <RotateCcw className="h-3 w-3" /> Restaurar Padrões
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2 mb-8 no-print border-b border-slate-200 pb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2 flex items-center gap-1">
              <SlidersHorizontal className="h-3 w-3" /> Filtrar Por:
            </span>
            <button
              onClick={() => setSelectedCategory("todos")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === "todos"
                  ? "bg-[#002D5C] text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              Todos os Ramais
            </button>
            <button
              onClick={() => setSelectedCategory("presidencia")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === "presidencia"
                  ? "bg-[#002D5C] text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              Presidência & Jurídico
            </button>
            <button
              onClick={() => setSelectedCategory("daf")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === "daf"
                  ? "bg-[#002D5C] text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              DAF & Suprimentos
            </button>
            <button
              onClick={() => setSelectedCategory("rh_operacoes")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === "rh_operacoes"
                  ? "bg-[#002D5C] text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              RH & Modernização (DSG)
            </button>
            <button
              onClick={() => setSelectedCategory("deca_cephas")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === "deca_cephas"
                  ? "bg-[#002D5C] text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              DECA & Cephas
            </button>
            <button
              onClick={() => setSelectedCategory("unidades")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === "unidades"
                  ? "bg-[#002D5C] text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              Unidades Fundhas & Inovação
            </button>
            <button
              onClick={() => setSelectedCategory("externos")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === "externos"
                  ? "bg-[#002D5C] text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              Telefones Externos
            </button>

            {/* If edits were made, show fallback reset button */}
            <div className="ml-auto">
              <button
                onClick={handleResetToDefaults}
                className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 px-2.5 py-1.5 rounded-md hover:bg-red-50 hover:border-red-100 border border-transparent transition-all font-medium cursor-pointer"
                title="Restaurar dados originais"
              >
                <RotateCcw className="h-3 w-3" /> Restaurar Padrões
              </button>
            </div>
          </div>
        )}

        {/* Edit mode active banner */}
        {isEditMode && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-inner no-print animate-fade-in">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
              <div>
                <p className="text-sm font-bold text-red-900">VOCÊ ESTÁ NO MODO EDIÇÃO</p>
                <p className="text-xs text-red-700">Edite nomes, ramais e subtítulos diretamente na página. Você também pode acrescentar ou excluir elementos.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setShowChangePasswordModal(true);
                  setNewPassword("");
                  setChangePasswordError("");
                }}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg transition-all font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                title="Configurar nova senha administrativa de 4 dígitos"
              >
                <Icons.Key className="h-3.5 w-3.5 text-slate-300" />
                Alterar Senha
              </button>
              <button
                onClick={handleAddCard}
                className="px-3.5 py-1.5 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-all font-bold text-xs flex items-center gap-1 cursor-pointer shadow-sm"
              >
                <Plus className="h-3.5 w-3.5" /> Novo Setor (Card)
              </button>
            </div>
          </div>
        )}

        {/* 4. MAIN BENTO GRID ARCHITECTURE (TOP DIRECTORY CARDS) */}
        {getFilteredCards().length === 0 && (activeMainTab === "cephas" || selectedCategory !== "unidades") ? (
          <div className="bg-white border border-[#DEE2E6] rounded-2xl py-12 px-4 text-center shadow-sm mb-12">
            <Search className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-800 font-bold mb-1">Nenhum ramal ou colaborador encontrado</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">Tente refinar sua busca com termos aproximados ou limpe o filtro atual para ver todos os contatos.</p>
            <button 
              onClick={() => { 
                setSearchQuery(""); 
                if (activeMainTab === "cephas") {
                  setSelectedCephasCategory("todos");
                } else {
                  setSelectedCategory("todos");
                }
              }} 
              className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-all cursor-pointer"
            >
              Limpar Filtros & Ver Todos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12 print-grid">
            
            {getFilteredCards().map((card) => {
              // Filter out items inside the card based on search query
              const filteredItems = card.items.filter(item => {
                if (!searchQuery.trim()) return true;
                if (item.isSubheading) return true; // always show section headers within visual container
                
                const term = searchQuery.toLowerCase();
                return (
                  (item.name && item.name.toLowerCase().includes(term)) ||
                  (item.role && item.role.toLowerCase().includes(term)) ||
                  (item.extension && item.extension.toLowerCase().includes(term))
                );
              });

              // If card items are empty, continue anyway
              return (
                <div
                  key={card.id}
                  className={`bg-white border border-[#DEE2E6] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group print-card ${
                    card.id === "telefones-externos" ? "md:col-span-2 lg:col-span-2 xl:col-span-2" : ""
                  }`}
                  id={`card-${card.id}`}
                >
                  <div>
                    {/* Card Head / Department title */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-3.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[#0059bb] bg-blue-50 p-1.5 rounded-lg">
                          <DynamicIcon name={card.iconName} className="h-5 w-5 text-[#0059bb]" />
                        </span>
                        
                        {isEditMode ? (
                          <input
                            type="text"
                            value={card.title}
                            onChange={(e) => {
                              if (activeMainTab === "cephas") {
                                const updated = cephasCards.map(c => c.id === card.id ? { ...c, title: e.target.value.toUpperCase() } : c);
                                handleSaveCephasChanges(updated);
                              } else {
                                const updated = cards.map(c => c.id === card.id ? { ...c, title: e.target.value.toUpperCase() } : c);
                                handleSaveChanges(updated, unitColumns);
                              }
                            }}
                            className="font-extrabold text-[#001937] text-sm tracking-tight border-b border-red-200 focus:outline-none focus:border-red-600 bg-red-50/50 px-1 rounded"
                          />
                        ) : (
                          <h3 className="font-extrabold text-[#001937] text-xs md:text-sm tracking-tight leading-snug">
                            {highlightMatch(card.title, searchQuery)}
                          </h3>
                        )}
                      </div>

                      {/* Delete Sector button in edit mode with inline confirmation */}
                      {isEditMode && (
                        <div className="flex items-center gap-1 no-print shrink-0">
                          {deletingCardId === card.id ? (
                            <div className="flex items-center gap-1 bg-red-100 border border-red-200 px-1.5 py-0.5 rounded-lg text-[10px] font-bold text-red-700 animate-pulse">
                              <span>Excluir?</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteCard(card.id);
                                  setDeletingCardId(null);
                                  triggerNotification("success", "Setor removido com sucesso!");
                                }}
                                className="px-1.5 py-0.5 bg-red-650 hover:bg-red-750 text-white rounded text-[10px] font-black transition-all cursor-pointer"
                                title="Confirmar exclusão definitiva do setor"
                              >
                                Sim
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDeletingCardId(null);
                                }}
                                className="px-1.5 py-0.5 bg-slate-200 hover:bg-slate-300 text-slate-750 rounded text-[10px] font-black transition-all cursor-pointer"
                                title="Cancelar"
                              >
                                Não
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeletingCardId(card.id);
                              }}
                              className="p-1 text-red-500 hover:text-[#B71C1C] hover:bg-red-50 rounded transition-all cursor-pointer"
                              title="Remover Setor"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Column Items */}
                    <div className="space-y-3">
                      {filteredItems.map((item, idx) => {
                        
                        // Handle Subheadings
                        if (item.isSubheading) {
                          return (
                            <div key={item.id} className="pt-3 pb-1">
                              {isEditMode ? (
                                <div className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => handleUpdateItem(card.id, item.id, "name", e.target.value)}
                                    className="text-[10px] uppercase font-bold text-[#74777F] tracking-wider border-b border-red-200 bg-red-50/55 p-0.5 rounded w-full focus:outline-none"
                                  />
                                  <button
                                    onClick={() => handleDeleteItem(card.id, item.id)}
                                    className="p-0.5 text-red-500 hover:bg-red-50 rounded"
                                    title="Remover Subtítulo"
                                  >
                                    <X className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              ) : (
                                <h4 className="text-[10px] uppercase font-extrabold text-[#74777F] tracking-widest border-b border-dotted border-slate-200 pb-1">
                                  {highlightMatch(item.name || "", searchQuery)}
                                </h4>
                              )}
                            </div>
                          );
                        }

                        // Regular Contacts
                        return (
                          <div
                            key={item.id}
                            className="group/row flex justify-between items-start hover:bg-blue-50/40 p-1.5 -mx-1.5 rounded-lg transition-all"
                          >
                            <div className="flex-1 min-w-0 pr-2">
                              {isEditMode ? (
                                <div className="space-y-1.5 p-1 bg-red-50/30 border border-red-100 rounded">
                                  {/* Edit Name */}
                                  <div className="flex justify-between items-center gap-1">
                                    <input
                                      type="text"
                                      value={item.name}
                                      placeholder="Nome"
                                      onChange={(e) => handleUpdateItem(card.id, item.id, "name", e.target.value)}
                                      className="text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded px-1 py-0.5 w-full focus:outline-none focus:ring-1 focus:ring-red-400"
                                    />
                                    <button
                                      onClick={() => handleDeleteItem(card.id, item.id)}
                                      className="p-0.5 text-red-500 hover:text-red-700 bg-white border border-red-100 rounded shadow-sm"
                                      title="Remover"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </button>
                                  </div>

                                  {/* Edit Role & Tag */}
                                  <div className="flex gap-1.5">
                                    <input
                                      type="text"
                                      value={item.role || ""}
                                      placeholder="Cargo / Observações"
                                      onChange={(e) => handleUpdateItem(card.id, item.id, "role", e.target.value)}
                                      className="text-[10px] text-slate-600 bg-white border border-slate-200 rounded px-1 py-0.5 flex-1 focus:outline-none focus:ring-1 focus:ring-red-400"
                                    />
                                    <input
                                      type="text"
                                      value={item.tag || ""}
                                      placeholder="Tag (Ex: DIRETOR)"
                                      onChange={(e) => handleUpdateItem(card.id, item.id, "tag", e.target.value)}
                                      className="text-[10px] text-slate-700 bg-white border border-slate-200 rounded px-1 py-0.5 w-24 focus:outline-none focus:ring-1 focus:ring-red-400 font-bold uppercase placeholder:font-normal placeholder:normal-case"
                                    />
                                  </div>
                                </div>
                              ) : (
                                <div className="min-w-0">
                                  <div className="flex items-center flex-wrap gap-1 min-w-0">
                                    <span className="text-xs font-semibold text-[#1A1C1E] leading-snug break-words">
                                      {highlightMatch(item.name || "", searchQuery)}
                                    </span>
                                    {(() => {
                                      const displayTag = item.tag || (
                                        (item.role && ["PRESIDENTE", "DIRETOR", "DIRETORA"].includes(item.role.toUpperCase().trim())) 
                                          ? item.role.toUpperCase().trim() 
                                          : null
                                      );
                                      if (!displayTag) return null;
                                      
                                      let tagColorClass = "bg-[#001937] text-white"; // default dark navy
                                      if (displayTag === "PRESIDENTE") {
                                        tagColorClass = "bg-emerald-600 text-white"; // green
                                      } else if (displayTag === "DIRETOR" || displayTag === "DIRETORA") {
                                        tagColorClass = "bg-black text-white"; // black
                                      } else if (displayTag === "EMERGÊNCIA") {
                                        tagColorClass = "bg-red-600 text-white animate-pulse"; // blinking/pulsing red
                                      }
                                      
                                      return (
                                        <span className={`text-[9px] ${tagColorClass} px-1.5 py-0.2 rounded font-black tracking-wide uppercase shrink-0`}>
                                          {displayTag}
                                        </span>
                                      );
                                    })()}
                                  </div>
                                  {item.role && (
                                    <span className="text-[11px] text-[#74777F] block leading-tight mt-0.5 font-light break-words">
                                      {highlightMatch(item.role, searchQuery)}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Extension (Clickable to Copy) */}
                            <div className="shrink-0 text-right flex items-center gap-1 pl-1">
                              {isEditMode ? (
                                <input
                                  type="text"
                                  value={item.extension || ""}
                                  placeholder="Ramal"
                                  onChange={(e) => handleUpdateItem(card.id, item.id, "extension", e.target.value)}
                                  className="text-xs font-bold text-[#0059bb] bg-white border border-slate-200 rounded px-1 py-0.5 w-16 text-right focus:outline-none focus:ring-1 focus:ring-red-400"
                                />
                              ) : (
                                (() => {
                                  if (!item.extension) return null;
                                  
                                  if (item.extension.includes("/")) {
                                    const numbers = item.extension.split("/").map(num => num.trim());
                                    return (
                                      <div className="flex flex-wrap gap-1 justify-end max-w-[140px] md:max-w-[200px] lg:max-w-[240px]">
                                        {numbers.map((number, nIdx) => (
                                          <button
                                            key={nIdx}
                                            onClick={() => triggerCopyToast(number)}
                                            className="group/btn relative px-1.5 py-1 bg-slate-50 hover:bg-blue-50/80 text-blue-700 rounded border border-slate-100 hover:border-blue-200 transition-all font-mono font-bold text-[10px] md:text-xs tracking-tight flex items-center gap-1 cursor-pointer shrink-0"
                                            title="Clique para copiar"
                                          >
                                            <Phone className="h-2.5 w-2.5 text-blue-400 group-hover/btn:text-[#0059bb] shrink-0" />
                                            <span className="break-all">{highlightMatch(number, searchQuery)}</span>
                                            <span className="opacity-0 group-hover/btn:opacity-100 transition-opacity ml-0.5 duration-150 shrink-0">
                                              <Copy className="h-2.5 w-2.5 text-slate-400" />
                                            </span>
                                          </button>
                                        ))}
                                      </div>
                                    );
                                  }

                                  return (
                                    <button
                                      onClick={() => triggerCopyToast(item.extension || "")}
                                      className="group/btn relative px-1.5 py-1 bg-slate-50 hover:bg-blue-50/80 text-blue-700 rounded border border-slate-100 hover:border-blue-200 transition-all font-mono font-bold text-[10px] md:text-xs tracking-tight flex items-center gap-1 cursor-pointer max-w-[130px] md:max-w-[160px] break-words whitespace-normal text-right justify-end"
                                      title="Clique para copiar ramal"
                                    >
                                      <Phone className="h-2.5 w-2.5 text-blue-400 group-hover/btn:text-[#0059bb] shrink-0" />
                                      <span className="break-all">{highlightMatch(item.extension || "", searchQuery)}</span>
                                      
                                      {/* Little clipboard icon that shows up on hover */}
                                      <span className="opacity-0 group-hover/btn:opacity-100 transition-opacity ml-0.5 duration-150 shrink-0">
                                        <Copy className="h-2.5 w-2.5 text-slate-400" />
                                      </span>
                                    </button>
                                  );
                                })()
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Edit tools for appending new contacts/headers */}
                  {isEditMode && (
                    <div className="mt-6 pt-3 border-t border-dashed border-red-100 flex justify-between gap-2 no-print">
                      <button
                        onClick={() => handleAddItem(card.id, false)}
                        className="py-1 px-2.5 bg-red-50 hover:bg-red-100 text-[#D32F2F] font-bold text-[10px] rounded border border-red-200 flex-1 flex items-center justify-center gap-1"
                      >
                        <Plus className="h-3 w-3" /> Contato
                      </button>
                      <button
                        onClick={() => handleAddItem(card.id, true)}
                        className="py-1 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] rounded border border-slate-200 flex-1 flex items-center justify-center gap-1"
                      >
                        <Plus className="h-3 w-3" /> Subtítulo
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

          </div>
        )}

        {/* 5. UNIDADES FUNDHAS E INOVAÇÃO (BOTTOM CARDS & GRIDS) */}
        {activeMainTab === "fundhas" && (selectedCategory === "todos" || selectedCategory === "unidades") && (
          <section className="bg-white border border-[#DEE2E6] rounded-2xl p-6 md:p-8 shadow-sm print-unidades" id="unidades-section">
            
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-[#DEE2E6] pb-4 mb-6">
              <span className="bg-blue-50 text-[#0059bb] p-2 rounded-xl">
                <DynamicIcon name="Navigation" className="h-6 w-6 text-[#0059bb]" />
              </span>
              <div>
                <h3 className="font-extrabold text-[#001937] text-lg md:text-xl tracking-tight uppercase">
                  UNIDADES FUNDHAS E INOVAÇÃO
                </h3>
                <p className="text-xs text-[#74777F] font-light mt-0.5">
                  Lista completa e numeração telefônica das unidades regionais.
                </p>
              </div>
            </div>

            {/* Grid Subdivision columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {unitColumns.map((col, colIdx) => {
                
                // For search matching in units, let's filter relevant groups inside columns
                const filteredSections = col.sections.map(sec => {
                  const filteredGroups = sec.groups.filter(grp => {
                    if (!searchQuery.trim()) return true;
                    const query = searchQuery.toLowerCase();
                    if (grp.name.toLowerCase().includes(query)) return true;
                    if (grp.directExtension && grp.directExtension.toLowerCase().includes(query)) return true;
                    return grp.items.some(
                      item => 
                        item.name.toLowerCase().includes(query) ||
                        (item.role && item.role.toLowerCase().includes(query)) ||
                        item.extension.toLowerCase().includes(query)
                    );
                  });
                  return { ...sec, groups: filteredGroups };
                }).filter(sec => sec.groups.length > 0);

                if (filteredSections.length === 0 && searchQuery.trim() !== "") {
                  // No match in this column, skip rendering
                  return null;
                }

                return (
                  <div key={col.id} className="space-y-8" id={`unitCol-${col.id}`}>
                    
                    {/* Column Heading Label with visual border style */}
                    <div className="border-l-4 border-[#0059bb] pl-3 py-1 mb-4 bg-slate-50/50">
                      <h4 className="text-xs font-extrabold text-[#001937] tracking-wider uppercase">
                        {col.title}
                      </h4>
                    </div>

                    <div className="space-y-6">
                      {(searchQuery.trim() !== "" ? filteredSections : col.sections).map((sec, secIdx) => (
                        <div key={sec.id} className="space-y-5">
                          
                          {/* Group header */}
                          {sec.title && (
                            <h5 className="text-[10px] tracking-widest font-extrabold text-[#74777F] uppercase pb-1 border-b border-dotted border-slate-200">
                              {sec.title}
                            </h5>
                          )}

                          {/* Groups (e.g. CIEM, CEL, etc) */}
                          <div className="space-y-4">
                            {sec.groups.map((grp, grpIdx) => (
                              <div key={grp.id} className="bg-slate-50/45 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all">
                                
                                <div className="flex justify-between items-center gap-2 mb-2">
                                  <span className="text-xs font-bold text-[#001937]">
                                    {grp.name}
                                  </span>

                                  {/* Handle Direct Extension without children (e.g. Padaria-Escola - 596) */}
                                  {grp.directExtension !== undefined && (
                                    <div className="flex items-center gap-1">
                                      {isEditMode ? (
                                        <input
                                          type="text"
                                          value={grp.directExtension}
                                          onChange={(e) => handleUpdateGroupDirectExtension(colIdx, secIdx, grpIdx, e.target.value)}
                                          className="text-xs font-bold text-[#0059bb] bg-white border border-slate-200 rounded px-1 w-20 text-right focus:ring-1 focus:ring-red-400 focus:outline-none"
                                        />
                                      ) : (
                                        <button
                                          onClick={() => triggerCopyToast(grp.directExtension || "")}
                                          className="px-2 py-0.5 bg-white hover:bg-blue-50 text-[#0059bb] rounded border border-slate-100 hover:border-blue-200 transition-all font-mono font-bold text-xs cursor-pointer"
                                        >
                                          {grp.directExtension}
                                        </button>
                                      )}
                                    </div>
                                  )}
                                </div>

                                {/* List child items (direct details like Gestor, Adm, etc.) */}
                                {grp.items.length > 0 && (
                                  <div className="space-y-2 pt-1 border-t border-slate-100/60 mt-1">
                                    {grp.items.map((item, itemIdx) => (
                                      <div key={itemIdx} className="flex justify-between items-center text-[11px] hover:bg-blue-50/20 px-1 rounded transition-all">
                                        <div className="text-slate-700">
                                          {isEditMode ? (
                                            <div className="flex flex-col gap-1 my-1 p-1 bg-red-50/10 border border-red-100/30 rounded">
                                              <input
                                                type="text"
                                                value={item.name}
                                                placeholder="Nome"
                                                onChange={(e) => handleUpdateUnitDetail(colIdx, secIdx, grpIdx, itemIdx, "name", e.target.value)}
                                                className="text-[10px] font-medium text-slate-800 bg-white border border-slate-200 rounded px-1 focus:outline-none"
                                              />
                                              <input
                                                type="text"
                                                value={item.role || ""}
                                                placeholder="Cargo"
                                                onChange={(e) => handleUpdateUnitDetail(colIdx, secIdx, grpIdx, itemIdx, "role", e.target.value)}
                                                className="text-[9px] text-slate-500 bg-white border border-slate-200 rounded px-1 focus:outline-none"
                                              />
                                            </div>
                                          ) : (
                                            <span>
                                              <strong className="text-slate-900">{highlightMatch(item.name, searchQuery)}</strong>
                                              {item.role && <span className="text-[10px] text-slate-500 font-light block md:inline md:ml-1">({highlightMatch(item.role, searchQuery)})</span>}
                                            </span>
                                          )}
                                        </div>

                                        <div className="flex items-center gap-1.5">
                                          {isEditMode ? (
                                            <div className="flex items-center gap-1">
                                              <input
                                                type="text"
                                                value={item.extension}
                                                onChange={(e) => handleUpdateUnitDetail(colIdx, secIdx, grpIdx, itemIdx, "extension", e.target.value)}
                                                className="text-[10px] font-bold text-[#0059bb] bg-white border border-slate-200 rounded px-1 w-20 text-right focus:outline-none"
                                              />
                                              <button
                                                onClick={() => handleDeleteUnitItem(colIdx, secIdx, grpIdx, itemIdx)}
                                                className="p-0.5 text-red-500 hover:bg-red-50 rounded"
                                                title="Excluir"
                                              >
                                                <X className="h-3 w-3" />
                                              </button>
                                            </div>
                                          ) : (
                                            <button
                                              onClick={() => triggerCopyToast(item.extension)}
                                              className="px-1.5 py-0.5 bg-white hover:bg-blue-50/80 text-blue-700 font-mono font-bold hover:border-blue-200 border border-slate-200/50 rounded text-[10px] tracking-tight cursor-pointer"
                                            >
                                              {highlightMatch(item.extension, searchQuery)}
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Append item in Edit Mode */}
                                {isEditMode && grp.directExtension === undefined && (
                                  <button
                                    onClick={() => handleAddUnitItem(colIdx, secIdx, grpIdx)}
                                    className="mt-3 w-full py-1 bg-red-50 hover:bg-red-100 text-[#D32F2F] font-bold text-[9px] rounded border border-red-100 flex items-center justify-center gap-1"
                                  >
                                    <Plus className="h-2.5 w-2.5" /> Adicionar Staff
                                  </button>
                                )}

                              </div>
                            ))}
                          </div>

                        </div>
                      ))}
                    </div>

                  </div>
                );
              })}
            </div>

          </section>
        )}

      </main>

      {/* 6. GLOBAL FOOTER */}
      <footer className="bg-slate-100 py-6 border-t border-[#DEE2E6] text-center text-xs text-[#74777F] mt-12 no-print">
        <div className="max-w-[1280px] mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p className="font-medium text-slate-700">© 2026 Fundhas - Fundação Hélio Augusto de Souza.</p>
            <p className="font-light mt-0.5">Todos os direitos reservados. Desenvolvimento e Transparência Corporativa.</p>
          </div>
          <div className="flex gap-4 font-semibold text-slate-500">
            <button onClick={() => setShowHelp(true)} className="hover:text-[#0059bb] transition-all cursor-pointer">Como Usar</button>
            <span className="text-slate-300">|</span>
            <a href="https://fundhas.org.br/" target="_blank" rel="noopener noreferrer" className="hover:text-[#0059bb] transition-all flex items-center gap-1">
              Portal Oficial <Icons.ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* 7. DYNAMIC POPUP TOAST (COPIED SUCCESS NOTIFICATION) */}
      <div
        className={`fixed bottom-6 right-6 bg-[#001937] text-white py-3 px-5 rounded-xl border border-[#0059bb] shadow-2xl z-50 transition-all duration-300 transform flex items-center gap-3 no-print ${
          showToast ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <span className="p-1 bg-emerald-500/20 text-emerald-400 rounded-full">
          <Check className="h-4 w-4" />
        </span>
        <div>
          <p className="text-xs font-bold tracking-tight uppercase text-emerald-400">Texto Copiado!</p>
          <p className="text-xs text-slate-300">{toastMessage}</p>
        </div>
      </div>

      {/* 8. MODAL: ENTER EDIT MODE PASSWORD (4 DIGIT PIN) */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 no-print animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-150 max-w-sm w-full overflow-hidden transform transition-all p-6 relative">
            <button 
              onClick={() => {
                setShowPasswordModal(false);
                setInputPassword("");
                setPasswordError("");
              }}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center mt-2 mb-6">
              <div className="w-12 h-12 bg-blue-50 text-[#0059bb] rounded-full flex items-center justify-center mx-auto mb-3">
                <Icons.Lock className="h-6 w-6" />
              </div>
              <h4 className="text-md font-extrabold text-[#001937]">Permissão de Edição</h4>
              <p className="text-xs text-slate-500 mt-1">Este modo requer uma senha administrativa de 4 dígitos para segurança.</p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const systemPassword = localStorage.getItem("fundhas_edit_password") || "1234";
              if (inputPassword === systemPassword) {
                setIsEditMode(true);
                setShowPasswordModal(false);
                setInputPassword("");
                setPasswordError("");
                triggerNotification("success", "Modo Edição ativado de forma segura!");
              } else {
                setPasswordError("Senha incorreta! Tente novamente.");
                setInputPassword("");
              }
            }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3.5 text-center">
                  Progresso do PIN
                </label>
                
                {/* Visual PIN dots bar */}
                <div className="flex justify-center gap-3 mb-5">
                  {[0, 1, 2, 3].map((index) => {
                    const char = inputPassword[index] || "";
                    return (
                      <div 
                        key={index} 
                        className={`w-11 h-14 border-2 rounded-xl flex items-center justify-center text-xl font-bold font-mono transition-all duration-150 ${
                          passwordError 
                            ? "border-red-300 bg-red-50 text-red-700" 
                            : char 
                            ? "border-[#0059bb] bg-blue-50/50 text-[#001937]" 
                            : "border-slate-200 bg-slate-50 text-slate-400"
                        }`}
                      >
                        {char ? "•" : ""}
                      </div>
                    );
                  })}
                </div>

                <input
                  type="password"
                  maxLength={4}
                  value={inputPassword}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setInputPassword(val);
                    setPasswordError("");
                    
                    // Auto-submit check when 4 digits are completed
                    if (val.length === 4) {
                      const systemPassword = localStorage.getItem("fundhas_edit_password") || "1234";
                      if (val === systemPassword) {
                        setIsEditMode(true);
                        setShowPasswordModal(false);
                        setInputPassword("");
                        setPasswordError("");
                        triggerNotification("success", "Administrador conectado! O Modo Edição está ativo.");
                      } else {
                        setPasswordError("Senha incorreta! Tente novamente.");
                        setInputPassword("");
                      }
                    }
                  }}
                  placeholder="Digite 4 números"
                  className="w-full text-center tracking-widest text-[#001937] font-bold text-base py-2.5 border border-slate-200 focus:border-[#0059bb] focus:outline-none focus:ring-1 focus:ring-[#0059bb] rounded-xl bg-slate-50 font-mono transition-all placeholder:font-sans placeholder:text-xs placeholder:tracking-normal"
                  autoFocus
                  required
                />
              </div>

              {passwordError && (
                <p className="text-xs text-red-600 font-semibold text-center flex items-center justify-center gap-1 bg-red-50 py-2 px-3 rounded-xl border border-red-100">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                  {passwordError}
                </p>
              )}

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setInputPassword("");
                    setPasswordError("");
                  }}
                  className="flex-1 py-2.5 px-4 border border-slate-200 text-slate-500 rounded-xl hover:bg-slate-50 transition-all text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={inputPassword.length !== 4}
                  className="flex-1 py-2.5 px-4 bg-[#0059bb] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed hover:bg-[#004bb0] text-white rounded-xl transition-all text-xs font-bold shadow-sm cursor-pointer"
                >
                  Acessar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 9. MODAL: CHANGE ADMIN PASSWORD */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 no-print animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-150 max-w-sm w-full overflow-hidden transform transition-all p-6 relative">
            <button 
              onClick={() => {
                setShowChangePasswordModal(false);
                setNewPassword("");
                setChangePasswordError("");
              }}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center mt-2 mb-6">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icons.Key className="h-6 w-6" />
              </div>
              <h4 className="text-md font-extrabold text-[#001937]">Alterar Senha de Edição</h4>
              <p className="text-xs text-slate-500 mt-1">Configure uma nova senha numérica para o Modo Edição.</p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (/^\d{4}$/.test(newPassword)) {
                localStorage.setItem("fundhas_edit_password", newPassword);
                setShowChangePasswordModal(false);
                setNewPassword("");
                setChangePasswordError("");
                triggerNotification("success", `Senha administrativa alterada com êxito! Nova senha definida.`);
              } else {
                setChangePasswordError("A senha precisa conter exatamente 4 algarismos numéricos!");
              }
            }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 text-center">
                  Nova Senha (4 dígitos)
                </label>
                <input
                  type="password"
                  maxLength={4}
                  value={newPassword}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setNewPassword(val);
                    setChangePasswordError("");
                  }}
                  placeholder="EX: 1234"
                  className="w-full text-center tracking-widest text-[#001937] font-bold text-base py-2.5 border border-slate-200 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 rounded-xl bg-slate-50 font-mono transition-all"
                  autoFocus
                  required
                />
              </div>

              {changePasswordError && (
                <p className="text-xs text-red-600 font-semibold text-center flex items-center justify-center gap-1 bg-red-50 py-2 px-3 rounded-xl border border-red-100">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-650" />
                  {changePasswordError}
                </p>
              )}

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowChangePasswordModal(false);
                    setNewPassword("");
                    setChangePasswordError("");
                  }}
                  className="flex-1 py-2.5 px-4 border border-slate-200 text-slate-500 rounded-xl hover:bg-slate-50 transition-all text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={newPassword.length !== 4}
                  className="flex-1 py-2.5 px-4 bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed hover:bg-slate-900 text-white rounded-xl transition-all text-xs font-bold shadow-sm cursor-pointer"
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



      {/* 11. MODAL: SYSTEM DATA FACTORY RESET CONFIRM */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 no-print animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-150 max-w-sm w-full overflow-hidden transform transition-all p-6 relative">
            <button 
              onClick={() => setShowResetConfirm(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center mt-2 mb-6">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
                <RotateCcw className="h-6 w-6" />
              </div>
              <h4 className="text-md font-extrabold text-[#001937]">Restaurar Banco de Dados</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Isso irá redefinir e resetar totalmente o diretório de ramais no navegador, apagando novos cards, alterações de cargos e nomes, sobrepondo para as configurações padrão originais de fábrica.
              </p>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 px-4 border border-slate-200 text-slate-500 rounded-xl hover:bg-slate-50 transition-all text-xs font-bold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={confirmResetToDefaults}
                className="flex-1 py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl transition-all text-xs font-bold shadow-sm cursor-pointer"
              >
                Restaurar Padrão
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
