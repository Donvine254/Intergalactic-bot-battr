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

function Filter({selectedCategory, onFilterChange}) {
  return (
        <select value={selectedCategory} onChange={(event)=>onFilterChange(event)}>
    {allClasses.map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ))}
  </select>
    
  )
}

export default Filter