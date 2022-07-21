import React,{ useEffect,useState } from "react";
import Food from "./Food";

export default function UserDay({idUser}) {

  const [foodDay,setFoodDay]=useState([])

  const days = [{ day: "Monday", cod: 0 },
  { day: "Tuesday", cod: 1 },
  { day: "Wednesday", cod: 2 },
  { day: "Thursday", cod: 3 },
  { day: "Friday", cod: 4 },
  { day: "Saturday", cod: 5 },
  { day: "Sunday", cod: 6 }];

  useEffect(() => {
    getValue()
  }, []);


  const getValue =async (e) => {

    const day = e ?? 0

    const data = await fetch(
        "http://localhost:8080/api/getFoodforuser/" +idUser+"?day="+day,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
  
      const json = await data.json();
      setFoodDay(json)
  }


  const deleteFood = async (id,day) => {
    const data = await fetch(
      "http://localhost:8080/api/deleteFooduser/" +idUser+"?idRel="+id,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const res=await data.text()
    alert(res)
    getValue(day)
  }

  const fDay=foodDay.map(fDay => {
    return <Food 
    key={fDay.id} 
    id={fDay.id} 
    name={fDay.fd.name} 
    quantity={fDay.formQuantity ? `${fDay.quantityuser} units` : `${fDay.quantityuser} g`} 
    description={fDay.fd.description} 
    day={fDay.day}
    delButton={deleteFood}
    />})

  return (
    <div>
      <select name="Day" onChange={(e) => getValue(e.target.value)}>
        {days.map((day) => {
          return <option key={day.cod} value={day.cod}>{day.day}</option>;
        })}
      </select>
      {fDay.length===0 ? <h4>There's not food for this day</h4>:fDay}    
    </div>
  );
}
