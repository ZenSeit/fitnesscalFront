import React from "react";
import "../Stylesheets/food.css";
import ModalEdit from "./ModalEdit";
import { MDBBtn,MDBIcon } from "mdb-react-ui-kit";

export default function Food({ id, name, quantity, day, description, updateFood, delButton, clickDiv,getData,Button1,Button2,refresh}) {

  const But1 = Button1
  const But2 = Button2

  return (
    <div className="food--container" onClick={()=>clickDiv(id)}>
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
        <But1 id={id} getData={getData} updateFood={updateFood} day={day} refresh={refresh} />
        <But2 onClick={()=>delButton(id,day)} className="del--food"><MDBIcon fas icon="times" /></But2>
        </div>
        
      </div>
    </div>
  );
}
