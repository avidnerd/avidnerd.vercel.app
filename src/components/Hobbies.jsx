import React, { useState } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { sky1 } from "../assets";

const oboeVideos = [
  { 
    id: 1, 
    title: "A Thousand Years", 
    description: "Christina Perri",
    youtubeUrl: "https://youtube.com/shorts/mvpRuf0koTE?si=TXl3x_Xh86Jkc-OO"
  },
  { 
    id: 2, 
    title: "Can't Help Falling in Love", 
    description: "Elvis Presley",
    youtubeUrl: "https://youtube.com/shorts/Ra3btbkB7TA?si=WNleiuGhZuuPJOVi"
  },
  { 
    id: 3, 
    title: "Lover Girl", 
    description: "Laufey",
    youtubeUrl: "https://youtube.com/shorts/K3MfepI0gQQ?si=_11OKSuAR_pGSmyg"
  },
  { 
    id: 4, 
    title: "Love Me Not", 
    description: "Ravyn Lenae",
    youtubeUrl: "https://youtube.com/shorts/smg-XFrX0ZE?si=j8mbf9rDy1Kmtytt"
  },
];

const memoryStats = [
  {
    id: 1,
    title: "Speed Cards",
    value: "52 cards",
    time: "2:30",
    description: "Memorized a full deck in 2 minutes 30 seconds",
    color: "blue-text-gradient",
  },
  {
    id: 2,
    title: "Binary Numbers",
    value: "1000 digits",
    time: "15:00",
    description: "Memorized 1000 binary digits in 15 minutes",
    color: "green-text-gradient",
  },
  {
    id: 3,
    title: "Random Words",
    value: "200 words",
    time: "10:00",
    description: "Memorized 200 random words in 10 minutes",
    color: "pink-text-gradient",
  },
  {
    id: 4,
    title: "Numbers",
    value: "500 digits",
    time: "12:00",
    description: "Memorized 500 random digits in 12 minutes",
    color: "orange-text-gradient",
  },
];


const skyImages = [
  { id: 1, title: "hike in ithaca!", description: "8/10 hike", image: sky1 },
];

const OboeSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getYouTubeThumbnail = (url) => {
    let videoId = null;
    if (url.includes('youtube.com/shorts/')) {
      videoId = url.split('youtube.com/shorts/')[1]?.split('?')[0];
    } else if (url.includes('v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    }
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  };

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % oboeVideos.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + oboeVideos.length) % oboeVideos.length);
  };

  const currentVideo = oboeVideos[currentIndex];
  const thumbnail = getYouTubeThumbnail(currentVideo.youtubeUrl);

  return (
    <div className="mt-10">
      <h3 className="text-white text-[24px] font-bold mb-5">Oboe</h3>
      <div className="relative max-w-2xl mx-auto">
        {/* Walkman-style container */}
        <div className="bg-tertiary rounded-3xl p-8 shadow-card border-2 border-secondary border-opacity-20">
          {/* Video display area */}
          <div className="relative w-full h-[300px] mb-6 rounded-xl overflow-hidden bg-black">
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={currentVideo.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#0d1140] to-[#1a1f5e] flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-20 h-20 mx-auto mb-3 text-secondary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                  </svg>
                  <p className="text-secondary text-sm">YouTube Video</p>
                </div>
              </div>
            )}
            {/* Play button overlay */}
            <div 
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-40 transition-all cursor-pointer"
              onClick={() => window.open(currentVideo.youtubeUrl, "_blank")}
            >
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity shadow-lg">
                <svg
                  className="w-10 h-10 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Video info */}
          <div className="text-center mb-6">
            <h3 className="text-white font-bold text-[24px] mb-2">{currentVideo.title}</h3>
            <p className="text-secondary text-[16px]">{currentVideo.description}</p>
          </div>

          {/* Navigation controls - Walkman style */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={prevVideo}
              className="w-12 h-12 rounded-full bg-black-100 hover:bg-opacity-80 flex items-center justify-center transition-all group"
              aria-label="Previous video"
            >
              <svg
                className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Video indicators */}
            <div className="flex gap-2">
              {oboeVideos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? "w-8 bg-white" 
                      : "w-2 bg-secondary bg-opacity-50 hover:bg-opacity-75"
                  }`}
                  aria-label={`Go to video ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextVideo}
              className="w-12 h-12 rounded-full bg-black-100 hover:bg-opacity-80 flex items-center justify-center transition-all group"
              aria-label="Next video"
            >
              <svg
                className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MemoryAthleticsCard = ({ stat, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      className="w-full sm:w-[280px]"
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
          className="bg-tertiary p-6 rounded-2xl cursor-pointer h-[200px] relative"
          onClick={() => setIsFlipped(!isFlipped)}
          style={{ perspective: "1000px" }}
        >
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative w-full h-full"
          >
            {/* Front */}
            <div
              className="absolute inset-0"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            >
              <h3 className={`text-[24px] font-bold ${stat.color} mb-2`}>
                {stat.title}
              </h3>
              <p className="text-white text-[32px] font-bold mb-2">{stat.value}</p>
              <p className="text-secondary text-[16px]">{stat.time}</p>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <h3 className={`text-[24px] font-bold ${stat.color} mb-4`}>
                {stat.title}
              </h3>
              <p className="text-secondary text-[14px] leading-relaxed">
                {stat.description}
              </p>
            </div>
          </motion.div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const SkyGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % skyImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + skyImages.length) % skyImages.length);
  };

  const currentSkyImage = skyImages[currentIndex];

  return (
    <div className="mt-10">
      <h3 className="text-white text-[24px] font-bold mb-5">Sky Gallery</h3>
      <p className="text-secondary text-[17px] mb-8">
        A collection of sky pictures from my walks
      </p>
      <div className="relative max-w-2xl mx-auto">
        {/* Carousel container */}
        <div className="bg-tertiary rounded-3xl p-8 shadow-card border-2 border-secondary border-opacity-20">
          {/* Image display area */}
          <div 
            className="relative w-full h-[300px] mb-6 rounded-xl overflow-hidden bg-black cursor-pointer"
            onClick={() => setSelectedImage(currentSkyImage)}
          >
            {currentSkyImage.image ? (
              <img
                src={currentSkyImage.image}
                alt={currentSkyImage.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#0d1140] via-[#1a1f5e] to-[#2d3570] flex items-center justify-center">
                <p className="text-secondary text-sm text-center px-4">
                  {currentSkyImage.title}
                </p>
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all flex items-center justify-center">
              <p className="text-white opacity-0 hover:opacity-100 transition-opacity text-sm bg-black bg-opacity-50 px-3 py-1 rounded">
                Click to view full size
              </p>
            </div>
          </div>

          {/* Image info */}
          <div className="text-center mb-6">
            <h3 className="text-white font-bold text-[20px] mb-2">{currentSkyImage.title}</h3>
            <p className="text-secondary text-[14px]">{currentSkyImage.description}</p>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={prevImage}
              className="w-12 h-12 rounded-full bg-black-100 hover:bg-opacity-80 flex items-center justify-center transition-all group"
              aria-label="Previous image"
            >
              <svg
                className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Image indicators */}
            <div className="flex gap-2">
              {skyImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? "w-8 bg-white" 
                      : "w-2 bg-secondary bg-opacity-50 hover:bg-opacity-75"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextImage}
              className="w-12 h-12 rounded-full bg-black-100 hover:bg-opacity-80 flex items-center justify-center transition-all group"
              aria-label="Next image"
            >
              <svg
                className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Modal for selected image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-4xl w-full bg-tertiary rounded-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-[500px] rounded-xl overflow-hidden mb-4">
              {selectedImage.image ? (
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#0d1140] via-[#1a1f5e] to-[#2d3570] flex items-center justify-center">
                  <p className="text-white text-xl">{selectedImage.title}</p>
                </div>
              )}
            </div>
            <p className="text-secondary text-center">{selectedImage.description}</p>
            <button
              onClick={() => setSelectedImage(null)}
              className="mt-4 w-full bg-black-100 text-white py-2 rounded-lg hover:bg-opacity-80 transition-all"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

const Hobbies = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>Personal Interests</p>
        <h2 className={`${styles.sectionHeadText}`}>Hobbies.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Here are some of my hobbies and interests outside of coding and research.
        </motion.p>
      </div>

      {/* Oboe Videos and Sky Gallery - Side by Side */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <OboeSection />
        <SkyGallery />
      </div>

      {/* Memory Athletics */}
      <div className="mt-20">
        <h3 className="text-white text-[24px] font-bold mb-5">Memory Athletics</h3>
        <p className="text-secondary text-[17px] mb-8">
          Click on the cards to see more details about my memory training achievements
        </p>
        <div className="flex flex-wrap gap-7 justify-center">
          {memoryStats.map((stat, index) => (
            <MemoryAthleticsCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Hobbies, "hobbies");

