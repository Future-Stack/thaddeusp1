"use client";

import React, { useState, useEffect } from 'react';
import Modal from '@/components/Modal';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import AnimationWrapper from '@/components/AnimationWrapper';

interface WinnerModalProps {
    isOpen: boolean;
    onClose: () => void;
    regionName: string;
    winnerData?: any;
    isLoading?: boolean;
    runDraw?: (data: { eventId: string; method: "MANUAL" }) => void;
    eventId?: string;
}

import { RotateCcw, Mail, Check, X, Gift, Store, Info, Phone, MapPin, Ticket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ViewState = 'selecting' | 'details';
type TabState = 'winner' | 'email';

const WinnerModal: React.FC<WinnerModalProps> = ({ isOpen, onClose, regionName, winnerData, isLoading, runDraw, eventId }) => {
    const [currentView, setCurrentView] = useState<ViewState>('selecting');
    const [activeTab, setActiveTab] = useState<TabState>('winner');

    useEffect(() => {
        if (isOpen) {
            if (isLoading) {
                setCurrentView('selecting');
            } else if (winnerData) {
                setCurrentView('details');
                setActiveTab('winner');

                // Trigger confetti
                const duration = 3 * 1000;
                const animationEnd = Date.now() + duration;
                const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

                const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

                const interval: any = setInterval(function () {
                    const timeLeft = animationEnd - Date.now();

                    if (timeLeft <= 0) {
                        return clearInterval(interval);
                    }

                    const particleCount = 50 * (timeLeft / duration);
                    confetti({
                        ...defaults,
                        particleCount,
                        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                    });
                    confetti({
                        ...defaults,
                        particleCount,
                        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                    });
                }, 250);
            }
        }
    }, [isOpen, isLoading, winnerData]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} className={currentView === 'details' ? "max-w-125" : "max-w-112.5"}>
            <div className={`relative ${currentView === 'details' ? 'p-0' : 'p-10 text-center'}`}>


                <AnimatePresence mode="wait">
                    {currentView === 'selecting' && (
                        <motion.div
                            key="selecting"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                        >
                            <div className="flex justify-center mb-10">
                                <div className="relative w-64 h-64">
                                    <Image
                                        src="/spin.gif"
                                        alt="Spin & Win"
                                        fill
                                        className="object-contain animate-spin"
                                        style={{ animationDuration: '10s' }}
                                    />
                                    <div className="absolute inset-0 bg-orange-400/10 rounded-full blur-3xl animate-pulse" />
                                </div>
                            </div>
                            <h2 className="text-4xl font-black text-[#111827] mb-3 tracking-tight">Hang tight!</h2>
                            <p className="text-gray-500 text-xl font-medium">We're choosing the winner right now.</p>
                        </motion.div>
                    )}

                    {currentView === 'details' && (
                        <motion.div
                            key="details"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white rounded-3xl overflow-hidden"
                        >
                            {/* Header */}
                            <div className="px-6 pt-6 pb-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-2xl">🎊</span>
                                    <h2 className="text-2xl font-black text-gray-900">Winner Selection</h2>
                                </div>
                                <p className="text-gray-400 text-sm font-medium">
                                    {regionName} — Week of April 14-20, 2026
                                </p>
                            </div>

                            {/* Tabs */}
                            <div className="px-6 mb-6">
                                <div className="bg-gray-100 p-1 rounded-2xl flex">
                                    <button
                                        onClick={() => setActiveTab('winner')}
                                        className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${activeTab === 'winner' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
                                    >
                                        Winner Details
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('email')}
                                        className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${activeTab === 'email' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
                                    >
                                        Email Preview
                                    </button>
                                </div>
                            </div>

                            <div className="px-6 pb-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                                {activeTab === 'winner' ? (
                                    <div className="space-y-6">
                                        {/* Winner Card */}
                                        <div className="bg-orange-50/50 border border-orange-100 rounded-4xl p-8 text-center relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                                <Ticket className="w-20 h-20 rotate-12 text-orange-500" />
                                            </div>
                                            <div className="relative inline-block mb-4">
                                                <div className="w-28 h-28 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                                                    <Image
                                                        src={winnerData?.data?.winner?.profileImg || "/user.png"}
                                                        alt="Winner"
                                                        width={112}
                                                        height={112}
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </div>
                                            <h3 className="text-2xl font-black text-gray-900 mb-1">{winnerData?.data?.winner?.fullName}</h3>
                                            <p className="text-gray-500 font-medium mb-6">{winnerData?.data?.winner?.email}</p>

                                            <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-400 font-bold text-sm">Tickets Held:</span>
                                                    <span className="text-orange-600 font-black">N/A</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-400 font-bold text-sm">Winning Entry:</span>
                                                    <span className="text-purple-600 font-black">{winnerData?.data?.winningTicket?.ticketNumber}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-400 font-bold text-sm">Total Entries:</span>
                                                    <span className="text-gray-900 font-black">{winnerData?.data?.totalTickets}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-400 font-bold text-sm">Participants:</span>
                                                    <span className="text-green-500 font-black">{winnerData?.data?.totalParticipants}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Selection Info */}
                                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                                            <h4 className="text-gray-900 font-black text-sm mb-3 flex items-center gap-2">
                                                How the winner was selected:
                                            </h4>
                                            <ul className="space-y-2 text-blue-800 text-sm font-medium">
                                                <li className="flex gap-2">
                                                    <span className="text-blue-400">•</span>
                                                    All {winnerData?.data?.totalTickets} ticket entries were pooled
                                                </li>
                                                <li className="flex gap-2">
                                                    <span className="text-blue-400">•</span>
                                                    Each ticket counted as one entry in the draw
                                                </li>
                                                <li className="flex gap-2">
                                                    <span className="text-blue-400">•</span>
                                                    A random entry was selected: {winnerData?.data?.winningTicket?.ticketNumber}
                                                </li>
                                                <li className="flex gap-2">
                                                    <span className="text-blue-400">•</span>
                                                    {winnerData?.data?.winner?.fullName} is the lucky winner!
                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-black text-gray-900">Email Preview</h3>

                                        <div className="border border-gray-100 rounded-4xl p-6 space-y-6 shadow-sm">
                                            {/* Email Header */}
                                            <div className="space-y-1 text-sm">
                                                <p className="text-gray-400 font-bold">To: <span className="text-gray-600">{winnerData?.data?.winner?.email}</span></p>
                                                <p className="text-gray-400 font-bold">Subject: <span className="text-gray-600">🎉 Congratulations! You Won This Week's Lucky Slice Draw!</span></p>
                                            </div>

                                            {/* Email Body */}
                                            <div className="space-y-6">
                                                <div className="bg-linear-to-br from-orange-50 to-red-50 rounded-3xl p-8 text-center border border-orange-100">
                                                    <div className="flex justify-center mb-4">
                                                        <div className="relative w-20 h-20">
                                                            <Image src="/party.png" alt="Logo" fill className="object-contain" />
                                                        </div>
                                                    </div>
                                                    <h4 className="text-3xl font-black text-[#FF4D00] mb-1">You're a Winner!</h4>
                                                    <p className="text-orange-900 font-bold opacity-70 text-sm">Congratulations, {winnerData?.data?.winner?.fullName}!</p>
                                                </div>

                                                <div className="space-y-4 text-gray-600 text-sm font-medium">
                                                    <p>Dear {winnerData?.data?.winner?.fullName},</p>
                                                    <p>Great news! You've won this week's Lucky Slice draw for the <span className="font-bold text-gray-900">{regionName}</span> region!</p>
                                                </div>

                                                {/* Prize Box */}
                                                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
                                                    <h5 className="text-yellow-800 font-black text-sm mb-2">Your Prize:</h5>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-2xl">🎁</span>
                                                        <div>
                                                            <p className="text-gray-900 font-black">One Large Pizza Voucher</p>
                                                            <p className="text-gray-500 text-xs font-bold">Valid for 30 days from issue date</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* How to Redeem */}
                                                <div className="bg-gray-50 rounded-2xl p-5">
                                                    <h5 className="text-gray-900 font-black text-sm mb-3">How to Redeem:</h5>
                                                    <ul className="space-y-2 text-gray-500 text-xs font-bold">
                                                        <li className="flex gap-2">
                                                            <span className="text-gray-300">•</span>
                                                            Visit Joe's Pizza NYC at the address above
                                                        </li>
                                                        <li className="flex gap-2">
                                                            <span className="text-gray-300">•</span>
                                                            Present this voucher code to the staff
                                                        </li>
                                                        <li className="flex gap-2">
                                                            <span className="text-gray-300">•</span>
                                                            Choose your favorite large pizza
                                                        </li>
                                                        <li className="flex gap-2">
                                                            <span className="text-gray-300">•</span>
                                                            Enjoy your free meal!
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="text-[10px] font-bold text-gray-400 leading-relaxed">
                                                    <p className="mb-4">
                                                        Thank you for participating in Lucky Slice! Remember, every ticket you bought helped feed someone in need through our partner food banks. You've won a pizza AND made a difference in your community!
                                                    </p>
                                                    <p>Want another chance to win? Buy tickets for next week's draw at <span className="text-orange-500 underline">winapizza.com</span></p>
                                                    <p className="mt-4">Lucky Slice Team<br />Making a difference, one slice at a time 🍕</p>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                )}
                            </div>

                            {/* Footer Actions */}
                            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all text-sm"
                                >
                                    Cancel
                                </button>

                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Modal>
    );
};

export default WinnerModal;
