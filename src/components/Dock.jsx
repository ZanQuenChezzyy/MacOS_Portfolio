import { dockApps } from "#constants";
import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react"
import { Tooltip } from "react-tooltip";

const Dock = () => {
    const { openWindow, closeWindow, windows } = useWindowStore();
    const dockRef = useRef(null);

    useGSAP(() => {
        const dock = dockRef.current;
        if (!dock) return () => { };

        const icons = dock.querySelectorAll('.dock-icon-wrapper');

        const animateIcons = (mouseX) => {
            const { left } = dock.getBoundingClientRect();

            icons.forEach((icon) => {
                const { left: iconLeft, width } = icon.getBoundingClientRect();
                const center = iconLeft - left + width / 2;
                const distance = Math.abs(mouseX - center);
                const intensity = Math.exp(-(distance ** 2.5) / 20000);

                gsap.to(icon, {
                    scale: 1 + 0.25 * intensity,
                    y: -15 * intensity,
                    duration: 0.2,
                    ease: "power1.out",
                })
            })
        }

        const handleMouseMove = (e) => {
            const { left } = dock.getBoundingClientRect();

            animateIcons(e.clientX - left);
        }

        const resetIcons = () => icons.forEach((icon) => gsap.to(icon, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power1.out",
        }))

        dock.addEventListener('mousemove', handleMouseMove);
        dock.addEventListener('mouseleave', resetIcons);

        return () => {
            dock.removeEventListener('mousemove', handleMouseMove);
            dock.removeEventListener('mouseleave', resetIcons);
        }
    }, [])


    const toggleApp = (app) => {
        if (!app.canOpen) return;

        const window = windows[app.id];

        if (!window) {
            console.error(`Window not found for app: ${app.id}`);
            return;
        }

        if (window.isOpen) {
            closeWindow(app.id);
        } else {
            openWindow(app.id);
        }

        console.log(windows);
    }

    return (
        <section id="dock">
            <div className="dock-blur-layer" /> {/* Refractive Layer */}
            <div ref={dockRef} className="dock-container">
                {dockApps.map(({ id, name, icon, canOpen }) => {
                    const isActive = windows[id]?.isOpen;

                    return (
                        <div key={id} className="relative flex flex-col items-center">
                            <button
                                type="button"
                                className="dock-icon-wrapper group"
                                aria-label={name}
                                data-tooltip-id="dock-tooltip"
                                data-tooltip-content={name}
                                disabled={!canOpen}
                                onClick={() => toggleApp({ id, name, icon, canOpen })}
                            >
                                <img
                                    src={`/images/${icon}`}
                                    alt={name}
                                    className={`dock-icon-img ${canOpen ? "drop-shadow-xl" : "opacity-40 grayscale"}`}
                                />

                                {/* Reflection effect on icon */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                            </button>

                            {/* Active Dot Indicator */}
                            <div className={`active-dot ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"}`} />
                        </div>
                    )
                })}

                <Tooltip id="dock-tooltip" place="top" offset={25} className="dock-tooltip-custom" />
            </div>
        </section>
    )
}

export default Dock