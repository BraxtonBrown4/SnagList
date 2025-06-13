import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from "../managers/authManager";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <RRNavLink to="/" className="text-xl font-semibold">
          SnagList
        </RRNavLink>

        {loggedInUser ? (
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              logout().then(() => {
                setLoggedInUser(null);
              });
            }}
          >
            Logout
          </button>
        ) : (
          <div>
            <RRNavLink to="/login" className="inline-block">
              <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded">
                Login
              </button>
            </RRNavLink>
          </div>
        )}
      </div>
    </nav>
  );
}
