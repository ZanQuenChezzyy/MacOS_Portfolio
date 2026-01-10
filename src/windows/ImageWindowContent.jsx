import { WindowControls } from '#components';
import WindowWrapper from '#hoc/WindowWrapper';
import useWindowStore from '#store/window'
import { Image as ImageIcon, Maximize2 } from 'lucide-react';

const ImageWindowContent = () => {
    const { windows } = useWindowStore()
    const data = windows.imgfile?.data;

    if (!data) return null;

    const { name, imageUrl } = data;

    return (
        <div className="relative h-full flex flex-col overflow-hidden bg-black/80 backdrop-blur-[60px]">

            {/* --- MINIMAL HEADER --- */}
            <div id="window-header" className="relative z-30 flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/2">
                <WindowControls target="imgfile" />
                <div className="flex items-center gap-2 opacity-50">
                    <ImageIcon size={12} className="text-white" />
                    <span className="text-[10px] uppercase tracking-widest text-white font-bold">{name}</span>
                </div>
                <Maximize2 size={12} className="text-white/20" />
            </div>

            {/* --- IMAGE VIEWER --- */}
            <div className="flex-1 relative flex items-center justify-center p-8 overflow-hidden group">
                {/* Background Ambient Glow (based on image context) */}
                <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent opacity-20" />

                {imageUrl && (
                    <div className="relative z-10 transition-transform duration-500 hover:scale-[1.02]">
                        <img
                            src={imageUrl}
                            alt={name}
                            className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] border border-white/10"
                        />
                        {/* Glass Gloss on Image */}
                        <div className="absolute inset-0 rounded-lg bg-linear-to-tr from-white/5 to-transparent pointer-events-none mix-blend-overlay" />
                    </div>
                )}
            </div>

            {/* Footer Metadata */}
            <div className="h-8 border-t border-white/5 bg-black/20 flex items-center justify-between px-4 text-[9px] text-white/30 font-mono">
                <span>RAW PREVIEW</span>
                <span>100% SCALE</span>
            </div>
        </div>
    )
}

const ImageWindow = WindowWrapper(ImageWindowContent, 'imgfile');
export default ImageWindow