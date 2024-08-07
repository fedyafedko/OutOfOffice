import { useEffect, useState } from "react";
import Employee from "../../api/Employee";
import EmployeeResponse from "../../api/models/response/EmployeeResponse";
import { useParams } from "react-router-dom";
import { Box, Avatar, Typography, Button, Divider, Grid, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import ProjectResponse from "../../api/models/response/ProjectResponse";
import Project from "../../api/Project";
import AddToProjectRequest from "../../api/models/request/AddToProjectRequest";

const EmployeePage = () => {
    const [data, setData] = useState<EmployeeResponse>();
    const [projects, setProjects] = useState<ProjectResponse[]>([]);
    const [project, setProject] = useState<string>('');
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const employee = await Employee.getById(id);
                const projects = await Project.getAll();
                setProjects(projects);
                setData(employee);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (event: SelectChangeEvent) => {
        setProject(event.target.value as string);
    };

    const handleClick = () => {
        const data: AddToProjectRequest = {
            employeeId: id || ' ',
            projectId: project || ' ',
        };
        Project.addToProject(data);
    }
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 3,
                backgroundColor: '#f0f0f0',
                borderRadius: 8,
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                width: '500px',
                margin: 'auto',
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 2,
                }}>
                    <Avatar alt={data?.fullName} src={data?.photo} />
                    <Box sx={{ marginLeft: 2 }}>
                        <Typography variant="h4">{data?.fullName}</Typography>
                    </Box>
                </Box>

                <Box sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    height: '100%',
                    padding: 3,
                    borderRadius: 8,
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
                }}>
                    <Typography variant="h6">Profile Details</Typography>
                    <Divider sx={{ marginBottom: 2 }} />
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Typography variant="subtitle1">Email:</Typography>
                                <Typography variant="body1">{data?.email}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1">Position:</Typography>
                                <Typography variant="body1">{data?.position}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Typography variant="subtitle1">Subdivision:</Typography>
                                <Typography variant="body1">{data?.subdivision}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1">Status:</Typography>
                                <Typography variant="body1">{data?.status}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Button variant="contained" color="primary" sx={{ margin: 2 }} onClick={handleClick}>
                        Add to project
                    </Button>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Project</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={project}
                            label="Project"
                            onChange={handleChange}
                        >
                            {projects.map((project) => (
                                <MenuItem value={project.id}>{project.projectType}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    );
};

export default EmployeePage;