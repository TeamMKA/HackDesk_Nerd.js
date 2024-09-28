/* eslint-disable react/prop-types */

import { useState } from "react";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
      >
        <span className="text-lg font-medium text-gray-800">{question}</span>
        <svg
          className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && <p className="text-gray-600 py-2">{answer}</p>}
    </div>
  );
};

const FaqSection = () => {
  const faqs = [
    {
      question: "Can your SaaS platform make coffee?",
      answer:
        "While our platform can do many amazing things, it can definitely wake you up with a jolt of productivity!",
    },
    {
      question: "Will using your SaaS platform turn me into a tech wizard?",
      answer:
        "Yes! Our easy-to-use platform will make you feel like a wizard in no time.",
    },
    {
      question: "Is your platform compatible with unicorn browsers?",
      answer:
        "Absolutely! Our platform supports all modern browsers, including the rare and mythical unicorn ones.",
    },
    {
      question: "How secure is your SaaS platform?",
      answer:
        "Security is our top priority. We use advanced security protocols to ensure your data is safe.",
    },
    {
      question: "Can your platform help me find my missing sock?",
      answer:
        "While we excel at data analytics and productivity tools, you might still need to check under the bed for that missing sock.",
    },
    {
      question: "Is there a secret handshake for platform users?",
      answer:
        "Not yet, but we are working on it! Stay tuned for exclusive community perks.",
    },
  ];

  return (
    <section className="bg-inherit ">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          FAQ
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
