import { useState } from "react";
import { register } from "../../managers/authManager";
import { Link, useNavigate } from "react-router-dom";

export default function Register({ setLoggedInUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [registrationFailure, setRegistrationFailure] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      setRegistrationFailure(false);
    } else {
      const newUser = {
        firstName,
        lastName,
        userName,
        email,
        address,
        password,
      };
      register(newUser).then((user) => {
        if (user) {
          setLoggedInUser(user);
          navigate("/My-Lists");
        } else {
          setRegistrationFailure(true);
        }
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h3 className="text-2xl font-semibold mb-6">Sign Up</h3>
      <form onSubmit={handleSubmit} noValidate>
        {[
          { label: "First Name", value: firstName, setter: setFirstName, type: "text" },
          { label: "Last Name", value: lastName, setter: setLastName, type: "text" },
          { label: "Email", value: email, setter: setEmail, type: "email" },
          { label: "User Name", value: userName, setter: setUserName, type: "text" },
          { label: "Address", value: address, setter: setAddress, type: "text" },
        ].map(({ label, value, setter, type }) => (
          <div className="mb-4" key={label}>
            <label className="block mb-1 font-medium">{label}</label>
            <input
              type={type}
              value={value}
              onChange={(e) => setter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPasswordMismatch(false);
              setPassword(e.target.value);
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              passwordMismatch
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setPasswordMismatch(false);
              setConfirmPassword(e.target.value);
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              passwordMismatch
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {passwordMismatch && (
            <p className="text-red-600 mt-1 text-sm">Passwords do not match!</p>
          )}
        </div>

        {registrationFailure && (
          <p className="text-red-600 mb-4 font-semibold">Registration Failure</p>
        )}

        <button
          type="submit"
          disabled={passwordMismatch}
          className={`w-full py-2 rounded-md font-semibold text-white transition ${
            passwordMismatch
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Register
        </button>
      </form>

      <p className="mt-4 text-center text-gray-700">
        Already signed up?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Log in here
        </Link>
      </p>
    </div>
  );
}
