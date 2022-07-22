import React, { useEffect, useState } from "react";
import Food from "./Food";
import "../Stylesheets/userday.css";

export default function UserDay({ idUser, prote, carbs, fat }) {
  const [foodDay, setFoodDay] = useState([]);
  const [factsDay, setFactsDay] = useState({
    proteinDay: 0,
    carbsDay: 0,
    fatDay: 0,
  });

  const styleGoal = {
    backgroundColor: 'green',
    color: 'white',
    borderRadius: '10px'
  }

  const styleUnderGoal = {
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '10px'
  }

  const days = [
    { day: "Monday", cod: 0 },
    { day: "Tuesday", cod: 1 },
    { day: "Wednesday", cod: 2 },
    { day: "Thursday", cod: 3 },
    { day: "Friday", cod: 4 },
    { day: "Saturday", cod: 5 },
    { day: "Sunday", cod: 6 },
  ];

  useEffect(() => {
    getValue();
  }, []);

  useEffect(() => {
    let prot = 0;
    let carb = 0;
    let fat = 0;
    foodDay.map((fDay) => {
      prot += fDay.fd.proteinQGr*fDay.quantityuser/fDay.fd.referenceQuantity;
      carb += fDay.fd.carbsQGr*fDay.quantityuser/fDay.fd.referenceQuantity;
      fat += fDay.fd.fatQGr*fDay.quantityuser/fDay.fd.referenceQuantity;
    });
    setFactsDay({
      proteinDay: prot,
      carbsDay: carb,
      fatDay: fat,
    });
  }, [foodDay]);

  const getValue = async (e) => {
    const day = e ?? 0;

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

  const fDay = foodDay.map((fDay) => {
    return (
      <Food
        key={fDay.id}
        id={fDay.id}
        name={fDay.fd.name}
        quantity={
          fDay.formQuantity
            ? `${fDay.quantityuser} units`
            : `${fDay.quantityuser} g`
        }
        description={fDay.fd.description}
        day={fDay.day}
        delButton={deleteFood}
      />
    );
  });

  return (
    <div className="facts--section">
      <select name="Day" onChange={(e) => getValue(e.target.value)}>
        {days.map((day) => {
          return (
            <option key={day.cod} value={day.cod}>
              {day.day}
            </option>
          );
        })}
      </select>
      <div className="facts--day">
        <div className="facts--food">
          {fDay.length === 0 ? <h4>There's not food for this day</h4> : fDay}
        </div>
        <div className="facts--info">
          <h4 style={factsDay.proteinDay>=prote*0.99 ? styleGoal:styleUnderGoal} >Protein: </h4>
          {factsDay.proteinDay}
          <h4 style={factsDay.proteinDay>=carbs*0.99 ? styleGoal:styleUnderGoal} >Carbs: </h4>
          {factsDay.carbsDay}
          <h4 style={factsDay.proteinDay>=fat*0.99 ? styleGoal:styleUnderGoal} >Fat: </h4>
          {factsDay.fatDay}
          <h4>Day's Calories</h4>
          {(factsDay.proteinDay+factsDay.carbsDay)*4+factsDay.fatDay*9}
        </div>
      </div>
    </div>
  );
}
