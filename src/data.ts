import { DirectoryCard, UnitColumn } from "./types";

export const initialDirectoryCards: DirectoryCard[] = [
  {
    id: "presidencia",
    title: "PRESIDÊNCIA",
    iconName: "Building2",
    category: "directoria",
    items: [
      { id: "p1", name: "Juvenil Silvério", role: "PRESIDENTE", tag: "PRESIDENTE", extension: "540" },
      { id: "p2", name: "Patrícia", role: "ASSESSORIA", extension: "540" },
      { id: "p3", name: "Cleusa", role: "CONTROLE INTERNO", extension: "539" },
      { id: "p4", name: "COMUNICAÇÃO / EVENTOS / PROJETOS", isSubheading: true },
      { id: "p5", name: "Henrique", role: "Comunicação", extension: "626" },
      { id: "p6", name: "Marcos", role: "Comunicação", extension: "552" },
      { id: "p7", name: "Sandra Teves", role: "Eventos", extension: "500" },
      { id: "p8", name: "Célio", role: "Eventos", extension: "656" },
      { id: "p9", name: "Lúcia, Eliane e Sônia", role: "Costura", extension: "574" },
      { id: "p10", name: "Valéria / Luciana Jammel", role: "Projetos", extension: "570" },
      { id: "p11", name: "Tiago", role: "Projetos", extension: "583" },
      { id: "p12", name: "Daniela", role: "Sup. S. Social", extension: "592" },
      { id: "p13", name: "Jussara e Anthony", role: "Coord.", extension: "556" }
    ]
  },
  {
    id: "daf",
    title: "DAF - ADM E FINANÇAS",
    iconName: "Receipt",
    category: "directoria",
    items: [
      { id: "daf1", name: "Sérgio", role: "DIRETOR", tag: "DIRETOR", extension: "513" },
      { id: "daf2", name: "Rosemari", role: "Contab.", extension: "516" },
      { id: "daf3", name: "Diógenes / Elizabete", extension: "530" },
      { id: "daf4", name: "Daniela", role: "Contas a pagar", extension: "531" },
      { id: "daf5", name: "Lúcia", role: "Convênios", extension: "516" },
      { id: "daf6", name: "Cidinha Sato", role: "Coord.", extension: "513/562" },
      { id: "daf7", name: "DFO - FINANÇAS E ORÇAMENTO", isSubheading: true },
      { id: "daf8", name: "Maria Célia", role: "Chefia", extension: "578" },
      { id: "daf9", name: "DIVISÃO DE CONTRATOS & ADMISSÃO", isSubheading: true },
      { id: "daf10", name: "Charles", role: "Chefia", extension: "501" },
      { id: "daf11", name: "Leno", role: "Gestão", extension: "655" },
      { id: "daf12", name: "Adriana", extension: "501" },
      { id: "daf13", name: "Mércia", role: "Acomp. Escolar", extension: "629" },
      { id: "daf14", name: "Naomi / João", extension: "528" },
      { id: "daf15", name: "Andreia / Rebeca", extension: "584 / 585" },
      { id: "daf16", name: "Evandro Santos", role: "Assessor", extension: "613" },
      { id: "daf17", name: "Érika", extension: "544" }
    ]
  },
  {
    id: "suprimentos",
    title: "SUPRIMENTOS (DS)",
    iconName: "FolderHeart",
    category: "directoria",
    items: [
      { id: "sup1", name: "Daniel", role: "Chefia", extension: "554" },
      { id: "sup2", name: "Divisão de Suprimentos", extension: "518 / 634" },
      { id: "sup3", name: "Kátia", role: "Alimentação", extension: "610" },
      { id: "sup4", name: "Ana Maria / Refeitório", extension: "577 / 526" },
      { id: "sup5", name: "Andréa Aliotti", role: "Almox.", extension: "648" },
      { id: "sup6", name: "Cristina", role: "Almox.", extension: "571" },
      { id: "sup7", name: "Fernando Torres / Paulo Vichi", extension: "615 / 532" },
      { id: "sup8", name: "Uriah", extension: "571" },
      { id: "sup9", name: "COMPRAS & LICITAÇÕES", isSubheading: true },
      { id: "sup10", name: "Mônica Yoshida", role: "Coord.", extension: "536" },
      { id: "sup11", name: "Eliane / Sandra / Maradona", extension: "593 / 599 / 564" },
      { id: "sup12", name: "Eveli", role: "Coord. Licit.", extension: "588" },
      { id: "sup13", name: "Leonardo / Karen", extension: "543 / 597" }
    ]
  },
  {
    id: "juridico",
    title: "DIRETORIA JURÍDICA",
    iconName: "Gavel",
    category: "directoria",
    items: [
      { id: "jur1", name: "Alexandre Campos", role: "DIRETOR", tag: "DIRETOR", extension: "621" },
      { id: "jur2", name: "Poliana", role: "Assessoria", extension: "614" },
      { id: "jur3", name: "Cristiane / Eunice", role: "Assessoria", extension: "644" }
    ]
  },
  {
    id: "drh",
    title: "RECURSOS HUMANOS (DRH)",
    iconName: "Users",
    category: "directoria",
    items: [
      { id: "drh1", name: "Luciana", role: "Chefia", extension: "523" },
      { id: "drh2", name: "Agnylze", role: "Supervisão", extension: "649" },
      { id: "drh3", name: "SERVIÇOS & ATENDIMENTO", isSubheading: true },
      { id: "drh4", name: "Nayla", role: "Serviço Social", extension: "558" },
      { id: "drh5", name: "Victória", role: "Psicologia", extension: "505" },
      { id: "drh6", name: "Solange", role: "Cadastro", extension: "519" },
      { id: "drh7", name: "Frank", role: "Passe/Alim.", extension: "594" },
      { id: "drh8", name: "Lindsay / Paula", role: "Férias", extension: "521" },
      { id: "drh9", name: "Gislaine", role: "Coord. Folha", extension: "623" },
      { id: "drh10", name: "Alexandre", role: "Pagamento", extension: "623" },
      { id: "drh11", name: "Giovana", role: "Coord. Desenv.", extension: "589" },
      { id: "drh12", name: "Monica Andrade", role: "Desenv.", extension: "519" },
      { id: "drh13", name: "Davi", role: "Balcão/Recepção", extension: "636" },
      { id: "drh14", name: "MEDICINA E SEGURANÇA", isSubheading: true },
      { id: "drh15", name: "Pamela", role: "Coord.", extension: "624" },
      { id: "drh16", name: "Monica", role: "Técn. Enf", extension: "553" },
      { id: "drh17", name: "Celso / Simone", role: "SST", extension: "555" }
    ]
  },
  {
    id: "deca",
    title: "DECA",
    iconName: "Smile",
    category: "directoria",
    items: [
      { id: "dec1", name: "Douglas", role: "DIRETOR", tag: "DIRETOR", extension: "545" },
      { id: "dec2", name: "Michele", role: "Chefia", extension: "546" },
      { id: "dec3", name: "Enrico / Luciana", role: "Asses.", extension: "511/600" },
      { id: "dec4", name: "Tânia / Marcia", role: "Adm.", extension: "548 / 538" },
      { id: "dec5", name: "João", role: "Compras/Adm.", extension: "595" },
      { id: "dec6", name: "Ronaldo", role: "Superv. Unidades", extension: "547" },
      { id: "dec7", name: "TÉCNICO & PEDAGÓGICO (DPST)", isSubheading: true },
      { id: "dec8", name: "Isa Rubiana", role: "Superv.", extension: "557" },
      { id: "dec9", name: "Adriano", role: "Coord.", extension: "557" },
      { id: "dec10", name: "Bruna / Débora", role: "Sala Multi", extension: "511" },
      { id: "dec11", name: "Renata", role: "Psicopedag.", extension: "502" },
      { id: "dec12", name: "Orientação Pedag.", role: "Geral", extension: "502 / 611" },
      { id: "dec13", name: "Ezequiel", role: "Labmaker", extension: "541" },
      { id: "dec14", name: "Isabel", role: "Histórias", extension: "579" },
      { id: "dec15", name: "Educação Física", extension: "527" }
    ]
  },
  {
    id: "cephas",
    title: "CEPHAS / APRENDIZ",
    iconName: "GraduationCap",
    category: "directoria",
    items: [
      { id: "cep1", name: "DIRETORIA CEPHAS", isSubheading: true },
      { id: "cep2", name: "Márcio Kanashiro", role: "Chefia", extension: "524" },
      { id: "cep3", name: "André", role: "Adm./PAE", extension: "503/565" },
      { id: "cep4", name: "Rogerio / Giovana / Regina", role: "Psi/SS", extension: "524" },
      { id: "cep5", name: "PROGRAMA APRENDIZ", isSubheading: true },
      { id: "cep6", name: "Eliezer", role: "Chefia", extension: "539" },
      { id: "cep7", name: "Yara", role: "Supervisão", extension: "503" },
      { id: "cep8", name: "Waldineia / William", role: "Adm.", extension: "503" },
      { id: "cep9", name: "Paula / Cida", role: "Gestão", extension: "565" },
      { id: "cep10", name: "DTI - SUPORTE TÉCNICO", isSubheading: true },
      { id: "cep11", name: "Sistemas Adm", role: "Peixoto", extension: "535" },
      { id: "cep12", name: "Sistemas DECA", role: "Telles", extension: "652" },
      { id: "cep13", name: "Sistemas Cephas", role: "Fábio", extension: "652" },
      { id: "cep14", name: "Suporte", role: "A/M/W", extension: "535" }
    ]
  },
  {
    id: "modernizacao",
    title: "MODERNIZAÇÃO & INFRA (DSG)",
    iconName: "Wrench",
    category: "directoria",
    items: [
      { id: "mod1", name: "Bosco", role: "Chefia", extension: "580" },
      { id: "mod2", name: "Celinho", role: "Coordenador", extension: "575" },
      { id: "mod3", name: "Andrade", role: "Assessoria", extension: "653 / 657" },
      { id: "mod4", name: "Marizete (Adm.) / Ricardo", extension: "575 / 572" },
      { id: "mod5", name: "Muniz", role: "Engenharia", extension: "514" },
      { id: "mod6", name: "Evandro", role: "Assessor", extension: "627" },
      { id: "mod7", name: "Hudson", role: "Assessor", extension: "603" },
      { id: "mod8", name: "Elétrica", role: "Braz/Marcelo/Vitor", extension: "618" },
      { id: "mod9", name: "Edmir / Rubens", role: "Marcenaria", extension: "512" },
      { id: "mod10", name: "Carla", role: "Gestão Frota", extension: "510" },
      { id: "mod11", name: "Alexandre Oliveira", role: "Motoristas", extension: "617" },
      { id: "mod12", name: "Portaria Pedestres", role: "Mauá", extension: "549" },
      { id: "mod13", name: "Portaria Veículos", role: "Mauá", extension: "560" },
      { id: "mod14", name: "Tati", role: "Limpeza", extension: "566" }
    ]
  },
  {
    id: "telefones-externos",
    title: "TELEFONES EXTERNOS",
    iconName: "PhoneCall",
    category: "outro",
    items: [
      { id: "ext-1", name: "Abrigo Feminino", role: "Acolhimento", extension: "3922-5005" },
      { id: "ext-2", name: "Abrigo Masculino", role: "Acolhimento", extension: "3921-6118" },
      { id: "ext-3", name: "ASSEM", role: "Associação", extension: "3922-7424" },
      { id: "ext-4", name: "Bilhetagem Eletrônica", role: "Transporte público", extension: "08007727730 / 3923-5780" },
      { id: "ext-5", name: "Câmara Municipal", role: "Poder Legislativo", extension: "3925-6566" },
      { id: "ext-6", name: "CAPS", role: "Saúde Mental", extension: "3913-5519 / 3913-5198" },
      { id: "ext-7", name: "Casa das Meninas", role: "Acolhimento", extension: "3207-3527" },
      { id: "ext-8", name: "Casa dos Bebês", role: "Acolhimento", extension: "3921-1938" },
      { id: "ext-9", name: "Casa dos Meninos", role: "Acolhimento", extension: "3921-8772" },
      { id: "ext-10", name: "CEE - Centro de Educação do Empreendedor", role: "Educação / Empreendedorismo", extension: "3931-7546 / 3931-5566" },
      { id: "ext-11", name: "Cefe - Centro de Formação do Educador", role: "Educação", extension: "3904-2900" },
      { id: "ext-12", name: "CMDCA - Fumdicad", role: "Conselho Municipal", extension: "3941-6393 / 3921-1440" },
      { id: "ext-13", name: "Conselho Tutelar - Centro", role: "Conselho Tutelar", extension: "3921-4525 / 3921-8705 / 3922-2577" },
      { id: "ext-14", name: "Conselho Tutelar - Leste", role: "Conselho Tutelar", extension: "3922-7418" },
      { id: "ext-15", name: "Conselho Tutelar - Sul", role: "Conselho Tutelar", extension: "3934-7005 / 3934-6347" },
      { id: "ext-16", name: "CREAS Centro-Norte", role: "Assistência Social", extension: "3913-2827 / 3913-2829 / 3923-7200 / 3923-7369" },
      { id: "ext-17", name: "CREAS Leste", role: "Assistência Social", extension: "3941-2800 / 3913-1082" },
      { id: "ext-18", name: "CREAS Sul", role: "Assistência Social", extension: "3922-5558 / 3966-2817" },
      { id: "ext-19", name: "CRESSEM", role: "Servidor Municipal", extension: "3904-9555 / 3931-7867 (Satélite)" },
      { id: "ext-20", name: "CSI - Alarme", role: "Ocorrências / Manutenção", tag: "EMERGÊNCIA", extension: "153 / 3908-6784 / 3942-2711" },
      { id: "ext-21", name: "DDM - Delegacia da Mulher", role: "Segurança / Polícia", extension: "3921-2372" },
      { id: "ext-22", name: "Paço Municipal", role: "Prefeitura SJC", extension: "3947-8000" },
      { id: "ext-23", name: "Santander - Agência 3733 (Av Andrômeda 1909)", role: "Agência Bancária", extension: "3932-2402 / 3932-2400" },
      { id: "ext-24", name: "Santander - Agência Paço", role: "Agência Bancária", extension: "3923-5680" },
      { id: "ext-25", name: "Santander - Superlinha", role: "Atendimento Banco", extension: "4004-3535" },
      { id: "ext-26", name: "SASC", role: "Serviço Social", extension: "3909-2655" },
      { id: "ext-27", name: "Vara da Infância e Juventude", role: "Poder Judiciário", extension: "3943-4454" },
      { id: "ext-28", name: "Verocheque", role: "Benefícios", extension: "8007274333" }
    ]
  }
];

export const initialUnitColumns: UnitColumn[] = [
  {
    id: "col-inovacao-especiais",
    title: "INOVAÇÃO & ESPECIAIS",
    sections: [
      {
        id: "sec-inovacao",
        title: "INOVAÇÃO",
        groups: [
          {
            id: "grp-ciem",
            name: "CIEM (Eug. Melo)",
            items: [
              { name: "Débora", role: "Gestora", extension: "3905-1677" },
              { name: "Paulo", role: "Adm", extension: "3905-1222" },
              { name: "Fernanda Torres", role: "AS", extension: "3905-1677" }
            ]
          },
          {
            id: "grp-cin",
            name: "CIN (Norte)",
            items: [
              { name: "Renata", role: "Gestora", extension: "3941-4588" },
              { name: "Paulo", role: "Adm", extension: "3941-3822" },
              { name: "Andrea", role: "AS", extension: "3941-4588" }
            ]
          },
          {
            id: "grp-cis",
            name: "CIS (Sul)",
            items: [
              { name: "Melissa", role: "Gestora", extension: "602" },
              { name: "Marlene", role: "Adm", extension: "573/616" },
              { name: "Seuma", role: "AS", extension: "591" }
            ]
          }
        ]
      },
      {
        id: "sec-especiais",
        title: "ESPECIAIS",
        groups: [
          {
            id: "grp-padaria",
            name: "Padaria-Escola",
            directExtension: "596",
            items: []
          },
          {
            id: "grp-limoeiro",
            name: "Limoeiro (Alcino)",
            directExtension: "522",
            items: []
          },
          {
            id: "grp-cea",
            name: "CEA",
            items: [
              { name: "Celso", role: "Gestor", extension: "569" },
              { name: "Susi", role: "Adm", extension: "569" }
            ]
          },
          {
            id: "grp-cda",
            name: "CDA",
            items: [
              { name: "Flávio", role: "Gestor", extension: "550" },
              { name: "Saymon", role: "Adm", extension: "645/563" },
              { name: "Rubia", role: "AS", extension: "550" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "col-norte-centro-oeste",
    title: "NORTE / CENTRO / OESTE",
    sections: [
      {
        id: "sec-norte-centro-oeste",
        title: "NORTE / CENTRO / OESTE",
        groups: [
          {
            id: "grp-alto-ponte",
            name: "Alto da Ponte",
            items: [
              { name: "Graziela", role: "Gestora", extension: "3911-1020" },
              { name: "Angélica", role: "Adm", extension: "3913-5161" },
              { name: "Patricia Ivo", role: "AS", extension: "3911-1020" }
            ]
          },
          {
            id: "grp-centro",
            name: "Centro",
            items: [
              { name: "Sandra", role: "Gestora", extension: "3921-9165" },
              { name: "Daniele", role: "Adm", extension: "3923-1954" },
              { name: "Maria Glória / Roseli", role: "AS", extension: "3921-9165" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "col-zona-sul",
    title: "ZONA SUL",
    sections: [
      {
        id: "sec-zona-sul",
        title: "ZONA SUL",
        groups: [
          {
            id: "grp-dom-bosco",
            name: "Dom Bosco",
            items: [
              { name: "Ricardo", role: "Gestor", extension: "3966-1203" },
              { name: "Guizella", role: "Adm", extension: "3939-1180" },
              { name: "Rosana / Daniela", role: "AS", extension: "3966-1203" }
            ]
          },
          {
            id: "grp-dom-pedro",
            name: "Dom Pedro I",
            items: [
              { name: "Larimaia", role: "Gestora", extension: "3966-3262" },
              { name: "Claudia", role: "Adm", extension: "3903-5495" },
              { name: "Elizete / Ingrid", role: "AS", extension: "3966-3262" }
            ]
          },
          {
            id: "grp-parque-industrial",
            name: "Parque Industrial",
            items: [
              { name: "Eloisa", role: "Gestora", extension: "507" },
              { name: "Susi", role: "Adm", extension: "598" },
              { name: "Zilda", role: "AS", extension: "507" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "col-leste-sudeste",
    title: "LESTE / SUDESTE",
    sections: [
      {
        id: "sec-leste-sudeste",
        title: "LESTE / SUDESTE",
        groups: [
          {
            id: "grp-campos-sj",
            name: "Campos de S. José",
            items: [
              { name: "Ailton", role: "Gestor", extension: "515" },
              { name: "Andreia Miranda", role: "AS", extension: "515" }
            ]
          },
          {
            id: "grp-leste-tiyoka",
            name: "Leste - Tiyoka",
            directExtension: "3902-7508",
            items: [
              { name: "Friggi", role: "Gestor", extension: "3902-7508" }
            ]
          },
          {
            id: "grp-eugenio-melo",
            name: "Eugênio de Melo",
            items: [
              { name: "Gestor(a)", role: "Gestor", extension: "0000" },
              { name: "Administrativo", role: "Adm", extension: "0000" }
            ]
          }
        ]
      }
    ]
  }
];

export const initialCephasDirectoryCards: DirectoryCard[] = [
  {
    id: "cep-ramais",
    title: "RAMAIS CEPHAS (PABX / Whatsapp)",
    iconName: "Phone",
    category: "outro",
    items: [
      { id: "cm-1", name: "diee.cephas@fundhas.org.br", role: "E-mail DIEE", extension: "3933-5022" },
      { id: "cm-2", name: "cephassecretaria@fundhas.org.br", role: "E-mail Secretaria", extension: "3933-9898" },
      { id: "cm-3", name: "pedagogico.cephas@fundhas.org.br", role: "E-mail Pedagógico", extension: "3933-9918" },
      { id: "cm-4", name: "cephas.carreiras@fundhas.org.br", role: "E-mail Carreiras", extension: "3934-1135" },
      { id: "cm-5", name: "ead.cephas@fundhas.org.br", role: "E-mail EAD", extension: "3934-1995" },
      { id: "cm-6", name: "assessoriapedagogica@fundhas.org.br", role: "E-mail Ass. Pedagógica", extension: "3933-9771" }
    ]
  },
  {
    id: "cep-direcao",
    title: "DIREÇÃO - OPÇÃO 6",
    iconName: "Building2",
    category: "directoria",
    items: [
      { id: "cd-1", name: "Suzana", role: "DIRETORA", tag: "DIRETORA", extension: "207" },
      { id: "cd-2", name: "Fátima Correa", role: "Supervisora", extension: "208" },
      { id: "cd-3", name: "Adriana / Patricia Damiani", role: "Coordenação", extension: "209" },
      { id: "cd-4", name: "David", role: "Coordenação Compras", extension: "212" },
      { id: "cd-5", name: "Juliana", role: "Compras", extension: "212" },
      { id: "cd-6", name: "Marcelo", role: "BI", extension: "216" }
    ]
  },
  {
    id: "cep-administrativo",
    title: "ADMINISTRATIVO - OPÇÃO 5",
    iconName: "Users",
    category: "directoria",
    items: [
      { id: "ca-1", name: "Carlos", role: "CHEFE MANUTENÇÃO", extension: "210" },
      { id: "ca-2", name: "Gilberto / João das Merces", role: "Almoxarifado", extension: "222" },
      { id: "ca-3", name: "Ronaldo / João Pedro / Gustavo", role: "Informática", extension: "224" }
    ]
  },
  {
    id: "cep-diee",
    title: "DIEE",
    iconName: "GraduationCap",
    category: "directoria",
    items: [
      { id: "cei-1", name: "Demétrius", role: "CHEFE DIEE", tag: "CHEFE", extension: "208" },
      { id: "cei-2", name: "Rosângela", role: "Assessor(a)", extension: "226" },
      { id: "cei-3", name: "Rogério / Ingrid", role: "Psicólogos", extension: "202" },
      { id: "cei-4", name: "Fábio", role: "Gestor / TI", extension: "223" },
      { id: "cei-5", name: "Josiane", role: "OAG Estagio", extension: "230" }
    ]
  },
  {
    id: "cep-aprendiz",
    title: "PROGRAMA APRENDIZ - OPÇÃO 2",
    iconName: "Smile",
    category: "outro",
    items: [
      { id: "cp-1", name: "Yara", role: "Supervisão", extension: "Ramal 503 / 3932-0503" },
      { id: "cp-2", name: "Waldineia / William", role: "Administrativo", extension: "Ramal 503 / 3932-0503" },
      { id: "cp-3", name: "Rogério", role: "Psicologia", extension: "Ramal 524 / 3932-0524" },
      { id: "cp-4", name: "Giovana / Regina / Silvania", role: "Serviço Social", extension: "Ramal 524 / 3932-0524" },
      { id: "cp-5", name: "Cida / Paula", role: "Gestor", extension: "Ramal 565 / 3932-0565" },
      { id: "cp-6", name: "Maria Luiza / Rayane", role: "Aprendiz", extension: "Ramal 565 / 3932-0565" }
    ]
  },
  {
    id: "cep-secretaria",
    title: "SECRETARIA ACADÊMICA - OPÇÃO 1",
    iconName: "Receipt",
    category: "directoria",
    items: [
      { id: "cs-1", name: "Sueli", role: "Secretária Acadêmica", extension: "228" },
      { id: "cs-2", name: "Priscilla", role: "Assessora", extension: "229" },
      { id: "cs-3", name: "Jocilene", role: "Coordenação", extension: "229" },
      { id: "cs-4", name: "Kelly", role: "OAG", extension: "228" }
    ]
  },
  {
    id: "cep-pedagogico",
    title: "DIVISÃO PEDAGÓGICA / EDUCACIONAL - OPÇÃO 4",
    iconName: "FolderHeart",
    category: "directoria",
    items: [
      { id: "cpp-1", name: "CHEFE", role: "Chefe", tag: "CHEFE", extension: "220" },
      { id: "cpp-2", name: "Adriani", role: "Pedagógico", extension: "214" },
      { id: "cpp-3", name: "Cibele", role: "Pedagógico", extension: "226" },
      { id: "cpp-4", name: "Margareth", role: "Pedagógico", extension: "213" },
      { id: "cpp-5", name: "Waldmir", role: "Pedagógico", extension: "213" },
      { id: "cpp-6", name: "Sala dos professores", role: "Pedagógico", extension: "203" }
    ]
  },
  {
    id: "cep-qualifica",
    title: "NFC, QUALIFICA E OUTROS",
    iconName: "Wrench",
    category: "directoria",
    items: [
      { id: "cq-1", name: "Amândio", role: "CHEFE QUALIFICA/VESTIBULINHO/NFC", tag: "CHEFE", extension: "210" },
      { id: "cq-2", name: "Elisangela Salgado", role: "Qualifica / NFC", extension: "205" },
      { id: "cq-3", name: "João Gabriel", role: "Qualifica / NFC", extension: "223" },
      { id: "cq-4", name: "Vitória", role: "Qualifica / NFC", extension: "223" },
      { id: "cq-5", name: "Vera / Silvia", role: "Assessoria Educacional", extension: "217" },
      { id: "cq-6", name: "Ana / Angela", role: "Biblioteca", extension: "227" }
    ]
  },
  {
    id: "cep-carreiras",
    title: "CEPHAS CARREIRAS",
    iconName: "Building2",
    category: "outro",
    items: [
      { id: "cc-1", name: "Marilene", role: "Coordenação", extension: "216" },
      { id: "cc-2", name: "Quitéria", role: "Coordenação", extension: "216" }
    ]
  },
  {
    id: "cep-polos",
    title: "POLOS & DIVERSOS",
    iconName: "Navigation",
    category: "outro",
    items: [
      { id: "cpo-1", name: "POLO SUL", role: "Ramal Geral", extension: "3932-8702" },
      { id: "cpo-2", name: "POLO PARQUE TECNOLÓGICO", role: "Ramal Geral", extension: "3945-1511" },
      { id: "cpo-3", name: "Portaria", role: "Diversos", extension: "231" },
      { id: "cpo-4", name: "Cantina", role: "Diversos", extension: "225" }
    ]
  },
  {
    id: "cep-ligacoes",
    title: "LIGAÇÕES TELEFÔNICAS (INSTRUÇÕES)",
    iconName: "HelpCircle",
    category: "outro",
    items: [
      { id: "cl-1", name: "Iterurbanas (Para Fixo ou móvel)", role: "Disque 015 + código", extension: "015 (Vivo)" },
      { id: "cl-2", name: "Puxar ligação (Captura de chamadas)", role: "Disque do próprio aparelho", extension: "55" },
      { id: "cl-3", name: "Puxar ligação de ramal específico", role: "Disque do próprio aparelho", extension: "# + 5 + ramal" },
      { id: "cl-4", name: "Transferir ligação", role: "Teclado do aparelho", extension: "Flash + ramal" }
    ]
  }
];

