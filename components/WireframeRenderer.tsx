
import React from 'react';
import type { WireframeComponent } from '../types';
import Icon from './Icon';
import { useLocale } from '../contexts/LocaleContext';

interface WireframeRendererProps {
  components: WireframeComponent[];
}

const renderComponent = (component: WireframeComponent, t: (key: string) => string) => {
  const style = {
    left: `${component.layout.x}%`,
    top: `${component.layout.y}%`,
    width: `${component.layout.width}%`,
    height: `${component.layout.height}%`,
  };

  const baseClasses = 'absolute flex items-center justify-center border-2 border-dashed border-gray-400 text-gray-400';

  switch (component.type) {
    case 'container':
      return <div key={component.id} style={style} className={`${baseClasses} bg-gray-500/10`}></div>;
    case 'button':
      return (
        <div key={component.id} style={style} className={`${baseClasses} bg-blue-500/20 rounded-md`}>
          <span>{component.text || 'Button'}</span>
        </div>
      );
    case 'input':
      return (
        <div key={component.id} style={style} className={`${baseClasses} bg-gray-500/20 rounded`}>
          <span className="text-sm">{component.placeholder || 'Input Field'}</span>
        </div>
      );
    case 'text':
      return (
        <div key={component.id} style={style} className={`${baseClasses} border-none`}>
          <div className="w-full text-center">
            <p className="text-sm bg-gray-400/30 rounded w-full mb-1"> {component.text || 'Some Text'}</p>
            <p className="text-xs bg-gray-400/20 rounded w-4/5 mx-auto">Lorem ipsum dolor.</p>
          </div>
        </div>
      );
    case 'image':
      return (
        <div key={component.id} style={style} className={`${baseClasses} bg-gray-500/20`}>
          <Icon name="image" className="w-1/2 h-1/2 opacity-50"/>
        </div>
      );
    case 'icon':
      return (
        <div key={component.id} style={style} className={`${baseClasses} border-none`}>
           <Icon name={component.icon || "grid"} className="w-full h-full opacity-50"/>
        </div>
      );
    default:
      return null;
  }
};

const WireframeRenderer: React.FC<WireframeRendererProps> = ({ components }) => {
  const { t } = useLocale();
  return (
    <div className="relative w-full aspect-[9/16] sm:aspect-video max-w-4xl mx-auto bg-theme-bg-secondary rounded-lg shadow-lg overflow-hidden border border-theme-border">
      {components.length > 0 ? (
        components.map(component => renderComponent(component, t))
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-theme-text-secondary">
          <Icon name="layout" className="w-24 h-24 mb-4" />
          <p>{t('wireframe.placeholder')}</p>
        </div>
      )}
    </div>
  );
};

export default WireframeRenderer;
