# EmployeeHub - Employee Management System

## Project Overview
EmployeeHub is a comprehensive employee management system designed for Company 'Z'. The system provides robust features for managing employee data, payroll, and reporting, with specific access controls for administrators and general employees.

## User Story
The software development team was tasked with delivering a new, working employee management system for company 'Z'. The project required a software design document as a set of designs for this software system involving its data schemas, UX, and programming models. The company currently has one HR admin person maintaining their employee data using dBeaver and MySQL scripts, with about 40 full-time employees (no hourly, part-time) and plans to triple this amount within 18 months.

## Key Features

### 1. User Authentication & Authorization
- Admin users have full CRUD functionality on the entire database
- General employees can only view their own data (SELECT only)
- Secure login system with role-based access control

### 2. Employee Search & Management
- Advanced search functionality for employees using:
  - Name
  - Date of Birth
  - SSN
  - Employee ID
- Admin-only features:
  - Edit employee information
  - Update employee data
  - Manage employee records

### 3. Payroll Management
- Salary update functionality for admin users:
  - Apply percentage-based increases
  - Target specific salary ranges
  - Example: 3.2% increase for salaries between $58K and $105K

### 4. Comprehensive Reporting
- Pay Statement History:
  - Admin: View all employee pay statements
  - Employees: View only their own pay statements
  - Sorted by employee ID and pay date
- Job Title Reports:
  - Total monthly pay by job title
  - Admin-only access
- Division Reports:
  - Total monthly pay by division
  - Admin-only access

### 5. Database Integration
- Built on existing MySQL database
- Secure data access and management
- Optimized for scalability

## Technical Stack
- Frontend: React with TypeScript
- UI Framework: Material-UI (MUI)
- Database: MySQL
- Development Tools: dBeaver, Vite

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- dBeaver (for database management)

### Installation
1. Clone the repository:
```bash
git clone https://github.com/CodeBriary/EmployeeHub.git
```

2. Install dependencies:
```bash
cd EmployeeHub
npm install
```

3. Set up the database:
- Import the provided MySQL scripts:
  - `employeeData_MySQL_create.sql`
  - `employeeData_INSERT_datum.sql`

4. Start the development server:
```bash
npm run dev
```

## Project Structure
```
EmployeeHub/
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React contexts (Auth, etc.)
│   ├── data/          # Data models and interfaces
│   ├── pages/         # Main application pages
│   └── utils/         # Utility functions
├── public/            # Static assets
└── database/         # Database scripts and schemas
```

## Security Features
- Role-based access control
- Secure password handling
- Protected routes
- Data access restrictions based on user role

## Future Enhancements
- Support for part-time employees
- Enhanced reporting capabilities
- Integration with HR systems
- Mobile application support

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.
