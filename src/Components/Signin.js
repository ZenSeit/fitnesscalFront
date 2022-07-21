import React, { useContext, useEffect } from "react";
import "../Stylesheets/signin.css";
import { MDBInputGroup, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { Logins, VerifyToken } from "../Services/Login";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { SessionContext } from "../Services/SessionContext";

function Signin() {
  const { state } = useLocation();

  // const { user, setUser } = useContext(SessionContext);

  console.log(state);

  const nav = useNavigate();

  /*
  if (user) {
    nav(nav(state?.pathname ?? "/Home"));
  }*/

  console.log(VerifyToken().availableToken);

  useEffect(() => {
    if (VerifyToken().availableToken) {
      nav(nav(state?.pathname ?? "/Home"));
    }
  }, []);

  function Log(e) {
    e.preventDefault();
    Logins(e).then((res) => {
      if (res === "ok") {
        nav("/Home");
      } else {
        alert("Credentials are wrong");
      }
    });
  }

  return (
    <div className="sign--container">
      <div className="form">
        <div className="login">
          <form onSubmit={Log}>
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
          <MDBBtn
            className="m-1"
            style={{ backgroundColor: "#333333" }}
            href="https://github.com/ZenSeit"
            target="_blank"
          >
            <MDBIcon fab icon="github" />
          </MDBBtn>
          <MDBBtn color="success" onClick={VerifyToken}>
            Verify
          </MDBBtn>
        </div>
      </div>
      <div className="back">
      </div>
    </div>
  );
}

export default Signin;
