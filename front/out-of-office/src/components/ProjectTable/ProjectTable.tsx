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
import { Box, IconButton, TextField, Button, FormControl, MenuItem, Select, SelectChangeEvent, InputLabel } from '@mui/material';
import Employee from '../../api/Employee';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectResponse from '../../api/models/response/ProjectResponse';
import UpdateProjectRequest from '../../api/models/request/UpdateProjectRequest';
import Project from '../../api/Project';
import AddProjectWindow from '../AddProjectWindow/AddProjectWindow';

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

const projectTypeOptions = [
    { value: 0, label: 'Research' },
    { value: 1, label: 'Development' },
    { value: 2, label: 'Testing' },
    { value: 3, label: 'Maintenance' },
    { value: 4, label: 'Documentation' },
];

type SortKey = keyof ProjectResponse;
type SortConfig = { key: SortKey, direction: 'asc' | 'desc' };

const ProjectTable = () => {
    const [data, setData] = useState<ProjectResponse[]>([]);
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
    const [editRowId, setEditRowId] = useState<number | null>(null);
    const [editedRow, setEditedRow] = useState<Partial<ProjectResponse>>({});
    const [projectType, setProjectType] = React.useState('');
    const [role, setRole] = React.useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const projects = await Project.getAll();
            const role = await Employee.getRoles();
            setData(projects);
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

    const handleEditClick = (row: ProjectResponse) => {
        setEditRowId(row.id);
        setEditedRow(row);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setEditedRow({ ...editedRow, [name!]: value });
    };

    const handleSaveClick = async () => {
        if (editRowId !== null) {
            const updateData: UpdateProjectRequest = {
                id: editedRow.id!,
                projectType: projectType,
                startDate: new Date(editedRow.startDate!),
                endDate: new Date(editedRow.endDate!),
                comment: editedRow.comment!,
            };
            var response = await Project.update(updateData);
            setData((prevData) => prevData.map((emp) => (emp.id === editRowId ? response : emp)));
            setEditRowId(null);
            setEditedRow({});
        }
    };

    const handleProjectTypeChange = (event: SelectChangeEvent) => {
        setProjectType(event.target.value as string);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
        }}>
            { role === "Employee" ? null : <AddProjectWindow /> }
            <TableContainer component={Paper} sx={{ width: 1500 }}>
                <Table sx={{ width: '100%' }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>
                                Project Type
                                <IconButton onClick={() => handleSort('projectType')} color="primary">
                                    {sortConfig?.key === 'projectType' && sortConfig.direction === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
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
                                View
                            </StyledTableCell>
                            {role === "Project manager" && (
                                <>
                                    <StyledTableCell>
                                        Update
                                    </StyledTableCell>
                                </>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {editRowId === row.id ? (
                                        <FormControl fullWidth sx={{ display: 'flex', flexDirection: 'row', }}>
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
                                    ) : (
                                        row.projectType
                                    )}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {editRowId === row.id ? (
                                        <TextField
                                            name="startDate"
                                            value={editedRow.startDate || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        row.startDate.toString()
                                    )}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {editRowId === row.id ? (
                                        <TextField
                                            name="startDate"
                                            value={editedRow.endDate || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        row.endDate.toString()
                                    )}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {editRowId === row.id ? (
                                        <TextField
                                            name="comment"
                                            value={editedRow.comment || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        row.comment
                                    )}
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Button onClick={() => navigate(`/project/${row.id}`)}>View</Button>
                                </StyledTableCell>
                                {role === "Project manager" && (
                                    <StyledTableCell>
                                        {editRowId === row.id ? (
                                            <Button onClick={handleSaveClick}>Save</Button>
                                        ) : (
                                            <Button onClick={() => handleEditClick(row)}>Update</Button>
                                        )}
                                    </StyledTableCell>
                                )}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ProjectTable;
