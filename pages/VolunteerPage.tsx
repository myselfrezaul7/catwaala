import * as React from 'react';
import { useState } from 'react';
import FormError from '../components/FormError';

const VolunteerPage: React.FC = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const form = e.currentTarget;
            const formData = new FormData(form);

            const name = formData.get('name') as string;
            const email = formData.get('email') as string;
            const phone = formData.get('phone') as string;
            const address = formData.get('address') as string;
            const availability = formData.get('availability') as string;

            // Get all checked skills manually since FormData might handle multiple same-name inputs differently depending on iteration
            const skillNodes = form.querySelectorAll('input[name="skills"]:checked');
            const skills = Array.from(skillNodes).map((node) => (node as HTMLInputElement).value).join(', ');

            const subject = `Volunteer Application: ${name}`;
            const body = `Name: ${name}
Email: ${email}
Phone: ${phone}
Address: ${address}

Skills/Interests: ${skills}

Availability:
${availability}

Sent from CATWAALA App`;

            const mailtoLink = `mailto:catwaala@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            window.location.href = mailtoLink;
            setFormSubmitted(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const inputStyle = "w-full p-3 bg-white/50 dark:bg-slate-900/50 border border-white/30 dark:border-slate-700 text-slate-900 dark:text-slate-50 placeholder:text-slate-600 dark:placeholder:text-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500/80 focus:border-orange-500 focus:bg-white/70 dark:focus:bg-slate-900/70 transition-colors";

    return (
        <div className="container mx-auto px-6 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50">Join Our Volunteer Team</h1>
                <p className="text-lg text-slate-800 dark:text-slate-200 max-w-3xl mx-auto mt-4">
                    Volunteers are the heart of CATWAALA. Your time, skills, and passion can make a world of difference in the lives of animals.
                </p>
            </div>

            <div className="flex justify-center">
                {/* Volunteer Form */}
                <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/30 dark:border-slate-700 p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-2xl">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-6">Become a Volunteer</h2>
                    {formSubmitted ? (
                        <div className="text-center p-8 bg-green-500/10 border border-green-500/30 rounded-lg">
                            <h3 className="text-2xl font-bold text-green-900 dark:text-green-200">Email Draft Opened!</h3>
                            <p className="text-slate-800 dark:text-slate-200 mt-2">
                                Your default email client should have opened with your application details. Please click <strong>Send</strong> to complete your application to <span className="font-semibold text-orange-600 dark:text-orange-400">catwaala@gmail.com</span>.
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mt-4">
                                Didn't open? Please manually email your details to us.
                            </p>
                            <button
                                onClick={() => {
                                    setFormSubmitted(false);
                                    setError('');
                                }}
                                className="mt-6 bg-orange-500 text-white font-bold py-2 px-6 rounded-full hover:bg-orange-600 transition-colors">
                                Submit Another
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <FormError message={error} />
                            <div>
                                <label htmlFor="name" className="block text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">Full Name <span className="text-red-500">*</span></label>
                                <input type="text" id="name" name="name" required className={inputStyle} autoComplete="name" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">Email <span className="text-red-500">*</span></label>
                                <input type="email" id="email" name="email" required className={inputStyle} autoComplete="email" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">Phone <span className="text-red-500">*</span></label>
                                <input type="tel" id="phone" name="phone" required className={inputStyle} autoComplete="tel" />
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">Address <span className="text-red-500">*</span></label>
                                <textarea id="address" name="address" rows={2} required className={inputStyle} autoComplete="street-address"></textarea>
                            </div>
                            <div>
                                <label className="block text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">Skills/Interests</label>
                                <div className="space-y-2 mt-2 text-slate-800 dark:text-slate-200">
                                    <label className="flex items-center"><input type="checkbox" name="skills" value="Animal Handling" className="h-5 w-5 mr-3 rounded text-orange-500 focus:ring-orange-500" /> Animal Handling</label>
                                    <label className="flex items-center"><input type="checkbox" name="skills" value="Event Support" className="h-5 w-5 mr-3 rounded text-orange-500 focus:ring-orange-500" /> Event Support</label>
                                    <label className="flex items-center"><input type="checkbox" name="skills" value="Transport/Driving" className="h-5 w-5 mr-3 rounded text-orange-500 focus:ring-orange-500" /> Transport/Driving</label>
                                    <label className="flex items-center"><input type="checkbox" name="skills" value="Photography/Videography" className="h-5 w-5 mr-3 rounded text-orange-500 focus:ring-orange-500" /> Photography/Videography</label>
                                    <label className="flex items-center"><input type="checkbox" name="skills" value="Administrative Tasks" className="h-5 w-5 mr-3 rounded text-orange-500 focus:ring-orange-500" /> Administrative Tasks</label>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="availability" className="block text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">Availability <span className="text-red-500">*</span></label>
                                <textarea id="availability" name="availability" rows={3} placeholder="e.g., Weekends, weekday evenings..." required className={inputStyle}></textarea>
                            </div>
                            <div>
                                <button type="submit" disabled={isLoading} className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg text-lg hover:bg-orange-600 transition-colors disabled:bg-orange-300 disabled:cursor-wait">
                                    {isLoading ? 'Preparing Email...' : 'Submit Application via Email'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VolunteerPage;