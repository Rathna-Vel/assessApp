export class Job {
  job_uid!: string;
  customer?: Customer;
  prefix?: string;
  assigned_to!: AssignedTo[];
  job_title!: string
  job_category!: JobCategory
  job_priority!: string
  scheduled_start_time!: string
  scheduled_end_time!: string
  current_job_status!: CurrentJobStatus
  customer_address?: CustomerAddress
  customer_billing_address?: CustomerBillingAddress
  work_order_number!: number
}

export class Customer {
  customer_uid!: string
  customer_first_name!: string
  customer_last_name!: string
  customer_email?: string
}

export class AssignedTo {
  user!: User
  team!: Team
}

export class User {
  user_uid!: string
  first_name!: string
  last_name!: string
  profile_picture!: string
}

export class Team {
  team_uid!: string
  team_name!: string
}

export class JobCategory {
  category_name!: string
  category_uid!: string
}

export class CurrentJobStatus {
  status_uid!: string
  status_name!: string
}

export class CustomerAddress {
  landmark?: string
  city!: string
  state?: string
  street!: string
  country?: string
  zip_code!: string
  first_name?: string
  last_name?: string
  phone_number?: string
  email?: string
}

export class CustomerBillingAddress {
  landmark!: string
  city!: string
  state!: string
  street!: string
  country?: string
  zip_code!: string
  first_name!: string
  last_name!: string
  phone_number!: string
  email!: string
}
