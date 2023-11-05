import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useScroll } from './Scroll';

const Hero = () => {
  const scrollToSectionWithOffset = (sectionId, offset = 150) => {
    const section = document.getElementById(sectionId);

    if (section) {
      const targetOffset = section.offsetTop - offset;
      window.scrollTo({ top: targetOffset, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-indigo-500 font-medium">
          Buying a home shouldn't be this difficult.
        </span>
        <h3 className="text-4xl md:text-6xl font-semibold">
          See if you're ready to buy a home.
        </h3>
        <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
          Our product streamlines the homebuying process through algorithms and Generative AI. We also offer suggestions and improvements to start your homeowner journey.
        </p>
        <button 
        onClick={() => scrollToSectionWithOffset("Form")}
        className="bg-indigo-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-indigo-600 active:scale-95"
        >
          Get Started
        </button>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "https://images-ext-1.discordapp.net/external/YK9SRGvLPftW8GUzzpnNUBwWX0Y7NqcRqVJuB0qCgKs/https/www.hrccu.org/wp-content/uploads/2020/05/AdobeStock_135317207-1-1-2048x1314.jpeg?width=1054&height=676",
  },
  {
    id: 2,
    src: "https://images-ext-1.discordapp.net/external/aWKaeClR6pqrHGU1c98L8WC1731mFayOUOzHzoxzCEY/https/files.keepingcurrentmatters.com/content/images/20230531/20230601-the-true-value-of-homeownership.jpg",
  },
  {
    id: 3,
    src: "https://images-ext-1.discordapp.net/external/mpqVfVKS8xH4jW40n0iVEPziDS2qkRLR7STslgc_zFs/https/files.simplifyingthemarket.com/wp-content/uploads/2022/03/15132003/20220316-KCM-Share0.jpg",
  },
  {
    id: 4,
    src: "https://images-ext-2.discordapp.net/external/drqXrEuq_yhyavAZae5nVv4HSXVjIIc1sgQ--_T2iso/https/foyr.com/learn/wp-content/uploads/2022/06/types-of-house-styles-and-homes.jpg?width=1015&height=676",
  },
  {
    id: 5,
    src: "https://images-ext-2.discordapp.net/external/-jPDqrvcft9021DPBjOh3t0DibkcP5ADQ_Y4qMleEK8/https/images7.alphacoders.com/341/341714.jpg?width=1079&height=676",
  },
  {
    id: 6,
    src: "https://images-ext-1.discordapp.net/external/mI6BaU-mH_z3BM3Fk101N8B9PnFEMq9tdMH2cxhTa5A/https/media.architecturaldigest.com/photos/64f71af50a84399fbdce2f6a/16%3A9/w_1920%2Cc_limit/Living%2520with%2520Lolo%2520Photo%2520Credit_%2520Life%2520Created%25204.jpg?width=1202&height=676",
  },
  {
    id: 7,
    src: "https://images-ext-2.discordapp.net/external/mU1r9qEsNGVDKk8YACtFZRo3M1kWlCJlFFfeJX0lEMs/https/www.marthastewart.com/thmb/V7pnAxdXqNg_bLCv8pVO9nMqIoU%3D/750x0/filters%3Ano_upscale%28%29%3Amax_bytes%28150000%29%3Astrip_icc%28%29%3Aformat%28webp%29/hancock-park-home-tour-living-room-full-1020-becfa5fb3a2f4f5ca2afec7b629d5564.jpg",
  },
  {
    id: 8,
    src: "https://images-ext-1.discordapp.net/external/X7KH4suOoPgc6124HrMV7h2y7Xtcz87aAGInvEm4Ans/%3Fresize%3D768%252C525%26ssl%3D1/https/i0.wp.com/rentalbeast.blog/wp-content/uploads/2019/10/pexels-photo-2287310-1.jpeg",
  },
  {
    id: 9,
    src: "https://images-ext-1.discordapp.net/external/V3dOYEi9IcGXdK7XaypdWiUZ9iprQ6Wer3J0BLm2ynI/https/www.resultscleaningco.com/wp-content/uploads/2018/09/residential-Cleaning-Copy-min.jpg",
  },
  {
    id: 10,
    src: "https://images-ext-1.discordapp.net/external/YHTUceQl2psiFIkrb9skYFR9Mv7HzM0mHwecYfwmvbo/%3Fwidth%3D1280%26size%3D1.5/https/images.mansionglobal.com/im-87096909?width=1014&height=676",
  },
  {
    id: 11,
    src: "https://images-ext-1.discordapp.net/external/AZFidYGDAF5uzKCGVc5Kl4iIQcXcZyBIj1GMaRzDZRM/https/cdn.homedsgn.com/wp-content/uploads/2015/03/Rothesay-Bay-House-14-850x566.jpg",
  },
  {
    id: 12,
    src: "https://images-ext-1.discordapp.net/external/ZPSZjK3u0p0va2HL1tBMwp8-JP35U-ckEuUNXmFQ9So/https/cdn-abfdd.nitrocdn.com/HWBLpKXBpvcSLEyhgSVzeCyoPoKnjwjs/assets/images/optimized/rev-b7df9bb/www.lopriore.com/wp-content/uploads/2023/09/New-Homeowners-Insurance-MA.jpg.webp",
  },
  {
    id: 13,
    src: "https://images-ext-1.discordapp.net/external/gHIZ3WqT1V-36WPYyVK_nObI6hIit26dlVB_D761724/https/cdn-hhpmj.nitrocdn.com/KaErNcZOQAAqgppAmUDYPJqFlXIwZFgn/assets/images/optimized/rev-7da213c/www.aldavlaw.com/wp-content/uploads/2023/05/house-owner.jpg",
  },
  {
    id: 14,
    src: "https://images-ext-2.discordapp.net/external/y7xJguWJ7Dym5VUqMoxw4GWTR8MJm1cc5QeibHkH9JE/https/www.breakthroughbasketball.com/hoops/images/shooting-outdoor-hoop.jpg?width=1015&height=676",
  },
  {
    id: 15,
    src: "https://images-ext-2.discordapp.net/external/i9jpWBph_MZpEMNM0wPGvAzirA1Fcl3HPEdUHZ8Q1X8/https/static01.nyt.com/images/2014/05/14/business/14housing-pic2/14housing-pic2-superJumbo.jpg?width=1014&height=676",
  },
  {
    id: 16,
    src: "https://media.discordapp.net/attachments/1170642792809246740/1170668676928786464/declutter-when-moving-64903c974a1f8.png?ex=6559e12a&is=65476c2a&hm=19db3baffa23b014dcf7cfc2213b3bf5f5869b5b80b1ec8ff226e386e8a6e62f&=&width=1014&height=676",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default Hero;