import { WindowControls } from "#components"
import { blogPosts } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper"
import { ChevronLeft, ChevronRight, Copy, MoveRight, PanelLeft, Plus, Search, Share, ShieldHalf, LayoutGrid } from "lucide-react";

const Safari = () => {
    return (
        <div className="relative h-full flex flex-col font-sans text-slate-100 selection:bg-red-500/30 overflow-hidden rounded-[24px]">

            {/* --- LIQUID AMBIENT CORE --- */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-red-600/10 blur-[120px] animate-liquid-slow mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-zinc-800/40 blur-[100px] animate-liquid-fast" />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[60px]" />
            </div>

            {/* --- BROWSER HEADER (Liquid Glass Style) --- */}
            <div id="window-header" className="relative z-30 bg-white/[0.01] backdrop-blur-3xl border-b border-white/[0.08] px-4 py-3 flex items-center gap-4 shadow-2xl">
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

                {/* URL Bar - Floating Glass Pill */}
                <div className="flex-1 flex justify-center">
                    <div className="group flex items-center gap-3 w-full max-w-md bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-2xl border border-white/[0.08] rounded-xl px-4 py-1.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-all duration-500">
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

                <header className="mb-16 relative">
                    <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-1 h-12 bg-red-600 shadow-[0_0_20px_#dc2626]" />
                    <p className="text-[10px] tracking-[0.5em] font-black text-red-600/80 uppercase mb-3">Portfolio Archive</p>
                    <h2 className="text-5xl font-light tracking-tight text-white/90 leading-none">
                        SELECTED <br />
                        <span className="font-black italic text-transparent bg-clip-text bg-gradient-to-r from-white via-red-500 to-red-800">PROJECTS</span>
                    </h2>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {blogPosts.map(({ id, image, title, date, link }, index) => (
                        <div
                            key={id}
                            className={`
                                group relative rounded-[22px] overflow-hidden bg-white/1 border border-white/5
                                hover:border-red-500/30 transition-all duration-700
                                ${index === 0 ? 'md:col-span-2' : ''}
                            `}
                        >
                            {/* Inner Glass Gloss */}
                            <div className="absolute inset-0 bg-linear-to-br from-white/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none" />

                            <div className="relative z-10 flex flex-col h-full">
                                {/* Project Thumbnail */}
                                <div className={`relative overflow-hidden ${index === 0 ? 'h-64 md:h-100' : 'h-56'}`}>
                                    <img
                                        src={image}
                                        alt={title}
                                        className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-[1.02]"
                                    />
                                    {/* Liquid Overlay on Image */}
                                    <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/20 to-transparent opacity-90 group-hover:opacity-60 transition-opacity" />
                                </div>

                                {/* Project Info */}
                                <div className="p-8 rounded-b-[22px] mt-auto backdrop-blur-sm bg-black/20">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-[9px] font-black text-red-600 px-2 py-0.5 border border-red-600/30 rounded-full">{date}</span>
                                        <div className="h-px flex-1 bg-white/5" />
                                    </div>

                                    <h3 className={`font-bold text-white/80 group-hover:text-white transition-colors duration-500 tracking-tight ${index === 0 ? 'text-3xl' : 'text-xl'}`}>
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

                <footer className="mt-32 mb-10 opacity-20 hover:opacity-100 transition-opacity duration-1000">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />
                    <p className="text-[10px] tracking-[1em] font-light text-white text-center">
                        ANDREYAN <span className="text-red-600">©</span> 2026
                    </p>
                </footer>
            </div>
        </div>
    )
}

const SafariWindow = WindowWrapper(Safari, 'safari');
export default SafariWindow;