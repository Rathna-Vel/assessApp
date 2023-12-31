import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ListingService } from './listing-table.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { JobTableDataFormat } from '../shared/modal/jobTableDataFormat';
import { SelectionModel } from '@angular/cdk/collections';
import { Job } from '../shared/modal/jobsResponse';
import { ColumnData } from '../shared/modal/columnMetaResponse';

@Component({
  selector: 'app-listing-table',
  templateUrl: './listing-table.component.html',
  styleUrls: ['./listing-table.component.css'],
  providers: [ListingService],
})
export class ListingTableComponent {
  jobsList!: Job[];
  columnMetaData!: ColumnData[];
  datasource: any;
  selection: any;
  pageSize!: number;
  pageIndex!: number;
  length!: number;
  goTo!: any;
  pageNumbers!: number[];
  displayedColumns: string[] = [
    'select',
    'workOrderNumber',
    'Job Title',
    'Customer',
    'Employee',
    'Scheduled Date',
    'Category',
    'Status',
    'Priority',
  ];
  selectedColumns = this.displayedColumns;
  columnSet = new Map();

  @Output() page = new EventEmitter<PageEvent>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private listingService: ListingService) {
    this.listingService.getTableHeaders().subscribe((Res: any) => {
      this.columnMetaData = Res;
    });
    this.listingService.getTableData().subscribe((res: any) => {
      this.jobsList = res;
      this.formatDataSource();
    });
    this.displayedColumns.forEach((column) => {
      this.columnSet.set(column, true);
    });
  }

  formatDataSource() {
    let tableData: JobTableDataFormat[] = [];
    this.jobsList.forEach((job: any) => {
      tableData.push(this.mapResponseObjectToUIObject(job));
    });
    this.datasource = new MatTableDataSource<any>(Object.values(tableData));
    if (this.paginator) {
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    }
    this.selection = new SelectionModel<any>(true, []);
  }

  mapResponseObjectToUIObject(job: any) {
    let mappedJob: JobTableDataFormat = {
      workOrderNumber: 0,
      jobTitle: '',
      customerName: '',
      customerAddress: '',
      employeeImg: '',
      employeeAssigned: '',
      employeeTeam: '',
      startDate: '',
      endDate: '',
      category: '',
      status: '',
      priority: '',
    };
    mappedJob.workOrderNumber = job.work_order_number;
    mappedJob.jobTitle = job.job_title;
    mappedJob.customerName =
      job.customer?.customer_first_name +
      ' ' +
      job.customer?.customer_last_name;
    mappedJob.customerAddress =
      job.customer_address?.street +
      ',' +
      job.customer_address?.city +
      ',' +
      job.customer_address?.zip_code;
    mappedJob.employeeImg = job.assigned_to[0].user.profile_picture;
    mappedJob.employeeAssigned =
      job.assigned_to[0].user.first_name +
      ' ' +
      job.assigned_to[0].user.last_name;
    mappedJob.employeeTeam = job.assigned_to[0].team.team_name;
    mappedJob.startDate = job.scheduled_start_time;
    mappedJob.endDate = job.scheduled_end_time;
    mappedJob.category = job.job_category.category_name;
    mappedJob.status = job.current_job_status.status_name;
    mappedJob.priority = job.job_priority;
    return mappedJob;
  }

  onPaginateChange($event: any) {
    console.log($event);
    this.length = $event.length;
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.updateGoto();
    this.emitPageEvent($event);
  }

  emitPageEvent(pageEvent: PageEvent) {
    this.page.next(pageEvent);
  }

  updateGoto() {
    this.goTo = (this.pageIndex || 0) + 1;
    this.pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.length / this.pageSize); i++) {
      this.pageNumbers.push(i);
    }
  }

  goToChange() {
    this.paginator.pageIndex = this.goTo - 1;
    const event: PageEvent = {
      length: this.paginator.length,
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
    };
    this.paginator.page.next(event);
    this.emitPageEvent(event);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.datasource.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.datasource.data.forEach((row: any) => this.selection.select(row));
  }

  logSelection() {
    this.selection.selected.forEach((s: any) => console.log(s.name));
  }

  showCustomizeDropdown() {
    document.getElementById('myDropdown')?.classList.toggle('show');
    console.log(this.selectedColumns);
  }

  selectionChange($event: any) {
    this.displayedColumns.forEach((col) => {
      this.columnSet.set(col, false);
    });
    this.selectedColumns = $event.source._value;
    this.selectedColumns.forEach((column: any) => {
      this.columnSet.set(column, true);
    });
  }
}
