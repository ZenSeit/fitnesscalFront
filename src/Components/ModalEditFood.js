import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import { VerifyToken } from "../Services/Login";
import { getFoodId } from "../Services/DataDB";
import "../Stylesheets/modaleditfood.css";

export default function ModalEditFood({ id, updateFood, refresh}) {
  const idus = VerifyToken().myDecodedToken;
  const [editFood, setEditFood] = useState(false);
  const [dataFood, setDataFood] = useState({proteinQGr:0,carbsQGr:0,fatQGr:0});

  const toggleShow = async () => {
    const res = await getFoodId(idus, id);
    setDataFood(res);
    setEditFood(!editFood);
  };

  const handleChange = (e) => {
    setDataFood({
      ...dataFood,
      [e.target.id]: e.target.value,
    });
  };

  const sendData = async (e) => {
    e.preventDefault()
    const res=await updateFood(dataFood)
    alert(res)
    refresh()
  }

  return (
    <>
      <MDBBtn onClick={toggleShow} className="edit--btn">
        <MDBIcon fas icon="marker" size="lg" />
      </MDBBtn>
      <MDBModal show={editFood} setShow={setEditFood} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent className="Container--modal">
            <MDBModalHeader>
              <MDBModalTitle>{dataFood.name}</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setEditFood(!editFood)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form onSubmit={sendData}>
                <MDBInput
                  className="input--form"
                  key={1}
                  label="Protein g"
                  id="proteinQGr"
                  type="number"
                  step="0.1"
                  value={dataFood.proteinQGr}
                  required={true}
                  onChange={handleChange}
                />
                <MDBInput
                  className="input--form"
                  key={2}
                  label="Carbs g"
                  id="carbsQGr"
                  type="number"
                  step="0.1"
                  value={dataFood.carbsQGr}
                  required={true}
                  onChange={handleChange}
                />
                <MDBInput
                  className="input--form"
                  key={3}
                  label="Fat g"
                  id="fatQGr"
                  type="number"
                  step="0.1"
                  value={dataFood.fatQGr}
                  required={true}
                  onChange={handleChange}
                />
                <MDBInput
                  className="input--form"
                  key={4}
                  label="Reference Quantity"
                  id="referenceQuantity"
                  type="number"
                  step="1"
                  value={dataFood.referenceQuantity}
                  required={true}
                  onChange={handleChange}
                />
                <MDBInput
                  className="input--form"
                  key={5}
                  label="Description"
                  id="description"
                  type="text"
                  value={dataFood.description}
                  required={true}
                  onChange={handleChange}
                />
                <MDBBtn>Save changes</MDBBtn>
              </form>
            </MDBModalBody>

            <MDBModalFooter></MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
