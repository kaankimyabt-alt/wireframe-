import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLocale } from '../contexts/LocaleContext';
import Icon from '../components/Icon';

const appExamples: Record<string, { imageUrl: string }> = {
    figma: { imageUrl: 'https://picsum.photos/seed/figma/800/450' },
    balsamiq: { imageUrl: 'https://picsum.photos/seed/balsamiq/800/450' },
    sketch: { imageUrl: 'https://picsum.photos/seed/sketch/800/450' },
    invision: { imageUrl: 'https://picsum.photos/seed/invision/800/450' },
};

const ExampleDetailPage: React.FC = () => {
    const { appId } = useParams<{ appId: string }>();
    const { t } = useLocale();

    if (!appId || !appExamples[appId]) {
        return (
            <div className="text-center">
                <h1 className="text-2xl font-bold">Application not found</h1>
                <Link to="/suggestions" className="text-theme-accent hover:underline mt-4 inline-block">
                    Return to suggestions
                </Link>
            </div>
        );
    }
    
    const app = appExamples[appId];
    const name = t(`examples.${appId}.name`);
    const description = t(`examples.${appId}.description`);
    const features = [
        t(`examples.${appId}.feature1`),
        t(`examples.${appId}.feature2`),
        t(`examples.${appId}.feature3`),
        t(`examples.${appId}.feature4`),
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <Link to="/suggestions" className="inline-flex items-center gap-2 text-theme-text-secondary hover:text-theme-text transition mb-4">
                    <Icon name="arrow-left" className="w-5 h-5" />
                    <span>{t('example.back_button')}</span>
                </Link>
                <h1 className="text-4xl font-bold">{name}</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                    <img src={app.imageUrl} alt={name} className="w-full rounded-lg shadow-lg object-cover aspect-video" />
                    <p className="text-theme-text-secondary leading-relaxed">{description}</p>
                </div>
                <div className="bg-theme-bg-secondary p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">{t('example.key_features')}</h2>
                    <ul className="space-y-3 list-disc list-inside">
                        {features.map((feature, index) => (
                            <li key={index} className="text-theme-text-secondary">{feature}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ExampleDetailPage;
