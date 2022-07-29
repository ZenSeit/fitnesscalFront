import React, { useState, useEffect } from "react";
import "../Stylesheets/searchbar.css";

export default function SearchBar({
  placeholder,
  dataFrom,
  onClickSelected,
  inputWord,
  setInputWord,
  stateModal,
  filterdiv
}) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setFilteredData([]);
  }, [stateModal]);

  const getData = async () => {
    const dat = await dataFrom();
    setData(dat);
  };

  const handleChange = (e) => {
    const searchedWord = e.target.value;
    setInputWord(e.target.value);
    if (searchedWord !== "") {
      const newData = data.filter((dat) =>
        dat.name.toLowerCase().includes(searchedWord.toLowerCase())
      );
      newData.length === 0
        ? setFilteredData([{ id:'0', name: "We dont have this food yet. Add now!" }])
        : setFilteredData(newData);
    } else {
      setFilteredData([]);
    }
  };

  const selectFood = (f) => {
    if (f.referenceQuantity) {
      onClickSelected(f);
      setFilteredData([]);
      setInputWord("");
    }
  };

  return (
    <div className="container--search">
      <div className="bar--search">
        <input
          placeholder={placeholder}
          value={inputWord}
          onChange={handleChange}
          type="text"
        />
      </div>
      {filterdiv && <div className="data--search">
        {filteredData.map((food) => {
          return (
            <div
              key={food.id}
              onClick={() => {
                selectFood(food);
              }}
              className="item--search"
            >
              {food.name}
            </div>
          );
        })}
      </div>}
      
    </div>
  );
}
