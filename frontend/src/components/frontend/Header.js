import {
  Navbar,
  Button,
  Typography,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import { Link as ScrollerLink, animateScroll as scroll } from "react-scroll";
import { Link as Link } from "react-router-dom";
import React from "react";
import { checkAuth, getLoginInfo } from "../../common/common";
import { BASE_URL } from "../../constants/constant";

const Header = () => {
  return (
    <Navbar className="text-black flex justify-between items-center sticky top-0 left-0 end-0 bg-white bg-opacity-100 mx-auto rounded-none z-50 max-w-full">
      <Link to="/">
        <Typography variant="h3" className="flex text-gray-600">
          <span className="font-serif text-rose-900 font-bold">.</span>msg-
          <span className="text-rose-900"> Sports</span>
        </Typography>
      </Link>
      <ul className="flex">
        <li className="font-sans text-lg pointer">
          <ScrollerLink
            to="home"
            className="px-4 py-2"
            activeClass="border-b-2 border-red-800"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
          >
            Home
          </ScrollerLink>
        </li>

        <li className="font-sans text-lg  pointer">
          <ScrollerLink
            to="events"
            className="px-4 py-2"
            activeClass="border-b-2 border-red-800"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
          >
            Events
          </ScrollerLink>
        </li>

        <li className="font-sans text-lg  pointer">
          <ScrollerLink
            to="about"
            className="px-4 py-2"
            activeClass="border-b-2 border-red-800"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
          >
            About
          </ScrollerLink>
        </li>

        <li className="font-sans text-lg  pointer">
          <ScrollerLink
            to="contact"
            className="px-4 py-2"
            activeClass="border-b-2 border-red-800"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
          >
            Contact
          </ScrollerLink>
        </li>
      </ul>

      <div>
        <Link to="/player">
          {checkAuth("player") ? (
            <div className="flex items-center gap-2">
              <Typography className="text-rose-800" variant="h6">
                {getLoginInfo("player", "name")}
              </Typography>
              <Avatar
                src={
                  BASE_URL +
                  "profile_photo/" +
                  (getLoginInfo("player", "profile") || "avatar.png")
                }
              />
            </div>
          ) : (
            <Button className="animate-bounce bg-rose-800 shadow-black text-white hover:bg-white hover:text-rose-800 hover:shadow-black">
              Login
            </Button>
          )}
        </Link>
        <Link to="/results">
          <IconButton className="ml-3 bg-gray-200">
            <i className="fas fa-trophy text-rose-800 text-lg" />
          </IconButton>
        </Link>
      </div>
    </Navbar>
  );
};

export default Header;
