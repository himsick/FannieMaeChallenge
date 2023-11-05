import { motion } from "framer-motion";
import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import useMeasure from "react-use-measure";
 
const CARD_WIDTH = 350;
const MARGIN = 20;
const CARD_SIZE = CARD_WIDTH + MARGIN;
 
const BREAKPOINTS = {
  sm: 640,
  lg: 1024,
};
 
const BlogPostCarousel = () => {
  const [ref, { width }] = useMeasure();
  const [offset, setOffset] = useState(0);
 
  const CARD_BUFFER =
    width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1;
 
  const CAN_SHIFT_LEFT = offset < 0;
 
  const CAN_SHIFT_RIGHT =
    Math.abs(offset) < CARD_SIZE * (posts.length - CARD_BUFFER);
 
  const shiftLeft = () => {
    if (!CAN_SHIFT_LEFT) {
      return;
    }
    setOffset((pv) => (pv += CARD_SIZE));
  };
 
  const shiftRight = () => {
    if (!CAN_SHIFT_RIGHT) {
      return;
    }
    setOffset((pv) => (pv -= CARD_SIZE));
  };
 
  return (
    <section className="bg-neutral-100 py-8" ref={ref} id="Suggestions">
      <div className="relative overflow-hidden p-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <h2 className="mb-4 text-4xl">Suggestions</h2>
 
            <div className="flex items-center gap-2">
              <button
                className={`rounded-lg border-[1px] border-neutral-400 bg-white p-1.5 text-2xl transition-opacity ${
                  CAN_SHIFT_LEFT ? "" : "opacity-30"
                }`}
                disabled={!CAN_SHIFT_LEFT}
                onClick={shiftLeft}
              >
                <FiArrowLeft />
              </button>
              <button
                className={`rounded-lg border-[1px] border-neutral-400 bg-white p-1.5 text-2xl transition-opacity ${
                  CAN_SHIFT_RIGHT ? "" : "opacity-30"
                }`}
                disabled={!CAN_SHIFT_RIGHT}
                onClick={shiftRight}
              >
                <FiArrowRight />
              </button>
            </div>
          </div>
          <motion.div
            animate={{
              x: offset,
            }}
            transition={{
              ease: "easeInOut",
            }}
            className="flex"
          >
            {posts.map((post) => {
              return <Post key={post.id} {...post} />;
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
 
const Post = ({ imgUrl, author, title, description, link }) => {
  return (
    <div
      onClick = {() => window.location.href = link}
      className="relative shrink-0 cursor-pointer transition-transform hover:-translate-y-1"
      style={{
        width: CARD_WIDTH,
        marginRight: MARGIN,
      }}
    >
      <img
        src={imgUrl}
        className="mb-3 h-[200px] w-full rounded-lg object-cover"
        alt={`An image for a fake blog post titled ${title}`}
      />
      <span className="rounded-md border-[1px] border-neutral-500 px-1.5 py-1 text-xs uppercase text-neutral-500">
        {author}
      </span>
      <p className="mt-1.5 text-lg font-medium">{title}</p>
      <p className="text-sm text-neutral-500">{description}</p>
    </div>
  );
};
 
export default BlogPostCarousel;
 
const posts = [
  {
    id: 1,
    link: "https://www.equifax.com/personal/education/credit/score/articles/-/learn/how-to-improve-credit-score/#:~:text=Payment%20history%20makes%20up%20a,your%20credit%20utilization%20rate%20low.",
    imgUrl: "https://www.chase.com/content/dam/structured-images/chase-ux/heroimage/primary/personal/credit-card/education/credit-score/seo_cc_what-is-fair-credit-score-11082022.png",
    author: "Equifax",
    title: "How to Improve Your Credit Score",
    description:
      "Learn the basics of how to build credit, how to use credit cards and practice positive credit behavior.",
  },
  {
    id: 2,
    link: "https://pacifichomeloans.com/how-to-improve-your-debt-to-income-ratio-dti/",
    imgUrl: "https://images-ext-1.discordapp.net/external/mj89G3hmnEeDQ1X3Z2ywTNpdYzCJu9RiFOXxRKlI2w4/https/www.mortgagecalculator.org/images/back-end-dti.png?width=1056&height=676",
    author: "Pacific Home Loans",
    title: "How To Improve Your Debt-To-Income Ratio",
    description:
      "Broadly speaking, there are two ways to improve your DTI ratio: Reduce your monthly debt payments, and increase your income.",
  },
  {
    id: 3,
    link: "https://www.amfam.com/resources/articles/at-home/how-to-increase-home-value-for-appraisal",
    imgUrl: "https://media.discordapp.net/attachments/1170668594925944892/1170694895502102580/KAbEmE9NwFP5SR8Bf7cM.png?ex=6559f995&is=65478495&hm=eb397e3cba2f65a11bf38f82ec576d5f53fd2b464935e676c418e4029aa092c0&=&width=1202&height=676",
    author: "American Family Insurance",
    title: "Increasing Your Home Appraisal Value",
    description:
      "Whether youre looking to sell your home or take advantage of the equity youve built up in your home, getting your home appraised is a necessary step of both processes.",
  },
  {
    id: 4,
    link: "https://www.bankrate.com/mortgages/how-to-save-for-a-down-payment/#how-to-save",
    imgUrl: "https://media.discordapp.net/attachments/1170668594925944892/1170695328152952904/51e47734-915d-45c9-93c8-788c0e9f81a8-Down_Payment_WEB.png?ex=6559f9fc&is=654784fc&hm=46d0649b1b5c97d6ed1bf5f04ddfff4c9c000e448af25a58080a721e3101a790&=&width=1020&height=676",
    author: "Bankrate",
    title: "How To Save For A Down Payment",
    description:
      "The down payment is one of the top three hurdles for aspiring homeowners, according to a recent Bankrate survey.",
  },
  {
    id: 5,
    link: "https://www.bankrate.com/real-estate/should-i-buy-house/",
    imgUrl: "https://media.discordapp.net/attachments/1170668594925944892/1170696591577976842/BR-Banking-Should-you-buy-a-house-during-a-recession.png?ex=6559fb29&is=65478629&hm=43c75ee92a8cfe1f895b878daf1d77f62c3605366cc146573f8e4803089e6995&=&width=1202&height=676",
    author: "Bankrate",
    title: "Should You Buy A House? 8 Signs Youre Ready",
    description:
      "Renting gives you the freedom to move when you want, without the responsibilities of homeownership. But at some point, most people yearn for their own home.",
  },
];