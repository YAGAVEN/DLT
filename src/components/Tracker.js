import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import { UserContext } from "./UserContext";

function Tracker() {
  const { username, documents, setDocuments } = useContext(UserContext);

  // Local state for form inputs
  const [selectedDoc, setSelectedDoc] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleSave = () => {
    if (!selectedDoc || !expiryDate) {
      alert("Please select a document and expiry date.");
      return;
    }

    // Add new document to context
    setDocuments((prev) => [...prev, { type: selectedDoc, expiry: expiryDate }]);

    // Clear inputs
    setSelectedDoc("");
    setExpiryDate("");
  };

  return (
    <>
      <div className="logout">
        <Link to="/Login">
          <button>Logout</button>
        </Link>
      </div>

      <div className="container">
        <div className="title">DOCUMENT LIFE TRACKER</div>
        <h1>Hello {username}</h1>

        {/* Dropdown for document type */}
        <select value={selectedDoc} onChange={(e) => setSelectedDoc(e.target.value)}>
          <option value="" disabled>Select Document Type</option>
          <option value="Aadhar Card">Aadhar Card</option>
          <option value="Vehicle Registration">Vehicle Registration</option>
          <option value="Passport">Passport</option>
          <option value="Driving License">Driving License</option>
          <option value="Vehicle Insurance">Vehicle Insurance</option>
          <option value="Income Certificate">Income Certificate</option>
          <option value="Other">Other</option>
        </select>

        {/* Date picker */}
        <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />

        {/* Button to save document */}
        <button onClick={handleSave}>SET & SAVE</button>

        {/* Grid display */}
        <div className="grid">
          <div className="card">
            <strong>📁 DOCUMENTS</strong>
            {documents.map((doc, index) => (
              <div key={index}>{doc.type}</div>
            ))}
          </div>
          <div className="card">
            <strong>📅 DATE OF EXPIRY</strong>
            {documents.map((doc, index) => (
              <div key={index}>{doc.expiry}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Tracker;
