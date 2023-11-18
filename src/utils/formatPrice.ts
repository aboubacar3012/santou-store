export function formatPrice(prix:number) {
  const prixEnEuros = prix / 100; // Convertir le prix en euros

  // Vérifier s'il s'agit d'un entier
  if (Number.isInteger(prixEnEuros)) {
    return `${prixEnEuros.toFixed(0)} €`; // Si c'est un entier, pas de décimales
  } else {
    return `${prixEnEuros.toFixed(2)} €`; // Sinon, deux décimales
  }
}