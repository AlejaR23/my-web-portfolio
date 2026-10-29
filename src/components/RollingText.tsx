import React from 'react';

interface RollingTextProps {
  text: string;
  className?: string;
  lineClassName?: string;
  duplicateClassName?: string;
  as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4';
  direction?: 'up' | 'down';
  accentColor?: string;
}

/**
 * Konrad-inspired 3D / cylinder rolling text effect.
 * When hovered, the line rolls out while an identical duplicate rolls in from below (or above),
 * mimicking the precise cubic-bezier(0.22, 1, 0.36, 1) cylinder roll from konrad.com.
 */
export const RollingText: React.FC<RollingTextProps> = ({
  text,
  className = '',
  lineClassName = '',
  duplicateClassName = '',
  as: Component = 'span',
  direction = 'up',
  accentColor,
}) => {
  return (
    <Component className={`konrad-roll-wrapper group/roll ${className}`}>
      <span className="konrad-roll">
        <span 
          className={`konrad-roll-track ${direction === 'down' ? 'direction-down' : ''}`}
          style={accentColor ? { color: accentColor } : undefined}
        >
          <span className={`konrad-roll-line ${lineClassName}`}>
            {text}
          </span>
          <span 
            className={`konrad-roll-line konrad-roll-duplicate ${duplicateClassName}`} 
            aria-hidden="true"
          >
            {text}
          </span>
        </span>
      </span>
    </Component>
  );
};
