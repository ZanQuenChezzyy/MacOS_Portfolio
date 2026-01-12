import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef, useState, useEffect, useCallback } from "react"
import clsx from "clsx"

// KONFIGURASI FISIKA
const PHYSICS = {
    lerp: 1, // Semakin kecil = semakin smooth/lambat (0.01 - 0.1)
    maxDistText: 300,
    maxDistUi: 400
}

const FONT_WEIGHTS = {
    subtitle: { min: 100, max: 400 },
    title: { min: 400, max: 900 }
}

const renderText = (text, className, weightRange) => {
    return [...text].map((char, i) => (
        <span
            key={i}
            // Menambahkan will-change-transform agar browser memisahkan layer render (GPU acceleration)
            className={clsx("letter inline-block will-change-transform backface-hidden", className)}
            data-min={weightRange.min}
            data-max={weightRange.max}
            // Set style awal agar tidak ada layout shift
            style={{ fontVariationSettings: `'wght' ${weightRange.min}` }}
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

    // Mouse Ref: Menyimpan posisi tanpa re-render
    const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    // Lagged Mouse Ref: Untuk efek smooth (interpolasi)
    const delayedMouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    // 1. DATA CACHING (Heavy lifting dilakukan hanya saat resize)
    const getLayoutData = useCallback(() => {
        if (isSmallScreen || !containerRef.current) return { letters: [], ui: [] };

        const letters = containerRef.current.querySelectorAll('.letter');
        const interactiveElements = [badgeRef.current, bottomDecoRef.current].filter(Boolean);

        return {
            letters: Array.from(letters).map(el => {
                const rect = el.getBoundingClientRect();
                return {
                    el,
                    // Cache posisi tengah elemen
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2,
                    min: parseInt(el.dataset.min),
                    max: parseInt(el.dataset.max)
                };
            }),
            ui: interactiveElements.map(el => {
                const rect = el.getBoundingClientRect();
                return { el, x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
            })
        };
    }, [isSmallScreen]);

    // Handle Resize Logic
    useEffect(() => {
        const checkSize = () => setIsSmallScreen(window.innerWidth < 640);
        checkSize();

        let timeoutId;
        const debouncedResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(checkSize, 100); // Debounce resize event
        };

        window.addEventListener('resize', debouncedResize);
        return () => window.removeEventListener('resize', debouncedResize);
    }, []);

    useGSAP(() => {
        if (isSmallScreen) {
            gsap.from(".small-screen-content", { opacity: 0, y: 20, duration: 1, ease: "power3.out" });
            return;
        }

        // Initialize Data
        let { letters: letterData, ui: uiData } = getLayoutData();

        // Refresh data coordinates on resize
        const refreshLayout = () => {
            const fresh = getLayoutData();
            letterData = fresh.letters;
            uiData = fresh.ui;
        };

        // SETUP QUICKSETTERS (Performa Tinggi)
        // QuickSetter bypasses parsing CSS string setiap frame
        const setGlass = {
            x: gsap.quickSetter(glassRef.current, "x", "px"),
            y: gsap.quickSetter(glassRef.current, "y", "px"),
            rX: gsap.quickSetter(glassRef.current, "rotateX", "deg"),
            rY: gsap.quickSetter(glassRef.current, "rotateY", "deg")
        };

        // Animasi Intro
        gsap.from(".reveal", {
            y: 40,
            opacity: 0,
            stagger: 0.05,
            duration: 1.2,
            ease: "expo.out",
            clearProps: "transform" // Bersihkan agar tidak konflik dengan animasi mouse
        });

        // ANIMATION LOOP (Sinkron dengan 60fps/120fps layar)
        const ticker = () => {
            // 1. Interpolasi Mouse (Smoothing)
            // Rumus: Current = Current + (Target - Current) * Friction
            delayedMouseRef.current.x += (mouseRef.current.x - delayedMouseRef.current.x) * PHYSICS.lerp;
            delayedMouseRef.current.y += (mouseRef.current.y - delayedMouseRef.current.y) * PHYSICS.lerp;

            const dX = delayedMouseRef.current.x;
            const dY = delayedMouseRef.current.y;

            // 2. Parallax Glass Effect
            const pX = (dX / window.innerWidth - 0.5);
            const pY = (dY / window.innerHeight - 0.5);

            setGlass.x(pX * 30);
            setGlass.y(pY * 30);
            setGlass.rX(pY * -15);
            setGlass.rY(pX * 15);

            // 3. Liquid Font Logic (Manual Style Update for perf)
            const lenLetters = letterData.length;
            for (let i = 0; i < lenLetters; i++) {
                const data = letterData[i];
                // Math.abs lebih cepat dari Math.hypot jika hanya cek bounding box, tapi hypot lebih akurat
                const distX = dX - data.x;
                const distY = dY - data.y;
                const distSq = distX * distX + distY * distY; // Hindari akar kuadrat (expensive) di loop
                const maxDistSq = PHYSICS.maxDistText * PHYSICS.maxDistText;

                if (distSq < maxDistSq) {
                    const dist = Math.sqrt(distSq);
                    // Kurva Easing Cubic untuk falloff yang smooth
                    const power = Math.pow(1 - dist / PHYSICS.maxDistText, 2);

                    data.el.style.fontVariationSettings = `'wght' ${data.min + (data.max - data.min) * power}`;
                    data.el.style.transform = `translate3d(0, ${-power * 15}px, 0) scale(${1 + power * 0.1})`;
                    data.el.style.opacity = 0.4 + (power * 0.6);
                } else {
                    // Reset state (hanya jika belum reset - optimasi browser paint)
                    if (data.el.style.opacity !== '0.4') {
                        data.el.style.fontVariationSettings = `'wght' ${data.min}`;
                        data.el.style.transform = `translate3d(0, 0, 0) scale(1)`;
                        data.el.style.opacity = 0.4;
                    }
                }
            }

            // 4. Magnetic UI
            const lenUi = uiData.length;
            for (let i = 0; i < lenUi; i++) {
                const data = uiData[i];
                const distX = dX - data.x;
                const distY = dY - data.y;
                const distSq = distX * distX + distY * distY;
                const maxDistSq = PHYSICS.maxDistUi * PHYSICS.maxDistUi;

                if (distSq < maxDistSq) {
                    // Gunakan Exp decay untuk magnet yang "kenyal"
                    const power = Math.exp(-distSq / 30000);

                    // Kita gunakan gsap.to di sini untuk easing yang berbeda (elastic)
                    // Tapi kita gunakan overwrite: 'auto' agar tidak tumpuk-menumpuk
                    gsap.to(data.el, {
                        x: distX * 0.2 * power,
                        y: distY * 0.2 * power,
                        scale: 1 + (power * 0.05),
                        opacity: data.el === badgeRef.current ? 1 : 0.2 + (power * 0.8),
                        duration: 0.1, // Duration sangat pendek karena kita di dalam loop
                        overwrite: "auto"
                    });
                } else {
                    gsap.to(data.el, {
                        x: 0, y: 0, scale: 1,
                        opacity: data.el === badgeRef.current ? 1 : 0.2,
                        duration: 0.5,
                        overwrite: "auto"
                    });
                }
            }
        };

        // Event Listener hanya update Ref (Sangat ringan)
        const handleMouseMove = (e) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', refreshLayout);
        gsap.ticker.add(ticker); // Start Loop

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', refreshLayout);
            gsap.ticker.remove(ticker); // Stop Loop
        };
    }, [isSmallScreen, getLayoutData]);

    return (
        <section ref={containerRef} className="relative w-full h-full flex items-center justify-center overflow-hidden perspective-distant select-none cursor-default">

            {/* Background Liquid Blur */}
            <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-from)_0%,transparent_60%)] from-red-500/20" />
            </div>

            {isSmallScreen ? (
                /* Tampilan Layar Kecil (Liquid Glass) */
                <div className="small-screen-content z-50 px-8 py-12 mx-6 rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-2xl text-center shadow-2xl">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mx-auto mb-6 animate-ping shadow-[0_0_10px_red]" />
                    <p className="text-zinc-400 font-georama text-sm tracking-wide leading-relaxed">
                        This Portfolio is designed for <br />
                        <span className="text-white font-bold italic tracking-widest uppercase text-[10px]">desktop/tablet screens only.</span>
                    </p>
                    <div className="mt-8 h-px w-12 bg-white/10 mx-auto" />
                </div>
            ) : (
                /* Tampilan Desktop Utama */
                <div ref={glassRef} className="relative z-10 flex flex-col items-center transform-style-3d will-change-transform">

                    {/* Badge */}
                    <div ref={badgeRef} className="reveal mb-8 flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md will-change-transform">
                        <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[8px] uppercase tracking-[0.3em] text-zinc-500 font-bold">ZanQuenChezzy // OS</span>
                    </div>

                    {/* Main Text Area */}
                    <div className="flex flex-col items-center pointer-events-none">
                        <p className="reveal mb-2">
                            {renderText("Hey, Welcome to my Portfolio, I'm", "text-xl md:text-2xl text-zinc-300 font-georama", FONT_WEIGHTS.subtitle)}
                        </p>
                        <h1 className="reveal">
                            {renderText("Andereyan Muhammat", "text-[2rem] md:text-[4rem] italic font-georama leading-[0.8] text-white", FONT_WEIGHTS.title)}
                        </h1>
                    </div>

                    {/* Bottom Deco */}
                    <div ref={bottomDecoRef} className="reveal mt-12 flex items-center gap-10 opacity-20 will-change-transform">
                        <div className="h-px w-24 md:w-40 bg-linear-to-r from-transparent via-white/40 to-white/10" />
                        <div className="flex flex-col items-center gap-1.5 min-w-30">
                            <span className="text-[10px] uppercase tracking-[1.2em] text-white font-light ml-[1.2em]">Bontang City</span>
                            <span className="text-[10px] text-zinc-300 tracking-[0.3em]">EAST BORNEO INDONESIA</span>
                        </div>
                        <div className="h-px w-24 md:w-40 bg-linear-to-l from-transparent via-white/40 to-white/10" />
                    </div>
                </div>
            )}

            {/* Corner Info */}
            <div className="absolute bottom-10 right-10 flex flex-col items-end reveal opacity-10 font-mono pointer-events-none">
                <span className="text-[8px] text-zinc-500 tracking-tighter uppercase font-bold">Latency: 0.002ms</span>
                <span className="text-[10px] text-zinc-300 tracking-[0.3em]">ENCRYPTED_OS_EST2026</span>
            </div>
        </section>
    )
}

export default Welcome;