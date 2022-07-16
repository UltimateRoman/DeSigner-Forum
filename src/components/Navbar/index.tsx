import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="flex items-center justify-between max-w-[1440px] mx-auto w-full max-h-[10vh] py-[10px] h-full px-[32px] md:px-[64px] lg:px-[120px]">
      <div className="font-black text-[20px] flex-[2]">Designer Forum</div>
      <ul className="flex items-center font-medium justify-between flex-1">
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/create">Create NFT</Link>
        </li>
        <li>
          <button className="border px-[30px] py-[6px] rounded-[6px]">
            Login
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
