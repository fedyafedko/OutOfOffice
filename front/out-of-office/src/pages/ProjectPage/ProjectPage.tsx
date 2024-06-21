import { useEffect, useState } from "react";
import Employee from "../../api/Employee";
import EmployeeResponse from "../../api/models/response/EmployeeResponse";
import { useParams } from "react-router-dom";
import { Box, Avatar, Paper, Typography, Button, Divider, Grid, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import styled from "styled-components";
import ProjectResponse from "../../api/models/response/ProjectResponse";
import Project from "../../api/Project";
import AddToProjectRequest from "../../api/models/request/AddToProjectRequest";

const ProjectPage = () => {
    const [data, setData] = useState<ProjectResponse>();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
            const project = await Project.getById(id);
            const role = await Employee.getRoles();
            const projects = await Project.getAll();
            setData(project);
            }
        };

        fetchData();
    }, []);

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
                <Box sx={{ marginLeft: 2 }}>
                    <Typography variant="h4">{data?.projectType}</Typography>
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
                <Typography variant="h6">Project Details</Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Box>
                            <Typography variant="subtitle1">Start Date:</Typography>
                            <Typography variant="body1">{data?.startDate.toString()}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle1">End Date:</Typography>
                            <Typography variant="body1">{data?.endDate.toString()}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box>
                            <Typography variant="subtitle1">Comment:</Typography>
                            <Typography variant="body1">{data?.comment}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle1">Employee:</Typography>
                            <Typography variant="body1">{data?.employee?.fullName}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
        </Box>
    );
};

export default ProjectPage;