import { WindowControls } from '#components'
import { socials } from '#constants'
import WindowWrapper from '#hoc/WindowWrapper'
import clsx from 'clsx'
import { Mail, ShieldCheck, Zap } from 'lucide-react'
import React, { useState } from 'react'

const Contact = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={clsx(
                "relative h-full flex flex-col font-sans overflow-hidden transition-all duration-500 ease-in-out rounded-[inherit]",
                isHovered
                    ? "bg-black/40 backdrop-blur-3xl saturate-150"
                    : "bg-transparent backdrop-blur-none"
            )}
        >
            {/* --- CONTACT HEADER (Finder Style) --- */}
            <div id='window-header' className={clsx(
                "relative z-30 flex items-center justify-between px-4 py-3 border-b border-white/5 transition-colors duration-500",
                isHovered ? "bg-white/2" : "bg-transparent"
            )}>
                <div className="flex items-center gap-6 w-1/4">
                    <WindowControls target="contact" />
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center px-2 py-1 bg-black/20 rounded-md border border-white/5">
                        <Mail size={10} className="text-red-500 mr-2" />
                        <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">Connect Port</span>
                    </div>
                </div>

                <div className="w-1/4 flex justify-end">
                    <div className="flex items-center gap-2 px-3 py-1 bg-black/20 border border-white/5 rounded-full text-zinc-500">
                        <Zap size={10} className="text-yellow-500" />
                        <span className="text-[9px] uppercase tracking-wider">Active</span>
                    </div>
                </div>
            </div>

            {/* --- BODY VIEW --- */}
            <div className='flex flex-1 overflow-hidden relative'>

                {/* SIDEBAR (Profile Area) */}
                <div className={clsx(
                    'w-56 flex flex-col border-r border-white/5 transition-all duration-500 p-6 items-center',
                    isHovered ? "bg-black/20 backdrop-blur-md" : "bg-transparent backdrop-blur-none"
                )}>
                    <div className="relative group">
                        <img
                            src='/images/adrian.jpg'
                            alt='Andereyan'
                            className='w-24 h-24 rounded-2xl object-cover border border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-105'
                        />
                        <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-green-500 border-[3px] border-[#1a1a1a] rounded-full shadow-[0_0_15px_#22c55e]" />
                    </div>

                    <div className="mt-6 text-center space-y-2">
                        <h3 className="text-lg font-bold text-white tracking-tight leading-none">Andereyan</h3>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em]">Creative Developer</p>
                    </div>

                    <div className="mt-8 w-full space-y-3">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                            <p className="text-[10px] text-zinc-400 italic">"Building the future of web interfaces with liquid glass."</p>
                        </div>
                    </div>
                </div>

                {/* MAIN CONTENT (Social Grid) */}
                <div className='flex-1 overflow-y-auto custom-scrollbar p-6'>
                    <h3 className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-6 px-2">
                        Social Channels / Network
                    </h3>

                    <ul className='grid grid-cols-2 gap-3 auto-rows-min'>
                        {socials.map(({ id, bg, link, icon, text }) => (
                            <li
                                key={id}
                                className={clsx(
                                    "group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer",
                                    "bg-white/[0.03] border border-white/5 hover:border-red-500/30 hover:bg-white/[0.08]"
                                )}
                                onClick={() => window.open(link, '_blank')}
                            >
                                <div
                                    className="p-2.5 rounded-lg shadow-inner relative transition-transform duration-300 group-hover:scale-110"
                                    style={{ backgroundColor: `${bg}33` }}
                                >
                                    <img src={icon} alt={text} className='w-5 h-5 filter brightness-110' />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-bold tracking-wide text-zinc-200 group-hover:text-white transition-colors">
                                        {text}
                                    </span>
                                    <span className="text-[9px] text-zinc-500 group-hover:text-red-400 transition-colors uppercase">
                                        Verified →
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-6 bg-black/40 border-t border-white/5 flex items-center px-4 justify-between text-[9px] text-zinc-500">
                <div className="flex items-center gap-2">
                    <ShieldCheck size={10} className="text-green-500" />
                    <span>Encrypted Connection</span>
                </div>
                <span>v4.0.2 Stable</span>
            </div>
        </div>
    )
}

const ContactWindow = WindowWrapper(Contact, 'contact')
export default ContactWindow