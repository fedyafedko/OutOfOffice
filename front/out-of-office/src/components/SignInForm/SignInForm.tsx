import { Box, Typography, TextField, FormControl, InputAdornment, IconButton, Button } from "@mui/material";
import { VisibilityOff, Visibility } from '@mui/icons-material';
import React from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import signInFormValidation from '../../validation/SignInFormValidation';
import Auth from "../../api/Auth";
import SignInRequest from "../../api/models/request/SignInRequest";
import { useNavigate } from "react-router-dom";

export interface SignIn {
    email: string;
    password: string;
}

const SignInForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignIn>({
        resolver: yupResolver(signInFormValidation),
        reValidateMode: 'onChange',
        mode: 'onTouched'
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleSignIn = async (form: SignIn) => {
        const response = await Auth.signIn(form as SignInRequest);
        if (response === undefined) {
            navigate('/dashboard');
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '50px',
            padding: '20px',
            width: '500px',
        }}>
            <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Welcome back</Typography>
                <Typography variant="body1">New customer? Register <a href="/sign-up">here</a></Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message || ' '}
                    sx={{ width: '100%' }} />
                <FormControl
                    sx={{ width: '100%' }}
                    variant="outlined">
                        <TextField
                            id="password"
                            label="Password"
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password')}
                            error={!!errors.password}
                            helperText={errors.password?.message || ' '}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                </FormControl>
                <Button
                    variant="contained"
                    onClick={handleSubmit(handleSignIn)}
                    sx={{
                        width: '100%',
                        height: '50px',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        fontSize: '18px',
                    }}>
                    Sign In
                </Button>
            </Box>
        </Box>
    );
};

export default SignInForm;