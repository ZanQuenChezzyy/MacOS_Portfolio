import { WindowControls } from '#components'
import { socials } from '#constants'
import WindowWrapper from '#hoc/WindowWrapper'
import clsx from 'clsx'
import { Download, Mail, Search, ShieldCheck } from 'lucide-react'
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
                        <Mail size={10} className="text-blue-500 mr-2" />
                        <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">My Contact</span>
                    </div>
                </div>

                <div className="w-1/4 flex justify-end">
                    <div className="flex items-center gap-2 px-3 py-1 bg-black/20 border border-white/5 rounded-full text-zinc-500">
                        <Search size={10} />
                        <span className="text-[9px] uppercase tracking-wider">Search</span>
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
                        <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-green-500 border-[3px] border-[#1a1a1a] rounded-full" />
                    </div>

                    <div className="mt-6 text-center space-y-2">
                        <h3 className="text-md font-bold text-white tracking-tight leading-none">Andereyan Muhammat</h3>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em]">Website Developer</p>
                    </div>

                    <div className="mt-2 w-full space-y-3">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                            <p className="text-[10px] text-zinc-400 italic">"The one who wishes to wear the crown must bear it's weight"</p>
                        </div>
                    </div>

                    <div className="mt-4 w-full space-y-4 pt-4 border-t border-white/5">
                        <div className="flex gap-3 px-auto mb-5">
                            <a
                                href="/files/resume.pdf"
                                download="Resume_Andereyan.pdf"
                                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-[10px] text-zinc-300 font-bold decoration-none"
                            >
                                <Download size={12} className="text-zinc-500 group-hover:text-white transition-colors" />
                                <span>Download CV</span>
                            </a>
                        </div>
                        <div className="flex flex-col gap-1 px-2">
                            <span className="text-[8px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Local Time</span>
                            <span className="text-[10px] text-zinc-300 font-mono">
                                {new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })} GMT+7
                            </span>
                        </div>
                    </div>
                </div>

                {/* MAIN CONTENT (Social Grid) */}
                <div className='flex-1 overflow-y-auto custom-scrollbar p-6'>
                    <h3 className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-6 px-2">
                        Social Channels / Network
                    </h3>
                    <ul className='grid grid-cols-2 gap-3 auto-rows-min'>
                        <li
                            className="col-span-2 group flex items-center justify-between p-4 rounded-xl transition-all duration-300 cursor-pointer bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 hover:border-red-500/40"
                            onClick={() => window.location.href = 'mailto:work.andereyan@gmail.com'}
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-lg bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-transform duration-300 group-hover:rotate-12">
                                    <Mail size={16} className="text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-black tracking-wider text-white uppercase">Direct Inquiry</span>
                                    <span className="text-[10px] text-zinc-400 group-hover:text-zinc-200 transition-colors">work.andereyan@gmail.com</span>
                                </div>
                            </div>
                            <div className="text-[9px] font-bold text-red-500 opacity-0 group-hover:opacity-100 transition-opacity pr-2">
                                SEND MESSAGE →
                            </div>
                        </li>
                        {socials.map(({ id, bg, link, icon, text }) => (
                            <li
                                key={id}
                                className={clsx(
                                    "group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer",
                                    "bg-white/3 border border-white/5 hover:border-red-500/30 hover:bg-white/8"
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