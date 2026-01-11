import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import { Download, FileText, Search, ZoomIn, ZoomOut, ExternalLink } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import React, { useState } from 'react';
import clsx from 'clsx';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const Resume = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [numPages, setNumPages] = useState(null);

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
            {/* --- LIQUID GLASS HEADER (Consistent with Finder) --- */}
            <div id="window-header" className={clsx(
                "relative z-30 flex items-center justify-between px-4 py-3 border-b border-white/5 transition-colors duration-500",
                isHovered ? "bg-white/2" : "bg-transparent"
            )}>
                {/* Window Controls */}
                <div className="flex items-center gap-6 w-1/4">
                    <WindowControls target="resume" />
                </div>

                {/* Center Pill: Title UI */}
                {/* Center Pill: Title UI */}
                <div className="flex items-center gap-2">
                    <div className={clsx(
                        "flex items-center px-3 py-1 rounded-md border transition-all duration-500",
                        isHovered
                            ? "bg-white/5 border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.03)]"
                            : "bg-black/20 border-white/5 opacity-60"
                    )}>
                        <FileText
                            size={10}
                            className={clsx(
                                "mr-2 transition-all duration-500",
                                isHovered
                                    ? "text-zinc-200 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                                    : "text-zinc-500"
                            )}
                        />
                        <span className={clsx(
                            "text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-500",
                            isHovered ? "text-zinc-200" : "text-zinc-500"
                        )}>
                            Curriculum-Vitae.pdf
                        </span>
                    </div>
                </div>

                {/* Actions: Download Button */}
                <div className="w-1/4 flex justify-end">
                    <a
                        href="/files/resume.pdf"
                        download="Resume_Andereyan.pdf"
                        className={clsx(
                            "flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all duration-500 group decoration-none",
                            isHovered
                                ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.03)]"
                                : "bg-black/20 border-white/5 opacity-60"
                        )}
                    >
                        <Download
                            size={12}
                            className={clsx(
                                "transition-colors duration-500",
                                isHovered ? "text-zinc-400 group-hover:text-white" : "text-zinc-600"
                            )}
                        />
                        <span className={clsx(
                            "text-[9px] font-black uppercase tracking-widest transition-colors duration-500",
                            isHovered ? "text-zinc-300 group-hover:text-white" : "text-zinc-500"
                        )}>
                            Download
                        </span>
                    </a>
                </div>
            </div>

            {/* --- PDF CONTENT AREA --- */}
            <div className="flex-1 overflow-y-auto flex justify-center p-2 custom-scrollbar scroll-smooth relative">
                {/* Ambient Glow Background behind the paper */}
                <div className={clsx(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-red-600/5 blur-[120px] rounded-full transition-opacity duration-1000",
                    isHovered ? "opacity-100" : "opacity-0"
                )} />

                <div className="relative group/pdf">
                    {/* Shadow Layer untuk efek kedalaman kertas */}
                    <div className={clsx(
                        "absolute -inset-2 bg-black/60 blur-2xl rounded-lg transition-opacity duration-500",
                        isHovered ? "opacity-100" : "opacity-40"
                    )} />

                    <Document
                        file="files/resume.pdf"
                        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                        className="flex flex-col gap-12 items-center"
                    >
                        <Page
                            pageNumber={1}
                            renderTextLayer={true}
                            renderAnnotationLayer={true}
                            scale={0.8} // Sedikit diperbesar untuk kenyamanan baca
                            className="shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] rounded-sm overflow-hidden border border-white/5 transition-transform duration-500 group-hover/pdf:scale-[1.01]"
                        />
                    </Document>
                </div>
            </div>

            {/* --- STATUS BAR (Consistent with Finder) --- */}
            <div className={clsx(
                "h-6 border-t border-white/5 flex items-center px-4 justify-between text-[9px] transition-colors duration-500",
                isHovered ? "bg-black/40 text-zinc-400" : "bg-transparent text-zinc-600"
            )}>
                <div className="flex items-center gap-4">
                    <span className="font-medium tracking-wide">100% Zoom</span>
                    <span className="opacity-40 tracking-widest uppercase">
                        {numPages ? `${numPages} Page(s)` : "Loading..."} | A4 Format
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <div className={clsx(
                        "w-1.5 h-1.5 rounded-full transition-all duration-500",
                        isHovered ? "bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]" : "bg-zinc-700"
                    )} />
                    <span className="font-mono">Ready to Export</span>
                </div>
            </div>

            {/* Finishing Touch: Inner Glow Border */}
            <div className="absolute inset-0 border border-white/5 rounded-[inherit] pointer-events-none z-50 shadow-inner" />
        </div>
    )
}

const ResumeWindow = WindowWrapper(Resume, 'resume');
export default ResumeWindow;