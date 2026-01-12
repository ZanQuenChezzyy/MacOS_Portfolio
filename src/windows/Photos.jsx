import { WindowControls } from '#components'
import { gallery } from '#constants'
import WindowWrapper from '#hoc/WindowWrapper'
import clsx from 'clsx'
import {
    Image as ImageIcon, Heart, Grid3x3, Clock,
    SlidersHorizontal, ChevronLeft, ChevronRight,
    Info, Share2, ZoomIn
} from 'lucide-react'
import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'

// --- SIDEBAR ITEM ---
const SidebarItem = ({ icon: Icon, label, count, isActive, onClick }) => (
    <li
        onClick={onClick}
        className="relative flex items-center justify-between px-3 py-1.5 cursor-pointer select-none group z-10"
    >
        {isActive && (
            <Motion.div
                layoutId="sidebar-active"
                className="absolute inset-0 bg-blue-500/20 rounded-lg border border-blue-500/10 shadow-inner"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
        )}
        <div className={clsx("relative flex items-center gap-3 z-10 transition-colors duration-200", isActive ? "text-blue-400 font-semibold" : "text-zinc-400 group-hover:text-zinc-100")}>
            {Icon && <Icon size={14} className={clsx(isActive ? "text-blue-400" : "text-zinc-500 group-hover:text-zinc-300")} />}
            <span className="tracking-wide text-[11px]">{label}</span>
        </div>
        {count !== undefined && <span className="relative z-10 text-[9px] opacity-50 font-mono text-zinc-400">{count}</span>}
    </li>
);

const Photos = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [activeTab, setActiveTab] = useState('Library');
    const [selectedImageId, setSelectedImageId] = useState(null);
    const [columnCount, setColumnCount] = useState(3);
    const [direction, setDirection] = useState(0);

    const filteredGallery = useMemo(() => {
        return gallery.filter(item => {
            if (activeTab === 'Library') return true;
            if (activeTab === 'Memories') return item.category === 'Memories';
            if (activeTab === 'Favorites') return item.isFavorite === true;
            if (activeTab === 'Recents') return true;
            return true;
        });
    }, [activeTab]);

    const selectedImageIndex = filteredGallery.findIndex(img => img.id === selectedImageId);
    const selectedImage = filteredGallery[selectedImageIndex];

    const changeImage = useCallback((newDirection) => {
        const newIndex = selectedImageIndex + newDirection;
        if (newIndex >= 0 && newIndex < filteredGallery.length) {
            setDirection(newDirection);
            setSelectedImageId(filteredGallery[newIndex].id);
        }
    }, [selectedImageIndex, filteredGallery]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedImageId) return;
            if (e.key === 'ArrowRight') changeImage(1);
            if (e.key === 'ArrowLeft') changeImage(-1);
            if (e.key === 'Escape') setSelectedImageId(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImageId, selectedImageIndex, changeImage]);

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 500 : -500,
            opacity: 0,
            scale: 0.9
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 500 : -500,
            opacity: 0,
            scale: 0.9
        })
    };

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={clsx(
                "relative h-full flex flex-col font-sans overflow-hidden transition-all duration-700 ease-in-out rounded-[inherit]",
                selectedImageId ? "bg-[#0a0a0a]" : (isHovered ? "bg-black/40 backdrop-blur-3xl saturate-100" : "bg-transparent backdrop-blur-none")
            )}
        >
            {/* --- HEADER --- */}
            <div id='window-header' className={clsx(
                "relative z-30 flex items-center justify-between px-4 py-3 border-b transition-all duration-500 min-h-13",
                selectedImageId ? "bg-[#0a0a0a] border-white/5" : (isHovered ? "bg-white/2 border-white/5" : "bg-transparent border-transparent")
            )}>
                {/* Left Controls */}
                <div className="flex items-center gap-4 w-1/3">
                    <WindowControls target="photos" />
                    <AnimatePresence>
                        {selectedImageId && (
                            <Motion.button
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                onClick={() => setSelectedImageId(null)}
                                className="p-1 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors flex items-center gap-1 group"
                            >
                                <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                                <span className="text-[11px] font-medium">Library</span>
                            </Motion.button>
                        )}
                    </AnimatePresence>
                </div>

                {/* Center Tabs / Title */}
                <div className="flex-1 flex justify-center">
                    <AnimatePresence mode='wait'>
                        {selectedImageId ? (
                            <Motion.div
                                key="title"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex flex-col items-center"
                            >
                                <span className="text-[11px] font-bold text-zinc-200 tracking-wide uppercase">
                                    {selectedImage?.location || 'Unknown'}
                                </span>
                                <span className="text-[9px] text-zinc-500 font-mono">
                                    {selectedImage?.date}
                                </span>
                            </Motion.div>
                        ) : (
                            <Motion.div
                                key="tabs"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex items-center bg-black/20 p-0.5 rounded-lg border border-white/5 backdrop-blur-md"
                            >
                                {['Library', 'Memories', 'Favorites'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={clsx(
                                            "px-3 py-0.5 text-[10px] rounded-md font-medium transition-all duration-300 relative",
                                            activeTab === tab ? "text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
                                        )}
                                    >
                                        {activeTab === tab && (
                                            <Motion.div
                                                layoutId="tab-pill"
                                                className="absolute inset-0 bg-white/10 rounded-md shadow-sm"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <span className="relative z-10">{tab}</span>
                                    </button>
                                ))}
                            </Motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Actions */}
                <div className="w-1/3 flex justify-end gap-2">
                    <AnimatePresence mode="wait">
                        {selectedImageId ? (
                            <Motion.div
                                key="actions"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="flex items-center gap-1 text-zinc-400"
                            >
                                {[Heart, Info, Share2].map((Icon, i) => (
                                    <button key={i} className="p-1.5 hover:bg-white/10 rounded-md hover:text-white transition-colors active:scale-90 duration-200">
                                        <Icon size={14} />
                                    </button>
                                ))}
                            </Motion.div>
                        ) : (
                            <Motion.div
                                key="grid-opts"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="flex items-center gap-2 px-2 py-1 bg-black/20 border border-white/5 rounded-lg text-zinc-500 backdrop-blur-md"
                            >
                                <Grid3x3 size={12} className={clsx("cursor-pointer transition-colors", columnCount === 3 ? "text-white" : "hover:text-zinc-300")} onClick={() => setColumnCount(3)} />
                                <div className="w-px h-2 bg-white/10" />
                                <SlidersHorizontal size={12} className={clsx("cursor-pointer transition-colors", columnCount === 4 ? "text-white" : "hover:text-zinc-300")} onClick={() => setColumnCount(4)} />
                            </Motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className='flex flex-1 overflow-hidden relative'>
                {/* --- SIDEBAR --- */}
                <Motion.div
                    animate={{
                        width: selectedImageId ? 0 : 192,
                        opacity: selectedImageId ? 0 : 1,
                        x: selectedImageId ? -20 : 0
                    }}
                    className="flex flex-col border-r border-white/5 h-full py-4 overflow-hidden bg-black/20 backdrop-blur-md origin-left"
                >
                    <div className="w-48 px-3 min-w-48">
                        <h3 className="px-3 text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-2">Collections</h3>
                        <ul className="space-y-0.5">
                            <SidebarItem icon={ImageIcon} label="Library" count={gallery.length} isActive={activeTab === 'Library'} onClick={() => setActiveTab('Library')} />
                            <SidebarItem icon={Clock} label="Recents" isActive={activeTab === 'Recents'} onClick={() => setActiveTab('Recents')} />
                            <SidebarItem icon={Heart} label="Favorites" count={gallery.filter(i => i.isFavorite).length} isActive={activeTab === 'Favorites'} onClick={() => setActiveTab('Favorites')} />
                        </ul>
                    </div>
                </Motion.div>

                {/* --- MAIN CONTENT --- */}
                <div className='flex-1 relative overflow-hidden bg-transparent'>
                    <AnimatePresence initial={false} mode="popLayout">

                        {/* VIEW 1: GRID GALLERY */}
                        {!selectedImageId && (
                            <Motion.div
                                key="grid-container"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                                className="absolute inset-0 overflow-y-auto custom-scrollbar p-6"
                            >
                                <div className="mb-4 flex items-baseline justify-between">
                                    <Motion.h2 layoutId="header-title" className="text-xl font-bold text-white tracking-tight">{activeTab}</Motion.h2>
                                    <span className="text-[10px] text-zinc-500 font-mono select-none">{filteredGallery.length} Items</span>
                                </div>

                                <Motion.div
                                    layout
                                    className={clsx(
                                        "grid gap-4 auto-rows-min pb-10",
                                        columnCount === 3 ? "grid-cols-3" : "grid-cols-4"
                                    )}
                                >
                                    {filteredGallery.map((item) => (
                                        <Motion.div
                                            layoutId={`img-${item.id}`} // Pastikan ID ini sama dengan yang ada di tampilan Detail
                                            key={item.id}
                                            onClick={() => setSelectedImageId(item.id)}
                                            transition={{
                                                duration: 0.5,
                                                ease: [0.32, 0.72, 0, 1]
                                            }}
                                            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                                            whileTap={{ scale: 0.98 }}
                                            className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-white/5 border border-white/5 shadow-lg"
                                        >
                                            <Motion.img
                                                layoutId={`img-src-${item.id}`} // Berikan ID unik juga untuk tag img-nya
                                                src={item.img}
                                                alt={item.location}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Motion.div>
                                    ))}
                                </Motion.div>
                            </Motion.div>
                        )}

                        {/* VIEW 2: SINGLE IMAGE (LIGHTBOX) */}
                        {selectedImageId && selectedImage && (
                            <Motion.div
                                key="viewer"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center z-10"
                            >
                                {/* Nav Arrows */}
                                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-50 pointer-events-none">
                                    <button
                                        onClick={() => changeImage(-1)}
                                        disabled={selectedImageIndex === 0}
                                        className="pointer-events-auto p-3 cursor-pointer rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white backdrop-blur-xl transition-all disabled:opacity-0"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={() => changeImage(1)}
                                        disabled={selectedImageIndex === filteredGallery.length - 1}
                                        className="pointer-events-auto p-3 cursor-pointer rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white backdrop-blur-xl transition-all disabled:opacity-0"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </div>

                                {/* Main Image Slider */}
                                <div className="relative w-full h-full flex items-center justify-center p-8 overflow-hidden">
                                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                                        <Motion.div
                                            key={selectedImageId}
                                            custom={direction}
                                            variants={slideVariants}
                                            initial={direction === 0 ? false : "enter"}
                                            animate="center"
                                            exit="exit"
                                            drag="x"
                                            dragConstraints={{ left: 0, right: 0 }}
                                            dragElastic={1}
                                            onDragEnd={(e, { offset, velocity }) => {
                                                const swipe = Math.abs(offset.x) * velocity.x;
                                                if (swipe < -100) changeImage(1);
                                                else if (swipe > 100) changeImage(-1);
                                            }}
                                            layoutId={`img-${selectedImage.id}`}
                                            className="relative z-20 flex items-center justify-center cursor-grab active:cursor-grabbing w-full h-full"
                                        >
                                            <Motion.img
                                                layoutId={`img-src-${selectedImage.id}`} // Harus sama dengan Grid
                                                src={selectedImage.img}
                                                alt={selectedImage.location}
                                                className="max-w-full max-h-full object-contain rounded-md shadow-2xl select-none pointer-events-none"
                                            />
                                        </Motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Filmstrip (Bottom) */}
                                <Motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="absolute bottom-6 h-12 flex gap-2 overflow-x-auto px-4 py-1 max-w-lg mask-linear-fade z-50"
                                >
                                    {filteredGallery.map((img, idx) => (
                                        <div
                                            key={img.id}
                                            onClick={() => {
                                                setDirection(idx > selectedImageIndex ? 1 : -1);
                                                setSelectedImageId(img.id);
                                            }}
                                            className={clsx(
                                                "h-full aspect-square rounded cursor-pointer transition-all duration-300 border",
                                                selectedImageId === img.id ? "scale-110 border-blue-500 opacity-100" : "opacity-30 border-transparent hover:opacity-100"
                                            )}
                                        >
                                            <img src={img.img} className="w-full h-full rounded object-cover" />
                                        </div>
                                    ))}
                                </Motion.div>
                            </Motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* --- STATUS BAR --- */}
            <div className="h-6 bg-black/40 border-t border-white/5 flex items-center px-4 justify-between text-[9px] text-zinc-500 z-30 backdrop-blur-sm">
                <span className="font-mono">{selectedImageId ? `RAW • ISO 100 • 24mm` : `Updated just now`}</span>
                {selectedImageId && (
                    <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map(i => <div key={i} className={clsx("w-0.5 h-2 rounded-full", i <= 3 ? "bg-white/40" : "bg-white/10")} />)}
                        </div>
                        <ZoomIn size={10} />
                    </div>
                )}
            </div>
        </div>
    )
}

const PhotosWindow = WindowWrapper(Photos, 'photos')
export default PhotosWindow