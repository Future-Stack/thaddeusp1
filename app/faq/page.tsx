"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import Navbar from "@/app/(landing_page)/_components/Navbar";
import Footer from "@/app/(landing_page)/_components/Footer";
import AnimationWrapper from "@/components/AnimationWrapper";

const faqs = [
  {
    id: 1,
    category: "general",
    question: "How exactly does Win a Pizza work?",
    answer:
      "You purchase tickets for just $1 each. Every ticket goes into your city's local prize pool. Every Sunday at midnight, one lucky winner is randomly selected per city to win a large pizza voucher from top local spots. Meanwhile, every ticket purchased helps feed someone in need at local homeless shelters!",
  },
  {
    id: 2,
    category: "tickets",
    question: "How much does a ticket cost?",
    answer:
      "Each ticket costs exactly $1.00. You can buy as many tickets as you like to increase your chances of winning while making a larger impact in your community.",
  },
  {
    id: 3,
    category: "impact",
    question: "Where does the money go?",
    answer:
      "We believe in 100% transparency. A portion of every dollar goes directly to feeding someone in need at local homeless shelters, a portion funds the weekly pizza prize for the winner, and the remainder covers platform costs to keep donations flowing smoothly.",
  },
  {
    id: 4,
    category: "tickets",
    question: "How are the winners selected?",
    answer:
      "Our automated system conducts a completely random, provably fair draw every Sunday at midnight. One winner is selected from each city's pool of ticket holders for that active week.",
  },
  {
    id: 5,
    category: "winners",
    question: "How will I know if I win?",
    answer:
      'If you win, you will be notified immediately via email and on your dashboard! Your winning pizza voucher will be available instantly in the "My Vouchers" section of your profile, ready to be redeemed at participating local pizzerias.',
  },
  {
    id: 6,
    category: "general",
    question: "Can I participate from any city?",
    answer:
      "Yes! When you sign up and buy tickets, you are entered into the draw for your specific city or region, ensuring you compete with local participants for local pizza vouchers.",
  },
  {
    id: 7,
    category: "tickets",
    question: "Are my payments secure?",
    answer:
      "Absolutely. We use industry-standard, fully encrypted payment gateways (like Stripe) to ensure your payment details are completely safe and secure at all times.",
  },
  {
    id: 8,
    category: "tickets",
    question: "Can I buy tickets for future weeks?",
    answer:
      "Currently, tickets are purchased for the active weekly draw. Once the Sunday midnight draw concludes, a new weekly pool begins immediately!",
  },
  {
    id: 9,
    category: "impact",
    question: "How do you help homeless shelters?",
    answer:
      "We partner with verified local shelters and food banks in the participating cities. The funds generated from ticket sales are distributed weekly to provide nutritious meals to those experiencing homelessness.",
  },
  {
    id: 10,
    category: "winners",
    question: "How do I redeem my pizza voucher?",
    answer:
      'Simply show the digital voucher code from your "My Vouchers" dashboard at the participating local pizzeria, or apply the code during online checkout with our partner restaurants.',
  },
];

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqId, setOpenFaqId] = useState<number | null>(1); // Default first open

  // Filter FAQs based on category and search query
  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFAF6] font-inter selection:bg-orange-500 selection:text-white">
      <Navbar />

      <main className="grow relative overflow-hidden py-16 md:py-24">
        {/* Background Decorative Elements */}
        <div className="absolute top-20 left-[10%] w-3 h-3 bg-[#FF9D41] rounded-full opacity-50 shadow-[0_0_10px_#FF9D4133] animate-pulse pointer-events-none hidden md:block" />
        <div className="absolute top-40 right-[15%] w-4 h-4 bg-[#FFD45E] rounded-full opacity-40 animate-pulse pointer-events-none hidden md:block" />
        <div className="absolute top-1/3 left-[5%] w-5 h-5 bg-[#FFE8D1] rounded-full opacity-30 pointer-events-none hidden md:block" />
        <div className="absolute bottom-32 right-[8%] w-3 h-3 bg-[#FF7A30] rounded-full opacity-40 animate-pulse pointer-events-none hidden md:block" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          {/* Header Section */}
          <div className="text-center mb-16">
            <AnimationWrapper animationType="fadeUp">
              <h1 className="text-4xl md:text-5xl font-black text-[#1A202C] mb-6 tracking-tight flex items-center justify-center gap-3">
                Frequently Asked Questions{" "}
                <span className="text-4xl md:text-5xl">🍕</span>
              </h1>
            </AnimationWrapper>

            {/* Ornament */}
            <AnimationWrapper
              animationType="scaleUp"
              delay={0.1}
              className="flex justify-center mb-6"
            >
              <div className="w-60 md:w-72 h-5 relative">
                <Image
                  src="/winner/headicon.png"
                  alt="headicon"
                  fill
                  className="object-contain"
                />
              </div>
            </AnimationWrapper>

            <AnimationWrapper animationType="fadeUp" delay={0.2}>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
                Everything you need to know about Win a Pizza, how our weekly
                draws work, and how your tickets make a real impact.
              </p>
            </AnimationWrapper>
          </div>

          {/* FAQs Accordion List */}
          <div className="space-y-4 md:space-y-6 max-w-7xl mx-auto mb-20">
            {filteredFaqs.length === 0 ? (
              <AnimationWrapper
                animationType="fadeUp"
                className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm"
              >
                <HelpCircle className="h-16 w-16 text-orange-300 mx-auto mb-4 animate-bounce" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  No results found
                </h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  We couldn't find any questions matching "{searchQuery}". Try
                  searching with different keywords or browse our categories.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="px-6 py-3 bg-orange-50 text-orange-600 font-bold rounded-xl hover:bg-orange-100 transition-colors"
                >
                  Reset Search
                </button>
              </AnimationWrapper>
            ) : (
              filteredFaqs.map((faq, index) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <AnimationWrapper
                    key={faq.id}
                    animationType="fadeUp"
                    delay={0.1 * (index + 1)}
                  >
                    <div
                      className={`bg-white rounded-2xl md:rounded-3xl border transition-all duration-300 overflow-hidden ${
                        isOpen
                          ? "border-orange-200 shadow-[0_20px_50px_rgba(255,87,34,0.08)] ring-1 ring-orange-500/10"
                          : "border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-orange-100 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
                      }`}
                    >
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4 focus:outline-none group"
                      >
                        <span
                          className={`text-lg md:text-xl font-bold transition-colors ${isOpen ? "text-[#FF5722]" : "text-[#1A202C] group-hover:text-[#FF5722]"}`}
                        >
                          {faq.question}
                        </span>
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isOpen
                              ? "bg-orange-500 text-white rotate-180"
                              : "bg-orange-50 text-orange-500 group-hover:bg-orange-100"
                          }`}
                        >
                          <ChevronDown className="h-5 w-5" />
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 text-gray-600 text-base md:text-lg leading-relaxed border-t border-gray-50/80 mt-2 pt-6 font-normal">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </AnimationWrapper>
                );
              })
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;
