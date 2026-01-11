import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef, useState, useEffect, useCallback } from "react"
import clsx from "clsx"

const FONT_WEIGHTS = {
    subtitle: { min: 100, max: 400 },
    title: { min: 400, max: 900 }
}

const renderText = (text, className, weightRange) => {
    return [...text].map((char, i) => (
        <span
            key={i}
            className={clsx("letter inline-block transition-opacity duration-300", className)}
            data-min={weightRange.min}
            data-max={weightRange.max}
        >
            {char === " " ? "\u00A0" : char}
        </span>
    ))
}

const Welcome = () => {
    const containerRef = useRef(null);
    const glassRef = useRef(null);
    const badgeRef = useRef(null);
    const bottomDecoRef = useRef(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    // 1. REFRESH CACHE LOGIC
    // Fungsi ini menghitung ulang posisi setiap elemen secara presisi
    const getLayoutData = useCallback(() => {
        if (isSmallScreen || !containerRef.current) return { letters: [], ui: [] };

        const letters = containerRef.current.querySelectorAll('.letter');
        const interactiveElements = [badgeRef.current, bottomDecoRef.current].filter(Boolean);

        const letterData = Array.from(letters).map(el => {
            const rect = el.getBoundingClientRect();
            return {
                el,
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
                min: parseInt(el.dataset.min),
                max: parseInt(el.dataset.max)
            };
        });

        const uiData = interactiveElements.map(el => {
            const rect = el.getBoundingClientRect();
            return { el, x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        });

        return { letters: letterData, ui: uiData };
    }, [isSmallScreen]);

    useEffect(() => {
        const checkSize = () => setIsSmallScreen(window.innerWidth < 640);
        checkSize();
        window.addEventListener('resize', checkSize);
        return () => window.removeEventListener('resize', checkSize);
    }, []);

    useGSAP(() => {
        if (isSmallScreen) {
            gsap.from(".small-screen-content", { opacity: 0, y: 20, duration: 1, ease: "power3.out" });
            return;
        }

        // Initialize Data
        let { letters: letterData, ui: uiData } = getLayoutData();

        // REFRESH DATA ON RESIZE
        // Memastikan saat window ditarik, kursor tetap tahu di mana posisi elemen berada
        const refreshLayout = () => {
            const fresh = getLayoutData();
            letterData = fresh.letters;
            uiData = fresh.ui;
        };

        const setGlass = {
            x: gsap.quickSetter(glassRef.current, "x", "px"),
            y: gsap.quickSetter(glassRef.current, "y", "px"),
            rX: gsap.quickSetter(glassRef.current, "rotateX", "deg"),
            rY: gsap.quickSetter(glassRef.current, "rotateY", "deg")
        };

        gsap.from(".reveal", { y: 30, opacity: 0, stagger: 0.05, duration: 1, ease: "power3.out" });

        const handleMouseMove = (e) => {
            const { clientX: mX, clientY: mY } = e;

            // PARALLAX GLASS
            setGlass.x((mX / window.innerWidth - 0.5) * 30);
            setGlass.y((mY / window.innerHeight - 0.5) * 30);
            setGlass.rX(-(mY / window.innerHeight - 0.5) * 15);
            setGlass.rY((mX / window.innerWidth - 0.5) * 15);

            // MAGNET UI
            uiData.forEach(data => {
                const dist = Math.hypot(mX - data.x, mY - data.y);
                if (dist < 400) {
                    const power = Math.exp(-(dist ** 2) / 30000);
                    gsap.to(data.el, {
                        x: (mX - data.x) * 0.2 * power,
                        y: (mY - data.y) * 0.2 * power,
                        scale: 1 + (power * 0.05),
                        opacity: data.el === badgeRef.current ? 1 : 0.2 + (power * 0.8),
                        duration: 0.6, overwrite: "auto"
                    });
                } else {
                    gsap.to(data.el, { x: 0, y: 0, scale: 1, opacity: data.el === badgeRef.current ? 1 : 0.2, duration: 0.8 });
                }
            });

            // LIQUID FONT
            letterData.forEach(data => {
                const dist = Math.hypot(mX - data.x, mY - data.y);
                if (dist < 250) {
                    const power = Math.exp(-(dist ** 2) / 8000);
                    data.el.style.fontVariationSettings = `'wght' ${data.min + (data.max - data.min) * power}`;
                    data.el.style.transform = `translateY(${-power * 10}px) scale(${1 + power * 0.1})`;
                    data.el.style.opacity = 0.4 + (power * 0.6);
                } else {
                    data.el.style.fontVariationSettings = `'wght' ${data.min}`;
                    data.el.style.transform = `translateY(0px) scale(1)`;
                    data.el.style.opacity = 0.4;
                }
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', refreshLayout); // Tambahan listener resize di dalam GSAP

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', refreshLayout);
        };
    }, [isSmallScreen, getLayoutData]);

    return (
        <section ref={containerRef} className="relative w-full h-full flex items-center justify-center overflow-hidden perspective-distant select-none cursor-default">

            <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.15)_0%,transparent_60%)]" />
            </div>

            {isSmallScreen ? (
                <div className="small-screen-content z-50 px-8 py-12 mx-6 rounded-4xl border border-white/10 bg-white/3 backdrop-blur-2xl text-center shadow-2xl">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mx-auto mb-6 animate-ping shadow-[0_0_10px_red]" />
                    <p className="text-zinc-400 font-georama text-sm tracking-wide leading-relaxed">
                        This Portfolio is designed for <br />
                        <span className="text-white font-bold italic tracking-widest uppercase text-[10px]">desktop/tablet screens only.</span>
                    </p>
                    <div className="mt-8 h-px w-12 bg-white/10 mx-auto" />
                </div>
            ) : (
                <div ref={glassRef} className="relative z-10 flex flex-col items-center transform-style-3d will-change-transform">
                    <div ref={badgeRef} className="reveal mb-8 flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/2 backdrop-blur-md">
                        <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[8px] uppercase tracking-[0.3em] text-zinc-500 font-bold">ZanQuenChezzy // OS</span>
                    </div>

                    <div className="flex flex-col items-center pointer-events-none">
                        <p className="reveal mb-2">
                            {renderText("Hey, Welcome to my Portfolio, I'm", "text-xl md:text-2xl text-zinc-300 font-georama", FONT_WEIGHTS.subtitle)}
                        </p>
                        <h1 className="reveal">
                            {renderText("Andereyan Muhammat", "text-[2rem] md:text-[4rem] italic font-georama leading-[0.8] text-white", FONT_WEIGHTS.title)}
                        </h1>
                    </div>

                    <div ref={bottomDecoRef} className="reveal mt-12 flex items-center gap-10 opacity-20">
                        <div className="h-px w-24 md:w-40 bg-linear-to-r from-transparent via-white/40 to-white/10" />
                        <div className="flex flex-col items-center gap-1.5 min-w-30">
                            <span className="text-[10px] uppercase tracking-[1.2em] text-white font-light ml-[1.2em]">Bontang City</span>
                            <span className="text-[10px] text-zinc-300 tracking-[0.3em]">EAST BORNEO INDONESIA</span>
                        </div>
                        <div className="h-px w-24 md:w-40 bg-linear-to-l from-transparent via-white/40 to-white/10" />
                    </div>
                </div>
            )}

            <div className="absolute bottom-10 right-10 flex flex-col items-end reveal opacity-10 font-mono pointer-events-none">
                <span className="text-[8px] text-zinc-500 tracking-tighter uppercase font-bold">Latency: 0.002ms</span>
                <span className="text-[10px] text-zinc-300 tracking-[0.3em]">ENCRYPTED_OS_EST2026</span>
            </div>
        </section>
    )
}

export default Welcome;