export const sharePage = async (title:string, text:string, url:string) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: title || document.title,
        text: text || 'Regardez cette page intéressante !',
        url: url || window.location.href,
      });
      alert('Partage réussi !');
    } catch (error) {
      alert('Erreur lors du partage : ');
    }
  } else {
    alert('La fonction de partage n\'est pas prise en charge.');
  }
};