import { MDBBtn } from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import { ContentFood } from "../Components/ContentFood";
import InfoFood from "../Components/InfoFood";
import ModalAdd from "../Components/ModalAdd";
import ModalEditFood from "../Components/ModalEditFood";
import SearchBar from "../Components/SearchBar";
import {
  getFood,
  updateFoodId,
  getFoodId,
  deleteFoodId,
} from "../Services/DataDB";
import { VerifyToken } from "../Services/Login";
import "../Stylesheets/foodpage.css";

export default function Food() {
  const [inputWord, setInputWord] = useState("");
  const [dataIn, setDataIn] = useState([]);
  const [foodSelected, setFoodSelected] = useState();

  const dataFormAdd = [
    { name: "Name", type: "text", req: true, value: "", family:"input" },
    { name: "Protein", type: "number", step: "0.1", req: true, value: "", family:"input" },
    { name: "Carbs", type: "number", step: "0.1", req: true, value: "", family:"input" },
    { name: "Fat", type: "number", step: "0.1", req: true, value: "", family:"input" },
    {
      name: "Reference Quantity",
      type: "number",
      step: "0.1",
      req: true,
      value: "", family:"input"
    },
    { name: "Description", type: "text", value: "", family:"input" }
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

  const clickDiv = async (id) => {
    const getFood = await getFoodId(VerifyToken().myDecodedToken, id);
    setFoodSelected(getFood);
  };

  const sendNewFood = async (e) => {
    e.preventDefault();
    const name = e.target.Name.value;
    const proteinQGr = e.target.Protein.value;
    const carbsQGr = e.target.Carbs.value;
    const fatQGr = e.target.Fat.value;
    const referenceQuantity = e.target.ReferenceQuantity.value;
    const description = e.target.Description.value;
    const res = await fetch("http://localhost:8080/api/addFood", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        proteinQGr,
        carbsQGr,
        fatQGr,
        referenceQuantity,
        description,
      }),
    })
      .then((res) => {
        alert(res.text());
      })
      .catch((error) => console.log(error));
  };

  const delFood = async (id) => {
    await deleteFoodId(id);
    await getData(inputWord);
    setFoodSelected();
  };

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
          messageNoData="No food found"
          clickDiv={clickDiv}
          refresh={() => getData(inputWord)}
          deleteFood={delFood}
          updateDataRel={updateFoodId}
          Button1={ModalEditFood}
          Button2={MDBBtn}
        />
      </div>
      <div className="right--food">
        <ModalAdd tittle='Add Food' fields={dataFormAdd} sendNewData={sendNewFood} />
        <InfoFood food={foodSelected} />
      </div>
    </div>
  );
}
