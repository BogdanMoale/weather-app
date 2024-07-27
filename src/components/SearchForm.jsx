"use client";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

const SearchForm = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() === "") return;
    onSearch(city);
    setCity("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl"
    >
      <input
        onChange={(e) => setCity(e.target.value)}
        value={city}
        className="bg-transparent border-none text-white focus:outline-none text-2xl"
        type="text"
        placeholder="Search city"
      />
      <button type="submit">
        <BsSearch size={20} />
      </button>
    </form>
  );
};

export default SearchForm;
