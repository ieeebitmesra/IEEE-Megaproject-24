import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaFacebook,FaInstagram,FaGithub,FaLinkedin } from "react-icons/fa";

export default function FooterCom() {
  return (
    <Footer container className="bg-slate-200 ">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="logo mt-5">
            <Link
              to="/"
              className="flex gap-2 self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span>
                <img
                  className="h-8 w-8"
                  src="./logoSS.png "
                  alt=""
                />
              </span>
              <div className="">
                <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 to-indigo-500 rounded-lg text-white ">
                  Scripted
                </span>
                <span>Sphere</span>
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div className="about">
            <Footer.Title title="About" />
            <Footer.LinkGroup col>
                <Footer.Link href="/" target="_blank" rel="noopener noreferrer" >
                    Travel
                </Footer.Link>
                <Footer.Link href="/" target="_blank" rel="noopener noreferrer" >
                    About
                </Footer.Link>
                <Footer.Link href="/" target="_blank" rel="noopener noreferrer" >
                    LinkedIn
                </Footer.Link>
            </Footer.LinkGroup>
            </div>
            <div className="follow">
            <Footer.Title title="Follow us" />
            <Footer.LinkGroup col>
                <Footer.Link href="/" target="_blank" rel="noopener noreferrer" >
                    Github
                </Footer.Link>
                <Footer.Link href="/" target="_blank" rel="noopener noreferrer" >
                    Instagram
                </Footer.Link>
                <Footer.Link href="/" target="_blank" rel="noopener noreferrer" >
                    LinkedIn
                </Footer.Link>
            </Footer.LinkGroup>
            </div>
            <div className="legal">
            <Footer.Title title="Legal" />
            <Footer.LinkGroup col>
                <Footer.Link href="/" target="_blank" rel="noopener noreferrer" >
                    Privacy Policy
                </Footer.Link>
                <Footer.Link href="/" target="_blank" rel="noopener noreferrer" >
                    Terms &amp; Conditions
                </Footer.Link>
            </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm: items-center sm: justify-between ">
            <Footer.Copyright href="https://www.linkedin.com/in/sachin-kumar-90884117a/" by="Sachin Kumar" year={new Date().getFullYear()} />
            <div className="icons flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                <Footer.Icon href="https://www.linkedin.com/in/sachin-kumar-90884117a/" icon={FaFacebook} />
                <Footer.Icon href="https://www.linkedin.com/in/sachin-kumar-90884117a/" icon={FaInstagram} />
                <Footer.Icon href="https://www.linkedin.com/in/sachin-kumar-90884117a/" icon={FaGithub} />
                <Footer.Icon href="https://www.linkedin.com/in/sachin-kumar-90884117a/" icon={FaLinkedin} />
            </div>
        </div>
      </div>
    </Footer>
  );
}
