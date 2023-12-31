export class JobTableDataFormat {
    public workOrderNumber!: number;
    public jobTitle!: string;
    public customerName!: string;
    public customerAddress!: string;
    public employeeImg!: string;
    public employeeAssigned!: string;
    public employeeTeam!: string;
    public startDate!: string;
    public endDate!: string;
    public category!: string;
    public status!: string;
    public priority!: string;
}

export class Customer {
    customerName!: string;
    customerAddress!: string;
}

export class AssignedEmployee {
    public employeeImg!: string;
    public employeeAssigned!: string;
    public employeeTeam!: string;
}

export class ScheduledDate {
    public startDate!: string;
    public endDate!: string;
}