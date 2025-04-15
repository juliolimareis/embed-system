import React from 'react';

interface SvgRendererProps extends React.SVGAttributes<SVGElement> {
  svgString: string;
}

const SvgRenderer: React.FC<SvgRendererProps> = ({ svgString, ...svgProps }) => {
  return (
    <svg {...svgProps} dangerouslySetInnerHTML={{ __html: svgString }} />
  );
};

export default SvgRenderer;
