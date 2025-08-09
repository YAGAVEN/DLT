
import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // if needed
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [documents, setDocuments] = useState([]);

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        passwordMismatch,
        setPasswordMismatch,
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        documents,
        setDocuments, // Placeholder for document management
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
