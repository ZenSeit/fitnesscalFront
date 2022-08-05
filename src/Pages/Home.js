import React, { useState,useEffect } from "react";
import { HomeUser } from "../Components/HomeUser";
import { VerifyToken } from "../Services/Login";
import { useNavigate } from "react-router-dom";
import UserDay from "../Components/UserDay";

export default function Home() {

    let history = useNavigate();
    
    const [macros, setMacros] = useState({
        carbs: 40,
        fat: 30,
        prot: 30,
      });

      const [user, setUser] = useState(null);

    useEffect(() => {
      if (VerifyToken().myDecodedToken) {
        getData();
      } else {
        history("/");
      }
    }, []);

    useEffect(() => {
        macrosGoal();
      }, [user]);

  const getData = async () => { 

    const data = await fetch(
      "http://localhost:8080/api/getUser/" + VerifyToken().myDecodedToken,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );

    const json = await data.json();
    const res = await json[0];
    setUser(res);
  };

  const getFood = async () => {
    const data = await fetch("http://localhost:8080/api/getFood/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const json = await data.json();
    return await json;
  };

  const macrosGoal = () => {
    switch (user?.fitnessGoal) {
      case 1:
        setMacros({
          carbs: 50,
          fat: 20,
          prot: 30,
        });
        break;

      case 2:
        setMacros({
          carbs: 20,
          fat: 40,
          prot: 40,
        });
        break;

      default:
        setMacros({
          carbs: 40,
          fat: 30,
          prot: 30,
        });
        break;
    }
  };

  const calculateCalories = (calories, percentage) => {
    return Math.round(calories * percentage * 0.01);
  };

  return (
    <>
    <HomeUser user={user} macros={macros} calculateCalories={calculateCalories} getUser={getData} />
    <UserDay
      idUser={VerifyToken().myDecodedToken}
      prote={calculateCalories(user?.caloriesGoal, macros.prot) / 4}
      carbs={calculateCalories(user?.caloriesGoal, macros.carbs) / 4}
      fat={calculateCalories(user?.caloriesGoal, macros.fat) / 9}
      foodAvailable={getFood}
    />
    </>
  );
}
