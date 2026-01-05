import { motion } from "framer-motion";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      {/* Spotify Widget */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute top-24 right-4 sm:right-8 z-10"
      >
        <a
          href="https://open.spotify.com/user/31cfles73po3jo4xyqmca2hw4kqa?si=4dd2952a242e4894"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-end gap-1 group"
        >
          <div className="flex items-center gap-2 bg-[#1DB954] hover:bg-[#1ed760] rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            <span className="text-white text-sm font-medium group-hover:scale-105 transition-transform">
              subhi :)
            </span>
          </div>
          <p className="text-secondary text-xs opacity-0 group-hover:opacity-100 transition-opacity text-right whitespace-nowrap">
            take a look at my spotify!
          </p>
        </a>
      </motion.div>

      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#4856f9]' />
          <div className='w-1 sm:h-80 h-40 blue-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hey! I'm <span className='text-[#4856f9]'>Subhi</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I am a student interested in computational biology research, neuroscience, entrepreneurship, and music.<br className='sm:block hidden' />
          </p>
        </div>
      </div>

      <EarthCanvas />

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;