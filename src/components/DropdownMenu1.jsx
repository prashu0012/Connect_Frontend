import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

const DropdownMenu = ({ title, items }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 hover:underline px-2 py-2"
      >
        {title} <ChevronDown className="h-4 w-4" />
      </button>

      {/* Main Dropdown Menu */}
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg w-56">
          <ul className="py-2">
            {items.map((item, index) => (
              <li key={index} className="relative group">
                <Link
                  to={item.path}
                  className="flex justify-between items-center px-4 py-2 hover:bg-gray-100"
                >
                  {item.title}
                  {item.subItems && <ChevronRight className="h-4 w-4" />}
                </Link>

                {/* Sub-menu (Second Level Dropdown) */}
                {item.subItems && (
                  <ul className="absolute left-full top-0 bg-white shadow-lg rounded-lg w-56 hidden group-hover:block">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          to={subItem.path}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;