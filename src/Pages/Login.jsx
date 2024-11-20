import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router";

export const Login = () => {
  const navigate = useNavigate();

  // Combine all states into one object
  const [formState, setFormState] = useState({
    otp: "",
    otpSent: false,
    mobilenumber: "",
    nbrError: "",
    enterOtp: "",
    otpError: "",
    role: "User", // default value can be set here
  });

  // Update specific fields of the state
  const updateFormState = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleMobileNumber = (e) => {
    updateFormState("mobilenumber", e.target.value);
  };

  const generateOTP = () => {
    if (!formState.mobilenumber || formState.mobilenumber.length !== 10) {
      return updateFormState(
        "nbrError",
        "Mobile number must be exactly 10 digits."
      );
    }

    const randomOTP = Math.floor(1000 + Math.random() * 9000);
    updateFormState("otp", randomOTP);
    updateFormState("otpSent", true);
    updateFormState("nbrError", ""); // Clear any previous error
  };

  const handleOtpChange = (e) => {
    updateFormState("enterOtp", e.target.value);
  };

  const checkOtp = () => {
    if (!formState.mobilenumber || formState.mobilenumber.length !== 10) {
      return updateFormState(
        "nbrError",
        "Mobile number must be exactly 10 digits."
      );
    }

    if (formState.enterOtp === formState.otp.toString()) {
      updateFormState("otpError", "");
      const LoginData = {
        mobilenumber: formState.mobilenumber,
        otp: formState.otp,
        role: formState.role,
      };
      localStorage.setItem("LoginData", JSON.stringify(LoginData));
      navigate("/home");
    } else {
      updateFormState("otpError", "Invalid OTP. Please try again.");
    }
  };

  const handleRole = (e) => {
    updateFormState("role", e.target.value);
  };

  return (
    <>
      <div className="geybg">
        <div className="login">
          <div className="mobilenumber">
            <label htmlFor="mobilenumber">Mobile Number</label>
            <input
              onChange={handleMobileNumber}
              type="tel"
              id="mobilenumber"
              maxLength="10"
              placeholder="Enter 10-digit number"
              required
            />
          </div>

          {formState.nbrError && (
            <div className="error-display">
              <p>{formState.nbrError}</p>
            </div>
          )}

          <div className="role">
            <label htmlFor="role">Role</label>
            <select
              name="role"
              id="role"
              onChange={handleRole}
              value={formState.role}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="genotp">
            <label htmlFor="genotp">Get OTP</label>
            <button className="btn btn-dark" id="genotp" onClick={generateOTP}>
              Send
            </button>
          </div>

          {formState.otpSent && (
            <div className="otp-display">
              <p>
                Your OTP is: <strong>{formState.otp}</strong>
              </p>
            </div>
          )}

          <div className="enterotp">
            <label htmlFor="enterotp">Enter OTP</label>
            <input
              type="text"
              id="enterotp"
              maxLength="4"
              pattern="\d{4}"
              placeholder="Enter 4-digit OTP"
              onChange={handleOtpChange}
              required
              autoComplete="off"
            />
          </div>

          {formState.otpError && (
            <div className="error-display">
              <p>{formState.otpError}</p>
            </div>
          )}

          <div className="loginbtn">
            <button className="btn btn-success" onClick={checkOtp}>
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
