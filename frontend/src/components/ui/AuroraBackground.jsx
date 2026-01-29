import React from 'react';
import { cn } from '../../lib/utils';
import './AuroraBackground.css';

export const AuroraBackground = ({ className, showRadialGradient = true }) => {
    return (
        <div className={cn("aurora-container", className)}>
            <div className="aurora-gradient"></div>
            {/* Optional Radial Gradient for masking */}
            {showRadialGradient && (
                <div 
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%)',
                        pointerEvents: 'none'
                    }}
                />
            )}
        </div>
    );
};