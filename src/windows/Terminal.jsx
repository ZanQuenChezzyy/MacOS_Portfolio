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
                // Logika Background: Identik dengan Contact & Safari
                isHovered
                    ? "bg-black/40 backdrop-blur-3xl saturate-150"
                    : "bg-transparent backdrop-blur-none saturate-100"
            )}
        >
            {/* --- WINDOW HEADER --- */}
            <div
                id="window-header"
                className={clsx(
                    "relative z-30 border-b border-white/5 px-4 py-2.5 flex items-center transition-colors duration-500",
                    isHovered ? "bg-white/2" : "bg-transparent"
                )}
            >
                {/* HAPUS: Efek refractive light gradient merah agar konsisten putih bersih */}

                <div className="w-1/4">
                    <WindowControls target="terminal" />
                </div>

                <div className="flex-1 flex justify-center items-center gap-2 relative z-10">
                    <TerminalIcon size={12} className={clsx(
                        "transition-all duration-500",
                        isHovered ? "text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" : "text-white/20"
                    )} />
                    <h2 className="text-[10px] font-black tracking-[0.3em] uppercase text-white/70">
                        ZSH <span className="text-white/20">—</span> 80x24
                    </h2>
                </div>

                {/* System Status Indicators */}
                <div className="w-1/4 flex justify-end items-center gap-3 opacity-20 group-hover:opacity-40 transition-opacity">
                    <Cpu size={10} className="text-white" />
                    <Globe size={10} className="text-white" />
                </div>
            </div>

            {/* --- TERMINAL BODY --- */}
            {/* Menggunakan bg-black/20 saat hover agar teks terminal tetap kontras namun tetap glass */}
            <div className={clsx(
                "techstack relative z-10 flex-1 p-6 overflow-y-auto custom-scrollbar transition-all duration-500",
                isHovered ? "bg-black/20" : "bg-transparent"
            )}>

                {/* Login Info */}
                <div className="mb-8 text-[11px] space-y-1">
                    <p className="text-white/30">Last login: {new Date().toDateString()} on ttys001</p>
                    <p className={clsx(
                        "transition-colors duration-500 font-bold",
                        isHovered ? "text-red-500/80" : "text-white/20"
                    )}>
                        Welcome to Andereyan-Terminal-Env v4.0.2-stable
                    </p>
                </div>

                {/* CLI Prompt */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center">
                        <span className={clsx(
                            "px-2 py-0.5 text-[10px] font-bold rounded-s-sm transition-colors",
                            isHovered ? "bg-red-600 text-white" : "bg-white/10 text-white/40"
                        )}>Andereyan</span>
                        <span className="bg-white/5 text-white/40 px-2 py-0.5 text-[10px] rounded-e-sm">~/Skills</span>
                    </div>
                    <p className="text-xs text-zinc-500">
                        $ fetch --stack --display=table
                    </p>
                </div>

                {/* Table Header */}
                <div className={clsx(
                    "label flex items-center border-b pb-2 mb-4 text-[10px] font-bold uppercase tracking-widest transition-colors duration-500",
                    isHovered ? "text-red-500 border-white/10" : "text-white/10 border-white/5"
                )}>
                    <p className="w-32">Index/Class</p>
                    <p className="flex-1">Engine Components</p>
                    <p className="w-16 text-right">Status</p>
                </div>

                {/* Tech List Table */}
                <ul className="content space-y-4">
                    {techStack.map(({ category, items }, index) => (
                        <li key={category} className="group flex items-start text-[12px] transition-all border-b border-white/2 pb-3 last:border-0">
                            <span className="text-[10px] text-white/10 font-mono w-6 mt-1 group-hover:text-red-500 transition-colors">
                                0{index + 1}
                            </span>

                            <h3 className="font-bold text-zinc-100 w-32 group-hover:text-red-500 transition-colors uppercase tracking-tighter">
                                {category}
                            </h3>

                            <div className="flex-1 flex flex-wrap gap-x-3 gap-y-1">
                                {items.map((item, i) => (
                                    <span key={i} className="text-zinc-500 group-hover:text-zinc-300 transition-colors">
                                        "{item}"{i < items.length - 1 ? "," : ""}
                                    </span>
                                ))}
                            </div>

                            <div className="w-16 flex justify-end">
                                <span className={clsx(
                                    "text-[9px] px-1.5 py-0.5 rounded border uppercase font-bold transition-all",
                                    isHovered
                                        ? "border-green-500/30 text-green-500 bg-green-500/5"
                                        : "border-white/5 text-white/10"
                                )}>
                                    ok
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Execution Info */}
                <p className={clsx(
                    "text-[9px] font-mono mt-2 flex items-center gap-2 transition-all duration-700",
                    isHovered ? "text-zinc-500 opacity-100" : "text-white/5 opacity-50"
                )}>
                    <Flag size={10} fill="currentColor" />
                    Execution time: 0.0002ms | Node v20.x
                </p>

                {/* Footer Cursor */}
                <div className={clsx(
                    "footnote mt-4 pt-6 border-t transition-all duration-700",
                    isHovered ? "border-white/10" : "border-transparent"
                )}>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center">
                            <span className={clsx(
                                "px-2 py-0.5 text-[10px] font-bold rounded-s-sm transition-colors",
                                isHovered ? "bg-red-600 text-white" : "bg-white/10 text-white/40"
                            )}>Andereyan</span>
                            <span className="bg-white/5 text-white/40 px-2 py-0.5 text-[10px] rounded-e-sm">~/Skills</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                            <span className="text-zinc-500">$</span>
                            <span className={clsx(
                                "w-2 h-4 animate-pulse transition-all duration-75",
                                isHovered ? "bg-red-600 shadow-[0_0_8px_#dc2626]" : "bg-white/10"
                            )} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const TerminalWindow = WindowWrapper(Terminal, 'terminal');
export default TerminalWindow;