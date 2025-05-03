export interface Employee {
  empid: number;
  Fname: string;
  Lname: string;
  email: string;
  HireDate: string;
  Salary: number;
  SSN: string;
  jobTitle?: string;
  division?: string;
}

export interface Payroll {
  payID: number;
  pay_date: string;
  empid: number;
  earnings: number;
  fed_tax: number;
  fed_med: number;
  fed_SS: number;
  state_tax: number;
  retire_401k: number;
  health_care: number;
}

export interface Division {
  ID: number;
  Name: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface JobTitle {
  job_title_id: number;
  job_title: string;
}

// Employee Data
export const employees: Employee[] = [
  {
    empid: 1,
    Fname: 'Snoopy',
    Lname: 'Beagle',
    email: 'Snoopy@example.com',
    HireDate: '2022-08-01',
    Salary: 45000.00,
    SSN: '111-11-1111',
    jobTitle: 'Chief Info. Officer',
    division: 'HQ'
  },
  {
    empid: 2,
    Fname: 'Charlie',
    Lname: 'Brown',
    email: 'Charlie@example.com',
    HireDate: '2022-07-01',
    Salary: 48000.00,
    SSN: '111-22-1111',
    jobTitle: 'Chief Exec. Officer',
    division: 'HQ'
  },
  {
    empid: 3,
    Fname: 'Lucy',
    Lname: 'Doctor',
    email: 'Lucy@example.com',
    HireDate: '2022-07-03',
    Salary: 55000.00,
    SSN: '111-33-1111',
    jobTitle: 'Medical Director',
    division: 'Medical'
  },
  {
    empid: 4,
    Fname: 'Peppermint',
    Lname: 'Patti',
    email: 'Peppermint@example.com',
    HireDate: '2022-08-02',
    Salary: 98000.00,
    SSN: '111-44-1111',
    jobTitle: 'Senior Developer',
    division: 'Engineering'
  },
  {
    empid: 5,
    Fname: 'Linus',
    Lname: 'Blanket',
    email: 'Linus@example.com',
    HireDate: '2022-09-01',
    Salary: 43000.00,
    SSN: '111-55-1111',
    jobTitle: 'Software Engineer',
    division: 'Engineering'
  },
  {
    empid: 6,
    Fname: 'PigPin',
    Lname: 'Dusty',
    email: 'PigPin@example.com',
    HireDate: '2022-10-01',
    Salary: 33000.00,
    SSN: '111-66-1111',
    jobTitle: 'Junior Developer',
    division: 'Engineering'
  },
  {
    empid: 7,
    Fname: 'Scooby',
    Lname: 'Doo',
    email: 'Scooby@example.com',
    HireDate: '1973-07-03',
    Salary: 78000.00,
    SSN: '111-77-1111',
    jobTitle: 'Detective',
    division: 'Security'
  },
  {
    empid: 8,
    Fname: 'Shaggy',
    Lname: 'Rodgers',
    email: 'Shaggy@example.com',
    HireDate: '1973-07-11',
    Salary: 77000.00,
    SSN: '111-88-1111',
    jobTitle: 'Security Officer',
    division: 'Security'
  },
  {
    empid: 9,
    Fname: 'Velma',
    Lname: 'Dinkley',
    email: 'Velma@example.com',
    HireDate: '1973-07-21',
    Salary: 82000.00,
    SSN: '111-99-1111',
    jobTitle: 'Research Scientist',
    division: 'R&D'
  },
  {
    empid: 10,
    Fname: 'Daphne',
    Lname: 'Blake',
    email: 'Daphne@example.com',
    HireDate: '1973-07-30',
    Salary: 59000.00,
    SSN: '111-00-1111',
    jobTitle: 'Marketing Manager',
    division: 'Marketing'
  },
  {
    empid: 11,
    Fname: 'Bugs',
    Lname: 'Bunny',
    email: 'Bugs@example.com',
    HireDate: '1934-07-01',
    Salary: 18000.00,
    SSN: '222-11-1111',
    jobTitle: 'Entertainer',
    division: 'Entertainment'
  },
  {
    empid: 12,
    Fname: 'Daffy',
    Lname: 'Duck',
    email: 'Daffy@example.com',
    HireDate: '1935-04-01',
    Salary: 16000.00,
    SSN: '333-11-1111',
    jobTitle: 'Entertainer',
    division: 'Entertainment'
  },
  {
    empid: 13,
    Fname: 'Porky',
    Lname: 'Pig',
    email: 'Porky@example.com',
    HireDate: '1935-08-12',
    Salary: 16550.00,
    SSN: '444-11-1111',
    jobTitle: 'Entertainer',
    division: 'Entertainment'
  },
  {
    empid: 14,
    Fname: 'Elmer',
    Lname: 'Fudd',
    email: 'Elmer@example.com',
    HireDate: '1934-08-01',
    Salary: 15500.00,
    SSN: '555-11-1111',
    jobTitle: 'Hunting Guide',
    division: 'Outdoor'
  },
  {
    empid: 15,
    Fname: 'Marvin',
    Lname: 'Martian',
    email: 'Marvin@example.com',
    HireDate: '1937-05-01',
    Salary: 28000.00,
    SSN: '777-11-1111',
    jobTitle: 'Space Explorer',
    division: 'Space'
  }
];

// Payroll Data for Snoopy
export const snoopyPayroll: Payroll[] = [
  {
    payID: 1,
    pay_date: '2025-01-31',
    empid: 1,
    earnings: 865.38, // 45000/52
    fed_tax: 276.92,
    fed_med: 12.55,
    fed_SS: 53.65,
    state_tax: 103.85,
    retire_401k: 3.46,
    health_care: 26.83
  },
  {
    payID: 2,
    pay_date: '2025-02-28',
    empid: 1,
    earnings: 865.38,
    fed_tax: 276.92,
    fed_med: 12.55,
    fed_SS: 53.65,
    state_tax: 103.85,
    retire_401k: 3.46,
    health_care: 26.83
  }
];

// Divisions
export const divisions: Division[] = [
  {
    ID: 1,
    Name: 'Technology Engineering',
    city: 'Atlanta',
    addressLine1: '200 17th Street NW',
    addressLine2: '',
    state: 'GA',
    country: 'USA',
    postalCode: '30363'
  },
  {
    ID: 999,
    Name: 'HQ',
    city: 'New York',
    addressLine1: '45 West 57th Street',
    addressLine2: '',
    state: 'NY',
    country: 'USA',
    postalCode: '00034'
  }
];

// Job Titles
export const jobTitles: JobTitle[] = [
  { job_title_id: 100, job_title: 'software manager' },
  { job_title_id: 101, job_title: 'software architect' },
  { job_title_id: 102, job_title: 'software engineer' },
  { job_title_id: 103, job_title: 'software developer' },
  { job_title_id: 900, job_title: 'Chief Exec. Officer' },
  { job_title_id: 901, job_title: 'Chief Finn. Officer' },
  { job_title_id: 902, job_title: 'Chief Info. Officer' }
];

// Helper function to get employee by ID
export const getEmployeeById = (id: number): Employee | undefined => {
  return employees.find(emp => emp.empid === id);
};

// Helper function to get payroll by employee ID
export const getPayrollByEmployeeId = (id: number): Payroll[] => {
  return snoopyPayroll.filter(pay => pay.empid === id);
};

// Helper function to get division by ID
export const getDivisionById = (id: number): Division | undefined => {
  return divisions.find(div => div.ID === id);
};

// Helper function to get job title by ID
export const getJobTitleById = (id: number): JobTitle | undefined => {
  return jobTitles.find(job => job.job_title_id === id);
}; 