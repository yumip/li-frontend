import React from "react";
// import axios from "axios";
// import { useResultsContext } from "../contexts/ResultsProvider";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HistoryIcon from "@mui/icons-material/History";
import { auth, provider } from '../firebase';
import { Link } from "react-router-dom";

export default function Header({user}) {


    function handleAuthentication() {
        if (user) {
            auth.signOut();
        } else {
            auth.signInWithRedirect(provider);;
        }
    }
    
  return (
    <nav className="bg-white shadow dark:bg-gray-800">
      <div
        className="
      container
      px-6
      py-3
      mx-auto
      flex
      justify-between
      items-center
    "
      >
        <div className="flex flex-auto items-center justify-between">
          <div className="hidden lg:block">
            <Link
              className="
            text-xl
            font-bold
            text-gray-800
            dark:text-white
            md:text-2xl
            hover:text-gray-700
            dark:hover:text-gray-300
          "
              to="/"
            >
              Linked in Scraping by Name Search
            </Link>
          </div>
          <div className="lg:hidden">
            <Link
              className="
            text-xl
            font-bold
            text-gray-800
            dark:text-white
            md:text-2xl
            hover:text-gray-700
            dark:hover:text-gray-300
          "
              to="/"
            >
              LN
            </Link>
          </div>
          <div className="items-center md:flex">
            <div className="flex flex-col md:flex-row md:mx-6 items-center">
              <button
                className="
            my-1
            text-gray-700
            dark:text-gray-200
            hover:text-blue-500
            dark:hover:text-blue-400
            md:mx-4 md:my-0
            flex
            justify-berween
          "
                onClick={handleAuthentication}
              >
                <AccountCircleIcon />
                <h2 className="ml-1">{user ? user.displayName : "Guest"}</h2>
              </button>
            </div>
          </div>
          <div className="items-center md:flex">
            <div className="flex flex-col md:flex-row md:mx-6 items-center">
              <Link
                className="
            my-1
            text-gray-700
            dark:text-gray-200
            hover:text-blue-500
            dark:hover:text-blue-400
            md:mx-4 md:my-0
            flex 
          "
                to="/cookies"
              >
                <SettingsIcon />
                <h2 className="ml-1">Cookies</h2>
              </Link>
            </div>
          </div>
          <div className="items-center sm:flex lg:hidden">
            <div className="flex flex-col md:flex-row md:mx-6 items-center">
              <Link
                className="
            my-1
            text-gray-700
            dark:text-gray-200
            hover:text-blue-500
            dark:hover:text-blue-400
            md:mx-4
            md:my-0
            flex
          "
                to="/historyLink"
              >
                <HistoryIcon />
                <h2 className="ml-1">History</h2>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
