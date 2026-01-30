"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Mic, Send, X, Volume2, VolumeX, Sparkles, Terminal, Headphones, BrainCircuit } from "lucide-react";
import * as webllm from "@mlc-ai/web-llm";

// Constants for HexBot
const MODEL_ID = "TinyLlama-1.1B-Chat-v1.0-q4f16_1-MLC";
const SYSTEM_PROMPT = "You are HexBot, a premium high-tech AI assistant for the HexBytes luxury electronics store. You are helpful, sophisticated, and technically expert. Keep responses concise and professional.";

export function HexBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([
        { role: "assistant", content: "Protocol initiated. I am HexBot. How may I assist your digital lifestyle today?" }
    ]);
    const [input, setInput] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isModelLoaded, setIsModelLoaded] = useState(false);

    const engineRef = useRef<webllm.MLCEngine | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);

    // Initialize WebLLM Engine
    useEffect(() => {
        if (isOpen && !engineRef.current) {
            initEngine();
        }
    }, [isOpen]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const initEngine = async () => {
        try {
            const engine = new webllm.MLCEngine();
            engine.setInitProgressCallback((report: webllm.InitProgressReport) => {
                setLoadingProgress(Math.round(report.progress * 100));
            });

            await engine.reload(MODEL_ID);
            engineRef.current = engine;
            setIsModelLoaded(true);
        } catch (error) {
            console.error("WebLLM Init Error:", error);
        }
    };

    // Speech Recognition (STT) Module
    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = "en-US";

            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                setIsListening(false);
                handleSend(transcript);
            };

            recognition.onerror = () => setIsListening(false);
            recognition.onend = () => setIsListening(false);
            recognitionRef.current = recognition;
        }
    }, []);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            setIsListening(true);
            recognitionRef.current?.start();
        }
    };

    // Text-to-Speech (TTS) Module
    const speak = (text: string) => {
        if (!isSpeaking) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();
        // Try to find a premium sounding voice
        const premiumVoice = voices.find(v => v.name.includes("Google") || v.name.includes("Premium"));
        if (premiumVoice) utterance.voice = premiumVoice;
        utterance.rate = 1.1;
        utterance.pitch = 0.95;
        window.speechSynthesis.speak(utterance);
    };

    const handleSend = async (customInput?: string) => {
        const messageContent = customInput || input;
        if (!messageContent.trim() || isProcessing) return;

        const userMessage = { role: "user", content: messageContent };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsProcessing(true);

        if (!engineRef.current) {
            setMessages(prev => [...prev, { role: "assistant", content: "Calibrating systems... Model is still loading." }]);
            setIsProcessing(false);
            return;
        }

        try {
            const chatMessages: webllm.ChatCompletionMessageParam[] = [
                { role: "system", content: SYSTEM_PROMPT },
                ...messages.map(m => ({ role: m.role as any, content: m.content })),
                { role: "user", content: messageContent }
            ];

            // Add an empty placeholder for the assistant response
            setMessages(prev => [...prev, { role: "assistant", content: "" }]);

            const asyncChunkGenerator = await engineRef.current.chat.completions.create({
                messages: chatMessages,
                stream: true,
            });

            let fullResponse = "";
            for await (const chunk of asyncChunkGenerator) {
                const delta = chunk.choices[0]?.delta.content || "";
                fullResponse += delta;

                // Update the last message (the placeholder) with the current streaming content
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { role: "assistant", content: fullResponse };
                    return newMessages;
                });
            }

            speak(fullResponse);
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { role: "assistant", content: "Protocol failure. Please check your WebGPU connection." }]);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 z-50 w-20 h-20 bg-secondary rounded-full flex items-center justify-center shadow-2xl border-2 border-primary/20 overflow-hidden group"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:10px_10px] opacity-10 group-hover:opacity-20 transition-opacity" />
                <BrainCircuit className="text-primary w-10 h-10 group-hover:scale-110 transition-transform" />
                <div className="absolute -inset-1 bg-primary/20 blur-xl group-hover:bg-primary/40 transition-all opacity-0 group-hover:opacity-100" />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 100 }}
                        className="fixed bottom-32 right-8 z-50 w-[450px] max-w-[calc(100vw-4rem)] bg-secondary/95 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-black/20">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center relative">
                                    <Sparkles className="text-secondary" />
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-secondary" />
                                </div>
                                <div>
                                    <h3 className="text-white font-display font-black uppercase tracking-tight">HEXBOT <span className="text-primary italic">OS v1.0</span></h3>
                                    <p className="text-[10px] text-primary font-black uppercase tracking-widest leading-none">Local Neural Interface</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsSpeaking(!isSpeaking)}
                                    className={`p-3 rounded-xl transition-all ${isSpeaking ? "text-primary bg-primary/10" : "text-white/20 hover:text-white"}`}
                                >
                                    {isSpeaking ? <Volume2 size={18} /> : <VolumeX size={18} />}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-3 text-white/20 hover:bg-white/5 hover:text-white rounded-xl transition-all"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Loading Indicator */}
                        {!isModelLoaded && (
                            <div className="absolute inset-x-0 top-[112px] h-1 bg-white/5">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${loadingProgress}%` }}
                                    className="h-full bg-primary shadow-[0_0_15px_rgba(255,184,0,0.5)]"
                                />
                            </div>
                        )}

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-8 space-y-8 min-h-[400px] max-h-[500px] scrollbar-hide"
                        >
                            {!isModelLoaded && (
                                <div className="flex flex-col items-center justify-center h-full gap-4 py-20 text-center">
                                    <div className="w-16 h-16 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Syncing Local Weights... {loadingProgress}%</p>
                                    <p className="text-xs text-white/30 max-w-[200px]">Initial boot requires cache calibration (approx. 200MB)</p>
                                </div>
                            )}

                            {isModelLoaded && messages.map((m, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: m.role === "user" ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`max-w-[85%] p-6 rounded-[2rem] text-sm leading-relaxed ${m.role === "user" ? "bg-primary text-secondary font-bold rounded-tr-none" : "bg-white/5 text-white/80 rounded-tl-none border border-white/5"}`}>
                                        {m.content}
                                    </div>
                                </motion.div>
                            ))}
                            {isProcessing && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 p-4 rounded-full flex gap-1">
                                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer Input */}
                        <div className="p-8 bg-black/40">
                            <div className="relative flex items-center gap-4">
                                <button
                                    onClick={toggleListening}
                                    className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isListening ? "bg-red-500 text-white animate-pulse" : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"}`}
                                >
                                    {isListening ? <Headphones size={20} /> : <Mic size={20} />}
                                </button>
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                        placeholder={isListening ? "Listening..." : "Command line interface..."}
                                        className="w-full bg-white/5 border border-white/10 text-white text-xs font-bold tracking-wide rounded-2xl px-6 py-4 outline-none focus:border-primary/50 transition-all placeholder:text-white/10"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[8px] font-black text-white/10 uppercase tracking-widest hidden md:block">ENTER TO SEND</div>
                                </div>
                                <button
                                    onClick={() => handleSend()}
                                    disabled={!input.trim() || isProcessing}
                                    className="w-12 h-12 bg-primary text-secondary rounded-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all disabled:opacity-50 disabled:scale-100"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                            <div className="mt-6 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">
                                    <Terminal size={10} />
                                    <span>Secure Local Inference</span>
                                </div>
                                <div className="text-[8px] font-black text-primary/40 uppercase tracking-[0.2em]">No Cloud Data Transmitted</div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
