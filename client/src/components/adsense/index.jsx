import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

const AdSense = () => {
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (!initialized) {
            // Load Google AdSense ads
            window.adsbygoogle = window.adsbygoogle || []
            setInitialized(true);
        }
    }, [initialized]); 
    return (
        <Box>
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-9502119642952505"
                data-ad-slot="8008546981"
                data-ad-format="auto"
                data-full-width-responsive="true"
                data-cookie-consent="personalized"
                data-cookie-configuration="A,B"
                data-page-url={window.location.href}
                data-top-domain={window.location.hostname}
            >
            </ins>
        </Box>
    );
};

export default AdSense;
