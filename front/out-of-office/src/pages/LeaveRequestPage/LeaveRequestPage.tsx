import { Avatar, Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Employee from "../../api/Employee";
import LeaveRequest from "../../api/LeaveRequest";
import LeaveRequestResponse from "../../api/models/response/LeaveRequestResponse";
import IsApprovedRequest from "../../api/models/request/IsApprovedRequest";

const LeaveRequestPage = () => {
    const [data, setData] = useState<LeaveRequestResponse>();
    const [isApproved, setIsApproved] = useState(false);
    const [isReject, setIsReject] = useState(false);
    const [role, setRole] = useState<string>('');
    const { id } = useParams();
    const [outOfOfficeBalance, setOutOfOfficeBalance] = useState('');
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const leaveRequest = await LeaveRequest.getById(id);
                const role = await Employee.getRoles();
                setData(leaveRequest);
                setRole(role);
            }
        };

        fetchData();
    }, []);

    const handleApproveSubmit = async () => {
        const request: IsApprovedRequest = {
            leaveRequestId: Number(id),
            isApproved: true,
            outOfOfficeBalance: Number(outOfOfficeBalance),
            comment: null
        };

        var response = await LeaveRequest.isApproved(request)

        console.log(response);
    };

    const handleRejectSubmit = async () => {
        const request: IsApprovedRequest = {
            leaveRequestId: Number(id),
            isApproved: false,
            outOfOfficeBalance: null,
            comment: comment
        };

        var response = await LeaveRequest.isApproved(request)

        console.log(response);
    };

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
                                <Typography variant="subtitle1">Absence Reason:</Typography>
                                <Typography variant="body1">{data?.absenceReason}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1">Start Date:</Typography>
                                <Typography variant="body1">{data?.startDate.toString()}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Typography variant="subtitle1">End Date:</Typography>
                                <Typography variant="body1">{data?.endDate.toString()}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1">Comment:</Typography>
                                <Typography variant="body1">{data?.comment}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1">Status:</Typography>
                                <Typography variant="body1">{data?.status}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ margin: 2 }}
                            onClick={() => {
                                setIsApproved(true);
                                setIsReject(false);
                            }}
                        >
                            Approve
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ margin: 2 }}
                            onClick={() => {
                                setIsApproved(false);
                                setIsReject(true);
                            }}
                        >
                            Reject
                        </Button>

                    </Box>
                    {isApproved && (
                        <Box sx={{ display: "flex", flexDirection: 'column' }}>
                            <TextField
                                type="number"
                                id="outlined-basic"
                                label="Out of Office Balance"
                                variant="outlined"
                                value={outOfOfficeBalance}
                                onChange={(e) => setOutOfOfficeBalance(e.target.value)}
                            />
                            <Button onClick={handleApproveSubmit}>Submit</Button>
                        </Box>
                    )}
                    {isReject && (
                        <Box sx={{ display: "flex", flexDirection: 'column' }}>
                            <TextField
                                id="outlined-basic"
                                label="Comment"
                                variant="outlined"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <Button onClick={handleRejectSubmit}>Submit</Button>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    )
};

export default LeaveRequestPage;