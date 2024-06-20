import EmployeeResponse from "./EmployeeResponse";

interface ProjectResponse{
    id: number;
    projectType: string;
    startDate: Date;
    endDate: Date;
    comment: string;
    employee: EmployeeResponse;
}

export default ProjectResponse;