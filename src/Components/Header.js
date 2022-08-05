import React, { useContext } from "react";
import "../Stylesheets/header.css";
import headerLogo from "../Images/templogo.png";
import Button from "./Button";
import { VerifyToken } from "../Services/Login";
import { SessionContext } from "../Services/SessionContext";
import { Link,useLocation } from "react-router-dom";
import { myRoutes } from "../Services/GeneralData";

export default function Header() {
  const { user, setUser } = useContext(SessionContext);

  const {pathname} =useLocation()
  const currentLocation=pathname.replace('/','')

  const renderRoutes=myRoutes.filter(r => r.route!==currentLocation)

  const LogOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  };

  return (
    <header>
      <div className="logo--section">
        <img src={headerLogo} className="header--logo" />
        <h1>My fitness Cal</h1>
      </div>
      {VerifyToken().availableToken && (
      <div className="buttons--section">
        
          <>
          {renderRoutes.map(
            (r,idx) => {return <Link key={idx} to={`/${r.route}`}>{r.route}</Link>}
          )}
          
          <Button name="Log out" color="dark" action={LogOut} />
          </> 
        
      </div>
      )}
    </header>
  );
}
