import React from 'react';
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";

const Header = ({ setSidebarOpen }) => {
  return (
    <header className='flex justify-between items-center border-b border-slate-600 min-h-[15vh] lg:w-[75vw] w-full gap-1 px-8 py-4 bg-slate-900'>
      <div className="flex items-center gap-4">
        <button onClick={() => setSidebarOpen(prev => !prev)} className="lg:hidden text-white text-3xl">
          <HiMenu />
        </button>

        <Link to={"/"}>
          <h1 className='text-3xl text-slate-200 font-bold tracking-tight lg:ml-[25vw]'>
            Speech To Text
          </h1>
        </Link>
      </div>

      <div className='flex items-center'>
        <Link to={"/"}> <img src={logo} alt='speech to text' width={62} /> </Link>
      </div>
    </header>
  );
};

export default Header;
