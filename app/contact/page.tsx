'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin,
    Phone,
    Mail,
    User,
    MessageSquare,
    HelpCircle,
    Send,
    CheckCircle2,
    Loader2,
    Sparkles,
    ArrowRight
} from 'lucide-react';
import Navbar from '@/app/(landing_page)/_components/Navbar';
import Footer from '@/app/(landing_page)/_components/Footer';
import AnimationWrapper from '@/components/AnimationWrapper';
import { toast } from 'sonner';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call delay for premium feel
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
        toast.success('Your message has been sent successfully! We will get back to you soon.');
    };

    const handleReset = () => {
        setFormData({
            fullName: '',
            email: '',
            subject: 'General Inquiry',
            message: ''
        });
        setIsSubmitted(false);
    };

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
                                <Sparkles className="h-4 w-4 text-orange-500" />
                                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Customer Support</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-[#1A202C] mb-6 tracking-tight flex items-center justify-center gap-3">
                                Get in Touch <span className="text-4xl md:text-5xl">📬</span>
                            </h1>
                        </AnimationWrapper>

                        {/* Ornament */}
                        <AnimationWrapper animationType="scaleUp" delay={0.1} className="flex justify-center mb-6">
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
                                Have a question about your tickets, weekly draws, or want to partner with us? We'd love to hear from you.
                            </p>
                        </AnimationWrapper>
                    </div>

                    {/* Main Content Area (Two Columns on Desktop) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">
                        {/* Left Column: Contact Information & FAQ Teaser */}
                        <div className="lg:col-span-5 space-y-8">
                            <AnimationWrapper animationType="fadeRight" delay={0.3}>
                                <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-8 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full pointer-events-none opacity-50" />

                                    <div>
                                        <h3 className="text-2xl font-black text-gray-800 mb-2 tracking-tight">
                                            Contact Information
                                        </h3>
                                        <p className="text-gray-500 text-base font-medium">
                                            Our support team is available to assist you with any inquiries.
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Address */}
                                        <div className="flex items-start gap-4 group">
                                            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FF5722] group-hover:bg-[#FF5722] group-hover:text-white transition-all duration-300 shadow-sm shrink-0 mt-1">
                                                <MapPin className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">
                                                    Mailing Address
                                                </h4>
                                                <p className="text-gray-800 font-bold text-base md:text-lg leading-snug">
                                                    WinaPizza.<br />
                                                    P.O. Box 701,<br />
                                                    Schenectady, NY 12308
                                                </p>
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div className="flex items-start gap-4 group">
                                            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FF5722] group-hover:bg-[#FF5722] group-hover:text-white transition-all duration-300 shadow-sm shrink-0 mt-1">
                                                <Phone className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">
                                                    Phone Number
                                                </h4>
                                                <a href="tel:8333286833" className="text-gray-800 font-bold text-base md:text-lg hover:text-orange-500 transition-colors">
                                                    (833) 328-6833
                                                </a>
                                                <p className="text-xs text-gray-400 mt-0.5">Mon - Fri, 9am - 5pm EST</p>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="flex items-start gap-4 group">
                                            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FF5722] group-hover:bg-[#FF5722] group-hover:text-white transition-all duration-300 shadow-sm shrink-0 mt-1">
                                                <Mail className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">
                                                    Email Support
                                                </h4>
                                                <a href="mailto:support@winapizza.com" className="text-gray-800 font-bold text-base md:text-lg hover:text-orange-500 transition-colors">
                                                    support@winapizza.com
                                                </a>
                                                <p className="text-xs text-gray-400 mt-0.5">Online 24/7, replies within 24h</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AnimationWrapper>

                            {/* FAQ Teaser Card */}
                            <AnimationWrapper animationType="fadeRight" delay={0.4}>
                                <div className="bg-gradient-to-br from-[#FFF5EB] to-[#FFE8D6] p-8 rounded-3xl border border-orange-200/60 shadow-sm relative overflow-hidden">
                                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-300/20 rounded-full blur-xl pointer-events-none" />
                                    <h4 className="text-xl font-black text-gray-800 mb-2">
                                        Looking for quick answers?
                                    </h4>
                                    <p className="text-gray-600 text-sm md:text-base font-medium mb-6 leading-relaxed">
                                        Check out our Frequently Asked Questions for instant information about ticket purchases, weekly draws, and voucher redemptions.
                                    </p>
                                    <Link
                                        href="/faq"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#FF5722] font-bold text-sm rounded-xl shadow-sm hover:bg-orange-50 transition-all duration-300"
                                    >
                                        Visit FAQ Page
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </AnimationWrapper>
                        </div>

                        {/* Right Column: Premium Contact Form */}
                        <div className="lg:col-span-7">
                            <AnimationWrapper animationType="fadeUp" delay={0.3}>
                                <div className="bg-white p-8 md:p-12 rounded-3xl border border-orange-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] relative overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        {!isSubmitted ? (
                                            <motion.form
                                                key="form"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                onSubmit={handleSubmit}
                                                className="space-y-6"
                                            >
                                                <div>
                                                    <h3 className="text-2xl font-black text-gray-800 mb-2 tracking-tight">
                                                        Send us a Message
                                                    </h3>
                                                    <p className="text-gray-500 text-base font-medium mb-8">
                                                        Fill out the form below and our team will get back to you promptly.
                                                    </p>
                                                </div>

                                                {/* Full Name */}
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-800 mb-2 ml-1">
                                                        Full Name
                                                    </label>
                                                    <div className="relative group">
                                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
                                                            <User className="h-5 w-5" />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            name="fullName"
                                                            required
                                                            placeholder="John Doe"
                                                            value={formData.fullName}
                                                            onChange={handleChange}
                                                            className="w-full pl-12 pr-5 py-3.5 bg-[#F8F9FA] border border-orange-100 rounded-2xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 transition-all text-gray-800 placeholder:text-gray-400 font-medium text-base"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Email Address */}
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-800 mb-2 ml-1">
                                                        Email Address
                                                    </label>
                                                    <div className="relative group">
                                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
                                                            <Mail className="h-5 w-5" />
                                                        </div>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            required
                                                            placeholder="john@example.com"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            className="w-full pl-12 pr-5 py-3.5 bg-[#F8F9FA] border border-orange-100 rounded-2xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 transition-all text-gray-800 placeholder:text-gray-400 font-medium text-base"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Subject Dropdown */}
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-800 mb-2 ml-1">
                                                        Subject
                                                    </label>
                                                    <div className="relative group">
                                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
                                                            <HelpCircle className="h-5 w-5" />
                                                        </div>
                                                        <select
                                                            name="subject"
                                                            value={formData.subject}
                                                            onChange={handleChange}
                                                            className="w-full pl-12 pr-5 py-3.5 bg-[#F8F9FA] border border-orange-100 rounded-2xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 transition-all text-gray-800 font-medium text-base appearance-none cursor-pointer"
                                                        >
                                                            <option value="General Inquiry">General Inquiry</option>
                                                            <option value="Ticket / Draw Question">Ticket / Draw Question</option>
                                                            <option value="Voucher Redemption">Voucher Redemption</option>
                                                            <option value="Partnership / Shelter Inquiry">Partnership / Shelter Inquiry</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                                                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Message */}
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-800 mb-2 ml-1">
                                                        Your Message
                                                    </label>
                                                    <div className="relative group">
                                                        <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
                                                            <MessageSquare className="h-5 w-5" />
                                                        </div>
                                                        <textarea
                                                            name="message"
                                                            required
                                                            rows={5}
                                                            placeholder="Tell us how we can help you..."
                                                            value={formData.message}
                                                            onChange={handleChange}
                                                            className="w-full pl-12 pr-5 py-3.5 bg-[#F8F9FA] border border-orange-100 rounded-2xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 transition-all text-gray-800 placeholder:text-gray-400 font-medium text-base resize-none"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Submit Button */}
                                                <div className="pt-2">
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="w-full flex items-center justify-center gap-3 py-4 bg-[#FF5722] text-white font-bold text-lg rounded-2xl shadow-[0_10px_25px_rgba(255,87,34,0.4)] hover:bg-[#F4511E] hover:shadow-[0_15px_30px_rgba(255,87,34,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
                                                    >
                                                        {isSubmitting ? (
                                                            <>
                                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                                Sending Message...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Send className="h-5 w-5" />
                                                                Send Message
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </motion.form>
                                        ) : (
                                            <motion.div
                                                key="success"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="py-16 text-center space-y-6"
                                            >
                                                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mx-auto animate-bounce shadow-sm">
                                                    <CheckCircle2 className="h-10 w-10" />
                                                </div>
                                                <h3 className="text-3xl font-black text-gray-800 tracking-tight">
                                                    Message Sent! 🎉
                                                </h3>
                                                <p className="text-gray-600 text-lg font-medium max-w-md mx-auto leading-relaxed">
                                                    Thank you for reaching out, <span className="font-bold text-gray-800">{formData.fullName}</span>. We have received your message regarding <span className="font-bold text-gray-800">"{formData.subject}"</span> and our support team will respond within 24 hours.
                                                </p>
                                                <div className="pt-4">
                                                    <button
                                                        onClick={handleReset}
                                                        className="px-8 py-4 bg-orange-50 text-[#FF5722] font-bold text-base rounded-2xl hover:bg-orange-100 transition-colors shadow-sm border border-orange-100"
                                                    >
                                                        Send Another Message
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </AnimationWrapper>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ContactPage;
