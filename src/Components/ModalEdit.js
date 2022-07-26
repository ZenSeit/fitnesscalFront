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
import "../Stylesheets/modaledit.css";
import { VerifyToken } from "../Services/Login";

export default function ModalEdit({ id, updateFood, day }) {
  const [basicModal, setBasicModal] = useState(false);
  const [res, setRes] = useState({});
  const idus = VerifyToken().myDecodedToken;
  const [qua, setQua] = useState(0);

  const toggleShow = async () => {
    const res = await getRel();
    setBasicModal(!basicModal);
    setRes(res);
    setQua(res?.quantityuser);
  };

  const getRel = async () => {
    const data = await fetch(
      `http://localhost:8080/api/getOfooduser/${idus}?idRel=${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return await data.json();
  };

  const updateData = async (e) => {
    e.preventDefault();
    const res = await updateFood(e.target.form1.value, id, day);
    alert(res);
    setBasicModal(!basicModal);
  };

  return (
    <>
      <MDBBtn onClick={toggleShow} className="edit--btn">
        <MDBIcon fas icon="marker" size="lg" />
      </MDBBtn>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent className="content--modal">
            <MDBModalHeader>
              <MDBModalTitle>{res.fd?.name}</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setBasicModal(!basicModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form onSubmit={updateData}>
                <MDBInput
                  label="Quantity"
                  id="form1"
                  type="number"
                  value={qua}
                  min={0}
                  onChange={(e) => setQua(e.target.value)}
                />
                <MDBBtn className="send--modal">Save changes</MDBBtn>
              </form>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => setBasicModal(!basicModal)}
              >
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
