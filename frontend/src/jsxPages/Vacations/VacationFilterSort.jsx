import { useEffect } from "react";
import "../css/VacationFilterSort.css";

const sortOptions = [
  { value: "price", label: "מחיר" },
  { value: "date", label: "תאריך" },
];
const searchOptions = [
  { value: "country_name", label: "מדינה" },
  { value: "continent_name", label: "יבשת" },
  { value: "name", label: "שם חבילה" },
];

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

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((pkg) => {
        const field = pkg[searchBy];
        return String(field ?? "")
          .toLowerCase()
          .includes(query);
      });
    }

    switch (sortBy) {
      case "price":
        filtered.sort(
          (a, b) => Number(a.adult_price) - Number(b.adult_price)
        );
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
    <div className="filter-sort-panel">
      <div className="filter-sort-toolbar">
        <div className="toolbar-block search-block">
          <span className="toolbar-block-label">חיפוש</span>
          <input
            id="package-search"
            type="text"
            placeholder="מדינה, יבשת או שם..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <label className="toolbar-field-label" htmlFor="package-search-by">
            לפי
          </label>
          <select
            id="package-search-by"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
          >
            {searchOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <span className="toolbar-separator" aria-hidden="true" />

        <div className="toolbar-block sort-block">
          <span className="toolbar-block-label">מיון</span>
          <label className="toolbar-field-label" htmlFor="package-sort-by">
            לפי
          </label>
          <select
            id="package-sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default VacationFilterSort;
