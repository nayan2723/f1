import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';


const PersonalityQuiz = React.lazy(() => import('./PersonalityQuiz.jsx'));

export const PersonalityEntryPoint = () => {
    const [showQuiz, setShowQuiz] = useState(false);
    const [userResult, setUserResult] = useState(null);

    useEffect(() => {
        const fetchMatch = () => {
            try {
                const savedMatch = localStorage.getItem('f1_personality_match');
                if (savedMatch) {
                    const data = JSON.parse(savedMatch);
                    setUserResult(data);
                    injectBadgeIntoDOM(data.matchCode);
                } else {
                    setUserResult(null);
                    document.querySelectorAll('.personality-match-badge').forEach(e => e.remove());
                }
            } catch (e) {
                console.error("Error parsing local personality match", e);
            }
        };

        fetchMatch();

        const handleQuizComplete = () => fetchMatch();
        window.addEventListener('f1_personality_updated', handleQuizComplete);

        return () => {
            window.removeEventListener('f1_personality_updated', handleQuizComplete);
        };
    }, [showQuiz]);

    const injectBadgeIntoDOM = (driverCode) => {
        // Remove existing
        document.querySelectorAll('.personality-match-badge').forEach(e => e.remove());

        // Find driver card native element
        const cardHeader = document.querySelector(`.driver-card[data-code="${driverCode}"] .driver-card-header`);
        if (cardHeader) {
            const badge = document.createElement('div');
            badge.className = 'personality-match-badge absolute -top-3 -right-3 bg-f1-red text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg border-[1.5px] border-[#111] animate-pulse whitespace-nowrap z-10 flex items-center gap-1 uppercase tracking-widest';
            badge.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> YOUR MATCH`;
            cardHeader.style.position = 'relative';
            cardHeader.appendChild(badge);
        }
    };

    return (
        <>
            <div className="mb-10 p-1 rounded-[24px] bg-gradient-to-br from-f1-red/40 via-white/5 to-transparent relative shadow-[0_0_40px_rgba(232,0,45,0.15)] transition-all hover:shadow-[0_0_60px_rgba(232,0,45,0.25)] group">
                <div className="absolute inset-0 rounded-[24px] bg-[#0a0a0f]/60 backdrop-blur-xl"></div>
                <div className="relative z-10 p-6 md:p-8 rounded-[20px] bg-gradient-to-b from-white/5 to-transparent border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
                    {/* Background Glow */}
                    <motion.div
                        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/2 -left-20 w-64 h-64 bg-f1-red/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none group-hover:bg-f1-red/30 transition-colors duration-500"
                    ></motion.div>

                    <div className="flex items-center gap-5 text-left w-full md:w-auto relative z-10">
                        <div className="p-4 bg-gradient-to-br from-f1-red/20 to-transparent rounded-2xl hidden sm:flex items-center justify-center border border-f1-red/30 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]">
                            <Target className="w-8 h-8 text-f1-red drop-shadow-[0_0_8px_rgba(232,0,45,0.8)]" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-[-0.05em] text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 [font-family:'Orbitron',sans-serif]">
                                Which Driver Are You?
                            </h2>
                            <p className="text-gray-400 mt-2 max-w-lg text-sm md:text-[15px] leading-relaxed font-light">
                                {userResult ? `Your racing DNA mapped to ${userResult.matchCode}. Take the test again to recalculate your telemetry profile?` : `Take our algorithmic personality test to discover your racing DNA and find your exact match on the 2026 grid.`}
                            </p>
                        </div>
                    </div>

                    <motion.button
                        onClick={() => setShowQuiz(true)}
                        whileHover={{ scale: 1.03, boxShadow: '0 8px 40px rgba(232,0,45,0.7)' }}
                        whileTap={{ scale: 0.96 }}
                        className="relative z-10 w-full md:w-auto shrink-0 px-8 py-4 bg-f1-red hover:bg-[#ff1a1a] text-white font-bold uppercase tracking-[0.2em] text-[13px] rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(232,0,45,0.4)] border border-white/20 overflow-hidden group/btn"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {userResult ? 'Retake Telemetry' : 'Commence Analysis'}
                            <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </span>
                        {/* Button Shine Effect */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]"></div>
                    </motion.button>
                </div>
            </div>

            {
                showQuiz && (
                    <Suspense fallback={<div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0f]/90 backdrop-blur-sm"><div className="w-12 h-12 border-4 border-white/10 border-t-f1-red rounded-full animate-spin"></div></div>}>
                        <PersonalityQuiz onClose={() => setShowQuiz(false)} />
                    </Suspense>
                )
            }
        </>
    );
};
