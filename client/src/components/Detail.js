import React from "react";
import "./Detail.css";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Details() {
  const params = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    position: "",
    dateOfBirth: "",
    hobbies: "",
  });
  useEffect(() => {
    async function getRecord() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/detail/${params.id}`);
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      console.log(response);
      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      console.log(response.body);
      setForm(record);
      console.log(record);
    }
    getRecord();
  }, [params.id, navigate]);

  function recordList() {
    return (
      <ul className="Detail-List">
        <li className="list-element">
          Imie
          <p>{form.name}</p>
        </li>
        <li className="list-element">
          Nazwisko <p>{form.lastName}</p>
        </li>
        <li className="list-element">
          Data urodzenia <p>{form.dateOfBirth}</p>
        </li>
        <li className="list-element">
          Hobby <p>{form.hobbies}</p>
        </li>
        <li className="list-element">
          Pozycja <p>{form.position}</p>
        </li>
      </ul>
    );
  }
  return (
    <div className="container3">
      <div className="list-container">
        <h1>Dane szczegółowe pracownika</h1>
        {recordList()}
      </div>
    </div>
  );
}
