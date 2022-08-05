import React, { useContext, useEffect, useState } from "react";
import "../Stylesheets/signin.css";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { Logins, VerifyToken } from "../Services/Login";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { SessionContext } from "../Services/SessionContext";
import FormSign from "./FormSign";
import FormSignUp from "./FormSignUp";
import {RegisterUser} from '../Services/DataDB'

function Signin() {
  const { state } = useLocation();

  const { user, setUser } = useContext(SessionContext);

  const [formVer, setFormVer] = useState(true);

  const [usRegister, setUsRegister] = useState({ activityday: 0, fitnessgoal: 0, gender: 0 });

  const nav = useNavigate();

  useEffect(() => {
    if (VerifyToken().availableToken) {
      nav(state?.pathname ?? "/Home");
    }
  }, [user]);

  function Log(e) {
    e.preventDefault();
    const nickname = e.target.nick.value
    const password = e.target.pass.value
    Logins(nickname,password).then((res) => {
      if (res === "ok") {
        setUser(VerifyToken().myDecodedToken);
      } else {
        alert("Credentials are wrong");
      }
    });
  }

  const handleChange = (e) => {
    setUsRegister({
      ...usRegister,
      [e.target.name]: e.target.value,
    });
  };

  const sendRegister = (e) => {
    e.preventDefault();
    RegisterUser(usRegister).then(
      res=>{
        alert(res)
        if(res==="User successfully registered"){
          Logins(usRegister.nickname,usRegister.password).then((r) => {
            if (r === "ok") {
              setUser(VerifyToken().myDecodedToken);
            } else {
              alert("Credentials are wrong");
            }
          }
          )
        }
      }
    )
  };

  return (
    <div className="sign--container">
      <div className="form">
        <div className="login">
          {formVer ? (
            <FormSign logging={Log} />
          ) : (
            <FormSignUp
              register={sendRegister}
              handleChange={handleChange}
              currentData={usRegister}
            />
          )}
          <div className="adinfo--form">
            <span className="action--text" onClick={() => setFormVer(!formVer)}>
              {formVer ? "Register" : "Sign in"}
            </span>
            <MDBBtn
              className="m-1"
              style={{ backgroundColor: "#333333" }}
              href="https://github.com/ZenSeit"
              target="_blank"
            >
              <MDBIcon fab icon="github" />
            </MDBBtn>
          </div>
        </div>
      </div>
      <div className="back"></div>
    </div>
  );
}

export default Signin;
