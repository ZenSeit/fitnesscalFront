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
} from "mdb-react-ui-kit";
import SearchBar from "./SearchBar";

export default function ModalAddFood({ foodAvailable }) {
  const [modalAdd, setModalAdd] = useState(false);

  const [foodSelected, setFoodSelected] = useState();

  const [inputWord, setInputWord] = useState("");

  const toggleShow = () => {
    setFoodSelected();
    setInputWord('')
    setModalAdd(!modalAdd);
  };

  const clickedFilter = (data) => {
    setFoodSelected(data);
  };

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
              />
              {foodSelected && <>{foodSelected.name}</>}
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
