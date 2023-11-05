import { useState } from "react";
import { motion } from "framer-motion";

import {
  SiGithubsponsors,
} from "react-icons/si";

const StackedCardTestimonials = () => {
  const [selected, setSelected] = useState(0);

  return (
    <section className="bg-white py-24 px-4 lg:px-8 grid items-center grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 overflow-hidden" >
      <div className="p-4">
        <h3 className="text-5xl font-semibold">Success Stories From Our Customers</h3>
        <p className="text-slate-500 my-4">
          Hear what our customers had to say after our life changing suggestions!
        </p>
        <SelectBtns
          numTracks={testimonials.length}
          setSelected={setSelected}
          selected={selected}
        />
      </div>
      <Cards
        testimonials={testimonials}
        setSelected={setSelected}
        selected={selected}
      />
    </section>
  );
};

const SelectBtns = ({ numTracks, setSelected, selected }) => {
  return (
    <div className="flex gap-1 mt-8">
      {Array.from(Array(numTracks).keys()).map((n) => {
        return (
          <button
            key={n}
            onClick={() => setSelected(n)}
            className="h-2 w-full bg-slate-300 relative"
          >
            {selected === n ? (
              <motion.span
                className="absolute top-0 left-0 bottom-0 bg-slate-950"
                initial={{
                  width: "0%",
                }}
                animate={{
                  width: "100%",
                }}
                transition={{
                  duration: 5,
                }}
                onAnimationComplete={() => {
                  setSelected(selected === numTracks - 1 ? 0 : selected + 1);
                }}
              />
            ) : (
              <span
                className="absolute top-0 left-0 bottom-0 bg-slate-950"
                style={{
                  width: selected > n ? "100%" : "0%",
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

const Cards = ({ testimonials, selected, setSelected }) => {
  return (
    <div 
    className="p-4 relative h-[450px] lg:h-[500px] shadow-xl"
    id="Testimonials"
    >
      {testimonials.map((t, i) => {
        return (
          <Card
            {...t}
            key={i}
            position={i}
            selected={selected}
            setSelected={setSelected}
          />
        );
      })}
    </div>
  );
};

const Card = ({
  Icon,
  description,
  name,
  title,
  position,
  selected,
  setSelected,
}) => {
  const scale = position <= selected ? 1 : 1 + 0.015 * (position - selected);
  const offset = position <= selected ? 0 : 95 + (position - selected) * 3;
  const background = position % 2 ? "black" : "white";
  const color = position % 2 ? "white" : "black";

  return (
    <motion.div
      initial={false}
      style={{
        zIndex: position,
        transformOrigin: "left bottom",
        background,
        color,
      }}
      animate={{
        x: `${offset}%`,
        scale,
      }}
      whileHover={{
        translateX: position === selected ? 0 : -3,
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      onClick={() => setSelected(position)}
      className="absolute top-0 left-0 w-full min-h-full p-8 lg:p-12 cursor-pointer flex flex-col justify-between"
    >
      <Icon className="text-7xl mx-auto" />
      <p className="text-lg lg:text-xl font-light italic my-8">
        "{description}"
      </p>
      <div>
        <span className="block font-semibold text-lg">{name}</span>
        <span className="block text-sm">{title}</span>
      </div>
    </motion.div>
  );
};

export default StackedCardTestimonials;

const testimonials = [
  {
    Icon: SiGithubsponsors,
    description:
      "Thanks to the guidance I received, focusing on paying down my existing debts significantly improved my debt-to-income ratio, making me a stronger candidate for a mortgage.",
    name: "Russell Jordan",
    title: "Los Angeles, CA",
  },
  {
    Icon: SiGithubsponsors,
    description:
    "Switching to a lower interest credit card helped me manage my debt more effectively, bringing me one step closer to purchasing my dream home.",
    name: "Kyle Poole",
    title: "Washington, DC",
  },
  {
    Icon: SiGithubsponsors,
    description:
    "Adjusting my home search to more affordable options was a tough decision, but it was the right one to fit my financial reality and finally become a homeowner.",
    name: "Victor Vassel",
    title: "San Antonio, TX",
  },
  {
    Icon: SiGithubsponsors,
    description:
    "Increasing my down payment was a challenge, but it paid off by broadening my loan options and helping me secure a lower interest rate.",
    name: "Dillon James",
    title: "Houston, TX",
  },
  {
    Icon: SiGithubsponsors,
    description:
    "While renting longer wasn't my initial plan, it gave me the time needed to save and strengthen my financial position for a future home purchase.",
    name: "Kelly Dinwidde",
    title: "New Orleans, LA",
  },
  {
    Icon: SiGithubsponsors,
    description:
    "By focusing on saving a larger down payment, I not only secured better mortgage terms but also reduced my monthly financial burden.",
    name: "Jayson Brown",
    title: "Boston, MA",
  },
];