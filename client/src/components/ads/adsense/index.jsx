import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

const AdSense = () => {
    // const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        // if (!initialized) {
            // Load Google AdSense ads
            const adsbygoogle = window.adsbygoogle || []
            if (adsbygoogle && adsbygoogle.push) {
                adsbygoogle.push({});
            }
        //     setInitialized(true);
        // }
    }, []);// eslint-disable-line react-hooks/exhaustive-deps
    return (
        <Box>
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-9502119642952505"
                data-ad-slot="2058657247"
                data-ad-format="auto"
                data-adtest="on"
                data-full-width-responsive="true"
                data-page-url={window.location.href}
                data-top-domain={window.location.hostname}
            >
            </ins>
        </Box>
    );
};

export default AdSense;
