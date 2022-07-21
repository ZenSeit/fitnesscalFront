import React from "react";
import "../Stylesheets/food.css";

export default function Food({ id, name, quantity, day, description, delButton }) {

  return (
    <div className="food--container">
      <div className="food--mainInfo">
        <h5>{name}</h5>
        <img className="food--img" src={require("../Images/foodins.png")} />
      </div>
      <div className="food--info">
        <div className="food--description">
          <h6>{quantity}</h6>
          <h6>{description}</h6>
        </div>
        <div>
        <button onClick={()=> console.log(id)}>edit</button>
        <button onClick={()=>delButton(id,day)}>del</button>
        </div>
        
      </div>
    </div>
  );
}
