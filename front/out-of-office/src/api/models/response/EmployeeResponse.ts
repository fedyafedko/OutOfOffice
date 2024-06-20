interface EmployeeResponse{
    id: number;
    fullName: string;
    email: string;
    subdivision: string;
    position: string;
    status: string;
    peoplePartner: EmployeeResponse;
    outOfOfficeBalance: number;
    photo: string;
}

export default EmployeeResponse;