"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    question: "What is Melon?",
    answer:
      "Melon is a food transparency app that helps you better understand the products you buy. Simply scan a barcode to receive a personalized health score, ingredient and additive insights, dietary compatibility, and healthier alternatives, all in seconds.",
  },
  {
    question: "How does the Melon Score work?",
    answer:
      "The Melon Score evaluates products across nutrition, additives, and processing. Nutrition makes up 50% of the score, additives make up 30%, and processing makes up 20%. Certain high-risk additives or highly processed products may also limit the maximum score so important concerns are not overlooked.",
  },
  {
    question: "Why is a product with good nutrition scored lower than expected?",
    answer:
      "Good nutrition is only part of the picture. A product may still receive a lower score if it contains high-risk additives, is heavily ultra-processed, or belongs to categories that require stricter evaluation. Melon is designed to look beyond the nutrition label.",
  },
  {
    question: "Is Melon only for healthy eaters?",
    answer:
      "Not at all. Whether you are trying to eat healthier, avoid certain additives, shop for your family, follow a Halal or Kosher diet, manage allergies, or simply become more informed about your food, Melon is built for everyone.",
  },
  {
    question: "Can I trust the information in Melon?",
    answer:
      "Melon combines data from trusted food databases, scientific literature, regulatory agencies, and independent research. Every ingredient and additive is researched using publicly available evidence before being included in our database. Melon is intended for informational and educational purposes only and should not be considered medical, nutritional, or professional advice.",
  },
  {
    question: "Does Melon tell me what I should or should not eat?",
    answer:
      "No. Melon is designed to provide transparent information, not to tell you what to eat. Our goal is to explain what is in your food and present available research so you can make informed decisions based on your own preferences, goals, and values.",
  },
  {
    question: "What are Local Sources?",
    answer:
      "Local Sources helps you discover nearby businesses that align with your preferences, including farmers markets, farms, butchers, healthy grocery stores, specialty shops, and other local food providers. It is designed to make healthier shopping easier beyond the grocery aisle.",
  },
  {
    question: "What if a product is not in your database?",
    answer:
      "You can report missing products directly within the app. Our team reviews submissions and continuously expands the database to improve coverage and accuracy.",
  },
  {
    question: "Is Melon free?",
    answer:
      "Yes. Melon offers a free version with core scanning features. A premium subscription unlocks additional features such as unlimited scans, advanced personalization, Local Sources, and future premium features as they become available.",
  },
  {
    question: "How is Melon different from other food scanner apps?",
    answer:
      "Most food scanner apps focus primarily on nutrition labels. Melon goes further by evaluating nutrition, additives, and processing while personalizing results based on your dietary preferences, allergies, and lifestyle. Rather than simply assigning a score, Melon explains why a product received its score and helps you discover healthier alternatives and local food sources.",
  },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-[32px] border border-melon-100 bg-white shadow-card">
      {faqs.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div key={item.question} className="border-b border-zinc-100 last:border-b-0">
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition hover:bg-melon-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-melon-500 sm:px-8"
            >
              <span className="text-lg font-black tracking-tight text-ink sm:text-xl">{item.question}</span>
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-melon-100 text-xl font-black text-melon-700 transition">
                {isOpen ? "-" : "+"}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-base leading-8 text-zinc-600 sm:px-8">{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
