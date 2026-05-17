"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
    FileText,
    ShieldCheck,
    Ticket,
    Gift,
    HeartHandshake,
    UserCheck,
    Scale,
    RefreshCw,
    CheckCircle2,
} from "lucide-react";
import Navbar from "@/app/(landing_page)/_components/Navbar";
import Footer from "@/app/(landing_page)/_components/Footer";
import AnimationWrapper from "@/components/AnimationWrapper";

const termsSections = [
    {
        id: "acceptance",
        title: "1. Acceptance of Terms",
        icon: FileText,
        content:
            'By accessing, registering, or using the Win a Pizza platform ("Service"), you agree to be bound by these Terms and Conditions. If you do not agree to all the terms and conditions, you must not access or use the platform. We recommend saving or printing a copy of these terms for your records.',
    },
    {
        id: "eligibility",
        title: "2. Eligibility & Participation",
        icon: UserCheck,
        content:
            "Participation in Win a Pizza draws is open only to individuals who are at least 18 years of age (or the age of legal majority in your residing jurisdiction). By purchasing a ticket, you warrant that you meet these eligibility requirements and that your participation complies with all applicable local, state, and national laws.",
    },
    {
        id: "tickets",
        title: "3. Ticket Purchases & Weekly Draws",
        icon: Ticket,
        content:
            "Tickets are priced at $1.00 each. All ticket purchases are final, non-refundable, and enter the purchaser into the active weekly draw for their designated city or region. Draws conclude every Sunday at midnight, at which point the automated selection process begins immediately. You may purchase multiple tickets to increase your chances of winning and your community contribution.",
    },
    {
        id: "winners",
        title: "4. Winner Selection & Prize Vouchers",
        icon: Gift,
        content:
            "Winners are chosen using a provably fair, automated random selection algorithm from the pool of eligible tickets for that week's draw. Winning prizes are issued exclusively as digital pizza vouchers redeemable at participating local partner restaurants. Vouchers hold no cash value, cannot be exchanged for money, cannot be resold, and must be redeemed within the specified validity period stated on the voucher.",
    },
    {
        id: "impact",
        title: "5. Community Impact & Donations",
        icon: HeartHandshake,
        content:
            "Win a Pizza is dedicated to supporting local communities. A designated portion of the proceeds from every ticket sold is allocated directly to partner homeless shelters and food banks to provide nutritious meals for those in need. Win a Pizza guarantees transparent accounting and regular updates regarding all charitable distributions on our platform.",
    },
    {
        id: "security",
        title: "6. Account Security & Conduct",
        icon: ShieldCheck,
        content:
            "Users are responsible for safeguarding their login credentials and for all activities that occur under their account. We reserve the right to disqualify any participant or suspend/terminate any account suspected of tampering with the entry process, engaging in fraudulent payment practices, using automated bots, or violating the spirit of these Terms.",
    },
    {
        id: "liability",
        title: "7. Limitation of Liability",
        icon: Scale,
        content:
            "To the maximum extent permitted by applicable law, Win a Pizza, its founders, and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from the use or inability to use the Service, unauthorized access to your account, or any failure of performance, quality, or service provided by partner restaurants.",
    },
    {
        id: "changes",
        title: "8. Modifications to Terms",
        icon: RefreshCw,
        content:
            'We reserve the right, at our sole discretion, to modify or replace these Terms at any time. When we make material changes, we will update the "Last Updated" date at the top of this page. Your continued use of the platform following the posting of any changes constitutes your explicit acceptance of those changes.',
    },
];

const TermsPage = () => {
    const [activeSection, setActiveSection] = useState("acceptance");
    const isScrollingRef = useRef(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const scrollToSection = (id: string) => {
        setActiveSection(id);
        isScrollingRef.current = true;

        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
            isScrollingRef.current = false;
        }, 1000);

        const element = document.getElementById(id);
        if (element) {
            const yOffset = -120;
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (isScrollingRef.current) return;

            // Check if user reached the absolute bottom of the page
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
                setActiveSection(termsSections[termsSections.length - 1].id);
                return;
            }

            if (window.scrollY < 100) {
                setActiveSection(termsSections[0].id);
                return;
            }

            const scrollPosition = window.scrollY + 200;
            const sections = termsSections.map((s) => document.getElementById(s.id));

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section) {
                    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
                    if (sectionTop <= scrollPosition) {
                        setActiveSection(termsSections[i].id);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-[#FFFAF6] font-inter selection:bg-orange-500 selection:text-white">
            <Navbar />

            <main className="grow relative py-16 md:py-24">
                {/* Background Decorative Elements Container */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-20 left-[10%] w-3 h-3 bg-[#FF9D41] rounded-full opacity-50 shadow-[0_0_10px_#FF9D4133] animate-pulse hidden md:block" />
                    <div className="absolute top-40 right-[15%] w-4 h-4 bg-[#FFD45E] rounded-full opacity-40 animate-pulse hidden md:block" />
                    <div className="absolute top-1/2 left-[5%] w-5 h-5 bg-[#FFE8D1] rounded-full opacity-30 hidden md:block" />
                    <div className="absolute bottom-32 right-[8%] w-3 h-3 bg-[#FF7A30] rounded-full opacity-40 animate-pulse hidden md:block" />
                </div>

                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <AnimationWrapper animationType="fadeUp">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-orange-100 mb-6">
                                <CheckCircle2 className="h-4 w-4 text-orange-500" />
                                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                                    Legal Agreement
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-[#1A202C] mb-6 tracking-tight flex items-center justify-center gap-3">
                                Terms & Conditions{" "}
                                <span className="text-4xl md:text-5xl">📜</span>
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
                            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed mb-6">
                                Please read these Terms and Conditions carefully before
                                participating in Win a Pizza draws or using our platform.
                            </p>
                        </AnimationWrapper>
                    </div>

                    {/* Main Content Area with Desktop Sidebar */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">
                        {/* Sticky Navigation Sidebar (Desktop) */}
                        <div className="lg:col-span-4 sticky top-28 hidden lg:block self-start z-20">
                            <AnimationWrapper animationType="fadeRight" delay={0.3}>
                                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-2">
                                    <h3 className="text-lg font-black text-gray-800 mb-6 px-4 flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-orange-500" />
                                        Quick Navigation
                                    </h3>
                                    <nav className="space-y-1">
                                        {termsSections.map((section) => {
                                            const Icon = section.icon;
                                            const isActive = activeSection === section.id;
                                            return (
                                                <button
                                                    key={section.id}
                                                    onClick={() => scrollToSection(section.id)}
                                                    className={`w-full text-left px-5 py-3.5 rounded-2xl font-bold text-sm transition-all flex items-center gap-3 ${
                                                        isActive
                                                            ? "bg-orange-50 text-[#FF5722] shadow-sm translate-x-1"
                                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                    }`}
                                                >
                                                    <Icon
                                                        className={`h-4 w-4 shrink-0 transition-colors ${isActive ? "text-[#FF5722]" : "text-gray-400"}`}
                                                    />
                                                    <span className="truncate">{section.title}</span>
                                                </button>
                                            );
                                        })}
                                    </nav>
                                </div>
                            </AnimationWrapper>
                        </div>

                        {/* Terms Sections Content */}
                        <div className="lg:col-span-8 space-y-8">
                            {termsSections.map((section, index) => {
                                const Icon = section.icon;
                                return (
                                    <AnimationWrapper
                                        key={section.id}
                                        animationType="fadeUp"
                                        delay={0.1 * (index + 1)}
                                    >
                                        <div
                                            id={section.id}
                                            className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-orange-100 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 group scroll-mt-28"
                                        >
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center group-hover:bg-[#FF5722] group-hover:text-white text-[#FF5722] transition-all duration-300 shadow-sm shrink-0">
                                                    <Icon className="h-6 w-6" />
                                                </div>
                                                <h2 className="text-2xl md:text-3xl font-bold text-[#1A202C] tracking-tight">
                                                    {section.title}
                                                </h2>
                                            </div>
                                            <p className="text-gray-600 text-base md:text-lg leading-relaxed font-normal border-t border-gray-50 pt-6">
                                                {section.content}
                                            </p>
                                        </div>
                                    </AnimationWrapper>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TermsPage;
