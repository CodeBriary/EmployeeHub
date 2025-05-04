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

## Prerequisites
- Node.js (v14 or higher)
- MySQL Server (v8.0 or higher)
- dBeaver (for database management)
- Git

## Detailed Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/CodeBriary/EmployeeHub.git
cd EmployeeHub
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup
1. Install MySQL Server if not already installed
2. Open dBeaver and create a new database connection:
   - Host: localhost
   - Port: 3306
   - Database: employeeData
   - Username: your_mysql_username
   - Password: your_mysql_password

3. Create the database:
```sql
CREATE DATABASE employeeData;
USE employeeData;
```

4. Import the database scripts in order:
   - First run: `employeeData_MySQL_create.sql`
   - Then run: `employeeData_INSERT_datum.sql`

### 4. Environment Configuration
Create a `.env` file in the root directory with the following variables:
```env
VITE_API_URL=http://localhost:3000
VITE_DB_HOST=localhost
VITE_DB_USER=your_mysql_username
VITE_DB_PASSWORD=your_mysql_password
VITE_DB_NAME=employeeData
```

### 5. Start the Development Server
```bash
npm run dev
```
The application will be available at http://localhost:5173 (or the next available port if 5173 is in use)

## Test Accounts

### Admin User
- Username: admin
- Password: admin123
- Access: Full system access

### Regular Employee
- Username: employee
- Password: employee123
- Access: Limited to own data

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

## Testing the Application

### 1. Login Testing
- Test admin login with full access
- Test employee login with limited access
- Verify role-based access control

### 2. Employee Management
- Search for employees using different criteria
- Verify admin can edit employee information
- Verify regular employees can only view their own data

### 3. Payroll Features
- Test salary update functionality
- Verify pay statement generation
- Check report generation for different time periods

### 4. Reports
- Generate and verify all report types
- Check data accuracy in reports
- Verify access restrictions

## Common Issues and Solutions

### Database Connection Issues
- Verify MySQL service is running
- Check database credentials in .env file
- Ensure database scripts were executed successfully

### Port Conflicts
- If port 5173 is in use, Vite will automatically try the next available port
- Check the terminal output for the correct port number

### Authentication Issues
- Clear browser cache and cookies
- Verify user credentials
- Check authentication context implementation

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
