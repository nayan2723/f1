import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { X, ChevronRight, Share2, Download, Target, Wrench } from 'lucide-react';
import html2canvas from 'html2canvas';
import { questions, driverTraitMatrix, initialUserTraits, driverDescriptions } from '../personality-data.js';


// Cosine Similarity Algorithm
function cosineSimilarity(vecA, vecB) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (const key in vecA) {
        dotProduct += vecA[key] * vecB[key];
        normA += vecA[key] ** 2;
        normB += vecB[key] ** 2;
    }
    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Custom SVG Radar Chart for 0 Dependency overhead
const RadarChart = ({ traits, driverColor }) => {
    const size = 200;
    const center = size / 2;
    const radius = 80;
    const numAxes = 5;
    const angleStep = (Math.PI * 2) / numAxes;

    const traitKeys = ['aggression', 'consistency', 'technical', 'risk', 'adaptability'];
    const traitLabels = ['Aggression', 'Consistency', 'Technical', 'Risk', 'Adaptability'];

    // Calculate point coordinates
    const getPoint = (value, index) => {
        // scale value 0-100 to 0-radius
        const r = (value / 100) * radius;
        // rotate by -PI/2 to start at top
        const angle = index * angleStep - Math.PI / 2;
        return {
            x: center + r * Math.cos(angle),
            y: center + r * Math.sin(angle)
        };
    };

    const points = traitKeys.map((key, i) => {
        // CLamp between 0 and 100
        const val = Math.max(0, Math.min(100, traits[key] || 50));
        return getPoint(val, i);
    });

    const polygonPath = points.map(p => `${p.x},${p.y}`).join(' ');

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
                {/* Draw Background Web */}
                {[1, 0.75, 0.5, 0.25].map(scale => {
                    const webPoints = [0, 1, 2, 3, 4].map(i => {
                        const r = radius * scale;
                        const angle = i * angleStep - Math.PI / 2;
                        return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
                    }).join(' ');
                    return <polygon key={scale} points={webPoints} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                })}
                {/* Draw Axes */}
                {[0, 1, 2, 3, 4].map(i => {
                    const angle = i * angleStep - Math.PI / 2;
                    return (
                        <line key={i} x1={center} y1={center} x2={center + radius * Math.cos(angle)} y2={center + radius * Math.sin(angle)} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                    )
                })}
                {/* Draw Data Polygon */}
                <motion.polygon
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.8, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                    points={polygonPath}
                    fill={driverColor || "rgba(232, 0, 45, 0.4)"}
                    stroke={driverColor || "#E8002D"}
                    strokeWidth="2"
                />
                {/* Draw Labels */}
                {traitLabels.map((label, i) => {
                    const angle = i * angleStep - Math.PI / 2;
                    const labelRadius = radius + 20;
                    return (
                        <text
                            key={label}
                            x={center + labelRadius * Math.cos(angle)}
                            y={center + labelRadius * Math.sin(angle)}
                            fill="rgba(255,255,255,0.7)"
                            fontSize="10"
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            {label}
                        </text>
                    )
                })}
            </svg>
        </div>
    );
};

const AnimatedCounter = ({ value }) => {
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { damping: 20, stiffness: 100 });
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        motionValue.set(value);
    }, [value, motionValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            setDisplay(Math.round(latest));
        });
    }, [springValue]);

    return <span>{display}</span>;
};


export default function PersonalityQuiz({ onClose }) {
    const [step, setStep] = useState('intro'); // intro -> quiz -> calculating -> result
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [userTraits, setUserTraits] = useState({ ...initialUserTraits });
    const [matchResult, setMatchResult] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const resultCardRef = useRef(null);

    // Derived state
    const isLastQuestion = currentQIndex === questions.length - 1;
    const currentQuestion = questions[currentQIndex];

    const handleStart = () => setStep('quiz');

    const handleOptionClick = (option) => {
        // Apply trait deltas
        const newTraits = { ...userTraits };
        for (const key in option.traits) {
            newTraits[key] += option.traits[key];
        }
        setUserTraits(newTraits);

        if (isLastQuestion) {
            setStep('calculating');
            calculateMatch(newTraits);
        } else {
            setCurrentQIndex(prev => prev + 1);
        }
    };

    const calculateMatch = (finalTraits) => {
        setTimeout(() => {
            let bestMatchCode = null;
            let bestScore = -1;

            // Ensure F1Data is loaded
            const f1Drivers = window.F1Data?.drivers || [];

            for (const driverCode in driverTraitMatrix) {
                const driverVector = driverTraitMatrix[driverCode];
                const similarity = cosineSimilarity(finalTraits, driverVector);

                if (similarity > bestScore) {
                    bestScore = similarity;
                    bestMatchCode = driverCode;
                }
            }

            const matchedDriverObj = f1Drivers.find(d => d.code === bestMatchCode);
            const matchedDriverDetails = {
                code: bestMatchCode,
                traits: driverTraitMatrix[bestMatchCode] || finalTraits,
                similarity: Math.round(bestScore * 100),
                name: matchedDriverObj ? matchedDriverObj.name : bestMatchCode,
                teamId: matchedDriverObj ? matchedDriverObj.team : 'f1',
                num: matchedDriverObj ? matchedDriverObj.num : '00'
            };

            setMatchResult(matchedDriverDetails);
            saveToLocal(matchedDriverDetails);
            setStep('result');
        }, 2500); // 2.5s dramatic calculation delay
    };

    const saveToLocal = (result) => {
        try {
            setIsSaving(true);
            const dataToSave = {
                matchCode: result.code,
                similarity: result.similarity,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('f1_personality_match', JSON.stringify(dataToSave));
            window.dispatchEvent(new Event('f1_personality_updated'));
        } catch (error) {
            console.error("Error saving personality result locally:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDownload = async () => {
        if (!resultCardRef.current) return;
        try {
            const canvas = await html2canvas(resultCardRef.current, {
                backgroundColor: '#111',
                scale: 2,
                useCORS: true
            });
            const url = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `f1-personality-${matchResult?.code || 'match'}.png`;
            link.href = url;
            link.click();
        } catch (error) {
            console.error("Error generating image:", error);
        }
    };

    const handleShare = async () => {
        const text = `I just took the F1 Insight Personality Engine! My racing DNA perfectly matches ${matchResult?.name} (${matchResult?.similarity}% similarity). Discover your match at f1-insight.com! 🏎️🧬`;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'F1 Insight Personality Match',
                    text: text,
                });
            } catch (err) {
                console.log("Share failed", err);
            }
        } else {
            navigator.clipboard.writeText(text);
            alert("Result copied to clipboard!");
        }
    };

    const teamColor = window.F1Data?.getTeamColor?.(matchResult?.teamId) || '#E8002D';

    return (
        <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-4 sm:p-6 md:p-12 overflow-y-auto"
        >
            <motion.div
                initial={{ scale: 0.9, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 30, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300, mass: 1 }}
                className="relative w-full max-w-2xl bg-[#111] rounded-[24px] border border-white/10 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-white/10 bg-white/5">
                    <h2 className="text-xl font-bold tracking-tight px-2 flex items-center gap-2">
                        <Target className="w-5 h-5 text-f1-red" />
                        Personality Engine
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-grow overflow-y-auto relative no-scrollbar">
                    <AnimatePresence mode="wait">

                        {/* INTRO STEP */}
                        {step === 'intro' && (
                            <motion.div
                                key="intro"
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden"
                            >
                                {/* Decorative grid background */}
                                <motion.div
                                    animate={{ backgroundPosition: ["0px 0px", "0px 20px"] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none"
                                ></motion.div>

                                <motion.div
                                    animate={{ boxShadow: ["0 0 50px rgba(232,0,45,0.4)", "0 0 80px rgba(232,0,45,0.8)", "0 0 50px rgba(232,0,45,0.4)"] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-24 h-24 rounded-full bg-gradient-to-br from-f1-red to-[#ff1a1a] mb-8 flex items-center justify-center relative z-10 border-2 border-white/20"
                                >
                                    <Wrench className="w-10 h-10 text-white drop-shadow-lg" />
                                </motion.div>
                                <motion.h1
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                    className="text-5xl md:text-[80px] leading-[1.1] font-black italic uppercase tracking-[-0.05em] mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 [font-family:'Orbitron',sans-serif] relative z-10 drop-shadow-sm"
                                >
                                    Which Driver <br />Are You?
                                </motion.h1>
                                <p className="text-lg text-gray-400 mb-10 max-w-md mx-auto font-light leading-relaxed relative z-10">
                                    10 scenarios. Split-second decisions. Discover which of the 22 F1 drivers shares your racing DNA through our algorithmic trait analysis.
                                </p>
                                <button
                                    onClick={handleStart}
                                    className="relative z-10 px-10 py-4 bg-f1-red hover:bg-[#ff1a1a] text-white font-bold uppercase tracking-[0.2em] text-[14px] rounded-xl transition-all duration-300 transform hover:scale-[1.03] shadow-[0_4px_25px_rgba(232,0,45,0.5)] active:scale-95 flex items-center gap-3 border border-red-400/30 overflow-hidden group"
                                >
                                    <span className="relative z-10">Start Engine</span>
                                    <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
                                </button>
                            </motion.div>
                        )}

                        {/* QUIZ STEP */}
                        {step === 'quiz' && (
                            <motion.div
                                key="quiz"
                                initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
                                className="p-6 md:p-10 flex flex-col min-h-[500px] relative"
                            >
                                <div className="flex justify-between items-center mb-10 text-[11px] text-f1-red font-bold uppercase tracking-[0.3em] [font-family:'Orbitron',sans-serif]">
                                    <span className="bg-f1-red/10 px-3 py-1 rounded-full border border-f1-red/20">System Query {currentQIndex + 1} / {questions.length}</span>
                                    <div className="flex gap-1.5">
                                        {questions.map((_, i) => (
                                            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ease-out ${i === currentQIndex ? 'w-8 bg-f1-red shadow-[0_0_15px_rgba(232,0,45,0.9)]' : i < currentQIndex ? 'w-4 bg-f1-red/50' : 'w-4 bg-white/10'}`}></div>
                                        ))}
                                    </div>
                                </div>

                                <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-10 text-white tracking-tight">
                                    {currentQuestion.text}
                                </h3>

                                <div className="flex flex-col gap-4 mt-auto">
                                    <AnimatePresence>
                                        {currentQuestion.options.map((opt, i) => (
                                            <motion.button
                                                key={`${currentQIndex}-${i}`}
                                                initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                                                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                                                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.06)", boxShadow: "0 8px 30px rgba(232,0,45,0.2)", borderColor: "rgba(232,0,45,0.5)" }}
                                                whileTap={{ scale: 0.98, backgroundColor: "rgba(232,0,45,0.1)", boxShadow: "0 0 20px rgba(232,0,45,0.4)" }}
                                                onClick={() => handleOptionClick(opt)}
                                                className="text-left w-full p-5 md:p-6 bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl transition-colors duration-300 flex items-center justify-between group overflow-hidden relative"
                                            >
                                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-f1-red to-[#ff1a1a] transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300 shadow-[2px_0_10px_rgba(232,0,45,0.8)]"></div>
                                                <span className="text-base md:text-lg font-medium text-gray-300 group-hover:text-white transition-colors relative z-10 leading-relaxed pr-6">{opt.text}</span>
                                                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-sm group-hover:bg-f1-red group-hover:border-transparent group-hover:shadow-[0_0_15px_rgba(232,0,45,0.8)] transition-all shrink-0 relative z-10">
                                                    <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-white" />
                                                </div>
                                            </motion.button>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}

                        {/* CALCULATING STEP */}
                        {step === 'calculating' && (
                            <motion.div
                                key="calculating"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="p-12 flex flex-col items-center justify-center min-h-[500px]"
                            >
                                <div className="relative w-32 h-32 mb-10">
                                    <svg className="animate-spin w-full h-full text-white/5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Target className="w-10 h-10 text-f1-red animate-pulse drop-shadow-[0_0_15px_rgba(232,0,45,0.8)]" />
                                    </div>
                                </div>
                                <h2 className="text-3xl font-bold animate-pulse text-white tracking-widest [font-family:'Orbitron',sans-serif] uppercase text-transparent bg-clip-text bg-gradient-to-r from-f1-red via-white to-f1-red">Analyzing Telemetry</h2>
                                <p className="text-white/40 mt-4 font-mono text-sm tracking-[0.2em] relative overflow-hidden">
                                    <span className="relative z-10">RUNNING COSINE SIMILARITY MATRIX</span>
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                                </p>
                            </motion.div>
                        )}

                        {/* RESULT STEP */}
                        {step === 'result' && matchResult && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                className="p-6 md:p-10 flex flex-col min-h-[500px]"
                            >
                                <div className="text-center mb-6">
                                    <p className="text-xs text-f1-red font-bold font-mono tracking-[0.3em] uppercase mb-2 animate-pulse">Telemetry Match Verified</p>
                                    <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-[-0.05em] text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 [font-family:'Orbitron',sans-serif]">Your Racing DNA</h2>
                                </div>

                                <div
                                    ref={resultCardRef}
                                    className="bg-gradient-to-br from-[#1a1a24] to-[#0a0a0f] p-8 rounded-[24px] border border-white/10 relative overflow-hidden mb-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                                >
                                    <div className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none mix-blend-screen" style={{ backgroundColor: teamColor, filter: 'blur(80px)' }}></div>
                                    <div className="absolute bottom-0 left-0 w-32 h-32 opacity-10 pointer-events-none" style={{ backgroundColor: teamColor, filter: 'blur(40px)' }}></div>

                                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
                                        {/* Driver Profile */}
                                        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                                            <div className="flex flex-col md:flex-row items-center gap-6 mb-4">
                                                {/* Advanced Driver Profile Shape */}
                                                <div
                                                    className="w-20 h-20 rounded-full overflow-hidden border-2 flex-shrink-0 relative bg-gradient-to-b from-[#1a1a24] to-black shadow-lg"
                                                    style={{ borderColor: teamColor, boxShadow: `0 0 20px ${teamColor}40` }}
                                                >
                                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-16 bg-white/10 rounded-t-full"></div>
                                                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-10 bg-white/20 rounded-full"></div>
                                                    <div className="absolute inset-0 border-4 border-black/20 rounded-full pointer-events-none"></div>
                                                </div>
                                                <div>
                                                    <motion.h3
                                                        animate={{ textShadow: [`0 0 20px ${teamColor}40`, `0 0 40px ${teamColor}90`, `0 0 20px ${teamColor}40`] }}
                                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                                        className="text-3xl md:text-4xl font-black italic tracking-tight mb-1"
                                                        style={{ color: teamColor }}
                                                    >
                                                        {matchResult.name}
                                                    </motion.h3>
                                                    <div className="inline-flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-white/5">
                                                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: teamColor, boxShadow: `0 0 10px ${teamColor}` }}></span>
                                                        <p className="text-white/80 font-mono text-xs uppercase tracking-widest">Similarity: <AnimatedCounter value={matchResult.similarity} />%</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="relative mt-6 group">
                                                <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-transparent blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                <p className="text-white/80 text-sm md:text-base leading-relaxed italic border-l-4 pl-5 relative z-10 rounded-r-lg py-2 bg-gradient-to-r from-white/[0.02] to-transparent" style={{ borderColor: teamColor }}>
                                                    "{driverDescriptions[matchResult.code] || 'You are a born racer, ready to take on the world.'}"
                                                </p>
                                            </div>
                                            <div className="text-[120px] font-black italic opacity-5 hidden md:block absolute -bottom-10 -left-6 pointer-events-none select-none" style={{ WebkitTextStroke: `2px ${teamColor}` }}>
                                                {matchResult.num}
                                            </div>
                                        </div>

                                        {/* Radar Chart */}
                                        <div className="flex-1 w-full max-w-[250px] aspect-square flex items-center justify-center relative">
                                            <div className="absolute inset-4 blur-xl opacity-30 animate-pulse" style={{ backgroundColor: teamColor }}></div>
                                            <div className="relative z-10 w-full h-full">
                                                <RadarChart traits={matchResult.traits} driverColor={teamColor} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="grid grid-cols-2 gap-4 mt-auto relative z-10">
                                    <motion.button
                                        whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.4)', boxShadow: '0 0 20px rgba(255,255,255,0.1)' }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={handleDownload}
                                        className="flex items-center justify-center gap-2 p-4 bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl transition-all font-medium text-white shadow-lg overflow-hidden group"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                        <Download className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" /> <span className="tracking-wide">Save Graph</span>
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.4)', boxShadow: '0 0 20px rgba(255,255,255,0.1)' }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={handleShare}
                                        className="flex items-center justify-center gap-2 p-4 bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl transition-all font-medium text-white shadow-lg overflow-hidden group"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                        <Share2 className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" /> <span className="tracking-wide">Share Match</span>
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div >
    );
}
