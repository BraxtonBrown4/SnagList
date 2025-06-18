import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from "../managers/authManager";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-wide text-white">
          SnagList
        </h2>


        {loggedInUser ? (
          <>
            <RRNavLink to="/My-Lists"
              className="text-2xl font-bold tracking-wide hover:text-gray-300">
              My Lists
            </RRNavLink>

            <RRNavLink to="/New-List"
              className="text-2xl font-bold tracking-wide hover:text-gray-300">
              New List
            </RRNavLink>

            <RRNavLink to="/Tags"
              className="text-2xl font-bold tracking-wide hover:text-gray-300">
              Tags
            </RRNavLink>
            
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                logout().then(() => setLoggedInUser(null));
              }}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-semibold transition">
              Logout
            </button>
          </>
        ) : (
          <RRNavLink to="/login">
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-semibold transition text-white">
              Login
            </button>
          </RRNavLink>
        )}
      </div>
    </nav>
  );
}
