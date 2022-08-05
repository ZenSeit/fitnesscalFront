import React, { useEffect, useState } from "react";
import "../Stylesheets/userday.css";
import ModalAddFood from "./ModalAddFood";
import { days } from "../Services/GeneralData";
import Select from "./Select";
import { ContentFood } from "./ContentFood";
import {getRelFood} from '../Services/DataDB'
import ModalEdit from "./ModalEdit";
import { MDBBtn } from "mdb-react-ui-kit";

export default function UserDay({ idUser, prote, carbs, fat, foodAvailable }) {
  const [foodDay, setFoodDay] = useState([]);
  const [factsDay, setFactsDay] = useState({
    proteinDay: 0,
    carbsDay: 0,
    fatDay: 0,
  });
  const [daySelected, setDaySelected] = useState(0);

  const styleGoal = {
    backgroundColor: "green",
    color: "white",
    borderRadius: "10px",
  };

  const styleUnderGoal = {
    backgroundColor: "red",
    color: "white",
    borderRadius: "10px",
  };

  useEffect(() => {
    getValue();
  }, []);

  useEffect(() => {
    let prot = 0;
    let carb = 0;
    let fat = 0;
    foodDay.map((fDay) => {
      prot +=
        (fDay.fd.proteinQGr * fDay.quantityuser) / fDay.fd.referenceQuantity;
      carb +=
        (fDay.fd.carbsQGr * fDay.quantityuser) / fDay.fd.referenceQuantity;
      fat += (fDay.fd.fatQGr * fDay.quantityuser) / fDay.fd.referenceQuantity;
    });
    setFactsDay({
      proteinDay: prot,
      carbsDay: carb,
      fatDay: fat,
    });
  }, [foodDay]);

  const getValue = async (e) => {

    const day = e?.target.value ?? 0;

    const data = await fetch(
      "http://localhost:8080/api/getFoodforuser/" + idUser + "?day=" + day,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const json = await data.json();
    setDaySelected(day);
    setFoodDay(json);
  };

  const deleteFood = async (id, day) => {
    const data = await fetch(
      "http://localhost:8080/api/deleteFooduser/" + idUser + "?idRel=" + id,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const res = await data.text();
    alert(res);
    getValue(day);
  };

  const updateDataRel = async (nQ, idrel, day, ufood) => {
    const nQuantity = nQ;
    const formQ = ufood;
    const data = await fetch(
      `http://localhost:8080/api/updateFooduser/${idUser}?idRel=${idrel}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nQuantity,
          formQ,
        }),
      }
    );
    getValue(day);
    return await data.text();
  };

  return (
    <div className="facts--section">
      <div className="facts--day">
        <div className="wrapper--food">
          <Select
            name="day"
            data={days}
            actionSelect={getValue}
            valueSelected={daySelected}
          />
          <ContentFood
            dataFood={foodDay}
            updateDataRel={updateDataRel}
            deleteFood={deleteFood}
            getData={getRelFood}
            Button1={ModalEdit}
            Button2={MDBBtn}
            messageNoData="You don't have food yet"
          />
          <div className="addsection--food">
            <ModalAddFood
              foodAvailable={foodAvailable}
              daySelected={daySelected}
            />
          </div>
        </div>
        <div className="facts--info">
          <h4>{days[daySelected].name}</h4>
          <h4
            style={
              factsDay.proteinDay >= prote * 0.99 ? styleGoal : styleUnderGoal
            }
          >
            Protein:{" "}
          </h4>
          {factsDay.proteinDay}
          <h4
            style={
              factsDay.proteinDay >= carbs * 0.99 ? styleGoal : styleUnderGoal
            }
          >
            Carbs:{" "}
          </h4>
          {factsDay.carbsDay}
          <h4
            style={
              factsDay.proteinDay >= fat * 0.99 ? styleGoal : styleUnderGoal
            }
          >
            Fat:{" "}
          </h4>
          {factsDay.fatDay}
          <h4>Day's Calories</h4>
          {(factsDay.proteinDay + factsDay.carbsDay) * 4 + factsDay.fatDay * 9}
        </div>
      </div>
    </div>
  );
}
