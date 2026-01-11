import { WindowControls } from '#components'
import { gallery } from '#constants'
import WindowWrapper from '#hoc/WindowWrapper'
import useWindowStore from '#store/window'
import clsx from 'clsx'
import { Image as ImageIcon, Heart, Grid3x3, Clock, Album, Search, SlidersHorizontal } from 'lucide-react'
import React, { useState } from 'react'

// --- HELPER COMPONENT (Dipindahkan ke luar) ---
const SidebarItem = ({ icon: Icon, label, count, isActive, onClick }) => (
    <li
        onClick={onClick}
        className={clsx(
            "flex items-center justify-between px-3 py-1.5 rounded-lg text-[11px] cursor-pointer transition-all duration-200 group select-none",
            isActive
                ? "bg-blue-500/20 text-blue-400 font-semibold shadow-inner border-blue-500/10"
                : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
        )}
    >
        <div className="flex items-center gap-3">
            {Icon && <Icon size={14} className={clsx(isActive ? "text-blue-400" : "text-zinc-500 group-hover:text-zinc-300")} />}
            <span className="tracking-wide">{label}</span>
        </div>
        {count && <span className="text-[9px] opacity-50 font-mono">{count}</span>}
    </li>
);

const Photos = () => {
    const { openWindow } = useWindowStore();
    const [isHovered, setIsHovered] = useState(false);
    const [activeTab, setActiveTab] = useState('Library');
    const [columnCount, setColumnCount] = useState(3);

    // LOGIC FILTER: Menyaring gallery berdasarkan tab yang aktif
    const filteredGallery = gallery.filter(item => {
        if (activeTab === 'Library') return true; // Tampilkan semua
        if (activeTab === 'Memories') return item.category === 'Memories';
        if (activeTab === 'Favorites') return item.isFavorite === true;
        if (activeTab === 'Recents') return true; // Bisa ditambah logic date jika perlu
        return true;
    });

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={clsx(
                "relative h-full flex flex-col font-sans overflow-hidden transition-all duration-500 ease-in-out rounded-[inherit]",
                isHovered ? "bg-black/40 backdrop-blur-3xl saturate-150" : "bg-transparent backdrop-blur-none"
            )}
        >
            {/* --- HEADER --- */}
            <div id='window-header' className={clsx(
                "relative z-30 flex items-center justify-between px-4 py-3 border-b border-white/5 transition-colors duration-500",
                isHovered ? "bg-white/2" : "bg-transparent"
            )}>
                <div className="flex items-center gap-6 w-1/4">
                    <WindowControls target="photos" />
                </div>

                {/* Tabs Interaktif */}
                <div className="flex items-center bg-black/20 p-0.5 rounded-lg border border-white/5">
                    {['Library', 'Memories', 'Favorites'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={clsx(
                                "px-3 py-0.5 text-[10px] rounded-md font-medium transition-all duration-200",
                                activeTab === tab ? "bg-white/10 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="w-1/4 flex justify-end gap-2">
                    <div className="flex items-center gap-2 px-2 py-1 bg-black/20 border border-white/5 rounded-lg text-zinc-500">
                        <Grid3x3
                            size={10}
                            className={clsx("cursor-pointer transition-colors", columnCount === 3 ? "text-white" : "hover:text-zinc-300")}
                            onClick={() => setColumnCount(3)}
                        />
                        <div className="w-px h-2 bg-white/10" />
                        <SlidersHorizontal
                            size={10}
                            className={clsx("cursor-pointer transition-colors", columnCount === 4 ? "text-white" : "hover:text-zinc-300")}
                            onClick={() => setColumnCount(4)}
                        />
                    </div>
                </div>
            </div>

            <div className='flex flex-1 overflow-hidden relative'>
                {/* SIDEBAR */}
                <div className={clsx(
                    'w-48 flex flex-col border-r border-white/5 transition-all duration-500 h-full py-4 px-3',
                    isHovered ? "bg-black/20 backdrop-blur-md" : "bg-transparent backdrop-blur-none"
                )}>
                    <div className="mb-6">
                        <h3 className="px-3 text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-2">Apple Photos</h3>
                        <ul className="space-y-0.5">
                            <SidebarItem
                                icon={ImageIcon}
                                label="Library"
                                count={gallery.length}
                                isActive={activeTab === 'Library'}
                                onClick={() => setActiveTab('Library')}
                            />
                            <SidebarItem
                                icon={Clock}
                                label="Recents"
                                isActive={activeTab === 'Recents'}
                                onClick={() => setActiveTab('Recents')}
                            />
                            <SidebarItem
                                icon={Heart}
                                label="Favorites"
                                count={gallery.filter(i => i.isFavorite).length}
                                isActive={activeTab === 'Favorites'}
                                onClick={() => setActiveTab('Favorites')}
                            />
                        </ul>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className='flex-1 overflow-y-auto custom-scrollbar p-6'>
                    <div className="mb-4 flex items-baseline justify-between">
                        <h2 className="text-xl font-bold text-white tracking-tight">
                            {activeTab}
                        </h2>
                        <span className="text-[10px] text-zinc-500 font-mono select-none">
                            {filteredGallery.length} Items Found
                        </span>
                    </div>

                    <div className={clsx(
                        "grid gap-4 auto-rows-min transition-all duration-500",
                        columnCount === 3 ? "grid-cols-3" : "grid-cols-4"
                    )}>
                        {filteredGallery.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => openWindow('image', { src: item.img, name: `Photo_${item.id}` })}
                                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-white/5 border border-white/5 shadow-lg"
                            >
                                <img
                                    src={item.img}
                                    alt={item.location}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <p className="text-[10px] font-bold text-white truncate">{item.location}</p>
                                    <p className="text-[8px] text-zinc-300 font-mono">{item.date}</p>
                                </div>

                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <div className={clsx(
                                        "p-1.5 backdrop-blur-md rounded-full transition-colors",
                                        item.isFavorite ? "bg-red-500/20 text-red-500" : "bg-black/40 text-white hover:text-red-400"
                                    )}>
                                        <Heart size={10} fill={item.isFavorite ? "currentColor" : "none"} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredGallery.length === 0 && (
                        <div className="h-64 flex flex-col items-center justify-center text-zinc-500">
                            <ImageIcon size={32} className="opacity-20 mb-2" />
                            <p className="text-xs">No photos in this category</p>
                        </div>
                    )}

                    {/* Footer Info Area */}
                    <div className="mt-12 text-center pb-4">
                        <p className="text-[10px] text-zinc-500 font-medium">{gallery.length} Photos, 0 Videos</p>
                        <p className="text-[9px] text-zinc-600 mt-1">Synced with iCloud</p>
                    </div>
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-6 bg-black/40 border-t border-white/5 flex items-center px-4 justify-between text-[9px] text-zinc-500">
                <span>Last updated just now</span>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                    <span>Syncing...</span>
                </div>
            </div>
        </div>
    )
}

const PhotosWindow = WindowWrapper(Photos, 'photos')
export default PhotosWindow