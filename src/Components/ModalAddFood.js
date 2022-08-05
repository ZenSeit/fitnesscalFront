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
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import SearchBar from "./SearchBar";
import Select from "./Select";
import { days,unitMeasurent } from "../Services/GeneralData";
import { VerifyToken } from "../Services/Login";
import '../Stylesheets/modaladdfood.css'

export default function ModalAddFood({ foodAvailable, daySelected }) {
  const [modalAdd, setModalAdd] = useState(false);

  const [foodSelected, setFoodSelected] = useState();

  const [inputWord, setInputWord] = useState("");

  const [qAdd,setQadd] = useState(1)

  const [foodDay,setFoodDay]=useState(0)

  const [unitMeasu,setUnitMeasu]=useState(0)

  const toggleShow = () => {
    setFoodSelected();
    setInputWord("");
    setQadd(1)
    setFoodDay(0)
    setUnitMeasu(0)
    setModalAdd(!modalAdd);
  };

  const stFoodDay =(e)=>{
    setFoodDay(e.target.value)
  }

  const stUnitMeasu =(e)=>{
    setFoodDay(e.target.value)
  }

  const clickedFilter = (data) => {
    setFoodSelected(data);
    setQadd(1)
    setFoodDay(0)
    setUnitMeasu(0)
  };

  const sendFoodAdd =async (e) =>{
    e.preventDefault()
  const res = await fetch("http://localhost:8080/api/addFooduser/"+VerifyToken().myDecodedToken, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      { 
        idFood:foodSelected.id,
        qFood:qAdd,
        day: foodDay,
        formQ: unitMeasu
      }
      ),
  })
  alert(await res.text())
  toggleShow()
  }

  return (
    <>
      <MDBBtn onClick={toggleShow}>
        <MDBIcon fas icon="plus" />
      </MDBBtn>
      <MDBModal show={modalAdd} setShow={setModalAdd} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add Food</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <SearchBar
                placeholder={"Searching food"}
                dataFrom={foodAvailable}
                onClickSelected={clickedFilter}
                setInputWord={setInputWord}
                inputWord={inputWord}
                stateModal={modalAdd}
                filterdiv={true}
              />
              {foodSelected && (
                <>
                <div className="contSelected--food">
                  <div className="selected--food">
                    <h5>Name:</h5>
                    {foodSelected.name}
                    <h5>Calories:</h5>
                    {foodSelected.calories}
                  </div>
                  <div className="infoSelected--Food">
                    <h5>Protein:</h5>
                    {foodSelected.proteinQGr} g<h5>Carbs:</h5>
                    {foodSelected.carbsQGr} g<h5>Fat:</h5>
                    {foodSelected.fatQGr} g
                  </div>
                </div>
                <form onSubmit={sendFoodAdd}>
                <MDBInput
                  label="Quantity"
                  id="form1"
                  type="number"
                  min={1}
                  value={qAdd}
                  onChange={(e) => setQadd(e.target.value)}
                />
                <Select name='day' data={days} actionSelect={stFoodDay} valueSelected={daySelected} />
                <Select name='unit' data={unitMeasurent} actionSelect={stUnitMeasu} />
                <MDBBtn>Save changes</MDBBtn>
                </form>
                </>
              )}
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleShow}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
