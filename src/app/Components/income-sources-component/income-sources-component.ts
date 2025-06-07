import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonServices } from '../../Services/common-services';

@Component({
  selector: 'app-income-sources-component',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './income-sources-component.html',
  styleUrl: './income-sources-component.scss',
})
export class IncomeSourcesComponent {
  incomeTypes = ['Salary', 'Business', 'Rental', 'Investment'];
  userName: string = '';
  totalAmount: string = '';
  constructor(private commonServices: CommonServices) {
  }

  ngOnInit() {
    this.commonServices.userName.subscribe((user: any) => {
      this.userName = user;
    });
    this.commonServices.totalAmount.subscribe((amount: any) => {
      this.totalAmount = amount;
    });
  }

  addPaymetForm = new FormGroup({
    incomeType: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    remarks: new FormControl(''),
    date: new FormControl('', Validators.required),
  });

  addPayment() {
    if (this.addPaymetForm.valid) {
      const paymentData = this.addPaymetForm.value;
      console.log('Payment Data:', paymentData);
      this.commonServices.addPayment(paymentData);
      this.addPaymetForm.reset();
      this.commonServices.getTotalAmountAdded();
    } else {
      console.error('Form is invalid');
    }
  }

}
