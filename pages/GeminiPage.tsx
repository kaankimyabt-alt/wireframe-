import React, { useState, useCallback, ChangeEvent } from 'react';
import { useLocale } from '../contexts/LocaleContext';
import { useToast } from '../hooks/useToast';
import { editImage } from '../services/geminiService';
import Icon from '../components/Icon';

const GeminiPage: React.FC = () => {
    const { t } = useLocale();
    const { addToast } = useToast();

    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [originalMimeType, setOriginalMimeType] = useState<string | null>(null);
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modelResponseText, setModelResponseText] = useState<string | null>(null);

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setOriginalImage(reader.result as string);
                setOriginalMimeType(file.type);
                setEditedImage(null); // Reset edited image on new upload
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenerate = useCallback(async () => {
        if (!originalImage || !originalMimeType) {
            addToast({ type: 'error', message: t('error.no_image_uploaded') });
            return;
        }

        setIsLoading(true);
        setEditedImage(null);
        setModelResponseText(null);

        try {
            // The result from FileReader includes the "data:mime/type;base64," prefix.
            // We need to remove it before sending to the API.
            const base64Data = originalImage.split(',')[1];
            
            const result = await editImage(base64Data, originalMimeType, prompt);
            
            if (result.imageBase64) {
                 setEditedImage(`data:${originalMimeType};base64,${result.imageBase64}`);
            }
            if (result.text) {
                setModelResponseText(result.text);
            }

        } catch (err: any) {
            addToast({ type: 'error', message: t(err.message || 'error.api.unknown') });
        } finally {
            setIsLoading(false);
        }
    }, [originalImage, originalMimeType, prompt, addToast, t]);
    
    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold">{t('gemini_extension.title')}</h1>
                <p className="text-theme-text-secondary mt-1">{t('gemini_extension.description')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <label htmlFor="image-upload" className="block text-lg font-semibold mb-2">{t('gemini_extension.upload_area.title')}</label>
                    <div className="relative border-2 border-dashed border-theme-border rounded-lg p-6 text-center cursor-pointer hover:border-theme-accent">
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        {originalImage ? (
                            <img src={originalImage} alt="Uploaded preview" className="mx-auto max-h-64 rounded-md" />
                        ) : (
                            <div className="flex flex-col items-center justify-center text-theme-text-secondary">
                                <Icon name="image" className="w-16 h-16 mb-2" />
                                <p>{t('gemini_extension.upload_area.cta')}</p>
                            </div>
                        )}
                    </div>

                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={t('gemini_extension.prompt_placeholder')}
                        className="w-full p-3 h-28 bg-theme-bg-secondary border border-theme-border rounded-lg focus:ring-2 focus:ring-theme-accent focus:outline-none transition"
                        rows={3}
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading || !originalImage}
                        className="w-full px-8 py-4 bg-theme-accent text-white font-semibold rounded-lg hover:bg-theme-accent-hover transition-colors duration-300 shadow-lg disabled:bg-theme-border disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                <span>{t('gemini_extension.loading')}</span>
                            </div>
                        ) : (
                            t('gemini_extension.generate_button')
                        )}
                    </button>
                </div>
                
                <div className="space-y-4">
                     <h2 className="text-lg font-semibold">{t('gemini_extension.results.edited')}</h2>
                     <div className="w-full aspect-square bg-theme-bg-secondary rounded-lg flex items-center justify-center border border-theme-border overflow-hidden">
                        {editedImage ? (
                            <img src={editedImage} alt="Edited result" className="w-full h-full object-contain" />
                        ) : (
                            <div className="text-theme-text-secondary p-4 text-center">
                                {isLoading ? t('gemini_extension.loading') : 'Your edited image will appear here.'}
                            </div>
                        )}
                     </div>
                      {modelResponseText && (
                        <div className="bg-theme-bg-secondary p-4 rounded-lg border border-theme-border">
                            <p className="text-sm italic text-theme-text-secondary">{modelResponseText}</p>
                        </div>
                     )}
                </div>
            </div>
        </div>
    );
};

export default GeminiPage;