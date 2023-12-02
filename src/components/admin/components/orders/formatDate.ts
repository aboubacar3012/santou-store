function formatFrenchDate(dateString: Date | string) {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };

  const formattedDate = date.toLocaleString('fr-FR', options);

  // Vérifie si la date est aujourd'hui
  const today = new Date();
  if (date.toDateString() === today.toDateString()) {
    return `Aujourd'hui à ${formattedDate}`;
  }

  // Vérifie si la date est demain
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  if (date.toDateString() === tomorrow.toDateString()) {
    return `Demain à ${formattedDate}`;
  }

  // Vérifie si la date est après-demain
  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(today.getDate() + 2);
  if (date.toDateString() === dayAfterTomorrow.toDateString()) {
    return `Après-demain à ${formattedDate}`;
  }

  // Si la date n'est ni aujourd'hui, ni demain, ni après-demain
  return `Le ${formattedDate}`;
}

export default formatFrenchDate;
