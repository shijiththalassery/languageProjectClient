import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function StudentNavbar() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Homepage</a></li>
              <li><Link to="/studentProfile">Profile</Link></li>
              <li><a>Your Languages</a></li>
              <li><a>Live Session</a></li>
              <li><a>About</a></li>
              <li><a>Log Out</a></li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-xl">langOO</a>
        </div>
        <div className="navbar-end">
          
          <div className="avatar">
            <div className="w-10 h-10 rounded-full"> {/* Adjust the width and height here */}
              <img src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
