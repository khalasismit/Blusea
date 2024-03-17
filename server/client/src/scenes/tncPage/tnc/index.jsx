import React from 'react';
import { Container, Typography, Link, useTheme, Box } from '@mui/material';
import Mode from '../../../components/mode';

const TermsAndConditions = () => {
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
        Terms and Conditions
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to Magnet, a social media platform connecting people worldwide. By using our services, you agree to comply with the following terms and conditions. If you do not agree with any part of these terms, please do not use our website or services.
      </Typography>
      <Typography variant="h5" gutterBottom>
        1. User Conduct
      </Typography>
      <Typography variant="body1" paragraph>
        1.1. You must be at least 13 years old to use Magnet. By using our services, you warrant that you are at least 13 years old.
      </Typography>
      <Typography variant="body1" paragraph>
        1.2. You agree to use Magnet in compliance with all applicable laws and regulations.
      </Typography>
      <Typography variant="body1" paragraph>
        1.3. You are solely responsible for your interactions with other users on Magnet. Magnet is not responsible for the conduct of any user.
      </Typography>
      <Typography variant="h5" gutterBottom>
        2. User Content
      </Typography>
      <Typography variant="body1" paragraph>
        2.1. You retain ownership of any content you post on Magnet. However, by posting content on Magnet, you grant Magnet a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display such content.
      </Typography>
      <Typography variant="body1" paragraph>
        2.2. You agree not to post any content that is unlawful, defamatory, libelous, harassing, abusive, threatening, harmful, obscene, vulgar, or otherwise objectionable.
      </Typography>
      <Typography variant="body1" paragraph>
        2.3. You agree not to post any content that infringes upon the intellectual property rights of others.
      </Typography>
      <Typography variant="h5" gutterBottom>
        3. Privacy
      </Typography>
      <Typography variant="body1" paragraph>
        3.1. Your privacy is important to us. Please review our <Link href="/tnc/privacy-policies">Privacy Policy</Link> to understand how we collect, use, and disclose information about you.
      </Typography>
      <Typography variant="h5" gutterBottom>
        4. Account Security
      </Typography>
      <Typography variant="body1" paragraph>
        4.1. You are responsible for maintaining the security of your Magnet account. You agree not to share your account credentials with anyone else.
      </Typography>
      <Typography variant="body1" paragraph>
        4.2. You agree to notify Magnet immediately of any unauthorized use of your account or any other breach of security.
      </Typography>
      <Typography variant="h5" gutterBottom>
        5. Termination
      </Typography>
      <Typography variant="body1" paragraph>
        5.1. Magnet reserves the right to suspend or terminate your access to Magnet at any time for any reason without notice.
      </Typography>
      <Typography variant="body1" paragraph>
        5.2. Upon termination, your right to use Magnet will immediately cease, and you must cease all use of Magnet.
      </Typography>
      <Typography variant="h5" gutterBottom>
        6. Changes to Terms and Conditions
      </Typography>
      <Typography variant="body1" paragraph>
        6.1. Magnet reserves the right to modify or replace these terms and conditions at any time without notice. By continuing to access or use Magnet after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using Magnet.
      </Typography>
      <Typography variant="h5" gutterBottom>
        7. Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        7.1. If you have any questions about these terms and conditions, please contact us at <Link href="mailto:contact@magnet.com">contact@magnet.com</Link>.
      </Typography>
    </Container>
  );
};

export default TermsAndConditions;
