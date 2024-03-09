import { Box, Button, TextField, useTheme } from "@mui/material";
import { useState } from "react";

const ForgetPass = () => {
    const { palette } = useTheme();
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);

    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        try {
            const regex = /^[0-9]{10}$/;
            if (!regex.test(phone)) {
                return;
            }
            // const response = await axios.post('/api/send-otp', { phone });
                // setMessage(response.data.message);
                setShowOtpInput(true);
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.post('/api/verify-otp', { phone, otp });
            // setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    return (
        <div>
            {!showOtpInput ? (
                <form>
                    <Box>
                        <TextField fullWidth size="small" type="tel" label="Phone number" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)}></TextField>
                        {/* <input type="tel" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} /> */}
                        <Button fullWidth
                            type="submit"
                            sx={{
                                m: "1rem 0",
                                p: "0.5rem",
                                backgroundColor: palette.primary.dark,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.dark, background: palette.primary.main },
                            }} onClick={handlePhoneSubmit}>Submit</Button >
                    </Box>
                </form>
            ) : (
                <form>
                    <TextField fullWidth size="small" type="text" label="OTP" placeholder="Enter OTP" value={otp} onChange={(e) => setPhone(e.target.value)}></TextField>
                    {/* <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} /> */}
                    <Button fullWidth
                        type="submit"
                        sx={{
                            m: "1rem 0",
                            p: "0.5rem",
                            backgroundColor: palette.primary.dark,
                            color: palette.background.alt,
                            "&:hover": { color: palette.primary.dark, background: palette.primary.main },
                        }} onClick={handleOtpSubmit} >Submit</Button>
                </form>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgetPass;