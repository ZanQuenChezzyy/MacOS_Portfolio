import { WindowControls } from "#components"
import { blogPosts } from "#constants"; // Anda bisa mengganti nama variabel ini menjadi projectPosts di constants jika perlu
import WindowWrapper from "#hoc/WindowWrapper"
import { ChevronLeft, ChevronRight, Copy, MoveRight, PanelLeft, Plus, Search, Share, ShieldHalf } from "lucide-react";

const Safari = () => {
    return (
        <div className="relative h-full flex flex-col font-sans text-slate-100 selection:bg-red-500/30 overflow-hidden bg-[#050505]">

            {/* --- CORE AMBIENT BACKGROUND --- */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-red-600/10 to-transparent blur-[120px] animate-liquid-slow" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-zinc-800/30 to-transparent blur-[100px] animate-liquid-fast" />
                <div className="absolute inset-0 backdrop-blur-[120px] bg-white/[0.01]" />
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
            </div>

            {/* --- BROWSER HEADER --- */}
            <div id="window-header" className="relative z-20 backdrop-blur-md bg-white/[0.03] border-b border-white/[0.05] px-4 py-1.5 flex items-center gap-3 shadow-lg">
                <WindowControls target="safari" />

                <div className="flex items-center gap-1.5 ml-8 text-white/30">
                    <PanelLeft className="w-3.5 h-3.5 cursor-pointer hover:text-red-500 transition-colors mr-2" />
                    <ChevronLeft className="w-3.5 h-3.5 cursor-pointer hover:text-white transition-colors" />
                    <ChevronRight className="w-3.5 h-3.5 cursor-pointer hover:text-white transition-colors" />
                </div>

                {/* URL Bar - Sekarang menunjukkan path portfolio */}
                <div className="flex-1 flex justify-center">
                    <div className="flex items-center gap-2.5 w-full max-w-sm bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-3 py-1 shadow-inner transition-all duration-500 focus-within:ring-1 focus-within:ring-red-500/30">
                        <ShieldHalf className="w-3 h-3 text-red-500/50" />
                        <input
                            type="text"
                            placeholder="andereyan.dev/featured-works"
                            className="flex-1 bg-transparent outline-none text-[10px] tracking-[0.1em] text-white/40 placeholder:text-white/20 text-center font-light"
                            readOnly
                        />
                        <Search className="w-2.5 h-2.5 text-white/10" />
                    </div>
                </div>

                <div className="flex items-center gap-3 text-white/30">
                    <Share className="w-3.5 h-3.5 cursor-pointer hover:text-red-500 transition-colors" />
                    <Plus className="w-3.5 h-3.5 cursor-pointer hover:text-white transition-colors" />
                    <Copy className="w-3.5 h-3.5 cursor-pointer hover:text-white transition-colors" />
                </div>
            </div>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="blog relative z-10 flex-1 overflow-y-auto scroll-smooth px-8 py-10">

                <header className="mb-10 relative">
                    {/* Aksen garis merah profesional */}
                    <div className="h-[2px] w-10 bg-red-600 mb-4 shadow-[0_0_15px_#dc2626]" />
                    <h2 className="text-4xl font-light tracking-tighter text-white">
                        SELECTED <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-red-600">PROJECTS</span>
                    </h2>
                    <p className="text-[9px] tracking-[0.4em] font-bold text-white/20 uppercase mt-2">
                        Showcase / Volume 2024 - 2026
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {blogPosts.map(({ id, image, title, date, link }, index) => (
                        <div
                            key={id}
                            className={`
                                group relative rounded-2xl overflow-hidden
                                transition-all duration-700 hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.2)]
                                ${index === 0 ? 'md:col-span-2' : ''}
                            `}
                        >
                            {/* Glass Layer Card */}
                            <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl z-0 transition-colors group-hover:bg-white/[0.05]" />

                            <div className="relative z-10 flex flex-col h-full">
                                {/* Project Thumbnail */}
                                <div className={`relative overflow-hidden ${index === 0 ? 'h-52 md:h-80' : 'h-48'}`}>
                                    <img
                                        src={image}
                                        alt={title}
                                        className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                                </div>

                                {/* Project Info */}
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="text-[8px] tracking-[0.2em] font-black text-red-600 uppercase">{date}</p>
                                        <div className="h-px flex-1 bg-white/5 mx-4" />
                                    </div>

                                    <h3 className={`font-bold text-white/90 group-hover:text-white transition-colors duration-500 ${index === 0 ? 'text-2xl' : 'text-base'}`}>
                                        {title}
                                    </h3>

                                    <div className="mt-5 flex items-center justify-between">
                                        <a href={link} target="_blank" className="text-[9px] font-black tracking-[0.2em] uppercase text-white/30 group-hover:text-red-500 flex items-center gap-3 transition-all">
                                            View Project Case <MoveRight className="w-3 h-3 transition-transform group-hover:translate-x-2" />
                                        </a>
                                        <span className="text-[8px] text-white/10 font-mono">0{index + 1}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Section di dalam window */}
                <footer className="mt-20 mb-10 text-center">
                    <p className="text-[9px] tracking-[0.5em] text-white/10 uppercase">
                        End of Archive
                    </p>
                </footer>
            </div>
        </div>
    )
}

const SafariWindow = WindowWrapper(Safari, 'safari');
export default SafariWindow