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
  MDBIcon
} from "mdb-react-ui-kit";
import { VerifyToken } from "../Services/Login";
import {deletePhotoUser} from '../Services/DataDB'

export const ModalChangeImage = ({tittle, icon, getUser}) => {
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);

  const idUser=VerifyToken().myDecodedToken

  const sendImage = async (e) => {
    e.preventDefault()
    const image=e.target.userImage.files[0]

    const formData = new FormData();
    formData.append('imageFile',image)
    const data = await fetch(
        `http://localhost:8080/api/updateImage/${idUser}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",

          },
          body:formData,
        }
      );
      const res= await data.text();
      alert(res)
      await getUser()
  };

  const delPhoto = async () =>{
    await deletePhotoUser(idUser)
    await getUser()
  }

  return (
    <>
      <MDBBtn onClick={toggleShow}>{icon}</MDBBtn>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{tittle}</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form onSubmit={sendImage}>
                <input type="file" name="userImage" />
                <MDBBtn>Save changes</MDBBtn>
              </form>
              <hr/>
              <MDBBtn onClick={delPhoto}><MDBIcon fas icon="times" /> photo</MDBBtn>
            
            </MDBModalBody>

            <MDBModalFooter></MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};
