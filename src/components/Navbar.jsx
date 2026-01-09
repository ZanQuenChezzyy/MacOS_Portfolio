import dayjs from "dayjs"
import { navIcons, navLinks } from "#constants"
import useWindowStore from "#store/window"

const Navbar = () => {
    const { openWindow } = useWindowStore();
    return (
        <nav className="fixed top-0 w-full z-100 border-b border-white/5 bg-black/20 backdrop-blur-2xl">
            {/* Tinggi dinaikkan dari h-8 ke h-10 agar logo punya ruang bernapas */}
            <div className="flex justify-between items-center h-10 px-5">

                {/* --- LEFT SIDE --- */}
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        {/* Menambahkan h-5 dan object-contain agar logo tidak terdistorsi */}
                        <img
                            src="/images/logo-white.svg"
                            alt="Logo"
                            className="h-5 w-auto object-contain brightness-200 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300"
                        />
                        <p className="text-[12px] font-black tracking-tight uppercase text-white/90">
                            Andereyan
                        </p>
                    </div>

                    <ul className="flex items-center gap-1">
                        {navLinks.map(({ id, name, type }) => (
                            <li key={id} onClick={() => openWindow(type)} className="px-3 py-1 rounded-md hover:bg-white/5 transition-all cursor-pointer group">
                                <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 group-hover:text-red-500 transition-colors">
                                    {name}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* --- RIGHT SIDE --- */}
                <div className="flex items-center gap-6">
                    <ul className="flex items-center gap-2 border-r border-white/10 pr-6">
                        {navIcons.map(({ id, img }) => (
                            <li key={id} className="p-1.5 rounded-md hover:bg-white/5 opacity-40 hover:opacity-100 transition-all cursor-pointer">
                                <img src={img} className="w-4 h-4 invert" alt={`icon-${id}`} />
                            </li>
                        ))}
                    </ul>

                    <time className="text-[11px] font-bold tracking-widest text-white/60 min-w-30 text-right">
                        {dayjs().format('ddd D MMM · HH:mm')}
                    </time>
                </div>
            </div>
        </nav>
    )
}

export default Navbar