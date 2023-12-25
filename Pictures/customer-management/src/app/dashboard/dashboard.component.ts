import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  Customerdata: any;
  show = false;
  screenName = 'Customer';
  submitBtn = true;
  rowData: any;
  listDiv = false;
  showList = true;
  NewCustomerdata: any;
  totalPages: any;
  currentPage: any = 1;
  recordsPerPage: number = 5; // Set the number of records per page

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getPagesArray(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }
  getAll() {
    this.dashboardService.getCustomer().subscribe({
      next: (data: any) => {
        this.Customerdata = data;
        this.NewCustomerdata = data;
        this.totalPages = Math.ceil(
          this.Customerdata.length / this.recordsPerPage
        );
      },
    });
  }
  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPaginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.recordsPerPage;
    const endIndex = startIndex + this.recordsPerPage;
    return this.Customerdata.slice(startIndex, endIndex);
  }

  showFormList(item: boolean) {
    this.rowData = [];
    if (item === false) {
      this.listDiv = true;
      this.showList = false;
      this.submitBtn = true;
    } else {
      this.listDiv = false;
      this.showList = true;
    }
  }

  AddCustomer() {
    this.showList = false;
    this.showFormList(this.showList);
    this.rowData = [];
  }

  listCustomer() {
    this.showList = true;
    this.showFormList(this.showList);
  }

  deleteCustomer(edata: any) {
    this.dashboardService.deleteCustomer(edata.id).subscribe({
      next: (data: any) => {
        Swal.fire('Record Deleted Successfully', 'success');
        this.getAll();
      },
    });
  }

  UpdateCustomer(edata: any) {
    this.rowData = edata;
    this.showList = false;
    this.listDiv = true;
  }
  onCancel(item: boolean) {
    this.listDiv = item;
    this.showList = true;
    this.rowData = [];
    this.submitBtn = true;
  }
  onSave(e: any) {
    this.dashboardService.saveCustomer(e).subscribe({
      next: (data: any) => {
        this.Customerdata = data;
        this.NewCustomerdata = data;
        this.showList = true;
        if (this.rowData.length == 0) {
          Swal.fire('Record Added Successfully', 'success');
        } else {
          Swal.fire('Record Updated Successfully', 'success');
        }
        this.listDiv = false;
        this.rowData = [];
        this.getAll();
      },
    });
  }

  searchField(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;

    if (this.Customerdata && this.NewCustomerdata) {
      this.Customerdata = this.NewCustomerdata.slice().filter(
        (advanceTable: any) => {
          const searchStr = (
            advanceTable.first_name +
            advanceTable.last_name +
            advanceTable.email +
            advanceTable.pahone_number
          ).toLowerCase();

          return searchStr.indexOf(inputValue.toLowerCase()) !== -1;
        }
      );
    } else {
      console.error('this.reportData or this.reportData.data is undefined');
    }
  }
}
