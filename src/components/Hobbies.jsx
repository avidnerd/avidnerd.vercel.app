import React, { useState } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { 
  sky1, 
  player, 
  playBtn, 
  pauseBtn, 
  nextBtn, 
  prevBtn, 
  cmu, 
  haleakala, 
  hookipa, 
  kilauea, 
  iki, 
  chennai, 
  driving, 
  south, 
  tatte, 
  hackathon, 
  lbi, 
  dream, 
  rainbow, 
  amr, 
  njas, 
  book, 
  pink, 
  naro,
  art1,
  art2,
  art3,
  art4,
  art5,
  art6,
  art7,
  art9,
  art10,
  art11,
  art12,
  frame
} from "../assets";

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

  { 
    id: 5, 
    title: "Snow White", 
    description: "Laufey",
    youtubeUrl: "  https://youtube.com/shorts/MuZtf_dwIxw?si=P_5ZUuFWIcaq8TVf"
  },
  {
    id: 6,
    title: "Good Looking",
    description: "Suki Waterhouse",
    youtubeUrl: "https://youtube.com/shorts/H1p1jH54-8s?si=jGjU1d3KIYIsfddM"
  }
];

const artImages = [
  { id: 1, image: art1, scale: 0.9, inset: "12%" }, // Custom scale and inset for each artwork
  { id: 2, image: art2, scale: 0.85, inset: "12%" },
  { id: 3, image: art3, scale: 0.9, inset: "12%" },
  { id: 4, image: art4, scale: 0.88, inset: "12%" },
  { id: 5, image: art5, scale: 0.9, inset: "12%" },
  { id: 6, image: art6, scale: 0.85, inset: "12%" },
  { id: 7, image: art7, scale: 0.9, inset: "12%" },
  { id: 9, image: art9, scale: 0.88, inset: "12%" },
  { id: 10, image: art10, scale: 0.9, inset: "12%" },
  { id: 11, image: art11, scale: 0.85, inset: "12%" },
  { id: 12, image: art12, scale: 0.9, inset: "12%" },
];


const skyImages = [
  { id: 1, title: "hike in ithaca!", description: "8/10 hike", image: sky1 },
  { id: 2, title: "walking to the sky!", description: "from cmu visit", image: cmu },
  { id: 3, title: "haleakala sunset <3", description: "best sunset i've ever seen 11/10", image: haleakala },
  { id: 4, title: "turtles at ho'okipa beach!", description: "they were chill", image: hookipa },
  { id: 5, title: "kilauea crater lake :o", description: "on kilauea iki trail, 7 mile hike 11/10", image: kilauea },
  { id: 6, title: "me and my brother on the lake!", description: "", image: iki },
  { id: 7, title: "road trip!", description: "from bangalore to chennai with cousins", image: chennai },
  { id: 8, title: "tnjsf 2024", description: "project on detecting drowsiness while driving!", image: driving },
  { id: 9, title: "south mountain", description: "classic, beautiful place 8/10 hike", image: south },
  { id: 10, title: "tatte bakery", description: "realy good bakery in boston", image: tatte },
  { id: 11, title: "hackmhs ix", description: "presenting our project to judges!", image: hackathon },
  { id: 12, title: "long beach island sunrise!", description: "9/10 sunrise", image: lbi },
  { id: 13, title: "sunset at american dream mall", description: "9.2/10 sunset", image: dream },
  { id: 14, title: "rainbow <3", description: "it was so bright and beautiful!", image: rainbow },
  { id: 15, title: "tnjsf 2025", description: "presented my antibiotic resistance research!", image: amr },
  { id: 17, title: "new jersey academy of science", description: "presented my antibiotic research", image: njas },
  { id: 18, title: "book award ceremony!", description: "i got the uchicago book award loll", image: book },
  { id: 19, title: "train station sunrise!", description: "i've never seen clouds so bright pink 9.7/10", image: pink },
  { id: 21, title: "third course at naro!", description: "korean fine dining, probably the best meal i've had in my life", image: naro },
];

const OboeSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const getYouTubeVideoId = (url) => {
    let videoId = null;
    if (url.includes('youtube.com/shorts/')) {
      videoId = url.split('youtube.com/shorts/')[1]?.split('?')[0];
    } else if (url.includes('v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    }
    return videoId;
  };

  const getYouTubeThumbnail = (url) => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  };

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % oboeVideos.length);
    setIsPlaying(false); 
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + oboeVideos.length) % oboeVideos.length);
    setIsPlaying(false); 
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const currentVideo = oboeVideos[currentIndex];
  const videoId = getYouTubeVideoId(currentVideo.youtubeUrl);
  const thumbnail = getYouTubeThumbnail(currentVideo.youtubeUrl);
  
  const scale = 0.65;

  return (
    <div className="mt-10">
      <h3 className="text-white text-[24px] font-bold mb-5">Oboe</h3>
      <p className="text-secondary text-[17px] mb-8">
        I like to make oboe covers in my free time, play this player to see some of my favorite covers!
      </p>
      <div className="relative max-w-2xl" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        <div className="relative w-full">
          <img
            src={player}
            alt="Music Player"
            className="w-full h-auto"
          />

          <div 
            className="absolute top-[6%] left-[6%] right-[6%] bottom-[47%] overflow-hidden"
            style={{

            }}
          >
            {isPlaying && videoId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title={currentVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <div 
                className="w-full h-full cursor-pointer group"
                onClick={togglePlayPause}
              >
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt={currentVideo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#0d1140] to-[#1a1f5e] flex items-center justify-center">
                    <div className="text-center">
                      <svg
                        className="w-12 h-12 mx-auto mb-2 text-secondary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                      </svg>
                      <p className="text-secondary text-xs">YouTube Video</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                    <svg
                      className="w-8 h-8 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>


          <div 
            className="absolute bottom-[29%] left-[10%] right-[10%] text-center"
          >
            <h3 className="text-black font-bold text-[31px] mb-1 truncate">{currentVideo.title}</h3>
            <p className="text-black text-[20px] truncate">{currentVideo.description}</p>
          </div>
          
          <button
            onClick={prevVideo}
            className="absolute bottom-[6%] left-[5%] w-[200px] h-[200px] hover:scale-110 transition-transform cursor-pointer z-10"
            aria-label="Previous video"
          >
            <img src={prevBtn} alt="Previous" className="w-full h-full object-contain" />
          </button>

          <button
            onClick={togglePlayPause}
            className="absolute bottom-[4%] left-1/2 -translate-x-1/2 w-[240px] h-[240px] hover:scale-110 transition-transform cursor-pointer z-10"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <img 
              src={isPlaying ? pauseBtn : playBtn} 
              alt={isPlaying ? "Pause" : "Play"} 
              className="w-full h-full object-contain" 
            />
          </button>

          <button
            onClick={nextVideo}
            className="absolute bottom-[8%] right-[5%] w-[170px] h-[170px] hover:scale-110 transition-transform cursor-pointer z-10"
            aria-label="Next video"
          >
            <img src={nextBtn} alt="Next" className="w-full h-full object-contain" />
          </button>
        </div>
      </div>
    </div>
  );
};

const MemoryAthleticsCard = () => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", 0.2, 0.75)}
      className="w-full max-w-2xl mx-auto"
    >
      <Tilt
        options={{
          max: 25,
          scale: 1,
          speed: 450,
        }}
        className="w-full"
      >
        <div className="bg-tertiary p-8 rounded-2xl">
          <h3 className="text-white text-[28px] font-bold mb-6 text-center">Memory Athletics</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <p className="text-secondary text-[14px] mb-2">Speed Cards</p>
              <p className="text-white text-[24px] font-bold">2:30</p>
              <p className="text-secondary text-[12px] mt-1">52 cards</p>
            </div>
            <div className="text-center">
              <p className="text-secondary text-[14px] mb-2">Binary Numbers</p>
              <p className="text-white text-[24px] font-bold">15:00</p>
              <p className="text-secondary text-[12px] mt-1">1000 digits</p>
            </div>
            <div className="text-center">
              <p className="text-secondary text-[14px] mb-2">Random Words</p>
              <p className="text-white text-[24px] font-bold">10:00</p>
              <p className="text-secondary text-[12px] mt-1">200 words</p>
            </div>
            <div className="text-center">
              <p className="text-secondary text-[14px] mb-2">Numbers</p>
              <p className="text-white text-[24px] font-bold">12:00</p>
              <p className="text-secondary text-[12px] mt-1">500 digits</p>
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const ArtGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextArt = () => {
    setCurrentIndex((prev) => (prev + 1) % artImages.length);
  };

  const prevArt = () => {
    setCurrentIndex((prev) => (prev - 1 + artImages.length) % artImages.length);
  };

  const currentArt = artImages[currentIndex];

  return (
    <div>
      <h3 className="text-white text-[24px] font-bold mb-5">Art Gallery</h3>
      <p className="text-secondary text-[17px] mb-8">
        Click on the artwork to see the next piece
      </p>
      <div className="relative max-w-2xl mx-auto">
        {/* Single frame container */}
        <div className="relative w-full aspect-square cursor-pointer" onClick={nextArt}>
          {/* Frame - base layer */}
          <img
            src={frame}
            alt="Frame"
            className="absolute inset-0 w-full h-full object-contain z-0"
          />
          {/* Art image - overlay on top of frame, positioned to fit inside frame opening */}
          {currentArt && (
            <motion.div
              key={`art-${currentIndex}-${currentArt.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute flex items-center justify-center z-10"
              style={{
                inset: currentArt.inset || "12%",
              }}
            >
              {currentArt.image ? (
                <img
                  src={currentArt.image}
                  alt={`Art ${currentArt.id}`}
                  className="object-contain"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    transform: `scale(${currentArt.scale || 1})`,
                  }}
                  onError={(e) => {
                    console.error(`Failed to load art ${currentArt.id}`);
                    console.error('Image value:', currentArt.image);
                    console.error('Image type:', typeof currentArt.image);
                  }}
                />
              ) : (
                <p className="text-secondary text-sm">Image not found</p>
              )}
            </motion.div>
          )}
        </div>

        {/* Navigation controls */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <button
            onClick={prevArt}
            className="w-12 h-12 rounded-full bg-black-100 hover:bg-opacity-80 flex items-center justify-center transition-all group"
            aria-label="Previous art"
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

          {/* Art indicators */}
          <div className="flex gap-2">
            {artImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? "w-8 bg-white" 
                    : "w-2 bg-secondary bg-opacity-50 hover:bg-opacity-75"
                }`}
                aria-label={`Go to art ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextArt}
            className="w-12 h-12 rounded-full bg-black-100 hover:bg-opacity-80 flex items-center justify-center transition-all group"
            aria-label="Next art"
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
      <h3 className="text-white text-[24px] font-bold mb-5">Adventures!</h3>
      <p className="text-secondary text-[17px] mb-8">
        Pictures from cool stuff I've done and places I've been!
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

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <OboeSection />
        <SkyGallery />
      </div>

      <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-white text-[24px] font-bold mb-5">Memory Athletics</h3>
          <p className="text-secondary text-[17px] mb-8">
            My memory training achievements and times
          </p>
          <MemoryAthleticsCard />
        </div>
        <ArtGallery />
      </div>
    </>
  );
};

export default SectionWrapper(Hobbies, "hobbies");

