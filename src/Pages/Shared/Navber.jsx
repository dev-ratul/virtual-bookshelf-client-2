import { NavLink, useNavigate } from "react-router"; // react-router-dom use করবি
import { useContext, useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  // LocalStorage থেকে থিম নাও, না থাকলে system preference নাও
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) return savedTheme === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // dark class যোগ/অপসারণ এবং localStorage আপডেট
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    logOut()
      .then(() => navigate("/signIn"))
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
      <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
      <li><NavLink to="/book-shelf" className={navLinkClass}>Bookshelf</NavLink></li>
      <li><NavLink to="/all-special-offer" className={navLinkClass}>All Special Offer</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/add-book" className={navLinkClass}>Add Book</NavLink></li>
          <li><NavLink to="/my-book" className={navLinkClass}>My Books</NavLink></li>
          <li><NavLink to="/add-special-offer" className={navLinkClass}>Add Special Offer</NavLink></li>
          <li><NavLink to="/profile" className={navLinkClass}>Profile</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <Disclosure
      as="nav"
      className="shadow-md sticky top-0 z-50 border-b border-[#EAE4D5] dark:bg-gray-900"
    >
      {({ open }) => (
        <>
          <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
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
                  className="text-3xl font-bold tracking-wide text-black dark:text-white"
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
                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="mr-4 p-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition"
                  aria-label="Toggle Dark Mode"
                >
                  {darkMode ? (
                    <SunIcon className="h-5 w-5" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )}
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
                  className="p-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition"
                  aria-label="Toggle Dark Mode"
                >
                  {darkMode ? (
                    <SunIcon className="h-5 w-5" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )}
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

export default Navbar;
