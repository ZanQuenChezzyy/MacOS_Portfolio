import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper"
import { Download, FileText, Share2, ZoomIn, ZoomOut } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const Resume = () => {
    return (
        <div className="relative h-full flex flex-col font-sans overflow-hidden">

            {/* --- LIQUID GLASS HEADER --- */}
            <div id="window-header" className="relative z-30 bg-white/1 backdrop-blur-3xl border-b border-white/8 px-4 py-3 flex items-center shadow-2xl">
                <div className="flex items-center gap-6">
                    <WindowControls target="resume" />
                </div>

                {/* Center Pill: Document Title */}
                <div className="flex-1 flex justify-center">
                    <div className="group flex items-center gap-3 bg-white/1 border border-white/8 rounded-xl px-4 py-1.5 shadow-lg transition-all duration-500">
                        <FileText size={12} className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] tracking-[0.2em] font-black uppercase text-white/60">Resume.pdf</span>
                            <span className="text-[7px] tracking-widest text-white/20 uppercase font-bold">Standard A4 Document</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <a href="files/resume.pdf" download className="flex items-center gap-2 bg-red-600/10 hover:bg-red-600 px-4 py-1.5 rounded-full border border-red-600/20 transition-all duration-500 group">
                        <span className="text-[9px] font-black uppercase tracking-widest text-red-500 group-hover:text-white">Get Copy</span>
                        <Download size={14} className="text-red-500 group-hover:text-white" />
                    </a>
                </div>
            </div>

            {/* --- CONTENT AREA (Scrollable) --- */}
            <div className="flex-1 overflow-y-auto bg-black/40 flex justify-center custom-scrollbar scroll-smooth">
                <div className="relative">
                    {/* Shadow Layer untuk efek kedalaman kertas */}
                    <div className="absolute -inset-1 bg-black/40 blur-xl rounded-sm pointer-events-none" />

                    <Document
                        file="files/resume.pdf"
                        className="flex flex-col gap-8 items-center"
                    >
                        <Page
                            pageNumber={1}
                            renderTextLayer={true}
                            renderAnnotationLayer={true}
                            className="shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] rounded-sm border border-white/5"
                        />
                    </Document>
                </div>
            </div>

            {/* Finishing Touch: Inner Glow Border */}
            <div className="absolute inset-0 border border-white/5 rounded-[28px] pointer-events-none z-50 shadow-inner" />
        </div>
    )
}

const ResumeWindow = WindowWrapper(Resume, 'resume');
export default ResumeWindow;