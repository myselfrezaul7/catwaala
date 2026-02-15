"use client";

import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export default function AdoptionFormPage() {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-white text-black p-8 md:p-12 font-sans print:p-0">
            {/* Print Button (Hidden when printing) */}
            <div className="max-w-[210mm] mx-auto mb-8 print:hidden flex justify-end">
                <Button onClick={handlePrint} className="bg-rose-500 hover:bg-rose-600 text-white gap-2">
                    <Printer className="w-4 h-4" /> Print Form
                </Button>
            </div>

            {/* A4 Container */}
            <div className="max-w-[210mm] mx-auto bg-white print:w-full print:max-w-none">
                {/* Header */}
                <header className="border-b-2 border-black pb-6 mb-8 text-center">
                    <h1 className="text-4xl font-bold uppercase tracking-wider mb-2 text-rose-600">Adoption Application</h1>
                    <p className="text-lg text-gray-600">Catwaala - Saving Every Stray, One Purr at a Time</p>
                </header>

                {/* Section 1: Adopter Information */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold uppercase bg-gray-100 p-2 mb-4 border border-gray-300">1. Adopter Information</h2>
                    <div className="grid grid-cols-2 gap-6 text-sm">
                        <div className="space-y-4">
                            <div>
                                <label className="block font-bold mb-1">Full Name:</label>
                                <div className="border-b border-black border-dashed h-6 w-full"></div>
                            </div>
                            <div>
                                <label className="block font-bold mb-1">Occupation:</label>
                                <div className="border-b border-black border-dashed h-6 w-full"></div>
                            </div>
                            <div>
                                <label className="block font-bold mb-1">Email Address:</label>
                                <div className="border-b border-black border-dashed h-6 w-full"></div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block font-bold mb-1">Date of Birth:</label>
                                <div className="border-b border-black border-dashed h-6 w-full"></div>
                            </div>
                            <div>
                                <label className="block font-bold mb-1">Phone Number:</label>
                                <div className="border-b border-black border-dashed h-6 w-full"></div>
                            </div>
                            <div>
                                <label className="block font-bold mb-1">NID Number:</label>
                                <div className="border-b border-black border-dashed h-6 w-full"></div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block font-bold mb-1">Full Address:</label>
                        <div className="border-b border-black border-dashed h-6 w-full"></div>
                        <div className="border-b border-black border-dashed h-6 w-full mt-2"></div>
                    </div>
                </section>

                {/* Section 2: Home Environment */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold uppercase bg-gray-100 p-2 mb-4 border border-gray-300">2. Home Environment</h2>
                    <div className="space-y-4 text-sm">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block font-bold mb-1">Type of Residence:</label>
                                <div className="flex gap-4 mt-1">
                                    <label className="flex items-center gap-2"><div className="w-4 h-4 border border-black"></div> Apartment</label>
                                    <label className="flex items-center gap-2"><div className="w-4 h-4 border border-black"></div> House</label>
                                    <label className="flex items-center gap-2"><div className="w-4 h-4 border border-black"></div> Other</label>
                                </div>
                            </div>
                            <div>
                                <label className="block font-bold mb-1">Do you own or rent?</label>
                                <div className="flex gap-4 mt-1">
                                    <label className="flex items-center gap-2"><div className="w-4 h-4 border border-black"></div> Own</label>
                                    <label className="flex items-center gap-2"><div className="w-4 h-4 border border-black"></div> Rent</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block font-bold mb-1">If renting, does your landlord allow pets?</label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center gap-2"><div className="w-4 h-4 border border-black"></div> Yes</label>
                                <label className="flex items-center gap-2"><div className="w-4 h-4 border border-black"></div> No</label>
                                <label className="flex items-center gap-2"><div className="w-4 h-4 border border-black"></div> Unsure</label>
                            </div>
                        </div>
                        <div>
                            <label className="block font-bold mb-1">Do you have secured windows/balconies (Netting)?</label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center gap-2"><div className="w-4 h-4 border border-black"></div> Yes</label>
                                <label className="flex items-center gap-2"><div className="w-4 h-4 border border-black"></div> No (Will Install)</label>
                                <label className="flex items-center gap-2"><div className="w-4 h-4 border border-black"></div> No</label>
                            </div>
                        </div>
                        <div>
                            <label className="block font-bold mb-1">Does anyone in the household have allergies to cats?</label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center gap-2"><div className="w-4 h-4 border border-black"></div> Yes</label>
                                <label className="flex items-center gap-2"><div className="w-4 h-4 border border-black"></div> No</label>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Pet Experience */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold uppercase bg-gray-100 p-2 mb-4 border border-gray-300">3. Pet Experience</h2>
                    <div className="space-y-4 text-sm">
                        <div>
                            <label className="block font-bold mb-1">Have you owned a cat before?</label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center gap-2"><div className="w-4 h-4 border border-black"></div> Yes</label>
                                <label className="flex items-center gap-2"><div className="w-4 h-4 border border-black"></div> No</label>
                            </div>
                        </div>
                        <div>
                            <label className="block font-bold mb-1">Do you currently have other pets? (If yes, please list type/age/gender)</label>
                            <div className="border-b border-black border-dashed h-6 w-full"></div>
                            <div className="border-b border-black border-dashed h-6 w-full mt-2"></div>
                        </div>
                        <div>
                            <label className="block font-bold mb-1">Are your current pets vaccinated and spayed/neutered?</label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center gap-2"><div className="w-4 h-4 border border-black"></div> Yes</label>
                                <label className="flex items-center gap-2"><div className="w-4 h-4 border border-black"></div> No</label>
                                <label className="flex items-center gap-2"><div className="w-4 h-4 border border-black"></div> Not Applicable</label>
                            </div>
                        </div>
                        <div>
                            <label className="block font-bold mb-1">Why do you want to adopt this specific cat?</label>
                            <div className="border-b border-black border-dashed h-6 w-full"></div>
                            <div className="border-b border-black border-dashed h-6 w-full mt-2"></div>
                        </div>
                    </div>
                </section>

                {/* Section 4: Terms & Agreement */}
                <section className="mb-12">
                    <h2 className="text-xl font-bold uppercase bg-gray-100 p-2 mb-4 border border-gray-300">4. Terms of Adoption</h2>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-800 mb-6">
                        <li>I understand that I am adopting a living creature that requires love, care, medical attention, and commitment (15+ years).</li>
                        <li>I agree to spay/neuter the cat when it reaches the appropriate age (if not already done).</li>
                        <li>I will provide regular veterinary care, including annual vaccinations.</li>
                        <li>I agree to never abandon the cat. If I can no longer care for it, I will return it to Catwaala.</li>
                        <li>I agree to keep the cat strictly INDOORS or in a secured outdoor enclosure (Catio) for its safety.</li>
                        <li>I consent to occasional home visits or updates (photos/videos) by Catwaala volunteers.</li>
                    </ul>
                </section>

                {/* Signatures */}
                <section className="grid grid-cols-2 gap-12 mt-20">
                    <div>
                        <div className="border-t border-black pt-2 text-center">
                            <p className="font-bold">Signature of Adopter</p>
                            <p className="text-xs text-gray-500">Date: _________________</p>
                        </div>
                    </div>
                    <div>
                        <div className="border-t border-black pt-2 text-center">
                            <p className="font-bold">Authorized Catwaala Representative</p>
                            <p className="text-xs text-gray-500">Date: _________________</p>
                        </div>
                    </div>
                </section>

                <footer className="mt-16 text-center text-xs text-gray-400 border-t pt-4">
                    <p>Catwaala - www.catwaala.com | Adoption Support: +880-123-456789</p>
                </footer>
            </div>
        </div>
    );
}
