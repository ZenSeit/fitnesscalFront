import React, { useEffect, useState } from "react";
import { VerifyToken } from "../Services/Login";
import { useNavigate } from "react-router-dom";
import defaultImage from "../Images/userDefault.png";
import "../Stylesheets/homeuser.css";
import UserDay from "./UserDay";

export function HomeUser() {
  const [user, setUser] = useState(null);
  const [macros, setMacros] = useState({
    carbs: 40,
    fat: 30,
    prot: 30,
  });

  const getData = async () => {
    const data = await fetch(
      "http://localhost:8080/api/getUser/" + VerifyToken().myDecodedToken,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const json = await data.json();
    const res = await json[0];
    setUser(res);
  };

  let history = useNavigate();

  useEffect(() => {
    macrosGoal();
  }, [user]);

  useEffect(() => {
    if (VerifyToken().myDecodedToken) {
      getData();
    } else {
      history("/");
    }
  }, []);

  const userActivity = () => {
    switch (user.activityDay) {
      case 1:
        return "couch potato";
      case 2:
        return "1 or 2 times per week";
      case 3:
        return "3 or 4 times per week, not bad";
      case 4:
        return "4 or 5 times per week, awesome";
      case 5:
        return "6 or 7 times per week, insane but rest is important too";
    }
  };

  const userGoal = () => {
    switch (user.fitnessGoal) {
      case 1:
        return "Bulking";

      case 2:
        return "Cutting";

      default:
        return "Maintenance";
    }
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

  const StylePie = {
    backgroundImage: `conic-gradient(
      #E35F32 0 ${3.6 * macros.fat}deg, 
      #46ABDB 0 ${3.6 * (macros.fat + macros.carbs)}deg, 
      #505679 0
      )`,
    borderRadius: `50%`,
    display: `block`,
    width: `300px`,
    height: `300px`,
  };

  const calculateCalories = (calories, percentage) => {
    return Math.round(calories * percentage * 0.01);
  };

  return (
    <>
    <div className="Info">
      <div className="info--container">
        <div className="info--text">
          <div className="user--info1">
            <img
              src={user?.profilePhoto || defaultImage}
              className="avatar--user"
            />
            {user && (
              <h1>Bienvenido {user.nickname || `usuario ${user.id}`}!</h1>
            )}
          </div>
          {user && (
            <>
              <div className="user--info2">
                <h3>Name: {user.name}</h3>
                <h3>Lastname: {user.lastname}</h3>
                <h4>Age: {user.age} years</h4>
                <h4>weight: {user.weight} Kg</h4>
                <h4>height: {user.height} cm</h4>
                <h4>Country: {user.country}</h4>
              </div>
              <div className="user--info3">
                <h4>
                  Gender:
                  {user.gender
                    ? "Male"
                    : user.gender == 2
                    ? "Female"
                    : "No one"}
                </h4>
                <h4>Activity per Day: {userActivity()} </h4>
                <h4>Fitness Goal: {userGoal()} </h4>
              </div>
            </>
          )}
        </div>
        <div className="pie--container">
          {user && (
            <>
              <h3>Calories Goal/Day : {Math.round(user.caloriesGoal)}</h3>
              <div style={StylePie}>
                <div className="pie--contentup">
                  <div>
                    Protein:
                    {calculateCalories(user?.caloriesGoal, macros.prot)}
                  </div>
                  <div>
                    Fat: {calculateCalories(user?.caloriesGoal, macros.fat)}
                  </div>
                </div>
                <div className="pie--contentdown">
                  Carbs: {calculateCalories(user?.caloriesGoal, macros.carbs)}
                </div>
                <div className="pie--stats">
                  <h5>
                    Protein :
                    {`${
                      calculateCalories(user?.caloriesGoal, macros.prot) / 4
                    } g`}
                  </h5>
                  <h5>
                    Fat :
                    {`${
                      calculateCalories(user?.caloriesGoal, macros.fat) / 9
                    } g`}
                  </h5>
                  <h5>
                    Carbs :
                    {`${
                      calculateCalories(user?.caloriesGoal, macros.carbs) / 4
                    } g`}
                  </h5>
                </div>
              </div>
            </>
          )}
        </div>
        
      </div>
      <UserDay idUser={VerifyToken().myDecodedToken} />
      </div>
    </>
  );
}
