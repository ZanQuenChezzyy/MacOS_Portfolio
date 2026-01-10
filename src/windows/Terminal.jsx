import { WindowControls } from "#components";
import { techStack } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper"
import clsx from "clsx";
import { Check, Flag, Terminal as TerminalIcon, Cpu, Globe } from "lucide-react";
import { useState } from "react";

const Terminal = () => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={clsx(
                "relative h-full flex flex-col font-mono selection:bg-red-500/40 overflow-hidden transition-all duration-500 ease-in-out rounded-[inherit]",
                // Logic: Jika di-hover blur aktif, jika tidak transparan total
                isHovered
                    ? "bg-black/40 backdrop-blur-3xl saturate-150"
                    : "bg-transparent backdrop-blur-none saturate-100"
            )}
        >

            {/* --- LIQUID GLASS HEADER (UI 2026) --- */}
            <div
                id="window-header"
                className="relative z-30 backdrop-blur-3xl bg-white/2 border-b border-white/8 px-4 py-2 flex items-center shadow-2xl"
            >
                {/* Refractive Light Effect on Header */}
                <div className="absolute inset-0 bg-linear-to-r from-red-500/10 via-transparent to-white/5 pointer-events-none" />

                <WindowControls target="terminal" />

                <div className="flex-1 flex justify-center items-center gap-2 relative z-10">
                    <TerminalIcon size={12} className="text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
                    <h2 className="text-[10px] font-black tracking-[0.3em] uppercase text-white/70">
                        ZSH <span className="text-white/20">—</span> 80x24 <span className="text-white/20">—</span> (ttys001)
                    </h2>
                </div>

                {/* System Status Indicators */}
                <div className="flex items-center gap-3 opacity-40">
                    <Cpu size={10} className="text-white" />
                    <Globe size={10} className="text-white" />
                </div>
            </div>

            {/* --- AUTHENTIC TERMINAL BODY --- */}
            <div className="techstack relative z-10 flex-1 p-6 overflow-y-auto bg-black/40 backdrop-blur-md custom-scrollbar">

                {/* Login Info */}
                <div className="mb-8 text-[11px] space-y-1">
                    <p className="text-white/30">Last login: {new Date().toDateString()} on ttys001</p>
                    <p className="text-red-500/80 font-bold">Welcome to Andereyan-Terminal-Env v4.0.2-stable</p>
                </div>

                {/* Real CLI Prompt */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center">
                        <span className="bg-red-600 text-white px-2 py-0.5 text-[10px] font-bold rounded-s-sm">Andereyan</span>
                        <span className="bg-white/10 text-white/80 px-2 py-0.5 text-[10px] rounded-e-sm backdrop-blur-md">~/portfolio</span>
                    </div>
                    <p className="text-xs text-zinc-400 animate-in fade-in slide-in-from-left-2 duration-700">
                        $ fetch --stack --display=table
                    </p>
                </div>

                {/* Table Header - Designed like CLI Table Output */}
                <div className="label flex items-center border-b border-white/10 pb-2 mb-4 text-[10px] font-bold uppercase tracking-widest text-red-500">
                    <p className="w-32">Index/Class</p>
                    <p className="flex-1">Engine Components</p>
                    <p className="w-16 text-right">Status</p>
                </div>

                {/* Tech List Table */}
                <ul className="content space-y-4">
                    {techStack.map(({ category, items }, index) => (
                        <li key={category} className="group flex items-start text-[12px] transition-all border-b border-white/2 pb-3 last:border-0">
                            {/* Row Index */}
                            <span className="text-[10px] text-white/10 font-mono w-6 mt-1 group-hover:text-red-500 transition-colors">
                                0{index + 1}
                            </span>

                            {/* Category Column */}
                            <h3 className="font-bold text-zinc-100 w-32 group-hover:text-red-500 transition-colors uppercase tracking-tighter">
                                {category}
                            </h3>

                            {/* Tech Items Column */}
                            <div className="flex-1 flex flex-wrap gap-x-3 gap-y-1">
                                {items.map((item, i) => (
                                    <span key={i} className="text-zinc-500 group-hover:text-zinc-300 transition-colors">
                                        "{item}"{i < items.length - 1 ? "," : ""}
                                    </span>
                                ))}
                            </div>

                            {/* Row Status */}
                            <div className="w-16 flex justify-end">
                                <span className="text-[9px] px-1.5 py-0.5 rounded border border-green-500/30 text-green-500 bg-green-500/5 uppercase font-bold">
                                    ok
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
                {/* Execution Info & Flag */}
                <p className={clsx(
                    "text-[9px] font-mono mt-2 flex items-center gap-2 transition-all duration-700",
                    isHovered ? "text-zinc-500 opacity-100" : "text-white/5 opacity-50"
                )}>
                    <Flag
                        size={10}
                        fill="currentColor"
                        className={isHovered ? "opacity-100" : "opacity-20"}
                    />
                    Execution time: 0.0002ms | Node v20.x
                </p>

                {/* Dynamic Cursor / Footnote */}
                <div className={clsx(
                    "footnote mt-4 pt-6 border-t transition-all duration-700",
                    isHovered ? "border-white/10" : "border-transparent"
                )}>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center">
                            <span className="bg-red-600 text-white px-2 py-0.5 text-[10px] font-bold rounded-s-sm">Andereyan</span>
                            <span className="bg-white/10 text-white/80 px-2 py-0.5 text-[10px] rounded-e-sm backdrop-blur-md">~/portfolio</span>
                        </div>
                        {/* PERBAIKAN TOTAL: Mengganti struktur <p> -> <div> -> <p> yang salah menjadi <div> -> <span> */}
                        <div className="flex items-center gap-2 text-xs">
                            <span className="text-zinc-400">$</span>
                            <span className={clsx(
                                "w-2 h-4 animate-pulse transition-all duration-75",
                                isHovered ? "bg-red-600 shadow-[0_0_8px_#dc2626]" : "bg-white/10 shadow-none"
                            )} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Subtle Inner Glass Reflection */}
            <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-xl z-40" />
        </div>
    )
}

const TerminalWindow = WindowWrapper(Terminal, 'terminal');
export default TerminalWindow;