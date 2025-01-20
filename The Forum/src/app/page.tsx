// Home.js
import Footer from "./components/Footer";
import HeroSectionHeader from "./components/HeroSectionHeader";
import LatestQuestions from "./components/LatestQuestions";
import NavbarBoi from "./components/NavbarBoi";
import Sidebar from "./components/Sidebar";
import { HeroParallax } from "../components/ui/hero-parallax";
import { SparklesCore } from "../components/ui/sparkles";

 
export default function Home() {
  return (
    <>
      <div className="flex flex-col h-screen">
        {/* Fixed Navbar */}
        <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
          <NavbarBoi />
        </div>

        <div className="flex flex-1 pt-[4rem]">
          <div>
            <aside >
              <Sidebar />
            </aside>
          </div>
          {/* Main Content Area */}

          <div className="ml-[16%] w-[84vw] overflow-y-auto">
          <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full fixed"
          particleColor="#FFFFFF"
        />
            <div className="relative">
             
              
              <HeroSectionHeader></HeroSectionHeader>
              <HeroParallax products={products} />
              <LatestQuestions />
              <div className="m-10" />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail: "/Clubs.png",
  },
  {
    title: "Events",
    link: "/events",
    thumbnail:
      "/Events.png",
  },
  {
    title: "Clubs",
    link: "/club",
    thumbnail:
      "/Clubs.png",
  },

  {
    title: "Remap",
    link: "https://eloquent-semifreddo-c8e593.netlify.app",
    thumbnail:
      "/remap.jpg",
  },
  {
    title: "Events",
    link: "/events",
    thumbnail:
      "/Events.png",
  },
  
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "AskAQuestion",
    link: "https://algochurn.com",
    thumbnail:
      "/AskAQuestion.png",
  },
  {
    title: "Questions",
    link: "/questions",
    thumbnail:
      "/question.png",
  },
  {
    title: "Remap",
    link: "https://eloquent-semifreddo-c8e593.netlify.app",
    thumbnail:
      "/remap1.png",
  },
];
