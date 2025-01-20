"use client";
import React from "react";
import Carousel from "@/components/ui/carousel";
import Particles from "@/components/magicui/particles";
import { FocusCards } from "@/components/ui/focus-cards";
const page = () => {
  return (
    <div className="top-8">
  <Particles
    className="fixed inset-0 h-full w-full"
    quantity={500}
    ease={100}
    color="#ffffff"
    refresh
  />
  {/* <div className="relative overflow-hidden w-full h-full py-20">
  <Carousel slides={slideData} />
</div> */}
<div className="h-10"></div>
  <div className="mt-10"> {/* Increased `mt-10` to `mt-20` */}
    <FocusCards cards={cards} />
  </div>
</div>

  )
}

export default page

const cards = [
  {
    title: "Megaproject",
    src: "/Megaproject.png",
  },
  {
    title: "Logic Lounge 2.0",
    src: "/logicLounge.png",
  },
  {
    title: "SWE Quest",
    src: "/SWEquest.png",
  },
  {
    title: "ACM ICPC regionals",
    src: "/ICPCregionals.png",
  },
  {
    title: "Lead 5.0",
    src: "/Lead.png",
  },
  
]

