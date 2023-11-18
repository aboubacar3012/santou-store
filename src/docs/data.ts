export interface Options {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
  readonly id?: string;
}

export const cityOptions: readonly Options[] = [
  { value: "marseille", label: "Marseille", color: "#00B8D9", isFixed: true },
  { value: "paris", label: "Paris", color: "#0052CC" },
  { value: "lyon", label: "Lyon", color: "#5243AA" },
  { value: "toulouse", label: "Toulouse", color: "#FF5630", isDisabled: true },
  { value: "nantes", label: "Nantes", color: "#FF8B00" },
  { value: "bordeaux", label: "Bordeaux", color: "#FFC400" },
  { value: "lille", label: "Lille", color: "#36B37E" },
  { value: "rennes", label: "Rennes", color: "#00875A" },
  { value: "reims", label: "Reims", color: "#253858" },
  { value: "le havre", label: "Le Havre", color: "#666666" },
  { value: "saint-etienne", label: "Saint-Étienne", color: "#FF5630" },
  { value: "toulon", label: "Toulon", color: "#FF5630" },
  { value: "grenoble", label: "Grenoble", color: "#FF5630" },
  { value: "dijon", label: "Dijon", color: "#FF5630" },
  { value: "angers", label: "Angers", color: "#FF5630" },
  { value: "nimes", label: "Nîmes", color: "#FF5630" },
  { value: "villeurbanne", label: "Villeurbanne", color: "#FF5630" },
  { value: "le mans", label: "Le Mans", color: "#FF5630" },
  { value: "aix-en-provence", label: "Aix-en-Provence", color: "#FF5630" },
  { value: "clermont-ferrand", label: "Clermont-Ferrand", color: "#FF5630" },
  { value: "brest", label: "Brest", color: "#FF5630" },
  { value: "limoges", label: "Limoges", color: "#FF5630" },
];

export const vendorOptions: readonly Options[] = [
  {
    value: "kadimarket",
    label: "Kadi Market",
    color: "#00B8D9",
    isFixed: true,
    id: "243497hfdf97439323729323",
  },
  {
    value: "afrograille",
    label: "Afro Graille",
    color: "#0052CC",
    id: "2434974397dfg9323729323",
  },
  {
    value: "afroshop",
    label: "Afro Shop",
    color: "#5243AA",
    id: "2434974dfe7439323729jk3",
  },
  {
    value: "abou&frere",
    label: "Abou & Frère",
    color: "#FFdd30",
    id: "243cfe74397439323729jk3",
  },
  {
    value: "mamediarra",
    label: "Mame Diarra",
    color: "#2402CA",
    id: "243uiuire397439323729jk3",
  },
  {
    value: "mamaafrica",
    label: "Mama Africa",
    color: "#FF9830",
    id: "2434974397439323729jk3",
  },
];
