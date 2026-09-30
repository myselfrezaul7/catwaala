"use client";

import dynamic from "next/dynamic";

export const RainbowBridgeCanvas = dynamic(
    () => import("@/components/3d/RainbowBridgeCanvas"),
    {
        ssr: false,
        loading: () => (
            <div
                className="w-full h-[380px] sm:h-[440px] md:h-[480px] bg-gradient-to-b from-[#0a0a18] via-[#121128] to-[#1c1836] flex flex-col items-center justify-center text-white/70 select-none"
                role="status"
                aria-label="Loading Rainbow Bridge Sky Sanctuary"
            >
                <div className="w-10 h-10 rounded-full border-2 border-amber-400/40 border-t-amber-400 animate-spin mb-3" />
                <span className="text-xs sm:text-sm font-medium tracking-wide text-rose-200">
                    Preparing the Sky Sanctuary... 🕊️
                </span>
            </div>
        ),
    }
);

export default RainbowBridgeCanvas;
