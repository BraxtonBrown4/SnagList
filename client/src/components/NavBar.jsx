import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from "../managers/authManager";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="">
      <div className="w-screen">
        <RRNavLink to="/" className="text-xl font-semibold">
          SnagList
        </RRNavLink>

        {loggedInUser ? (
          <button
            className=""
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
              <button className="">
                Login
              </button>
            </RRNavLink>
          </div>
        )}
      </div>
    </nav>
  );
}
