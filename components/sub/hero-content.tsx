"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col md:flex-row items-center md:items-center justify-center px-6 md:px-20 md:mt-20 w-full z-[20] gap-6 md:gap-0"
    >
      {/* ===== DESKTOP LEFT COLUMN ===== */}
      <div className="hidden md:flex h-full w-full flex-col gap-5 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            Data Science & AI Portfolio
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-4xl lg:text-6xl text-bold text-white max-w-[600px] w-auto h-auto"
        >
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
            ABDUL MUNEEB
          </span>
          <span>
            Exploring{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              data-driven
            </span>{" "}
            solutions & intelligent systems.
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-400 my-5 max-w-[600px]"
        >
          Data Science & AI enthusiast | Web Engineering | Information Security.
          Building with Python, SQL, and intelligent systems. Check out my projects and skills.
        </motion.p>

        <motion.a
          variants={slideInFromLeft(1)}
          href="#projects"
          className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
        >
          View Projects
        </motion.a>
      </div>

      {/* ===== DESKTOP IMAGE ===== */}
      <motion.div
        variants={slideInFromRight(0.8)}
        className="hidden md:flex w-full h-full justify-center items-center relative"
      >
        <Image
          src="/hero-bg.svg"
          alt="work icons"
          height={650}
          width={650}
          draggable={false}
          className="select-none"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[200px] h-[200px] rounded-full border-4 border-[#7042f88b] overflow-hidden shadow-[0_0_30px_#7042f88b]">
            <Image
              src="/pfp.png"
              alt="ABDUL MUNEEB"
              width={200}
              height={200}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </motion.div>

      {/* ===== MOBILE LAYOUT ===== */}
      <div className="md:hidden flex flex-col items-center w-full gap-5 pt-32">
        {/* Welcome Badge */}
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] self-start"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            Data Science & AI Portfolio
          </h1>
        </motion.div>

        {/* Name */}
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="w-full flex flex-col gap-2 text-3xl text-bold text-white"
        >
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
            ABDUL MUNEEB
          </span>
        </motion.div>

        {/* Avatar */}
        <motion.div
          variants={slideInFromRight(0.8)}
          className="w-full flex justify-center items-center relative my-2"
        >
          <Image
            src="/hero-bg.svg"
            alt="work icons"
            height={650}
            width={650}
            draggable={false}
            className="select-none max-w-[260px]"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[110px] h-[110px] rounded-full border-4 border-[#7042f88b] overflow-hidden shadow-[0_0_30px_#7042f88b]">
              <Image
                src="/pfp.png"
                alt="ABDUL MUNEEB"
                width={200}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Exploring text */}
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="w-full text-lg font-medium text-white text-start"
        >
          <span>
            Exploring{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              data-driven
            </span>{" "}
            solutions & intelligent systems.
          </span>
        </motion.div>

        {/* About */}
        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-sm text-gray-400 w-full text-start"
        >
          Data Science & AI enthusiast | Web Engineering | Information Security.
          Building with Python, SQL, and intelligent systems. Check out my projects and skills.
        </motion.p>

        {/* View Projects */}
        <motion.a
          variants={slideInFromLeft(1)}
          href="#projects"
          className="py-2 px-4 button-primary text-center text-white cursor-pointer rounded-lg self-start"
        >
          View Projects
        </motion.a>
      </div>
    </motion.div>
  );
};
