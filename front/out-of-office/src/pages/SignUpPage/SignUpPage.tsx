import { Box, Typography } from "@mui/material";
import BusinessIcon from '@mui/icons-material/Business';
import SignUpForm from "../../components/SignUpForm/SignUpForm";

const SignInPage = () => {
    return (
        <Box sx={{
            display: 'flex',
            height: '100vh',
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '50%',
                height: '100%',
            }}>
                <SignUpForm />
            </Box>
            <Box sx={{
                 display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'center',
                 alignItems: 'center',
                width: '50%',
                height: '100%',
                background: 'linear-gradient(to bottom, #ff7e5f, #feb47b)',
                gap: '20px',
            }}>
                <BusinessIcon
                sx={{ 
                    width: 60,
                    height: 60,
                    color: '#F3F9E3',
                    }}/>
                <Box sx={{
                        display: 'flex',
                    }}>
                        <Typography variant="h3" sx={{
                            fontWeight: 'bold',
                            padding: '0 10px',
                        }}>
                            OUT OF OFFICE
                        </Typography>
                    </Box>
            </Box> 
        </Box>
    );
};

export default SignInPage;