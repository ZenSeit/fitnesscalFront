import { MDBBtn } from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import { ContentFood } from "../Components/ContentFood";
import ModalAdd from "../Components/ModalAdd";
import ModalEdit from "../Components/ModalEdit";
import SearchBar from "../Components/SearchBar";
import { getFood } from "../Services/DataDB";
import "../Stylesheets/foodpage.css";

export default function Food() {
  const [inputWord, setInputWord] = useState("");
  const [dataIn, setDataIn] = useState([]);

  const dataFormAdd = [
    { name: "Name", type: "text", req:true, value:''},
    { name: "Protein", type: "number", step:"0.1", req:true, value:'' },
    { name: "Carbs", type: "number", step:"0.1", req:true, value:'' },
    { name: "Fat", type: "number", step:"0.1", req:true, value:'' },
    { name: "Reference Quantity", type: "number", step:"0.1", req:true, value:'' },
    { name: "Description", type: "text", value:'' },
  ];

  useEffect(() => {
    getData(inputWord);
  }, [inputWord]);

  const getData = async (word) => {
    const data = await getFood();
    setDataIn(
      data.filter((dat) => dat.name.toLowerCase().includes(word.toLowerCase()))
    );
  };

  const clickDiv = (id) => {
    console.log("clicking" + id);
  };

  const sendNewFood = async (e) =>{
    e.preventDefault()
    const name=e.target.Name.value
    const proteinQGr=e.target.Protein.value
    const carbsQGr=e.target.Carbs.value
    const fatQGr=e.target.Fat.value
    const referenceQuantity=e.target.ReferenceQuantity.value
    const description=e.target.Description.value
    const res = await fetch("http://localhost:8080/api/addFood", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name,
      proteinQGr,
      carbsQGr,
      fatQGr,
      referenceQuantity,
      description }),
  }).then(res=> {
    alert(res.text())
  }).catch((error) => console.log(error));
  }

  return (
    <div className="Main--food">
      <div className="left--food">
        <div className="search--food">
          <SearchBar
            dataFrom={getFood}
            setInputWord={setInputWord}
            inputWord={inputWord}
            filterdiv={false}
            placeholder="Search Food..."
          />
        </div>

        <ContentFood
          dataFood={dataIn}
          messageNoData="No food founded"
          clickDiv={clickDiv}
          Button1={ModalEdit}
          Button2={MDBBtn}
        />
      </div>
      <div className="right--food">
        <ModalAdd fields={dataFormAdd} sendNewFood={sendNewFood} />
      </div>
    </div>
  );
}
