import React, { useState } from "react";
import {
  Search,
  User,
  ShoppingBag,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import DropdownMenu from "./DropdownMenu1";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full fixed top-0 left-0 bg-white z-50 shadow-md">
      {/* Announcement Bar */}
      <div className="bg-gray-100 py-4 flex items-center justify-between px-4">
        <ChevronLeft className="h-5 w-5" />
        <p className="text-center hover:underline font-medium">
          | For International Orders and Express Shipping Contact Us |
        </p>
        <ChevronRight className="h-5 w-5" />
      </div>

      {/* Logo and Icons */}
      <div className="flex items-center justify-between py-6 px-4">
        <button className="p-2">
          <Search className="h-6 w-6" />
        </button>
        <div className="flex-1 flex justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-serif text-amber-600">UtsaviMart</h1>
            <p className="text-xs tracking-widest uppercase text-amber-600">
              BRING HOME POSITIVITY
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 cursor-pointer">
            <User onClick={() => navigate("/signup")} className="h-6 w-6" />
          </button>
          <NavLink to='/cart' className="p-2">
            <ShoppingBag className="h-6 w-6" />
          </NavLink>
          <button className="flex items-center gap-1 p-2">
            <span className="flex items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                alt="India Flag"
                className="h-4 w-6 mr-1"
              />
              <span>INR</span>
            </span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="border-t border-b border-gray-200 overflow-x-auto relative">
        <ul className="flex whitespace-nowrap text-sm gap-6 py-4 px-4 md:justify-center md:flex-wrap relative">
          <li className="hover:underline">
            <Link to="/" className="block px-2">Home</Link>
          </li>
          <li className="hover:underline">
            <Link to="/our-story" className="block px-2">Our Story</Link>
          </li>

          {/* Dropdown for God Idols */}
          <DropdownMenu title="God Idols" items={[
            { title: "Buddha", path: "/buddha" },
            { title: "Shiva", path: "/shiva", subItems: [
              { title: "Ardhanarishwara", path: "/shiva/ardhanarishwara" },
              { title: "Nandi", path: "/shiva/nandi" },
              { title: "Nataraja", path: "/shiva/nataraja" },
            ]},
            { title: "Krishna", path: "/krishna", subItems: [
              { title: "Radha Krishna", path: "/krishna/radha-krishna" }
            ]},
            { title: "Hanuman", path: "/hanuman", subItems: [
              { title: "Panchmukhi Hanuman", path: "/hanuman/panchmukhi" }
            ]},
          ]} />

          {/* Dropdown for Brass Decor */}
          <DropdownMenu title="Brass Decor" items={[
            { title: "Lamps", path: "/brass-decor/lamps" },
            { title: "Urli", path: "/brass-decor/urli" },
            { title: "Wall Hangings", path: "/brass-decor/wall-hangings" },
          ]} />

          <li className="hover:underline">
            <Link to="/brass-idols" className="block px-2">Intricate Small Superfine Brass Idols</Link>
          </li>
          <li className="hover:underline">
            <Link to="/copper-idols" className="block px-2">Copper Idols</Link>
          </li>
          <li className="hover:underline">
            <Link to="/south-india" className="block px-2">Pure Bronze Solid Idols from South India</Link>
          </li>
          <li className="hover:underline">
            <Link to="/wooden-wall-hangings" className="block px-2">Wooden Wall Hangings with Brass Artifacts</Link>
          </li>
          <li className="hover:underline">
            <Link to="/vintage-statues" className="block px-2">Vintage Statues Sculptures</Link>
          </li>
          <li className="hover:underline">
            <Link to="/indonesian-artifacts" className="block px-2">Timeless Indonesian Style Bronze Artifacts</Link>
          </li>
          <li className="hover:underline">
            <Link to="/master-pieces" className="block px-2">Master Pieces</Link>
          </li>
          <li className="hover:underline">
            <Link to="/hand-painted-brass" className="block px-2">Hand Painted Brass Idols</Link>
          </li>
          <li className="hover:underline">
            <Link to="/contact" className="block px-2">Contact</Link>
          </li>
          <li className="hover:underline">
            <Link to="/visit-store" className="block px-2">Visit Our Store</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
