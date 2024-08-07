import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateField } from '@mui/x-date-pickers/DateField';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Dayjs } from 'dayjs';
import AddProjectRequestRequest from '../../api/models/request/AddProjectRequest';
import Project from '../../api/Project';

const projectTypeOptions = [
    { value: 0, label: 'Research' },
    { value: 1, label: 'Development' },
    { value: 2, label: 'Testing' },
    { value: 3, label: 'Maintenance' },
    { value: 4, label: 'Documentation' },
];

export default function AddProjectWindow() {
    const [open, setOpen] = React.useState(false);
    const [projectType, setProjectType] = React.useState<string>('');
    const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
    const [endDate, setEndDate] = React.useState<Dayjs | null>(null);
    const [comment, setComment] = React.useState<string>('');
    const [employee, setEmployee] = React.useState<number>();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async () => {
        const formData: AddProjectRequestRequest = {
            projectType,
            startDate: startDate ? startDate.toDate() : new Date(),
            endDate: endDate ? endDate.toDate() : new Date(),
            comment,
            employeeId: employee ? employee : 0
        };

        var response = await Project.add(formData);
        if(response === undefined){
            setOpen(false);
        }
    };

    const handleProjectTypeChange = (event: SelectChangeEvent<string>) => {
        setProjectType(event.target.value);
    };

    const handleStartDateChange = (newValue: Dayjs | null) => {
        setStartDate(newValue);
    };

    const handleEndDateChange = (newValue: Dayjs | null) => {
        setEndDate(newValue);
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    const handleEmployeeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployee(Number(event.target.value));
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Project
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Add project"}
                </DialogTitle>
                <DialogContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                }}>
                    <FormControl fullWidth sx={{ display: 'flex', flexDirection: 'row', width: '400px' }}>
                        <InputLabel id="demo-simple-select-label">Project Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={projectType}
                            label="Project Type"
                            onChange={handleProjectTypeChange}
                            sx={{ width: '100%' }}
                        >
                            {projectTypeOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateField']}>
                            <DateField
                                label="Start Date"
                                value={startDate}
                                onChange={handleStartDateChange}
                            />
                        </DemoContainer>
                        <DemoContainer components={['DateField']}>
                            <DateField
                                label="End Date"
                                value={endDate}
                                onChange={handleEndDateChange}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <TextField
                        id="outlined-basic"
                        label="Comment"
                        variant="outlined"
                        value={comment}
                        onChange={handleCommentChange}
                    />
                    <TextField
                        id="outlined-basic"
                        type="number"
                        label="Enployee Id"
                        variant="outlined"
                        value={employee}
                        onChange={handleEmployeeChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
