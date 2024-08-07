import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import EmployeeTable from '../../components/EmployeeTable/EmployeeTable';
import LeaveRequestTable from '../../components/LeaveRequestTable/LeaveRequestTable';
import ProjectTable from '../../components/ProjectTable/ProjectTable';
import { useEffect } from 'react';
import Employee from '../../api/Employee';

const DashboardPage = () => {
    const [value, setValue] = React.useState('1');
    const [role, setRole] = React.useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            const role = await Employee.getRoles();
            if (role === "Employee") {
                setValue('2');
            }
            setRole(role);
        };

        fetchData();
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                        { role === "Employee" ? null : <Tab label="Employees Table" value="1" /> }
                        <Tab label="Leave Requests Table" value="2" />
                        <Tab label="Projects Table" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1" sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}><EmployeeTable /></TabPanel>
                <TabPanel value="2" sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}><LeaveRequestTable/></TabPanel>
                <TabPanel value="3" sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}><ProjectTable/></TabPanel>
            </TabContext>
        </Box>
    );
};

export default DashboardPage;