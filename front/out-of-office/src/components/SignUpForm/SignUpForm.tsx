import { Box, Typography, TextField, FormControl, InputAdornment, IconButton, Button, RadioGroup, FormControlLabel, Radio, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { VisibilityOff, Visibility } from '@mui/icons-material';
import React from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import Auth from "../../api/Auth";
import { useNavigate } from "react-router-dom";
import signUpFormValidation from "../../validation/signUpFormValidation";
import SignUpRequest from "../../api/models/request/SignUpRequest";

export interface SignUp {
    fullName: string;
    email: string;
    password: string;
}

const subdivisionOptions = [
    { value: 0, label: 'IT' },
    { value: 1, label: 'HR' },
    { value: 2, label: 'Marketing' },
    { value: 3, label: 'Sales' },
    { value: 4, label: 'Finance' },
    { value: 5, label: 'Legal' },
    { value: 6, label: 'Management' },
];
const positionOptions = [
    { value: 0, label: 'Supervisor' },
    { value: 1, label: 'Team Lead' },
    { value: 2, label: 'Developer' },
    { value: 3, label: 'Designer' },
    { value: 4, label: 'Analyst' },
    { value: 5, label: 'Tester' },
    { value: 6, label: 'Support' },
];

const SignInForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignUp>({
        resolver: yupResolver(signUpFormValidation),
        reValidateMode: 'onChange',
        mode: 'onTouched'
    });
    const [subdivision, setSubdivision] = React.useState('');
    const [position, setPosition] = React.useState('');
    const [role, setRole] = React.useState('Employee');

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole((event.target as HTMLInputElement).value);
  };

    const handleSubdivisionChange = (event: SelectChangeEvent) => {
        setSubdivision(event.target.value as string);
    };

    const handlePositionChange = (event: SelectChangeEvent) => {
        setPosition(event.target.value as string);
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleSignIn = async (form: SignUp) => {
        const data: SignUpRequest = {
            fullName: form.fullName,
            subdivision: subdivision,
            position: position,
            email: form.email,
            password: form.password,
            role: role,
        };
       const response = await Auth.signUp(data);
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
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Welcome</Typography>
                <Typography variant="body1">Already a customer? Sign in <a href="/">here</a></Typography>
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
                    label="FullName"
                    variant="outlined"
                    {...register('fullName')}
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message || ' '}
                    sx={{ width: '100%' }} />
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>

                    <FormControl fullWidth sx={{ display: 'flex', flexDirection: 'row' }}>
                        <InputLabel id="demo-simple-select-label">Subdivision</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={subdivision}
                            label="Subdivision"
                            onChange={handleSubdivisionChange}
                            sx={{ width: '95%' }}
                        >
                            {subdivisionOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ display: 'flex', flexDirection: 'row', }}>
                        <InputLabel id="demo-simple-select-label">Position</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={position}
                            label="Position"
                            onChange={handlePositionChange}
                            sx={{ width: '100%' }}
                        >
                            {positionOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
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
                <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Employee"
                    name="radio-buttons-group"
                    onChange={handleRoleChange}
                >
                    <FormControlLabel value="Employee" control={<Radio />} label="Employee" />
                    <FormControlLabel value="HR Manager" control={<Radio />} label="HR Manager" />
                    <FormControlLabel value="Project Manager" control={<Radio />} label="Project Manager" />
                </RadioGroup>
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
                    Sign Up
                </Button>
            </Box>
        </Box>
    );
};

export default SignInForm;