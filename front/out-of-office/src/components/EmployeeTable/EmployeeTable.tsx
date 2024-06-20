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
import EmployeeResponse from '../../api/models/response/EmployeeResponse';
import UpdateEmployeeRequest from '../../api/models/request/UpdateEmployeeRequest';
import IsActiveRequest from '../../api/models/request/IsActiveRequest';
import { useNavigate } from 'react-router-dom';

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

type SortKey = keyof EmployeeResponse;
type SortConfig = { key: SortKey, direction: 'asc' | 'desc' };

const EmployeeTable = () => {
    const [data, setData] = useState<EmployeeResponse[]>([]);
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
    const [editRowId, setEditRowId] = useState<number | null>(null);
    const [editedRow, setEditedRow] = useState<Partial<EmployeeResponse>>({});
    const [subdivision, setSubdivision] = React.useState('');
    const [position, setPosition] = React.useState('');
    const [role, setRole] = React.useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const employees = await Employee.getAll();
            const role = await Employee.getRoles();
            setData(employees);
            setRole(role);
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

    const handleEditClick = (row: EmployeeResponse) => {
        setEditRowId(row.id);
        setEditedRow(row);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setEditedRow({ ...editedRow, [name!]: value });
    };

    const handleSaveClick = async () => {
        if (editRowId !== null) {
            const updateData: UpdateEmployeeRequest = {
                id: editedRow.id!,
                fullName: editedRow.fullName!,
                email: editedRow.email!,
                subdivision: subdivision,
                position: position,
            };
            var response = await Employee.update(updateData);
            setData((prevData) => prevData.map((emp) => (emp.id === editRowId ? response : emp)));
            setEditRowId(null);
            setEditedRow({});
        }
    };

    const handleAddClick = async (id: number) => {
        var response = await Employee.addToHR(id);
        console.log(response);
    };

    const handleSubdivisionChange = (event: SelectChangeEvent) => {
        setSubdivision(event.target.value as string);
    };

    const handlePositionChange = (event: SelectChangeEvent) => {
        setPosition(event.target.value as string);
    };

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>, id: number, status: string) => {
        var newStatus = status === 'Active' ? 1 : 0;
        const data = { employeeId: id, status: newStatus };
        var response = Employee.isActive(data as IsActiveRequest);
        if (response != null) {
            window.location.reload();
        }
      };

    return (
        <TableContainer component={Paper} sx={{ width: 1500 }}>
            <Table sx={{ width: '100%' }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            Full Name
                            <IconButton onClick={() => handleSort('fullName')} color="primary">
                                {sortConfig?.key === 'fullName' && sortConfig.direction === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                            </IconButton>
                        </StyledTableCell>
                        <StyledTableCell>
                            Email
                            <IconButton onClick={() => handleSort('email')} color="primary">
                                {sortConfig?.key === 'email' && sortConfig.direction === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                            </IconButton>
                        </StyledTableCell>
                        <StyledTableCell>
                            Subdivision
                            <IconButton onClick={() => handleSort('subdivision')} color="primary">
                                {sortConfig?.key === 'subdivision' && sortConfig.direction === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                            </IconButton>
                        </StyledTableCell>
                        <StyledTableCell>
                            Position
                            <IconButton onClick={() => handleSort('position')} color="primary">
                                {sortConfig?.key === 'position' && sortConfig.direction === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                            </IconButton>
                        </StyledTableCell>
                        <StyledTableCell>
                            Status
                            <IconButton onClick={() => handleSort('status')} color="primary">
                                {sortConfig?.key === 'status' && sortConfig.direction === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                            </IconButton>
                        </StyledTableCell>
                        {role === "HR manager" && (
                            <>
                        <StyledTableCell>
                            Update
                        </StyledTableCell>
                        <StyledTableCell>
                            Add
                        </StyledTableCell>
                        </>
                        )}
                         {role === "Project manager" && (
                        <StyledTableCell>
                            View
                        </StyledTableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedData.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell component="th" scope="row">
                                {editRowId === row.id ? (
                                    <TextField
                                        name="fullName"
                                        value={editedRow.fullName || ''}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    row.fullName
                                )}
                            </StyledTableCell>
                            <StyledTableCell>
                                {editRowId === row.id ? (
                                    <TextField
                                        name="email"
                                        value={editedRow.email || ''}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    row.email
                                )}
                            </StyledTableCell>
                            <StyledTableCell>
                                {editRowId === row.id ? (
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
                                ) : (
                                    row.subdivision
                                )}
                            </StyledTableCell>
                            <StyledTableCell>
                                {editRowId === row.id ? (
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
                                ) : (
                                    row.position
                                )}
                            </StyledTableCell>
                            <StyledTableCell>
                                    {row.status}
                                    <Switch
    checked={row.status === 'Active'}
    onChange={(event) => handleSwitchChange(event, row.id, row.status)}
    inputProps={{ 'aria-label': 'controlled' }}
/>
                            </StyledTableCell>
                            {role === "HR manager" && (
                            <>
                            <StyledTableCell>
                                {editRowId === row.id ? (
                                    <Button onClick={handleSaveClick}>Save</Button>
                                ) : (
                                    <Button onClick={() => handleEditClick(row)}>Update</Button>
                                )}
                            </StyledTableCell>
                            <StyledTableCell>
                                    <Button onClick={() => handleAddClick(row.id)}>Add to HR</Button>
                            </StyledTableCell>
                            </>
                            )}
                            {role === "Project manager" && (
                            <StyledTableCell>
                                    <Button onClick={() => navigate(`/employee/${row.id}`)}>View</Button>
                            </StyledTableCell>
                            )}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EmployeeTable;
