import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {
  @Input() rowData: any;
  @Input() submitBtn: any;
  @Input() screenName: any;

  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();

  customerForm!: FormGroup;
  btnVal = 'Submit';
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      id: [''],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });

    if (!Array.isArray(this.rowData)) {
      this.viewRecord(this.rowData);
    }
  }

  onSubmit() {
    if (this.customerForm.invalid) {
      Swal.fire('Please fill the all details');

      return;
    } else {
      this.onSave.emit(this.customerForm.value);
    }
  }

  onCancelForm() {
    this.customerForm.reset();
    this.onCancel.emit(false);
  }

  viewRecord(row: any) {
    console.log(row);

    this.customerForm.patchValue({
      id: row.id,
      first_name: row.first_name,
      last_name: row.last_name,
      email: row.email,
      phone_number: row.phone_number,
    });
    this.btnVal = 'Update';
  }
}
