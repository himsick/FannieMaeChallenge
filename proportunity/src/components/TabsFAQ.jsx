import { AnimatePresence, motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import React, { useState } from "react";
 
const TabsFAQ = () => {
  const [selected, setSelected] = useState(TABS[0]);
 
  return (
    <section className="overflow-hidden bg-slate-900 px-4 py-12 text-slate-50">
      <Heading />
      <Tabs selected={selected} setSelected={setSelected} />
      <Questions selected={selected} />
    </section>
  );
};
 
const Heading = () => {
  return (
    <>
      <div className="relative z-10 flex flex-col items-center justify-center" id="FAQ">
        <span className="mb-8 bg-gradient-to-r from-indigo-600 to-sky-400 bg-clip-text font-medium text-transparent">
        </span>
        <span className="mb-8 text-5xl font-bold">FAQs</span>
      </div>
 
      <span className="absolute -top-[350px] left-[50%] z-0 h-[500px] w-[600px] -translate-x-[50%] rounded-full bg-gradient-to-r from-violet-600/20 to-indigo-600/20 blur-3xl" />
    </>
  );
};
 
const Tabs = ({ selected, setSelected }) => {
  return (
    <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
      {TABS.map((tab) => (
        <button
          onClick={() => setSelected(tab)}
          className={`relative overflow-hidden whitespace-nowrap rounded-md border-[1px] px-3 py-1.5 text-sm font-medium transition-colors duration-500 ${
            selected === tab
              ? "border-indigo-600 text-slate-50"
              : "border-slate-600 bg-transparent text-slate-400"
          }`}
          key={tab}
        >
          <span className="relative z-10">{tab}</span>
          <AnimatePresence>
            {selected === tab && (
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{
                  duration: 0.5,
                  ease: "backIn",
                }}
                className="absolute inset-0 z-0 bg-gradient-to-r from-indigo-600 to-sky-400"
              />
            )}
          </AnimatePresence>
        </button>
      ))}
    </div>
  );
};
 
const Questions = ({ selected }) => {
  return (
    <div className="mx-auto mt-12 max-w-3xl">
      <AnimatePresence mode="wait">
        {Object.entries(QUESTIONS).map(([tab, questions]) => {
          return selected === tab ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                ease: "backIn",
              }}
              className="space-y-4"
              key={tab}
            >
              {questions.map((q, idx) => (
                <Question key={idx} {...q} />
              ))}
            </motion.div>
          ) : undefined;
        })}
      </AnimatePresence>
    </div>
  );
};
 
const Question = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
 
  return (
    <motion.div
      animate={open ? "open" : "closed"}
      className={`rounded-xl border-[1px] border-slate-700 px-4 transition-colors ${
        open ? "bg-slate-800" : "bg-slate-900"
      }`}
    >
      <button
        onClick={() => setOpen((pv) => !pv)}
        className="flex w-full items-center justify-between gap-4 py-4"
      >
        <span
          className={`text-left text-lg font-medium transition-colors ${
            open ? "text-slate-50" : "text-slate-400"
          }`}
        >
          {question}
        </span>
        <motion.span
          variants={{
            open: {
              rotate: "45deg",
            },
            closed: {
              rotate: "0deg",
            },
          }}
        >
          <FiPlus
            className={`text-2xl transition-colors ${
              open ? "text-slate-50" : "text-slate-400"
            }`}
          />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? "fit-content" : "0px",
          marginBottom: open ? "24px" : "0px",
        }}
        className="overflow-hidden text-slate-400"
      >
        <p>{answer}</p>
      </motion.div>
    </motion.div>
  );
};

export default TabsFAQ;
 
const TABS = ["Credit Score", "Down Payments", "LTV"];
 
const QUESTIONS = {
  "Credit Score": [
    {
      question: "Why is credit score important?",
      answer:
        "Your credit score impacts loan eligibility, interest rates, and the cost of your home loan.",
    },
    {
      question: "How long does it take to improve a credit score?",
      answer:
        "It varies; some see improvements in a few months, while others with major issues may take years.",
    },
    {
      question: "What factors affect my credit score?",
      answer:
        "Payment history, credit utilization, length of credit history, types of credit, and recent credit inquiries.",
    },
    {
      question: "Will canceling credit cards improve my credit score?",
      answer:
        "Not necessarily; it can sometimes hurt it by increasing your credit utilization ratio and shortening your credit history.",
    },
  ],
  "Down Payments": [
    {
      question: "What are the benefits of making a larger down payment?",
      answer:
        "A larger down payment can lower your monthly mortgage payments, reduce or eliminate the need for mortgage insurance, and offer more competitive interest rates.",
    },
    {
      question: "What down payment do I need to buy a house?",
      answer:
        "Typically, homebuyers are recommended to put down 20% of the home purchase price, but some loans allow for as little as 3-5% sometimes.",
    },
    {
      question: "What types of funds can I use for a down payment?",
      answer:
        "You can use savings, investments, gifts from family, or funds from down payment assistance programs. Some retirement accounts also allow you to use money for a first-time home purchase.",
    },
    {
      question: "Are there any drawbacks to putting down a smaller down payment?",
      answer:
        "A smaller down payment often means larger monthly mortgage payments, potentially higher interest rates, and the additional cost of mortgage insurance.",
    },
  ],
  "LTV": [
    {
      question: "What is LTV?",
      answer:
        "The Loan-to-Value (LTV) ratio is the percentage of a property's value that is mortgaged. It's calculated by dividing the mortgage amount by the property's appraised value.",
    },
    {
      question: "Can I still get a loan with a high LTV ratio?",
      answer:
        "Yes, it's possible, but it may come with higher interest rates, and you'll likely be required to purchase PMI, increasing your monthly costs.",
    },
    {
      question: "Can I lower my LTV ratio after purchasing a home?",
      answer:
        "Yes, you can lower your LTV by making larger mortgage payments to reduce the principal or if your home value increases over time.",
    },
    {
      question: "Why is a lower LTV ratio better for homebuyers?",
      answer:
        "A lower LTV ratio can lead to better interest rates, lower mortgage payments, and the elimination of the need for private mortgage insurance (PMI).",
    },
  ],
};