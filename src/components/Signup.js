import { useNavigate, Link } from "react-router-dom";
import "../index.css";
import { useContext } from "react";
import { UserContext } from "./UserContext";

function Signup() {
const {
    username,setUsername,
    password,
    email,
    setEmail,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    passwordMismatch,
    setPasswordMismatch,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    mobilenumber,
    setMobileNumber
  } = useContext(UserContext);


  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword || !email || !mobilenumber) {
      alert("Please fill in all fields");
      return;
    }
    const mobilePattern = /^[0-9]{10}$/;
  if (!mobilePattern.test(mobilenumber)) {
    alert("Enter a valid mobile number (10 digits only, no symbols or alphabets).");
    return;
  }

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*[^A-Za-z0-9])(?=.{8,})/;
    if (!passwordPattern.test(password)) {
      alert(
        "Password must be at least 8 characters long, include at least 1 letter and 1 special symbol(@,!,#,*,%,^)."
      );
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    setPasswordMismatch(false);
    navigate("/tracker");
  };

  return (
    <><div className="logout">
            <Link to="/Login">
              <button>Login</button>
            </Link>
          </div>
    <form className="container" onSubmit={handleSubmit}>
      <div className="title">DOCUMENT LIFE TRACKER</div>
      <div className="section-title">SIGN UP</div>

      <input
        type="text"
        placeholder="User Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Mobile Number"
        value={mobilenumber}
        onChange={(e) => setMobileNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div style={{ position: "relative" }}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            fontSize: "16px",
            color: "gray"
          }}
        >
          {showPassword ? "🙈" : "👁️"}
        </span>
      </div>

      {passwordMismatch && (
        <div style={{ color: "red", marginBottom: "5px" }}>
          Password dosen't match
        </div>
      )}

      <div style={{ position: "relative" }}>
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (password !== e.target.value) {
              setPasswordMismatch(true);
            } else {
              setPasswordMismatch(false);
            }
          }}
        />
        <span
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            fontSize: "16px",
            color: "gray"
          }}
        >
          {showConfirmPassword ? "🙈" : "👁️"}
        </span>
      </div>

      <button type="submit">Submit</button>
    </form>
    </>
  );
}

export default Signup;
