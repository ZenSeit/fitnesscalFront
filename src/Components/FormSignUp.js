import React from "react";
import { MDBInputGroup, MDBBtn } from "mdb-react-ui-kit";
import { activityDay,fitnessG,genderUs } from "../Services/GeneralData";
import Select from "./Select";

export default function FormSignUp({ register, handleChange, currentData }) {

  var today = new Date();

  today.setFullYear(today.getFullYear()-15)

  return (
    <>
    <h2 className="form--title">Sign up</h2>
    <form onSubmit={register}>
      <div className="form-register">
        <MDBInputGroup className="mb-3">
          <label className="mark-log">@</label>
          <input
            className="form-control"
            type="text"
            placeholder="Nickname"
            name="nickname"
            onChange={handleChange}
            required
          />
        </MDBInputGroup>

        <MDBInputGroup className="mb-3">
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            required
          />
          <label className="mark-log">Email</label>
        </MDBInputGroup>

        <MDBInputGroup className="mb-3">
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
          />
          <label className="mark-log">Password</label>
        </MDBInputGroup>

        <div className="names--user">
          <MDBInputGroup className="mb-3">
            <label className="mark-log">Name</label>
            <input
              className="form-control"
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              required
            />
          </MDBInputGroup>
          <MDBInputGroup className="mb-3">
            <label className="mark-log">Lastname</label>
            <input
              className="form-control"
              type="text"
              placeholder="Lastname"
              name="lastname"
              onChange={handleChange}
              required
            />
          </MDBInputGroup>
        </div>
        <MDBInputGroup className="mb-3">
          <label className="mark-log">Birthday</label>
          <input className="form-control" type="date" name="birthDay" onChange={handleChange} max={today.toISOString().split('T')[0]} required />
        </MDBInputGroup>
        <Select name="activityDay" data={activityDay} actionSelect={handleChange} valueSelected={currentData.activityday} />
        <Select name="fitnessGoal" data={fitnessG} actionSelect={handleChange} valueSelected={currentData.fitnessgoal} />
        <Select name="gender" data={genderUs} actionSelect={handleChange} valueSelected={currentData.gender} />
        <div className="shape--user">
          <MDBInputGroup className="mb-3">
            <label className="mark-log">Weight (Kg)</label>
            <input
              className="form-control"
              type="number"
              step='0.1'
              placeholder="weight"
              name="weight"
              onChange={handleChange}
              required
            />
          </MDBInputGroup>
          <MDBInputGroup className="mb-3">
            <label className="mark-log">Height (cm)</label>
            <input
              className="form-control"
              type="number"
              step='0.1'
              placeholder="height"
              name="height"
              onChange={handleChange}
              required
            />
          </MDBInputGroup>
        </div>

        <MDBBtn color="success">Sign up</MDBBtn>
      </div>
    </form>
    </>
  );
}
