import { WindowControls } from '#components'
import { locations } from '#constants'
import WindowWrapper from '#hoc/WindowWrapper'
import useLocationStore from '#store/location'
import useWindowStore from '#store/window'
import clsx from 'clsx'
import { Search, Folder, Cloud } from 'lucide-react'
import React, { useState } from 'react'

const Finder = () => {
    const { openWindow } = useWindowStore()
    const { activeLocation, setActiveLocation } = useLocationStore();

    const [isHovered, setIsHovered] = useState(false);

    // --- ACTIONS ---
    const openItem = (item) => {
        if (item.fileType === 'pdf') return openWindow('resume');
        if (item.kind === 'folder') return setActiveLocation(item);
        if (['fig', 'url'].includes(item.fileType) && item.href) return window.open(item.href, '_blank');
        openWindow(`${item.fileType}${item.kind}`, item);
    }

    // --- HELPER COMPONENTS ---

    const SidebarItem = ({ item }) => {
        const isActive = item.id === activeLocation.id;
        return (
            <li
                onClick={() => setActiveLocation(item)}
                className={clsx(
                    "flex items-center gap-3 px-3 py-1.5 rounded-lg text-[11px] cursor-pointer transition-all duration-200 group select-none",
                    isActive
                        ? "bg-white/10 text-white font-semibold shadow-inner"
                        : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
                )}
            >
                <img
                    src={item.icon}
                    className={clsx("w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity", isActive && "opacity-100")}
                    alt={item.name}
                />
                <span className="truncate tracking-wide">{item.name}</span>
            </li>
        )
    };

    // Fungsi Render List agar kode Sidebar lebih bersih
    const renderList = (title, items) => {
        if (!items || items.length === 0) return null;

        return (
            <div className="mb-6">
                <h3 className="px-3 text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-2">
                    {title}
                </h3>
                <ul className="space-y-0.5">
                    {items.map((item) => (
                        <SidebarItem key={item.id || item.name} item={item} />
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={clsx(
                "relative h-full flex flex-col font-sans overflow-hidden transition-all duration-500 ease-in-out rounded-[inherit]",
                // Jika di-hover: Blur tebal + Background gelap
                // Jika keluar: Transparan + Blur tipis (atau tanpa blur)
                isHovered
                    ? "bg-black/40 backdrop-blur-3xl saturate-150"
                    : "bg-transparent backdrop-blur-none"
            )}
        >

            {/* --- FINDER HEADER --- */}
            <div id='window-header' className={clsx(
                "relative z-30 flex items-center justify-between px-4 py-3 border-b border-white/5 transition-colors duration-500",
                isHovered ? "bg-white/[0.02]" : "bg-transparent"
            )}>
                <div className="flex items-center gap-6 w-1/4">
                    <WindowControls target="finder" />
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center px-2 py-1 bg-black/20 rounded-md border border-white/5">
                        <Folder size={10} className="text-zinc-500 mr-2" />
                        <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">{activeLocation.name}</span>
                    </div>
                </div>

                <div className="w-1/4 flex justify-end">
                    <div className="flex items-center gap-2 px-3 py-1 bg-black/20 border border-white/5 rounded-full text-zinc-500">
                        <Search size={10} />
                        <span className="text-[9px] uppercase tracking-wider">Search</span>
                    </div>
                </div>
            </div>

            {/* --- SPLIT VIEW BODY --- */}
            <div className='flex flex-1 overflow-hidden relative'>

                {/* SIDEBAR (Clean Implementation) */}
                <div className={clsx(
                    'w-48 flex flex-col border-r border-white/5 transition-all duration-500',
                    isHovered ? "bg-black/20 backdrop-blur-md" : "bg-transparent backdrop-blur-none"
                )}>

                    {/* List Area */}
                    <div className="flex-1 overflow-y-hidden py-4 px-3 custom-scrollbar">
                        {renderList('Favorites', Object.values(locations))}
                        {locations.work && renderList('My Projects', locations.work.children)}
                    </div>

                    {/* Sidebar Footer (Storage) */}
                    <div className="pt-4 pb-4 border-t border-white/5 bg-black/10">
                        <div className="flex items-center gap-2 px-3 text-[10px] text-zinc-500">
                            <Cloud size={10} />
                            <span>Storage</span>
                        </div>
                        <div className="px-3 mt-1">
                            <div className="h-0.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full w-[70%] bg-zinc-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* MAIN CONTENT (Grid) */}
                <div className='flex-1 overflow-y-auto custom-scrollbar p-6'>
                    <ul className='grid grid-cols-4 gap-4 auto-rows-min'>
                        {activeLocation?.children.map((item) => (
                            <li
                                key={item.id}
                                className={clsx(
                                    "group flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-200 cursor-pointer",
                                    "hover:bg-white/5 border border-transparent hover:border-white/5"
                                )}
                                onClick={() => openItem(item)}
                            >
                                <div className="relative">
                                    <img
                                        src={item.icon}
                                        className='w-12 h-12 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300'
                                        alt={item.name}
                                    />
                                    <div className="absolute -bottom-2 inset-x-0 h-4 bg-linear-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 blur-md transition-opacity" />
                                </div>

                                <p className={clsx(
                                    'text-[10px] text-center font-medium max-w-full truncate px-2 py-0.5 rounded',
                                    'text-zinc-300 group-hover:text-white group-hover:bg-red-600/80 transition-colors'
                                )}>
                                    {item.name}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-6 bg-black/40 border-t border-white/5 flex items-center px-4 justify-between text-[9px] text-zinc-500">
                <span>{activeLocation.children.length} items</span>
                <span>Available: 240 GB</span>
            </div>
        </div>
    )
}

const FinderWindow = WindowWrapper(Finder, 'finder')
export default FinderWindow