import { ImageResponse } from "next/og";
import { CatService } from "@/services/CatService";

export const runtime = "nodejs";

export const alt = "Adopt Cat | Catwaala";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const cat = await CatService.getById(id);
    const catName = cat?.name || "Rescue Cat";
    const breed = cat?.breed || "Domestic Short Hair";
    const location = cat?.location || "Dhaka, Bangladesh";
    const rawImage = cat?.images?.[0] || "/assets/cat1.png";
    const imageUrl = rawImage.startsWith("http")
        ? rawImage
        : `https://www.catwaala.com${rawImage.startsWith("/") ? "" : "/"}${rawImage}`;

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: "#18181b",
                    color: "#ffffff",
                    fontFamily: "sans-serif",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Left: Cat Details & Branding */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: "60px",
                        width: "60%",
                        zIndex: 2,
                    }}
                >
                    {/* Top Branding & Badge */}
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                backgroundColor: "#f43f5e",
                                color: "#ffffff",
                                padding: "8px 22px",
                                borderRadius: "9999px",
                                fontSize: "20px",
                                fontWeight: "bold",
                            }}
                        >
                            <span>🐾 Catwaala</span>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "#27272a",
                                color: "#fb7185",
                                border: "1px solid #3f3f46",
                                padding: "8px 18px",
                                borderRadius: "9999px",
                                fontSize: "18px",
                                fontWeight: "600",
                            }}
                        >
                            <span>Rescue Cat</span>
                        </div>
                    </div>

                    {/* Middle: Name and Info */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div style={{ fontSize: "26px", color: "#fda4af", fontWeight: "600" }}>
                            Save a Stray, Gain a Friend
                        </div>
                        <div
                            style={{
                                fontSize: "64px",
                                fontWeight: "900",
                                lineHeight: "1.1",
                                color: "#ffffff",
                                letterSpacing: "-0.02em",
                            }}
                        >
                            {catName}
                        </div>
                        <div
                            style={{
                                fontSize: "24px",
                                color: "#d4d4d8",
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                marginTop: "8px",
                            }}
                        >
                            <span>🏷️ {breed}</span>
                            <span>•</span>
                            <span>📍 {location}</span>
                        </div>
                    </div>

                    {/* Bottom Link */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "20px",
                            color: "#a1a1aa",
                            fontWeight: "500",
                        }}
                    >
                        <span>www.catwaala.com/adopt/{id}</span>
                    </div>
                </div>

                {/* Right: Cat Photo with contrast gradient */}
                <div
                    style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: "48%",
                        display: "flex",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to right, #18181b 0%, rgba(24, 24, 27, 0.4) 35%, transparent 100%)",
                            zIndex: 1,
                        }}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={imageUrl}
                        alt={catName}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
