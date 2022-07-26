import React from "react";
import "../Stylesheets/food.css";
import ModalEdit from "./ModalEdit";
import { MDBBtn,MDBIcon } from "mdb-react-ui-kit";

export default function Food({ id, name, quantity, day, description, updateFood, delButton }) {

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
        <ModalEdit id={id} updateFood={updateFood} day={day} />
        <MDBBtn onClick={()=>delButton(id,day)} className="del--food" ><MDBIcon fas icon="times" /></MDBBtn>
        </div>
        
      </div>
    </div>
  );
}
