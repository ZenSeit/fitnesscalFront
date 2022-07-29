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
import Select from "./Select";
import {unitMeasurent} from '../Services/GeneralData'

export default function ModalEdit({ id, updateFood, day, getData }) {
  const [basicModal, setBasicModal] = useState(false);
  const [res, setRes] = useState({});
  const idus = VerifyToken().myDecodedToken;
  const [qua, setQua] = useState(0);
  const [uFood,setUFood]=useState(0)

  const toggleShow = async () => {
    const res = await getData(idus,id);
    setBasicModal(!basicModal);
    setRes(res);
    setQua(res?.quantityuser);
    setUFood(res?.formQuantity)
  };

  const updateData = async (e) => {
    e.preventDefault();
    const res = await updateFood(e.target.form1.value, id, day,uFood);
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
                <Select name="unitFood" data={unitMeasurent} actionSelect={setUFood} valueSelected={uFood} />
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
