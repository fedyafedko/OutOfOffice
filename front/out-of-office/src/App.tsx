import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignInPage/SignInPage';
import { ThemeProvider, createTheme } from '@mui/material';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import EmployeePage from './pages/EmployeePage/EmployeePage';
import LeaveRequestPage from './pages/LeaveRequestPage/LeaveRequestPage';
import ProjectPage from './pages/ProjectPage/ProjectPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff7e5f',
    },
    background: {
      default: '#f0f0f0',
    },
  },
  typography: { 'fontFamily': '"Source Sans 3", sans-serif' },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/employee/:id" element={<EmployeePage/>} />
        <Route path="/leave-request/:id" element={<LeaveRequestPage/>} />
        <Route path="/project/:id" element={<ProjectPage/>} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
