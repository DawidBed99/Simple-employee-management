import React from "react";
import "./MainSite.css";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function MainSite() {
  const [records, setRecords] = useState([]);
  const [btnState, setBtnState] = useState(false);

  async function deletePerson(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    });
    const newList = records.filter((el) => el._id !== id);
    setRecords(newList);
    setBtnState((btnState) => !btnState);
  }
  let toggleClassCheck = btnState ? "active-button" : "";
  useEffect(() => {
    async function getRecords() {
      const response = await fetch("http://localhost:5000/main");
      if (!response.ok) {
        window.alert(`An error occured: ${response.statusText}`);
        return;
      }
      const records = await response.json();
      setRecords(records);
    }
    getRecords();
    return;
  }, [records.length]);

  function recordList() {
    return records.map((record) => {
      return (
        <tr key={record._id}>
          <td>{record.name}</td>
          <td>{record.lastName}</td>
          <td>{record.position}</td>
          <td className="Action-td">
            <Link className="Detail" to={`/detail/${record._id}`}>
              Więcej danych
            </Link>
            <Link className="Edit-p" to={`/edit/${record._id}`}>
              Edytuj
            </Link>
            <p
              className="btn-del"
              onClick={() => {
                deletePerson(record._id);
              }}
            >
              Usuń
            </p>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="container">
      <h1>Lista pracowników</h1>
      <table>
        <thead>
          <tr>
            <th>Imie</th>
            <th>Nazwisko</th>
            <th>Poziom</th>
            <th>Akcja</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}
