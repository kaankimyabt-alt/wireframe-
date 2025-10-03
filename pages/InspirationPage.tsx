
import React from 'react';
import Icon from '../components/Icon';
import { useLocale } from '../contexts/LocaleContext';

const quotes = {
    daily: {
        quote: "Design is not just what it looks like and feels like. Design is how it works.",
        author: "Steve Jobs"
    },
    motivational: [
        { quote: "The best way to predict the future is to create it.", author: "Peter Drucker" },
        { quote: "Creativity is intelligence having fun.", author: "Albert Einstein" },
        { quote: "Don’t be afraid to get creative and experiment with your marketing.", author: "Mike Volpe" }
    ],
    expert: [
        {
            name: "Julie Zhuo",
            title: "Former VP of Design, Facebook",
            insight: "Great design is all about crafting experiences that feel intuitive and effortless. Start with the user's problem, not the solution."
        },
        {
            name: "Don Norman",
            title: "Author, 'The Design of Everyday Things'",
            insight: "When you have a choice of two things, and they're equal, pick the one that's more fun."
        }
    ]
}


const InspirationPage: React.FC = () => {
    const { t } = useLocale();
    return (
        <div className="space-y-12">
            <header>
                <h1 className="text-3xl font-bold">{t('nav.inspiration')} & Insights</h1>
                <p className="text-theme-text-secondary mt-1">Motivation and expert advice to fuel your creativity.</p>
            </header>

            <section className="bg-theme-accent/10 border-l-4 border-theme-accent p-8 rounded-r-lg">
                <h2 className="text-lg font-semibold text-theme-accent mb-2">Quote of the Day</h2>
                <blockquote className="text-2xl font-medium text-theme-text">
                    "{quotes.daily.quote}"
                </blockquote>
                <cite className="block text-right mt-4 not-italic text-theme-text-secondary">— {quotes.daily.author}</cite>
            </section>
            
            <section>
                <h2 className="text-2xl font-semibold mb-4">Expert Insights (Mini)</h2>
                <div className="space-y-6">
                    {quotes.expert.map(e => (
                         <div key={e.name} className="bg-theme-bg-secondary p-6 rounded-lg flex gap-6">
                            <img src={`https://picsum.photos/seed/${e.name.replace(/\s/g, '')}/100/100`} alt={e.name} className="w-24 h-24 rounded-full flex-shrink-0 object-cover" />
                            <div>
                                <h3 className="text-xl font-bold">{e.name}</h3>
                                <p className="text-sm text-theme-accent font-semibold">{e.title}</p>
                                <p className="mt-3 text-theme-text-secondary italic">"{e.insight}"</p>
                            </div>
                         </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Motivational Quotes</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {quotes.motivational.map(q => (
                        <div key={q.author} className="bg-theme-bg-secondary p-6 rounded-lg flex flex-col">
                            <Icon name="sparkles" className="w-8 h-8 text-yellow-400 mb-4" />
                            <p className="flex-grow text-lg">"{q.quote}"</p>
                            <p className="text-right text-theme-text-secondary mt-4">— {q.author}</p>
                        </div>
                    ))}
                 </div>
            </section>
        </div>
    );
};

export default InspirationPage;
