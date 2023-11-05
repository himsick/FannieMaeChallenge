import { motion } from "framer-motion";
import { useState } from "react";
import { FiMenu, FiArrowRight } from "react-icons/fi";
import ProportunityLogo from '../assets/ProportunityLogo.png';
import { useScroll } from './Scroll';
 
const FlipNavWrapper = () => {
  return (
    <div className="sticky top-0 bg-gray-50 z-10">
      <FlipNav />
      <div className="h-55" />
    </div>
  );
};
 
const FlipNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white p-4 border-b-[1px] border-gray-200 flex items-center justify-between relative" >
      <NavLeft setIsOpen={setIsOpen} />
      <NavRight />
      <NavMenu isOpen={isOpen} />
    </nav>
  );
};
 
const Logo = () => {
  return (
    <img src={ProportunityLogo} alt="Logo" style={{
        width: '52px',
        height: '52px',}} />
  );
};
 
const NavLeft = ({ setIsOpen }) => {
  return (
    <div className="flex items-center gap-6">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="block lg:hidden text-gray-950 text-2xl"
        onClick={() => setIsOpen((pv) => !pv)}
      >
        <FiMenu />
      </motion.button>
      <Logo />
      <NavLink text="Home" />
      <NavLink text="Form" />
      <NavLink text="Visuals" />
      <NavLink text="Suggestions" />
      <NavLink text="Testimonials" />
      <NavLink text="Chatbot" />
      <NavLink text="FAQ" />
    </div>
  );
};
 
const NavLink = ({ text }) => {
  const scrollToSectionWithOffset = (sectionId, offset = 150) => {
    const section = document.getElementById(sectionId);

    if (section) {
      const targetOffset = section.offsetTop - offset;
      window.scrollTo({ top: targetOffset, behavior: 'smooth' });
    }
  };

  return (
    <button
      href="#"
      rel="nofollow"
      className="hidden lg:block h-[30px] overflow-hidden font-medium"
    >
      <motion.div 
      onClick={() => scrollToSectionWithOffset(text)}
      whileHover={{ y: -30 }}>
        <span className="flex items-center h-[30px] text-gray-500">{text}</span>
        <span className="flex items-center h-[30px] text-indigo-600">
          {text}
        </span>
      </motion.div>
    </button>
  );
};
 
const NavRight = () => {
  return (
    <div className="flex items-center gap-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-sky-400 bg-clip-text text-transparent font-medium rounded-md whitespace-nowrap"
      >
        Sign in
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-sky-400 text-white font-medium rounded-md whitespace-nowrap"
      >
        Sign up
      </motion.button>
    </div>
  );
};
 
const NavMenu = ({ isOpen }) => {
  return (
    <motion.div
      variants={menuVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      className="absolute p-4 bg-white shadow-lg left-0 right-0 top-full origin-top flex flex-col gap-4"
    >
      <MenuLink text="Solutions" />
      <MenuLink text="Community" />
      <MenuLink text="Pricing" />
      <MenuLink text="Company" />
    </motion.div>
  );
};
 
const MenuLink = ({ text }) => {
  return (
    <motion.a
      variants={menuLinkVariants}
      rel="nofollow"
      href="#"
      className="h-[30px] overflow-hidden font-medium text-lg flex items-start gap-2"
    >
      <motion.span variants={menuLinkArrowVariants}>
        <FiArrowRight className="h-[30px] text-gray-950" />
      </motion.span>
      <motion.div whileHover={{ y: -30 }}>
        <span className="flex items-center h-[30px] text-gray-500">{text}</span>
        <span className="flex items-center h-[30px] text-indigo-600">
          {text}
        </span>
      </motion.div>
    </motion.a>
  );
};
 
export default FlipNavWrapper;
 
const menuVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};
 
const menuLinkVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: -10,
    opacity: 0,
  },
};
 
const menuLinkArrowVariants = {
  open: {
    x: 0,
  },
  closed: {
    x: -4,
  },
};