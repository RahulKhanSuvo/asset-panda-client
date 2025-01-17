import React, { useState } from "react";

const MyAssets = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState(""); // "available" or "out-of-stock"
  const [assetTypeFilter, setAssetTypeFilter] = useState(""); // "returnable" or "non-returnable"

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAvailabilityFilter = (event) => {
    setAvailabilityFilter(event.target.value);
  };

  const handleAssetTypeFilter = (event) => {
    setAssetTypeFilter(event.target.value);
  };

  return (
    <div className="p-4">
      {/* Search Section */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search items by name"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Filter Section */}
      <div className="flex gap-4 mb-4">
        {/* Availability Filter */}
        <select
          value={availabilityFilter}
          onChange={handleAvailabilityFilter}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Filter by Availability</option>
          <option value="available">Available</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>

        {/* Asset Type Filter */}
        <select
          value={assetTypeFilter}
          onChange={handleAssetTypeFilter}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Filter by Asset Type</option>
          <option value="returnable">Returnable</option>
          <option value="non-returnable">Non-Returnable</option>
        </select>
      </div>

      {/* Assets List */}
      <div>
        <p>
          Showing results for <strong>"{searchQuery}"</strong>{" "}
          {availabilityFilter && `| Availability: ${availabilityFilter}`}{" "}
          {assetTypeFilter && `| Asset Type: ${assetTypeFilter}`}
        </p>
        {/* Render filtered assets here */}
      </div>
    </div>
  );
};

export default MyAssets;
