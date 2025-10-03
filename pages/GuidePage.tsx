import React, { useState } from 'react';
import { useLocale } from '../contexts/LocaleContext';

type ArticleKey = 'getting-started' | 'prompt-crafting' | 'design-principles' | 'inspirational-talks' | 'books-and-trends' | 'accessible-design';

const GuidePage: React.FC = () => {
    const [activeArticle, setActiveArticle] = useState<ArticleKey>('getting-started');
    const { t } = useLocale();

    const articles: Record<ArticleKey, { title: string; content: React.ReactNode }> = {
      'getting-started': {
        title: t('guide.getting_started.title'),
        content: (
          <div className="space-y-4">
            <p>{t('guide.getting_started.p1')}</p>
            <h3 className="font-semibold text-lg">{t('guide.getting_started.h1')}</h3>
            <p>{t('guide.getting_started.p2')}</p>
            <h3 className="font-semibold text-lg">{t('guide.getting_started.h2')}</h3>
            <p>{t('guide.getting_started.p3')}</p>
            <h3 className="font-semibold text-lg">{t('guide.getting_started.h3')}</h3>
            <p>{t('guide.getting_started.p4')}</p>
          </div>
        ),
      },
      'prompt-crafting': {
        title: t('guide.prompt_crafting.title'),
        content: (
          <div className="space-y-4">
            <p>{t('guide.prompt_crafting.p1')}</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>{t('guide.prompt_crafting.l1_b')}</strong>{t('guide.prompt_crafting.l1_t')}</li>
              <li><strong>{t('guide.prompt_crafting.l2_b')}</strong>{t('guide.prompt_crafting.l2_t')}</li>
              <li><strong>{t('guide.prompt_crafting.l3_b')}</strong>{t('guide.prompt_crafting.l3_t')}</li>
              <li><strong>{t('guide.prompt_crafting.l4_b')}</strong>{t('guide.prompt_crafting.l4_t')}</li>
            </ul>
          </div>
        ),
      },
      'design-principles': {
        title: t('guide.design_principles.title'),
        content: (
          <div className="space-y-4">
            <p>{t('guide.design_principles.p1')}</p>
            <h3 className="font-semibold text-lg">{t('guide.design_principles.h1')}</h3>
            <p>{t('guide.design_principles.p2')}</p>
            <h3 className="font-semibold text-lg">{t('guide.design_principles.h2')}</h3>
            <p>{t('guide.design_principles.p3')}</p>
            <h3 className="font-semibold text-lg">{t('guide.design_principles.h3')}</h3>
            <p>{t('guide.design_principles.p4')}</p>
             <h3 className="font-semibold text-lg">{t('guide.design_principles.h4')}</h3>
            <p>{t('guide.design_principles.p5')}</p>
          </div>
        ),
      },
      'inspirational-talks': {
        title: t('guide.inspirational_talks.title'),
        content: (
          <div className="space-y-6">
            <p>{t('guide.inspirational_talks.p1')}</p>
            <div>
              <h4 className="font-bold">Don Norman: 3 ways good design makes you happy</h4>
              <p className="text-sm text-theme-text-secondary mb-2">{t('guide.inspirational_talks.t1_desc')}</p>
              <a href="https://www.ted.com/talks/don_norman_3_ways_good_design_makes_you_happy" target="_blank" rel="noopener noreferrer" className="text-theme-accent hover:underline">{t('guide.watch_talk')}</a>
            </div>
            <div>
              <h4 className="font-bold">Joe Gebbia: How Airbnb designs for trust</h4>
              <p className="text-sm text-theme-text-secondary mb-2">{t('guide.inspirational_talks.t2_desc')}</p>
              <a href="https://www.ted.com/talks/joe_gebbia_how_airbnb_designs_for_trust" target="_blank" rel="noopener noreferrer" className="text-theme-accent hover:underline">{t('guide.watch_talk')}</a>
            </div>
          </div>
        )
      },
      'books-and-trends': {
          title: t('guide.books_and_trends.title'),
          content: (
              <div className="space-y-6">
                  <h3 className="font-semibold text-lg">{t('guide.books_and_trends.h1')}</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {[1, 2, 3, 4].map(i => (
                        <li key={i}>
                          <strong>{t(`guide.books_and_trends.book${i}.title`)}</strong> by {t(`guide.books_and_trends.book${i}.author`)}
                        </li>
                      ))}
                  </ul>
                  <h3 className="font-semibold text-lg">{t('guide.books_and_trends.h2')}</h3>
                   <p>{t('guide.books_and_trends.p1')}</p>
              </div>
          )
      },
      'accessible-design': {
          title: t('guide.accessible_design.title'),
          content: (
               <div className="space-y-4">
                  <p>{t('guide.accessible_design.p1')}</p>
                  <p>{t('guide.accessible_design.p2')}</p>
              </div>
          )
      }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">{t('nav.guide')}</h1>
            <p className="text-theme-text-secondary">{t('guide.description')}</p>

            <div className="flex flex-col md:flex-row gap-8">
                <aside className="md:w-64 flex-shrink-0">
                    <ul className="space-y-2">
                        {Object.entries(articles).map(([key, { title }]) => (
                            <li key={key}>
                                <button
                                    onClick={() => setActiveArticle(key as ArticleKey)}
                                    className={`w-full text-left p-3 rounded-md transition ${
                                        activeArticle === key ? 'bg-theme-accent text-white font-semibold' : 'hover:bg-theme-bg-secondary'
                                    }`}
                                >
                                    {title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                <article className="flex-1 bg-theme-bg-secondary p-6 rounded-lg prose prose-invert max-w-none prose-p:text-theme-text-secondary prose-h3:text-theme-text prose-h4:text-theme-text prose-a:text-theme-accent">
                   {articles[activeArticle].content}
                </article>
            </div>
        </div>
    );
};

export default GuidePage;