import React, { useState } from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa'; // Importing Icons

const socials = [
  { name: 'Instagram', url: 'https://www.instagram.com', icon: <FaInstagram className="w-6 h-6" /> },
  { name: 'Facebook', url: 'https://www.facebook.com', icon: <FaFacebook className="w-6 h-6" /> },
];

const Email = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <div className="flex justify-between items-center w-full  mx-15 ">
      {/* Always above input */}
     
     <div className='flex flex-col mr-4 '>
       
     <h3 className="font-md text-gray-800
     ">Subscribe to our emails</h3>
      <form onSubmit={handleSubmit} className="relative w-full ">
    
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2  text-gray-900 border border-gray-500 pr-10 "
          required
        />
        <button type="submit" className="absolute  inset-y-0 right-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </form>


     </div>

      {/* Social Icons */}
      <div className="flex space-x-3 icons-sm  mr-25">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-200 origin-center"
            aria-label={social.name}
          >
             {React.cloneElement(social.icon, { className: "w-4 h-4" })}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Email;
