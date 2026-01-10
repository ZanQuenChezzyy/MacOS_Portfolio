import React, { useState } from 'react';
import { WindowControls } from '#components';
import {
    ShieldHalf, Search, Share, Plus, LayoutGrid,
    PanelLeft, ChevronLeft, ChevronRight, MoveRight,
    RotateCw, Globe, Star, Briefcase, History
} from 'lucide-react';
import clsx from 'clsx';
import WindowWrapper from '#hoc/WindowWrapper';
import { blogPosts, locations, socials } from '#constants';

const Safari = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    // Mengambil data dari WORK_LOCATION yang kamu punya
    const workExperience = locations.work.children;

    const tabs = [
        { title: "Andereyan.dev — Portfolio", icon: <Globe size={10} /> },
        { title: "Work Experience", icon: <Briefcase size={10} /> },
    ];

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={clsx(
                "relative h-full flex flex-col font-sans text-slate-100 selection:bg-red-500/30 overflow-hidden rounded-[inherit] transition-all duration-700 ease-in-out",
                isHovered
                    ? "bg-black/40 backdrop-blur-3xl saturate-150"
                    : "bg-transparent backdrop-blur-none"
            )}
        >
            {/* --- 1. TAB BAR --- */}
            <div className={clsx(
                "flex items-end px-3 gap-1 h-10 transition-colors duration-500",
                isHovered ? "bg-white/5" : "bg-transparent"
            )}>
                <div className="mb-2.5 mr-4">
                    <WindowControls target="safari" />
                </div>

                {tabs.map((tab, idx) => (
                    <div
                        key={idx}
                        onClick={() => setActiveTab(idx)}
                        className={clsx(
                            "group relative flex items-center gap-2 px-4 py-2 rounded-t-lg transition-all duration-300 cursor-pointer min-w-[160px] max-w-[200px]",
                            activeTab === idx
                                ? "bg-white/10 shadow-[0_-4px_10px_rgba(0,0,0,0.3)]"
                                : "hover:bg-white/5 opacity-50 hover:opacity-100"
                        )}
                    >
                        <span className={clsx(activeTab === idx ? "text-red-500" : "text-zinc-400")}>
                            {tab.icon}
                        </span>
                        <span className="text-[10px] font-medium truncate tracking-tight">
                            {tab.title}
                        </span>
                        {activeTab === idx && (
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red-600 shadow-[0_0_10px_#dc2626]" />
                        )}
                    </div>
                ))}
                <div className="p-2 mb-1 opacity-20 hover:opacity-100 cursor-pointer transition-opacity">
                    <Plus size={14} />
                </div>
            </div>

            {/* --- 2. NAVIGATION TOOLBAR --- */}
            <div className={clsx(
                "relative z-30 border-y border-white/5 px-4 py-2 flex items-center gap-5 transition-colors duration-500",
                isHovered ? "bg-white/[0.03]" : "bg-transparent"
            )}>
                <div className="flex items-center gap-3 text-white/40">
                    <PanelLeft size={16} className="cursor-pointer hover:text-white transition-colors" />
                    <div className="flex items-center gap-1.5 ml-2">
                        <ChevronLeft size={18} className="cursor-pointer hover:text-white transition-colors" />
                        <ChevronRight size={18} className="opacity-20" />
                    </div>
                </div>

                <div className="flex-1 flex justify-center">
                    <div className={clsx(
                        "group flex items-center gap-3 w-full max-w-2xl border rounded-xl px-4 py-1.5 transition-all duration-500",
                        isHovered
                            ? "bg-black/40 border-white/10 shadow-inner"
                            : "bg-white/5 border-transparent"
                    )}>
                        <ShieldHalf className="w-3.5 h-3.5 text-green-500/60" />
                        <div className="flex items-center justify-center flex-1 gap-2">
                            <span className="text-[11px] font-medium text-white/80">
                                {activeTab === 0 ? "andereyan.dev/blog" : "andereyan.dev/experience"}
                            </span>
                            <RotateCw size={10} className="text-white/20 group-hover:text-white/60 transition-colors" />
                        </div>
                        <Search className="w-3.5 h-3.5 text-white/20" />
                    </div>
                </div>

                <div className="flex items-center gap-4 text-white/40">
                    <Share size={16} className="cursor-pointer hover:text-white" />
                    <Star size={16} className="cursor-pointer hover:text-white" />
                    <LayoutGrid size={16} className="cursor-pointer hover:text-white" />
                </div>
            </div>

            {/* --- 3. BOOKMARKS BAR (Dinamis dari socials) --- */}
            {isHovered && (
                <div className="flex items-center px-6 py-1 gap-6 border-b border-white/5 bg-black/10 animate-in slide-in-from-top-1 duration-500">
                    {socials.map((social) => (
                        <a
                            key={social.id}
                            href={social.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[9px] text-zinc-500 hover:text-white cursor-pointer transition-colors uppercase tracking-widest font-bold"
                        >
                            {social.text}
                        </a>
                    ))}
                </div>
            )}

            {/* --- 4. MAIN CONTENT --- */}
            <div className="relative z-10 flex-1 overflow-y-auto scroll-smooth px-12 py-16 custom-scrollbar bg-gradient-to-b from-transparent to-black/20">

                {/* Header Dinamis */}
                <header className="mb-12 text-left max-w-4xl mx-auto">
                    <div className={clsx(
                        "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 transition-all duration-1000",
                        isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                    )}>
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-zinc-400">
                            {activeTab === 0 ? "Insights & Articles" : "Career Path"}
                        </span>
                    </div>

                    <h2 className={clsx(
                        "text-4xl md:text-5xl font-medium tracking-tight leading-tight transition-all duration-1000",
                        isHovered ? "text-white opacity-100" : "text-white/20 opacity-30"
                    )}>
                        {activeTab === 0 ? "Latest" : "Work"} <span className="font-light text-zinc-500">
                            {activeTab === 0 ? "Posts" : "Experience"}
                        </span>
                    </h2>
                </header>

                {/* Grid Konten Dinamis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {activeTab === 0 ? (
                        // Render Blog Posts
                        blogPosts.map((post, index) => (
                            <ProjectCard
                                key={post.id}
                                title={post.title}
                                date={post.date}
                                image={post.image}
                                link={post.link}
                                index={index}
                                label="Read Article"
                            />
                        ))
                    ) : (
                        // Render Work Experience dari WORK_LOCATION
                        workExperience.map((work, index) => {
                            // Mencari file image di dalam children folder work tersebut
                            const imgFile = work.children?.find(c => c.fileType === 'img');
                            return (
                                <ProjectCard
                                    key={work.id}
                                    title={work.name}
                                    date="Project Active"
                                    image={imgFile?.imageUrl || "/images/folder.png"}
                                    link="#"
                                    index={index}
                                    label="View Details"
                                />
                            );
                        })
                    )}
                </div>

                <footer className="mt-40 mb-10 text-center">
                    <p className="text-[10px] tracking-[1em] font-light text-white/20">
                        DESIGNED BY <span className="text-red-600 font-bold">ANDREYAN</span>
                    </p>
                </footer>
            </div>
        </div>
    );
}

const ProjectCard = ({ title, date, image, link, index, label }) => (
    <div className={clsx(
        "group relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/5 hover:border-red-500/30 transition-all duration-500",
        index === 0 ? 'md:col-span-1' : '' // Kita hilangkan col-span-2 agar tidak terlalu besar
    )}>
        <div className="relative flex flex-col h-full">
            {/* Area Gambar yang lebih pendek */}
            <div className="relative overflow-hidden h-56">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            {/* Area Teks yang lebih tipis */}
            <div className="p-6 bg-black/40 backdrop-blur-sm border-t border-white/5">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-[9px] font-bold text-red-500/80 uppercase tracking-widest">{date}</span>
                </div>

                <h3 className="font-semibold text-white group-hover:text-red-500 transition-colors text-lg tracking-tight line-clamp-1">
                    {title}
                </h3>

                <div className="mt-4">
                    <a href={link} className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 group-hover:text-white transition-all">
                        {label} <MoveRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </div>
    </div>
);

const SafariWindow = WindowWrapper(Safari, 'safari');
export default SafariWindow;