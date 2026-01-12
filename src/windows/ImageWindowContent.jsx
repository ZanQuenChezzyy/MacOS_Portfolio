import { WindowControls } from '#components';
import WindowWrapper from '#hoc/WindowWrapper';
import useWindowStore from '#store/window';
import { Image as ImageIcon, Maximize2, Info, Share2, Download, Hash } from 'lucide-react';
import React, { useState } from 'react';
import clsx from 'clsx';

const ImageWindowContent = () => {
    const { windows } = useWindowStore();
    const [isHovered, setIsHovered] = useState(false);

    const data = windows.imgfile?.data;
    if (!data) return null;

    const { name, imageUrl } = data;

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={clsx(
                "relative h-full flex flex-col font-sans overflow-hidden transition-all duration-500 ease-in-out rounded-[inherit]",
                isHovered ? "bg-black/40 backdrop-blur-3xl saturate-150" : "bg-black/20 backdrop-blur-none"
            )}
        >
            {/* --- HEADER --- */}
            <div id="window-header" className={clsx(
                "relative z-30 flex items-center justify-between px-4 py-3 border-b border-white/5 transition-colors duration-500",
                isHovered ? "bg-white/2" : "bg-transparent"
            )}>
                <div className="flex items-center gap-6 w-1/4">
                    <WindowControls target="imgfile" />
                </div>

                {/* File Title Pill */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center px-2 py-1 bg-black/20 rounded-md border border-white/5">
                        <ImageIcon size={10} className="text-blue-500 mr-2" />
                        <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">{name}</span>
                    </div>
                </div>

                <div className="w-1/4 flex justify-end">
                    <Hash size={12} className="text-zinc-600 opacity-50" />
                </div>
            </div>

            <div className='flex flex-1 overflow-hidden relative'>
                {/* --- IMAGE VIEWER AREA --- */}
                <div className="flex-1 relative flex items-center justify-center p-8 overflow-hidden group/viewer selection:bg-blue-500/30">
                    {/* Ambient Glow */}
                    <div className="absolute inset-0 bg-radial-gradient from-blue-500/5 to-transparent opacity-30 pointer-events-none" />

                    {imageUrl && (
                        <div className="relative z-10 transition-all ease-out group-hover/viewer:scale-[1.03] animate-in fade-in zoom-in-95 duration-1000">
                            <img
                                src={imageUrl}
                                alt={name}
                                className="max-w-full max-h-[65vh] object-contain rounded-xl shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)] border border-white/10"
                            />
                            {/* Reflection Overlay */}
                            <div className="absolute inset-0 rounded-xl bg-linear-to-tr from-white/10 via-transparent to-transparent pointer-events-none mix-blend-overlay" />
                        </div>
                    )}

                    {/* Quick Action Floating Button */}
                    <button className="absolute bottom-6 right-6 p-2 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-zinc-400 hover:text-white hover:bg-white/10 transition-all opacity-0 group-hover/viewer:opacity-100 translate-y-2 group-hover/viewer:translate-y-0">
                        <Maximize2 size={14} />
                    </button>
                </div>
            </div>

            {/* --- STATUS BAR --- */}
            <div className="h-6 bg-black/40 border-t border-white/5 flex items-center px-4 justify-between text-[9px] text-zinc-500">
                <div className="flex items-center gap-4">
                    <span className="font-mono uppercase tracking-tighter text-blue-400/80">RAW PREVIEW</span>
                    <div className="w-px h-2 bg-white/10" />
                    <span className="font-mono uppercase tracking-tighter">100% SCALE</span>
                </div>
                <div className="flex items-center gap-2 italic">
                    <span className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                    <span>sRGB Color Profile</span>
                </div>
            </div>
        </div>
    );
};

const ImageWindow = WindowWrapper(ImageWindowContent, 'imgfile');
export default ImageWindow;