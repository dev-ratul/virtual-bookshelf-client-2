import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navber = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    // লোকাল স্টোরেজ থেকে থিম নিয়ে আসা
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode");
      return saved === "true";
    }
    return false;
  });

  // darkMode state অনুযায়ী html root এ class যোগ/অপসারণ
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/signIn");
      })
      .catch((error) => console.log("error", error));
  };

  const navLinkClass = ({ isActive }) =>
    `relative px-3 py-1 font-semibold transition-colors duration-300 
     ${
       isActive
         ? "text-white border-b-2 border-white"
         : "text-white hover:text-white after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
     }`;

  const links = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/book-shelf" className={navLinkClass}>
          Bookshelf
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-special-offer" className={navLinkClass}>
          All Special offer
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/add-book" className={navLinkClass}>
              Add Book
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-book" className={navLinkClass}>
              My Books
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-special-offer" className={navLinkClass}>
              Add Special Offer
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className={navLinkClass}>
              Profile
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <Disclosure
      as="nav"
      className="bg-gray-900 shadow-md sticky top-0 z-50 border-b border-[#EAE4D5] dark:bg-gray-800"
    >
      {({ open }) => (
        <>
          <div className="max-w-[90vw] m-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png"
                  className="w-10 h-10"
                  alt="book-logo"
                />
                <NavLink
                  to="/"
                  className="text-3xl font-bold text-white tracking-wide"
                >
                  Virtual Bookshelf
                </NavLink>
              </div>

              {/* Desktop Links */}
              <div className="hidden lg:block">
                <ul className="flex gap-4">{links}</ul>
              </div>

              {/* Desktop Buttons */}
              <div className="hidden lg:flex items-center gap-4">
                {/* Dark Mode Toggle Button */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="mr-4 px-3 py-1 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded transition"
                  aria-label="Toggle Dark Mode"
                >
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </button>

                {user ? (
                  <button
                    onClick={handleLogout}
                    className="bg-primary text-white px-4 font-bold py-2 rounded-full hover:bg-purple-700 transition"
                  >
                    Sign Out
                  </button>
                ) : (
                  <NavLink
                    to="/signIn"
                    className="bg-primary text-white font-bold px-4 py-2 rounded-full hover:bg-purple-700 transition"
                  >
                    Sign In
                  </NavLink>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden flex items-center gap-2">
                {/* Dark Mode Toggle Mobile */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="px-3 py-1 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded transition"
                  aria-label="Toggle Dark Mode"
                >
                  {darkMode ? "Light" : "Dark"}
                </button>

                <Disclosure.Button className="inline-flex items-center justify-center rounded-md text-white hover:text-[#6f4e37] focus:outline-none">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Disclosure.Panel className="lg:hidden px-4 pb-2">
            <ul className="flex flex-col gap-2 mb-3">{links}</ul>
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full bg-primary text-white font-bold px-4 py-2 rounded-full hover:bg-purple-700 transition"
              >
                Sign Out
              </button>
            ) : (
              <NavLink
                to="/signIn"
                className="w-full bg-primary text-white font-bold px-4 py-2 rounded-full hover:bg-purple-700 transition"
              >
                Sign In
              </NavLink>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navber;
