import React from 'react';
import { Container, Typography, Link, Box, useTheme } from '@mui/material';
import Mode from '../../../components/mode';

const PrivacyPolicy = () => {
    const theme = useTheme();
    return (
        <Container maxWidth="md">
            <Box sx={{ position: "absolute", top: 0, right: 0 }}>
                <Mode></Mode>
            </Box>
            <Box
                width="100%"
                // backgroundColor={theme.palette.background.alt}
                p="1rem 6%"
                textAlign="center"
            >
                <img src={"https://firebasestorage.googleapis.com/v0/b/magnet784492.appspot.com/o/logo%2Fmagnet3.png?alt=media&token=750dc1ef-316a-4bf3-8a83-8024f0a90dea"} style={{ width: "5rem", height: "4rem", objectFit: "cover" }} alt="" />
                <Typography fontWeight="bold" fontSize="30px" color={theme.palette.neutral.dark} sx={{ lineHeight: "0px" }}>
                    Magnet
                </Typography>
            </Box>
            <Typography variant="h4" gutterBottom>
                Privacy Policy
            </Typography>
            <Typography variant="body1" paragraph>
                Your privacy is important to us. This Privacy Policy outlines how Magnet, a social media platform, collects, uses, and protects your personal information.
            </Typography>
            <Typography variant="h5" gutterBottom>
                1. Information We Collect
            </Typography>
            <Typography variant="body1" paragraph>
                We collect personal information that you provide to us when you register for an account, create a profile, post content, or communicate with other users.
            </Typography>
            <Typography variant="body1" paragraph>
                The types of personal information we collect may include:
                <ul>
                    <li>Your name</li>
                    <li>Email address</li>
                    <li>Profile information (e.g., bio, profile picture)</li>
                    <li>Content you post or share on Magnet</li>
                </ul>
            </Typography>
            <Typography variant="h5" gutterBottom>
                2. How We Use Your Information
            </Typography>
            <Typography variant="body1" paragraph>
                We use your personal information to:
                <ul>
                    <li>Provide and improve our services</li>
                    <li>Communicate with you</li>
                    <li>Personalize your experience on Magnet</li>
                    <li>Enforce our Terms and Conditions</li>
                </ul>
            </Typography>
            <Typography variant="h5" gutterBottom>
                3. Information Sharing and Disclosure
            </Typography>
            <Typography variant="body1" paragraph>
                We may share your personal information with third parties in the following circumstances:
                <ul>
                    <li>With your consent</li>
                    <li>To comply with legal obligations</li>
                    <li>To protect our rights and property</li>
                    <li>With service providers who assist us in providing our services</li>
                </ul>
            </Typography>
            <Typography variant="h5" gutterBottom>
                4. Security
            </Typography>
            <Typography variant="body1" paragraph>
                We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure.
            </Typography>
            <Typography variant="h5" gutterBottom>
                5. Changes to This Privacy Policy
            </Typography>
            <Typography variant="body1" paragraph>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </Typography>
            <Typography variant="h5" gutterBottom>
                6. Contact Us
            </Typography>
            <Typography variant="body1" paragraph>
                If you have any questions about this Privacy Policy, please contact us at <Link href="mailto:privacy@magnet.com">privacy@magnet.com</Link>.
            </Typography>
        </Container>
    );
};

export default PrivacyPolicy;
