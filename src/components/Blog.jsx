import React, { useState } from "react";
import {Tilt} from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { blogs } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const BlogCard = ({
  index,
  name,
  description,
}) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <motion.div 
        variants={fadeIn("up", "spring", index * 0.5, 0.75)}
        className='green-pink-gradient p-[2px] rounded-2xl'
    >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450
          }}
          className="bg-tertiary p-5 rounded-2xl md:w-[600px] xl:w-[800px] sm:w-[360px] w-full"
        >
            <button
                onClick={() => setAccordionOpen(!accordionOpen)}
                className="flex justify-between w-full"
            >
                <span className='text-white font-bold text-[24px]'>{name}</span>
                {accordionOpen ? <span>-</span> : <span>+</span>}
            </button>
            <div
                className={`grid overflow-hidden transition-all
                duration-300 ease-in-out text-slate-600 text-sm
                ${
                    accordionOpen 
                    ? 'grid-rows-[1fr] opacity-100'
                    : 'grid-rows-[0fr] opacity-0'
                }`}
            >
                <p className=' overflow-hidden mt-2 text-secondary text-[14px]'>{description}</p>
            </div>
        </div>
    </motion.div>
  );
};

const Blog = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>Writing</p>
        <h2 className={`${styles.sectionHeadText}`}>Blogs.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
            Just writing about basically anything here. 
        </motion.p>
      </div>

      <div className='mt-10 flex flex-wrap gap-7'>
        {blogs.map((blog, index) => (
          <BlogCard key={`blog-${index}`} index={index} {...blog} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Blog, "blog");
