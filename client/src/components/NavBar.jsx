import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from "../managers/authManager";
import { NotificationBell } from "./NotificationBell";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl font-bold text-gray-800">
            SnagList
          </h2>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {loggedInUser ? (
            <>
              <RRNavLink
                to="/My-Lists"
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 pb-1 ${isActive
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                  }`
                }
              >
                My Lists
              </RRNavLink>

              <RRNavLink
                to="/All-Lists"
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 pb-1 ${isActive
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                  }`
                }
              >
                All Lists
              </RRNavLink>

              <RRNavLink
                to="/New-List"
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 pb-1 ${isActive
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                  }`
                }
              >
                New List
              </RRNavLink>

              <RRNavLink
                to="/Tags"
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 pb-1 ${isActive
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                  }`
                }
              >
                Tags
              </RRNavLink>

              <RRNavLink
                to={`/Profile/${loggedInUser.id}`}
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 pb-1 ${isActive
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                  }`
                }
              >
                Profile
              </RRNavLink>

              <NotificationBell/>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  logout().then(() => setLoggedInUser(null));
                }}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 text-white shadow-sm hover:shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <RRNavLink to="/login">
              <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 text-white shadow-sm hover:shadow-md">
                Login
              </button>
            </RRNavLink>
          )}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>

            <svg
              className={`${open ? 'hidden' : 'block'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>

            <svg
              className={`${open ? 'block' : 'hidden'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 ease-in-out ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg border-t border-gray-200">
          {loggedInUser ? (
            <>
              <RRNavLink
                to="/My-Lists"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`
                }
                onClick={() => setOpen(false)}
              >
                My Lists
              </RRNavLink>

              <RRNavLink
                to="/All-Lists"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`
                }
                onClick={() => setOpen(false)}
              >
                All Lists
              </RRNavLink>

              <RRNavLink
                to="/New-List"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`
                }
                onClick={() => setOpen(false)}
              >
                New List
              </RRNavLink>

              <RRNavLink
                to="/Tags"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`
                }
                onClick={() => setOpen(false)}
              >
                Tags
              </RRNavLink>

              <RRNavLink
                to={`/Profile/${loggedInUser.id}`}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`
                }
                onClick={() => setOpen(false)}
              >
                Profile
              </RRNavLink>

              <NotificationBell/>

              <div className="px-3 py-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    logout().then(() => setLoggedInUser(null));
                  }}
                  className="w-full text-left bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 text-white shadow-sm"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="px-3 py-2">
              <RRNavLink to="/login" onClick={() => setOpen(false)}>
                <button className="w-full bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 text-white shadow-sm">
                  Login
                </button>
              </RRNavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}