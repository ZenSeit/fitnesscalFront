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
} from "mdb-react-ui-kit";

export default function ModalAdd({ fields, sendNewFood }) {
  const [AddModal, setAddModal] = useState(false);

  const toggleShow = () => {
    setMyFields(fields);
    setAddModal(!AddModal);
  };

  const [myFields, setMyFields] = useState(fields);

  const handleChange = (e) => {
    const newFields = myFields.map((f) => {
      return f.name.replace(' ','') === e.target.id ? { ...f, value: e.target.value } : f;
    });
    setMyFields(newFields)
  };

  return (
    <>
      <MDBBtn onClick={toggleShow}>New Food</MDBBtn>
      <MDBModal show={AddModal} setShow={setAddModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>New Food</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setAddModal(!AddModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form onSubmit={(e) => sendNewFood(e)}>
                {myFields.map((f, idx) => {
                  return (
                    <MDBInput
                      key={idx}
                      label={f.name}
                      id={f.name.replace(" ", "")}
                      type={f.type}
                      step={f?.step}
                      value={f.value}
                      required={f?.req}
                      onChange={handleChange}
                    />
                  );
                })}
                <MDBBtn>Add</MDBBtn>
              </form>
            </MDBModalBody>

            <MDBModalFooter></MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
