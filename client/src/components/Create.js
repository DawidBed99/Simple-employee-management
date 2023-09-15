import React from "react";
import { useState } from "react";
// import { Route, Routes } from "react-router-dom";
import "./Create.css";
import { useNavigate } from "react-router-dom";

function Create() {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    position: "",
    dateOfBirth: "",
    hobbies: "",
  });
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({
      name: "",
      lastName: "",
      position: "",
      dateOfBirth: "",
      hobbies: "",
    });

    navigate("/");
  }

  return (
    <div className="container2">
      <h1 className="add-text">Dodaj nowego pracownika</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Imie</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Nazwisko</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={form.lastName}
            onChange={(e) => updateForm({ lastName: e.target.value })}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">Data urodzenia</label>
          <input
            type="text"
            className="form-control"
            id="dateOfBirth"
            value={form.dateOfBirth}
            onChange={(e) => updateForm({ dateOfBirth: e.target.value })}
            placeholder="01-01-2023"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="hobbies">Zainteresowania</label>
          <input
            type="text"
            className="form-control"
            id="hobbies"
            value={form.hobbies}
            onChange={(e) => updateForm({ hobbies: e.target.value })}
            placeholder="Piłka nożna, koszykówka..."
          ></input>
        </div>

        <div className="form-group2">
          <div className="form-checks">
            <div className="form-check-whole">
              <label htmlFor="PositionIntern">Intern</label>
              <div className="form-check">
                <input
                  type="radio"
                  name="Position options"
                  id="PositionIntern"
                  value="Intern"
                  checked={form.position === "Intern"}
                  onChange={(e) => updateForm({ position: e.target.value })}
                ></input>
              </div>
            </div>
            <div className="form-check-whole">
              <label htmlFor="PositionSpecialist">Specialist</label>
              <div className="form-check">
                <input
                  type="radio"
                  name="Position options"
                  id="PositionSpecialist"
                  value="Specialist"
                  checked={form.position === "Specialist"}
                  onChange={(e) => updateForm({ position: e.target.value })}
                ></input>
              </div>
            </div>
            <div className="form-check-whole">
              <label htmlFor="PositionSenior">Senior</label>
              <div className="form-check">
                <input
                  type="radio"
                  name="Position options"
                  id="PositionSenior"
                  value="Senior"
                  checked={form.position === "Senior"}
                  onChange={(e) => updateForm({ position: e.target.value })}
                ></input>
              </div>
            </div>
          </div>
          <div className="form-group3">
            <input type="submit" value="Dodaj pracownika" className="btn" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Create;
