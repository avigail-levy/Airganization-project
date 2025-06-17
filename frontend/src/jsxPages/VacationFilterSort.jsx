import { useState, useEffect } from "react";

const sortOptions = ["price", "date"];
const searchOptions = ["country", "continent", "name"];

const VacationFilterSort = ({
  allPackages,
  setFilteredPackages,
  searchQuery,
  setSearchQuery,
  searchBy,
  setSearchBy,
  sortBy,
  setSortBy,
}) => {
  useEffect(() => {
    let filtered = [...allPackages];

    // סינון
    if (searchQuery) {
      filtered = filtered.filter((pkg) => {
        const field = pkg[searchBy];
        return field?.toLowerCase?.().includes(searchQuery.toLowerCase());
      });
    }

    // מיון
    switch (sortBy) {
      case "price":
        filtered.sort((a, b) => a.adult_price - b.adult_price);
        break;
      case "date":
        filtered.sort(
          (a, b) => new Date(a.start_date) - new Date(b.start_date)
        );
        break;
      default:
        break;
    }

    setFilteredPackages(filtered);
  }, [allPackages, searchQuery, searchBy, sortBy]);

  return (
    <div className="filter-sort-container">
      <input
        type="text"
        placeholder="חפש חבילה..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <label>חפש לפי:</label>
      <select
        value={searchBy}
        onChange={(e) => setSearchBy(e.target.value)}
      >
        {searchOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <label>מיין לפי:</label>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        {sortOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VacationFilterSort;
