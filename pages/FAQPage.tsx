import * as React from 'react';
import AccordionItem from '../components/AccordionItem';

const faqs = [
  {
    category: 'Adoption',
    items: [
      {
        q: 'How does adoption work?',
        a: "It's super simple! 1. Fall in love with a photo. 2. Fill out a quick form. 3. We do a friendly home check. 4. You take your new best friend home! We're with you every step of the way.",
      },
      {
        q: 'Is there an adoption fee?',
        a: "Absolutely not! Adoption is 100% FREE. We don't charge a single Taka. Our only goal is to find safe, loving homes for these deserving souls.",
      },
      {
        q: 'Can I foster before adopting?',
        a: "Yes, please! Fostering is like a test drive for your heart. It saves lives, frees up shelter space, and helps us understand the pet's personality better.",
      },
    ],
  },
  {
    category: 'Donations',
    items: [
      {
        q: 'Where does my money go?',
        a: "Straight to the animals. Every single Taka funds food, medicine, and critical surgeries. We are 100% non-profit and run on passion (and coffee).",
      },
      {
        q: 'How can I donate?',
        a: "We are currently setting up our bKash, Nagad, and Bank accounts. They will be active very soon! For now, we gratefully accept in-kind donations like medicine and food.",
      },
    ],
  },
  {
    category: 'Rescue & Emergencies',
    items: [
      {
        q: "I found an injured animal. What do I do?",
        a: "Safety first! If they are scared/injured, they might bite. Don't touch them if you're unsure. Snap a photo, drop a location pin on our 'Report Rescue' page, and our team will rush there.",
      },
      {
        q: 'Which areas do you cover?',
        a: "Mostly Dhaka city for now. We're working hard to expand, but our ambulances are currently limited to the metropolitan area to ensure fast response times.",
      },
    ],
  },
];

const FAQPage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50">Frequently Asked Questions</h1>
        <p className="text-lg text-slate-800 dark:text-slate-200 max-w-2xl mx-auto mt-4">
          Find answers to common questions about our services and how you can help.
        </p>
      </div>
      <div className="max-w-3xl mx-auto space-y-10">
        {faqs.map((category, catIndex) => (
          <div key={category.category}>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-6 border-b-2 border-orange-500 pb-2">{category.category}</h2>
            <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/30 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden">
              {category.items.map((item, itemIndex) => (
                <AccordionItem key={item.q} title={item.q} id={`faq-${catIndex}-${itemIndex}`}>
                  <p>{item.a}</p>
                </AccordionItem>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;