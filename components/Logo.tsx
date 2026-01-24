import * as React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <img
            src="/logo.png"
            alt="Catwaala Logo"
            className={`${className} object-contain`}
        />
    );
};

export default React.memo(Logo);