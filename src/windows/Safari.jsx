import { WindowControls } from "#components"
import { blogPosts } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper"
import clsx from "clsx";
import { ChevronLeft, ChevronRight, Copy, MoveRight, PanelLeft, Plus, Search, Share, ShieldHalf, LayoutGrid } from "lucide-react";
import { useState } from "react";

const Safari = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={clsx(
                "relative h-full flex flex-col font-sans text-slate-100 selection:bg-red-500/30 overflow-hidden rounded-[inherit] transition-all duration-500 ease-in-out",
                // Konsisten dengan Finder logic
                isHovered
                    ? "bg-black/40 backdrop-blur-3xl saturate-150"
                    : "bg-transparent backdrop-blur-none"
            )}
        >
            {/* --- LIQUID AMBIENT CORE --- */}
            {/* Muncul hanya saat hover agar transisi background halus */}
            <div className={clsx(
                "absolute inset-0 z-0 overflow-hidden pointer-events-none transition-opacity duration-1000",
                isHovered ? "opacity-100" : "opacity-0"
            )}>
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-red-600/10 blur-[120px] animate-liquid-slow mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-zinc-800/40 blur-[100px] animate-liquid-fast" />
            </div>

            {/* --- BROWSER HEADER --- */}
            <div
                id="window-header"
                className={clsx(
                    "relative z-30 border-b border-white/5 px-4 py-3 flex items-center gap-4 transition-colors duration-500",
                    isHovered ? "bg-white/[0.02]" : "bg-transparent"
                )}
            >
                <div className="flex items-center gap-6">
                    <WindowControls target="safari" />
                    <div className="flex items-center gap-4 text-white/20 ml-2">
                        <PanelLeft className="w-4 h-4 cursor-pointer hover:text-red-500 transition-all" />
                        <div className="flex items-center gap-3">
                            <ChevronLeft className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
                            <ChevronRight className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
                        </div>
                    </div>
                </div>

                {/* URL Bar - Konsisten dengan Search Bar Finder */}
                <div className="flex-1 flex justify-center">
                    <div className={clsx(
                        "group flex items-center gap-3 w-full max-w-md border rounded-xl px-4 py-1.5 transition-all duration-500",
                        isHovered
                            ? "bg-black/20 border-white/10"
                            : "bg-white/5 border-transparent"
                    )}>
                        <ShieldHalf className="w-3.5 h-3.5 text-red-500/60 group-hover:text-red-500 transition-colors" />
                        <div className="flex flex-col items-center flex-1">
                            <span className="text-[10px] tracking-[0.15em] font-medium text-white/60">andereyan.dev</span>
                            <span className="text-[8px] tracking-[0.05em] text-white/20 group-hover:text-red-500/40 transition-colors uppercase font-black">Featured Works</span>
                        </div>
                        <Search className="w-3 h-3 text-white/10" />
                    </div>
                </div>

                <div className="flex items-center gap-4 text-white/20">
                    <Share className="w-4 h-4 cursor-pointer hover:text-red-500 transition-all" />
                    <Plus className="w-4 h-4 cursor-pointer hover:text-white transition-all" />
                    <LayoutGrid className="w-4 h-4 cursor-pointer hover:text-white transition-all" />
                </div>
            </div>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="blog relative z-10 flex-1 overflow-y-auto scroll-smooth px-10 py-12 custom-scrollbar">

                {/* Judul Archive */}
                <header className="mb-16 relative">
                    {/* Accent Line - Hanya menyala saat hover */}
                    <div className={clsx(
                        "absolute -left-10 top-1/2 -translate-y-1/2 w-1 h-12 bg-red-600 transition-all duration-700",
                        isHovered
                            ? "opacity-100 shadow-[0_0_20px_#dc2626]"
                            : "opacity-0 shadow-none"
                    )} />

                    {/* Subtitle */}
                    <p className={clsx(
                        "text-[10px] tracking-[0.5em] font-black uppercase mb-3 transition-all duration-700",
                        isHovered ? "text-red-600/80" : "text-white/20"
                    )}>
                        Portfolio Archive
                    </p>

                    {/* Main Title */}
                    <h2 className={clsx(
                        "text-5xl font-light tracking-tight leading-none transition-all duration-1000",
                        isHovered ? "text-white/90" : "text-white/30"
                    )}>
                        SELECTED <br />
                        <span className={clsx(
                            "font-black italic text-transparent bg-clip-text transition-all duration-1000",
                            isHovered
                                ? "bg-linear-to-r from-white via-red-500 to-red-800"
                                : "bg-linear-to-r from-white/20 to-white/20"
                        )}>
                            PROJECTS
                        </span>
                    </h2>
                </header>

                {/* Grid Projects */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {blogPosts.map(({ id, image, title, date, link }, index) => (
                        <div
                            key={id}
                            className={clsx(
                                "group relative rounded-[22px] overflow-hidden bg-white/1 border border-white/5 hover:border-red-500/30 transition-all duration-700",
                                index === 0 ? 'md:col-span-2' : ''
                            )}
                        >
                            <div className="relative z-10 flex flex-col h-full">
                                <div className={clsx("relative overflow-hidden transition-all duration-700", index === 0 ? 'h-64 md:h-100' : 'h-56')}>
                                    <img
                                        src={image}
                                        alt={title}
                                        className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-[1.02]"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity" />
                                </div>

                                {/* Info Box dengan Blur halus */}
                                <div className="p-8 rounded-b-[22px] mt-auto backdrop-blur-sm bg-black/40 border-t border-white/5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-[9px] font-black text-red-600 px-2 py-0.5 border border-red-600/30 rounded-full">{date}</span>
                                        <div className="h-px flex-1 bg-white/5" />
                                    </div>

                                    <h3 className={clsx("font-bold text-white/80 group-hover:text-white transition-colors duration-500 tracking-tight", index === 0 ? 'text-3xl' : 'text-xl')}>
                                        {title}
                                    </h3>

                                    <div className="mt-8 flex items-center justify-between">
                                        <a href={link} target="_blank" className="group/btn relative overflow-hidden px-4 py-2 rounded-lg bg-white/5 hover:bg-red-600 transition-all duration-500">
                                            <span className="relative z-10 text-[10px] font-black tracking-widest uppercase flex items-center gap-3">
                                                Discover Case <MoveRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                                            </span>
                                        </a>
                                        <span className="text-2xl font-black text-white/3 group-hover:text-red-500/10 transition-colors">0{index + 1}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <footer className="mt-32 mb-10 opacity-20 hover:opacity-100 transition-opacity duration-1000 text-center">
                    <div className="h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent mb-8" />
                    <p className="text-[10px] tracking-[1em] font-light text-white">
                        ANDREYAN <span className="text-red-600">©</span> 2026
                    </p>
                </footer>
            </div>
        </div>
    )
}

const SafariWindow = WindowWrapper(Safari, 'safari');
export default SafariWindow;