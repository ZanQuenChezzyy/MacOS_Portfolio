import WindowWrapper from "#hoc/WindowWrapper"
import { WindowControls } from "#components"
import useWindowStore from "#store/window"
import { FileText, User, Star, ScrollText, Hash } from "lucide-react"
import React, { useState } from 'react'
import clsx from 'clsx'

const Text = () => {
    const { windows } = useWindowStore();
    const [isHovered, setIsHovered] = useState(false);

    const data = windows.txtfile?.data;
    if (!data) return null;

    const { name, image, subtitle, description } = data;

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={clsx(
                "relative h-full flex flex-col font-sans overflow-hidden transition-all duration-500 ease-in-out rounded-[inherit]",
                isHovered ? "bg-black/40 backdrop-blur-3xl saturate-150" : "bg-transparent backdrop-blur-none"
            )}
        >
            {/* --- HEADER --- */}
            <div id="window-header" className={clsx(
                "relative z-30 flex items-center justify-between px-4 py-3 border-b border-white/5 transition-colors duration-500",
                isHovered ? "bg-white/2" : "bg-transparent"
            )}>
                <div className="flex items-center gap-6 w-1/4">
                    <WindowControls target="txtfile" />
                </div>

                {/* File Title Pill */}
                <div className="flex items-center gap-2 px-3 py-0.5 bg-black/20 border border-white/10 rounded-md backdrop-blur-md">
                    <FileText size={10} className="text-blue-500" />
                    <span className="text-[9px] font-bold tracking-[0.2em] text-zinc-300 uppercase">{name}</span>
                </div>

                <div className="w-1/4 flex justify-end">
                    <Hash size={12} className="text-zinc-600 opacity-50" />
                </div>
            </div>

            <div className='flex flex-1 overflow-hidden relative'>
                {/* --- MAIN CONTENT AREA --- */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative selection:bg-red-500/30">
                    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

                        {/* Hero Image Section */}
                        {image && (
                            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group group/img">
                                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent z-10 opacity-80" />
                                <img
                                    src={image}
                                    alt={name}
                                    className="w-full h-auto object-cover transform group-hover/img:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute bottom-4 left-4 z-20">
                                    <h2 className="text-2xl font-black text-white tracking-tighter uppercase drop-shadow-lg">
                                        Personal Profile
                                    </h2>
                                </div>
                            </div>
                        )}

                        {/* Text Content */}
                        <div className="space-y-6">
                            {subtitle && (
                                <div className="flex items-center gap-3">
                                    <span className="h-px w-8 bg-red-600" />
                                    <h3 className="text-[10px] font-black tracking-[0.3em] text-red-500 uppercase">
                                        {subtitle}
                                    </h3>
                                </div>
                            )}

                            {Array.isArray(description) && (
                                <div className="space-y-5 text-[13px] leading-[1.8] text-zinc-300/80 font-normal text-justify">
                                    {description.map((para, idx) => (
                                        <p key={idx} className="transition-all duration-700 hover:text-white">
                                            {para}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- STATUS BAR --- */}
            <div className="h-6 bg-black/40 border-t border-white/5 flex items-center px-4 justify-between text-[9px] text-zinc-500">
                <div className="flex items-center gap-2 italic">
                    <span className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                    <span>Read-only Mode</span>
                </div>
                <span className="font-mono">UTF-8 • Markdown Enabled</span>
            </div>
        </div>
    )
}

const TextWindow = WindowWrapper(Text, 'txtfile')
export default TextWindow