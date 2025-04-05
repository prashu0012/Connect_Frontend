import { Link } from 'react-router-dom';
import QuickLink from './quickLinks';
import Socials from './socials';
import About from './about';
import Email from './email';





const Footer = () => {
  return (
    <footer className="flex flex-col items-center text-gray-800 mt-6 pt-4 border-t border-gray-300">
      {/* Main content container */}
      <div className='w-full max-w-6xl px-4'>
        {/* Three columns row */}
        <div className='flex justify-center gap-8 md:gap-16 w-full'>
          <QuickLink />
          <Socials />
          <About />
        </div>

        {/* Email section */}
        <div className='mt-6 flex justify-center w-full'>
          <Email />
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 pt-4 border-t border-gray-300 w-full text-center h-16">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs opacity-75">
          ©2025 Bushishw.com
        </p>
      </div>
</div>
    </footer>
  );
};

export default Footer;
