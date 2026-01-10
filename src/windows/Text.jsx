import WindowWrapper from "#hoc/WindowWrapper"
import { WindowControls } from "#components"
import useWindowStore from "#store/window"
import { FileText } from "lucide-react"
import React from 'react'

const Text = () => {
    const { windows } = useWindowStore();
    const data = windows.txtfile?.data;

    if (!data) return null;

    const { name, image, subtitle, description } = data;

    return (
        <div className="relative h-full flex flex-col font-sans text-zinc-100 selection:bg-red-500/30 overflow-hidden bg-[#0a0a0a]/80">

            {/* --- LIQUID HEADER --- */}
            <div id="window-header" className="relative z-30 bg-white/3 backdrop-blur-2xl border-b border-white/5 px-4 py-3 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-4">
                    <WindowControls target="txtfile" />
                </div>

                {/* File Title Pill */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                    <FileText size={10} className="text-zinc-400" />
                    <span className="text-[10px] font-bold tracking-widest text-zinc-300 uppercase">{name}</span>
                </div>
            </div>

            {/* --- CONTENT AREA --- */}
            <div className="relative z-10 flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar bg-transparent">
                <div className="max-w-2xl mx-auto space-y-8">

                    {/* Header Image */}
                    {image && (
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent z-10" />
                            <img src={image} alt={name} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute bottom-4 left-6 z-20">
                                <h2 className="text-2xl font-bold text-white tracking-tight">{name}</h2>
                            </div>
                        </div>
                    )}

                    {/* Text Content */}
                    <div className="space-y-4">
                        {subtitle && (
                            <div className="flex items-center gap-3 mb-6">
                                <span className="h-px w-8 bg-red-500" />
                                <h3 className="text-xs font-black tracking-[0.2em] text-red-500 uppercase">{subtitle}</h3>
                            </div>
                        )}

                        {Array.isArray(description) && description.length > 0 && (
                            <div className="space-y-4 text-sm leading-7 text-zinc-300/90 font-light">
                                {description.map((para, idx) => (
                                    <p
                                        key={idx}
                                        // Hapus 'opacity-0' jika kamu tidak menggunakan plugin tailwind-animate
                                        className="transition-all duration-700 ease-out"
                                    >
                                        {para}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Inner Border Refraction */}
            <div className="absolute inset-0 border border-white/5 pointer-events-none rounded-[inherit] z-50" />
        </div>
    )
}

const TextWindow = WindowWrapper(Text, 'txtfile')
export default TextWindow