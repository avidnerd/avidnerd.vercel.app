import React, { useState } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { awards } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const AwardCard = ({ award, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.1, 0.75)}
      className="w-full sm:w-[200px]"
    >
      <Tilt
        options={{
          max: 25,
          scale: 1,
          speed: 450,
        }}
        className="w-full"
      >
        <div
          className="relative w-[200px] h-[200px] mx-auto cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
          style={{ perspective: "1000px" }}
        >
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative w-full h-full"
          >
            {/* Front - Gold Coin/Medal */}
            <div
              className="absolute inset-0 rounded-full flex flex-col items-center justify-center p-4"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                background: "linear-gradient(135deg, #f4d03f 0%, #f39c12 50%, #d68910 100%)",
                boxShadow: "0 10px 30px rgba(212, 175, 55, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.2)",
                border: "4px solid #f4d03f",
              }}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 flex items-center justify-center shadow-lg">
                  <svg
                    className="w-10 h-10 text-yellow-800"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h3 className="text-yellow-900 font-bold text-[14px] leading-tight">
                  {award.title}
                </h3>
                {award.issuer && (
                  <p className="text-yellow-800 text-[10px] mt-1">{award.issuer}</p>
                )}
                {award.date && (
                  <p className="text-yellow-700 text-[9px] mt-1">{award.date}</p>
                )}
              </div>
            </div>

            {/* Back - Description */}
            <div
              className="absolute inset-0 rounded-full flex flex-col items-center justify-center p-4 overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                background: "linear-gradient(135deg, #f4d03f 0%, #f39c12 50%, #d68910 100%)",
                boxShadow: "0 10px 30px rgba(212, 175, 55, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.2)",
                border: "4px solid #f4d03f",
              }}
            >
              <div className="text-center px-2">
                <h3 className="text-yellow-900 font-bold text-[12px] mb-2">
                  {award.title}
                </h3>
                <p className="text-yellow-800 text-[10px] leading-relaxed">
                  {award.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Awards = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>Achievements</p>
        <h2 className={`${styles.sectionHeadText}`}>Awards.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Click on any award to see more details
        </motion.p>
      </div>

      <div className="mt-10 flex flex-wrap gap-7 justify-center">
        {awards.map((award, index) => (
          <AwardCard key={`award-${index}`} award={award} index={index} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Awards, "awards");

