import dayjs from "dayjs"
import { navIcons, navLinks } from "#constants"
import useWindowStore from "#store/window"
import React, { useState, useEffect } from 'react'
import { Wifi, Search } from 'lucide-react'

const Navbar = () => {
    const { openWindow } = useWindowStore();
    const [currentTime, setCurrentTime] = useState(dayjs());

    // Update waktu setiap menit agar presisi
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(dayjs()), 10000);
        return () => clearInterval(timer);
    }, []);

    return (
        <nav className="fixed top-0 w-full z-100 border-b border-white/3 bg-black/10 backdrop-blur-[20px] saturate-180 select-none">
            <div className="flex justify-between items-center h-8 px-4">

                {/* --- LEFT SIDE: Apple Menu & App Links --- */}
                <div className="flex items-center gap-1">
                    {/* Apple Style Logo */}
                    <div className="px-3 py-1 rounded-md hover:bg-white/10 transition-all duration-200 cursor-pointer group">
                        <img
                            src="/images/logo-white.svg"
                            alt="OS Logo"
                            className="h-3.5 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                    </div>

                    {/* App Name */}
                    {/* <div className="px-3 py-1 rounded-md cursor-default mr-2">
                        <p className="text-[11.5px] font-black tracking-tight text-white transition-colors">
                            Andereyan Muhammat
                        </p>
                    </div> */}

                    {/* Navigation Menu */}
                    <ul className="flex items-center">
                        {navLinks.map(({ id, name, type }) => (
                            <li
                                key={id}
                                onClick={() => openWindow(type)}
                                className="px-3 py-1 rounded-md hover:bg-white/10 active:bg-white/20 transition-all cursor-pointer group"
                            >
                                <p className="text-[11.5px] font-medium text-white/85 group-hover:text-white transition-colors">
                                    {name}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* --- RIGHT SIDE: System Tray & Clock --- */}
                <div className="flex items-center gap-4">

                    {/* Control Center Icons */}
                    <ul className="flex items-center gap-3.5">
                        {/* Search Icon (Spotlight) */}
                        <li className="p-1 rounded-md hover:bg-white/10 transition-all cursor-pointer opacity-80 hover:opacity-100">
                            <Search size={13.5} className="text-white" />
                        </li>

                        {/* Status Icons */}
                        <li className="flex items-center gap-3 opacity-80 border-r border-white/10 pr-4">
                            <Wifi size={14} className="text-white" strokeWidth={2.5} />
                            <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-bold text-white/80">84%</span>
                                <div className="w-5 h-2.5 border border-white/40 rounded-xs relative p-px">
                                    <div className="h-full bg-white w-3/4 rounded-[0.5px]" />
                                    <div className="absolute -right-[2.5px] top-1/2 -translate-y-1/2 w-[1.5px] h-1 bg-white/40 rounded-r-full" />
                                </div>
                            </div>
                        </li>

                        {/* Extra Constants Icons */}
                        {navIcons.map(({ id, img }) => (
                            <li key={id} className="p-1 rounded-md hover:bg-white/10 opacity-80 hover:opacity-100 transition-all cursor-pointer">
                                <img src={img} className="w-3.5 h-3.5 invert" alt={`icon-${id}`} />
                            </li>
                        ))}
                    </ul>

                    {/* Precise Time & Date */}
                    <div className="flex items-center gap-2 pl-2 cursor-default group">
                        <time className="text-[11.5px] font-semibold tracking-normal text-white/90">
                            {currentTime.format('ddd MMM D')}
                        </time>
                        <time className="text-[11.5px] font-semibold tracking-normal text-white/90 min-w-10">
                            {currentTime.format('HH:mm')}
                        </time>
                    </div>

                </div>
            </div>

            {/* Glossy Reflection Line (Apple 2026 Aesthetic) */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        </nav>
    )
}

export default Navbar