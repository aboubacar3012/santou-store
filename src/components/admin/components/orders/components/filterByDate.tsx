import React, { useState, useEffect } from 'react';

const DateFilterComponent = () => {
  const [items, setItems] = useState([]); // Votre liste d'objets à filtrer
  const [filteredItems, setFilteredItems] = useState([]); // Éléments filtrés
  const [selectedDate, setSelectedDate] = useState('thisWeek'); // Date sélectionnée : thisWeek, lastWeek, specificDate
  const [customDate, setCustomDate] = useState('');



  const filterByDate = (date: string) => {
    const currentDate = new Date();
    const sevenDaysAgo = new Date(currentDate);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7); // Date d'il y a 7 jours

    console.log('sevenDaysAgo', sevenDaysAgo);
    console.log('currentDate', currentDate);
    console.log('customDate', customDate);

    if (date === 'thisWeek') {
      const thisWeekItems = items.filter((item:any) => new Date(item.createdAt) > sevenDaysAgo);
      setFilteredItems(thisWeekItems);
    } else if (date === 'lastWeek') {
      const lastWeekItems = items.filter((item:any) => {
        const itemDate = new Date(item.createdAt);
        return itemDate < sevenDaysAgo && itemDate > new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);
      });
      setFilteredItems(lastWeekItems);
    } else if (date === 'specificDate') {
      const specificDateItems = items.filter((item:any) => {
        // Convertir la date de l'objet au format Date
        const itemDate = new Date(item.createdAt);

        // Convertir la date personnalisée au format Date
        const selectedCustomDate = new Date(customDate);

        // Comparer les dates
        return itemDate.toDateString() === selectedCustomDate.toDateString();
      });
      setFilteredItems(specificDateItems);
    }
  };

  useEffect(() => {
    // Appel à votre API ou logique pour obtenir les objets avec les propriétés createdAt
    // Ici, je simule des données pour l'exemple
    const mockItems:any = [
      { id: 1, createdAt: "2023-11-27T21:02:02.508Z" },
      { id: 2, createdAt: "2023-11-30T21:02:02.508Z" },
    ];
    setItems(mockItems);

    // Filtrer les objets en fonction de la date sélectionnée
    filterByDate(selectedDate);
  }, [selectedDate, ]); // La fonction de filtrage sera exécutée à chaque changement de la date sélectionnée

  return (
    <div className="container mx-auto p-4">
      <p className="mb-4 font-bold text-center">
        Filtrer les commandes par date
        </p>
      <div className="flex items-center space-x-4 justify-between">
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded ${selectedDate === 'thisWeek' ? 'bg-blue-700' : ''}`}
          onClick={() => setSelectedDate('thisWeek')}
        >
          Cette semaine
        </button>
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded ${selectedDate === 'lastWeek' ? 'bg-blue-700' : ''}`}
          onClick={() => setSelectedDate('lastWeek')}
        >
          Semaine dernière
        </button>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div> 
        <label className="block">Sélectionner une date spécifique :</label>
        <input
          type="date"
          className="border p-2 rounded w-full"
          value={customDate}
          onChange={(e) => setCustomDate(e.target.value)}
        />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2.5 rounded"
          onClick={() => setSelectedDate('specificDate')}
        >
          Valider
        </button>
      </div>
    </div>
  );
};

export default DateFilterComponent;
