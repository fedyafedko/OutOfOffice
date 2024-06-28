## Table of Contents

- Employee
- Leave Request
- Approval Request
- Project

## Features

1. The HR manager opens the system and has to see the ability to navigate to the list of employees, projects, leave requests, approval requests.
   
With a list of employees, the HR manager can:
- sort table rows using sorting in the column headers,
- add/update/deactivate employees in the list.
With a list of approval requests, the HR manager can:
- sort table rows using sorting in the column headers,
- open a request – a new form opens with details.
- approve the request – related leave request is updated with the corresponding status, and employee absence balance is recalculated;
- reject the request – related leave request is updated with the corresponding status. Write a comment explaining that rejection should be possible.

With a list of leave requests, the HR manager can:
- sort table rows using sorting in the column headers,
- open a request – a new form opens with details.

With a list of projects, the HR manager can:
- sort table rows using sorting in the column headers,
- open a project– a new form opens with details.

2. The Project manager opens the system and has to see the ability to navigate to the list of employees, projects, leave requests, approval requests.
   
With a list of employees, the Project manager can:
- sort table rows using sorting in the column headers,
- open an employee – a new form opens with details.
- assign an employee to projects.

With a list of approval requests, the Project manager can:
- sort table rows using sorting in the column headers
- open a request – a new form opens with details.
- approve the request – related leave request is updated with the corresponding status, and employee absence balance is recalculated;
- reject the request – related leave request is updated with the corresponding status. Write a comment explaining that rejection should be possible.

With a list of leave requests, the Project manager can:
- sort table rows using sorting in the column headers,
- open a request – a new form opens with details.

With a list of projects, the Project manager can:
- sort table rows using sorting in the column headers,
- open a project– a new form opens with details
- add/update/deactivate projects in the list.

3. The company employees opens the system and has to see the ability to navigate to the list of their projects and leave requests.
   
   With a list of leave requests, the employee can:
- sort table rows using sorting in the column headers
- open a new and existing request – a form opens, and employee can create and update the request.
- submit the request – the status is updated to “Submitted,” and a new approval request is created for the responsible HR Manager and Project Managers responsible for employee’s projects;
- cancel the request – the status is updated to “Canceled,” and approval requests are canceled if they already exist.
## Installation

### Prerequisites

- .NET 8
- MSSQL 2019

### Steps

1. Clone the repository:

   
    git clone https://github.com/yourusername/OutOfOffice
    
2. Run back-end:

   Update data-base
   
   Runing OutOfOffice.sln
    
4. Run front-end:

   cd /out-of-office
   
   npm install
   
   npm start
