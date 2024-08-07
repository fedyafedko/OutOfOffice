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
import AddLeaveRequestRequest from '../../api/models/request/AddLeaveRequestRequest';
import LeaveRequest from '../../api/LeaveRequest';

const absenceReasonOptions = [
    { value: 0, label: 'Illness' },
    { value: 1, label: 'Personal' },
    { value: 2, label: 'Bereavement' },
    { value: 3, label: 'Maternity' },
    { value: 4, label: 'Paternity' },
    { value: 5, label: 'Military Service' },
];

export default function AddLeaveRequestWindow() {
    const [open, setOpen] = React.useState(false);
    const [absenceReason, setAbsenceReason] = React.useState<string>('');
    const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
    const [endDate, setEndDate] = React.useState<Dayjs | null>(null);
    const [comment, setComment] = React.useState<string>('');
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async () => {
        const formData: AddLeaveRequestRequest = {
            absenceReason: absenceReason,
            startDate: startDate ? startDate.toDate() : new Date(),
            endDate: endDate ? endDate.toDate() : new Date(),
            comment: comment,
        };
        var response = await LeaveRequest.add(formData);
        if(response === undefined){
            setOpen(false);
        }
        setOpen(false);
    };

    const handleProjectTypeChange = (event: SelectChangeEvent<string>) => {
        setAbsenceReason(event.target.value);
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

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Leave Request
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Add Leave Request"}
                </DialogTitle>
                <DialogContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                }}>
                    <FormControl fullWidth sx={{ display: 'flex', flexDirection: 'row', width: '400px' }}>
                        <InputLabel id="demo-simple-select-label">Absence Reason</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={absenceReason}
                            label="Asence Reason"
                            onChange={handleProjectTypeChange}
                            sx={{ width: '100%' }}
                        >
                            {absenceReasonOptions.map((option) => (
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
