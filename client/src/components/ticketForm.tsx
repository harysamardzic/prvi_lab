// src/pages/SubmitForm.tsx
import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { CSSProperties } from 'react';

export const SubmitForm = () => {
  const [formData, setFormData] = useState({
    vatid: '',
    firstName: '',
    lastName: '',
  });
  const [qrCode, setQrCode] = useState<string | null>(null); // State for the QR code
  const [ticketId, setTicketId] = useState<string | null>(null); // State for the ticket ID

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BE_URL}/create`, formData,{headers: {
        'Content-Type': 'application/json',
      }},);
      
        
      setQrCode(response.data.qrCode);
      setTicketId(response.data.ticketId);
      
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      console.error("Error submitting form:", axiosError);
      alert('Failed to submit the form.');
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Submit Information</h2>
      <form style={formStyle} onSubmit={handleSubmit}>
        <label style={labelStyle}>
          VAT ID:
          <input
            type="text"
            name="vatid"
            value={formData.vatid}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </label>
        <label style={labelStyle}>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </label>
        <label style={labelStyle}>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </label>
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>

      {/* Display QR Code if available */}
      {qrCode && (
        <div style={qrContainerStyle}>
          <h3>Your QR Code:</h3>
          <img src={qrCode} alt="Generated QR Code" style={qrImageStyle} />
        </div>
      )}
      {ticketId && (
        <div style={ticketIdStyle}>
            <h4>Ticket ID: {ticketId}</h4>
        </div>
       )}
    </div>
  );
};

// Inline styles
const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
};

const headingStyle: CSSProperties = {
  fontSize: '24px',
  marginBottom: '20px',
  color: '#333',
};
const ticketIdStyle: CSSProperties = {
    marginTop: '10px',
    fontSize: '18px',
    color: '#555',
  };

const formStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '300px',
  gap: '15px',
};

const labelStyle: CSSProperties = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#555',
};

const inputStyle: CSSProperties = {
  padding: '8px',
  fontSize: '14px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const buttonStyle: CSSProperties = {
  marginTop: '15px',
  padding: '10px 15px',
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#fff',
  backgroundColor: '#007BFF',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const qrContainerStyle: CSSProperties = {
  marginTop: '20px',
  textAlign: 'center',
};

const qrImageStyle: CSSProperties = {
  marginTop: '10px',
  width: '150px',
  height: '150px',
};

export default SubmitForm;
