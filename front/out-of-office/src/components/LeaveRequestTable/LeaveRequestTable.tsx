import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Box, IconButton, TextField, Button, FormControl, MenuItem, Select, SelectChangeEvent, InputLabel, Switch } from '@mui/material';
import Employee from '../../api/Employee';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeaveRequest from '../../api/LeaveRequest';
import LeaveRequestResponse from '../../api/models/response/LeaveRequestResponse';
import AddLeaveRequestWindow from '../AddLeaveRequestWindow/AddLeaveRequestWindow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

type SortKey = keyof LeaveRequestResponse;
type SortConfig = { key: SortKey, direction: 'asc' | 'desc' };

const LeaveRequestTable = () => {
    const [data, setData] = useState<LeaveRequestResponse[]>([]);
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
    const [role, setRole] = React.useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const role = await Employee.getRoles();
            setRole(role);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const leaveRequests = await LeaveRequest.getAll();
            setData(leaveRequests);
        };

        fetchData();
    }, []);

    const handleSort = (key: SortKey) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = React.useMemo(() => {
        let sortableData = [...data];
        if (sortConfig !== null) {
            sortableData.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableData;
    }, [data, sortConfig]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
        }}>
            { role == "Employee" ? <AddLeaveRequestWindow /> : null }
        <TableContainer component={Paper} sx={{ width: 1500 }}>
            <Table sx={{ width: '100%' }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            Absence Reason
                            <IconButton onClick={() => handleSort('absenceReason')} color="primary">
                                {sortConfig?.key === 'absenceReason' && sortConfig.direction === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                            </IconButton>
                        </StyledTableCell>
                        <StyledTableCell>
                            Start Date
                            <IconButton onClick={() => handleSort('startDate')} color="primary">
                                {sortConfig?.key === 'startDate' && sortConfig.direction === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                            </IconButton>
                        </StyledTableCell>
                        <StyledTableCell>
                            End Date
                            <IconButton onClick={() => handleSort('endDate')} color="primary">
                                {sortConfig?.key === 'endDate' && sortConfig.direction === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                            </IconButton>
                        </StyledTableCell>
                        <StyledTableCell>
                            Comment
                            <IconButton onClick={() => handleSort('comment')} color="primary">
                                {sortConfig?.key === 'comment' && sortConfig.direction === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                            </IconButton>
                        </StyledTableCell>
                        <StyledTableCell>
                            Status
                            <IconButton onClick={() => handleSort('status')} color="primary">
                                {sortConfig?.key === 'status' && sortConfig.direction === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                            </IconButton>
                        </StyledTableCell>
                        {role == "Employee" ? 
                            <>
                            <StyledTableCell>
                                Cancel
                            </StyledTableCell>
                            </>
                        :
                            <StyledTableCell>
                                View
                            </StyledTableCell>
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedData.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell component="th" scope="row">
                                {row.absenceReason}
                            </StyledTableCell>
                            <StyledTableCell>
                                {row.startDate.toString()}
                            </StyledTableCell>
                            <StyledTableCell>
                                {row.endDate.toString()}
                            </StyledTableCell>
                            <StyledTableCell>
                                {row.comment}
                            </StyledTableCell>
                            <StyledTableCell>
                                {row.status}
                            </StyledTableCell>
                            {role == "Employee" ? 
                                <StyledTableCell>
                                    <Button onClick={async () => await LeaveRequest.canceledLeaveRequest(row.id)}>Cancel</Button>
                                </StyledTableCell>
                             :
                                <StyledTableCell>
                                    <Button onClick={() => navigate(`/leave-request/${row.id}`)}>View</Button>
                                </StyledTableCell>
                            }
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Box>
    );
};

export default LeaveRequestTable;
