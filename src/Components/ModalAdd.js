import React, { useState,useEffect } from "react";
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
import Select from "./Select";

/**
 *
 * @param tittle,
 * @param fields,
 * @param sendNewData
 *
 * @returns
 */
export default function ModalAdd({ tittle, icon, fields, sendNewData }) {
  const [AddModal, setAddModal] = useState(false);

  useEffect(() => {
    var pruebaobj={}
    fields.forEach(
      nf=>pruebaobj={
        ...pruebaobj,
        [nf.name.replace(" ", "")]:nf.value
      }
    )
    setObjToSend(pruebaobj)
  }, []);

  const onlyNumbers = (string) =>{
    return /^[0-9.,]+$/.test(string)
  }

  const toggleShow = () => {
    setMyFields(fields);
    setAddModal(!AddModal);
  };

  const [myFields, setMyFields] = useState(fields);
  const [objToSend, setObjToSend] = useState({});

  const handleChange = (e) => {
    const newFields = myFields.map((f) => {
      return f.name.replace(" ", "") === e.target.id
        ? { ...f, value: e.target.value }
        : f;
    });
    setMyFields(newFields);
    setObjToSend(
      {
        ...objToSend,
        [e.target.id]:( !onlyNumbers(e.target.value) ? e.target.value: Number(e.target.value))
      }
    )
  };

  return (
    <>
      <MDBBtn onClick={toggleShow}>{icon}</MDBBtn>
      <MDBModal show={AddModal} setShow={setAddModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{tittle}</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setAddModal(!AddModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form onSubmit={(e) => sendNewData(e, objToSend)}>
                {myFields.map((f, idx) => {
                  switch (f.family) {
                    case "input":
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
                    case "select":
                      return (
                        <Select
                          ky={idx}
                          data={f.data}
                          name={f.name}
                          actionSelect={handleChange}
                          valueSelected={f.value}
                        />
                      );
                  }
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
