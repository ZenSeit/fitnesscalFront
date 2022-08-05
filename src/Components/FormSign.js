import React from "react";
import { MDBInputGroup, MDBBtn } from "mdb-react-ui-kit";

export default function FormSign({ logging }) {
  return (
    <>
    <h2 className="form--title">Sign in</h2>
    <form onSubmit={logging}>
      <div className="form-login">
        <MDBInputGroup className="mb-3">
          <label className="mark-log">@</label>
          <input
            className="form-control"
            type="text"
            placeholder="Nickname"
            name="nick"
          />
        </MDBInputGroup>

        <MDBInputGroup className="mb-3">
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            name="pass"
          />
          <label className="mark-log">Password</label>
        </MDBInputGroup>

        <MDBBtn color="success">Sign in</MDBBtn>
      </div>
    </form>
    </>
  );
}
