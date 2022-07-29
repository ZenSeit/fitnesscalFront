import React from "react";
import { MDBBtn } from "mdb-react-ui-kit";

export default function Button({name, color, action}) {
  return (
    <MDBBtn rounded className="mx-2" color={color} onClick={action}>
      {name}
    </MDBBtn>
  );
}
