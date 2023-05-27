import React from 'react'
const allClasses = [
    "All",
    "Assault",
    "Defender",
    "Support",
    "Medic",
    "Witch",
    "Captain",
  ];

function Filter({selectedCategory, onFilterChange, selectedSort, onSortChange}) {
  return (
    <div className='filter-container'>
      <div className='filter'>
        <h2>Filter Bots by Class</h2>
        <select value={selectedCategory} onChange={(event)=>onFilterChange(event)}>
    {allClasses.map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ))}

  </select>
  </div>
  <div className='sort' >
        <h2>Sort by Health, Damage or Armor</h2>
        <select value={selectedSort} onChange={(e)=>onSortChange(e)}>
            <option value="All">All</option>
            <option value="Health">Health</option>
            <option value="Damage">Damage</option>
            <option value="Armor">Armor</option>
        </select>
    </div>

  </div>
    
  )
}

export default Filter