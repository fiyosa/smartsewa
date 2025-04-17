    import React from 'react';
    import { Box } from '@mui/material';

    const CommonBackground = ({ bgTop, bgBottom, topStyles = {}, bottomStyles = {} }) => {
    return (
        <>
        <Box
            component="img"
            src={bgTop}
            alt="Background Top"
            sx={{
            width: '100%',
            maxWidth: '414px',
            position: 'fixed',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 0,
            ...topStyles
            }}
        />
        {/* <Box
            component="img"
            src={bgBottom}
            alt="Background Bottom"
            sx={{
            width: '50%',
            maxWidth: '414px',
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 0,
            pointerEvents: 'none',
            ...bottomStyles
            }}
        /> */}
        </>
    );
    };

    export default CommonBackground;