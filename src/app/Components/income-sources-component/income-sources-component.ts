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
import { subscribe } from 'node:diagnostics_channel';

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
  sectionToShow: string = '';
  recentTransactions: any[] = [];
  filteredTransactions: any[] = [];
  selectedCategory: string = '';
  showPinPopup: boolean = false;
  isPinVerified: boolean = false;
  enteredPin: string = '';
  validPin: string = '1234'; // Example PIN, should be securely stored in a real application
  totalIncome: string = '';
  customFrequency: string = '';
  customCategory: string = '';
  constructor(private commonServices: CommonServices) {
  }

  ngOnInit() {
    this.commonServices.userName.subscribe((user: any) => {
      this.userName = user;
    });
    this.commonServices.totalAmount.subscribe((amount: any) => {
      this.totalAmount = amount;
    });
    this.commonServices.getPaymentRecords().subscribe((records:any)=>{
      this.recentTransactions.push(records);
      console.log('Recent Transactions:', this.recentTransactions);
    })
    this.filterByCategory({ target: { value: '' } }); // Initialize with no filter
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

  viewSection(section: string){
    this.sectionToShow = section;
  }

  filterByCategory(event: any) {
    this.selectedCategory = event.target.value;
    const category = this.selectedCategory;
    if (!category) {
      this.filteredTransactions = this.recentTransactions[0] || [];
    } else {
      this.filteredTransactions = (this.recentTransactions[0] || []).filter(
        (item: any) => item.incomeType === category
      );
    }
  }

  openPinPopup(){
    this.showPinPopup = true;
    this.enteredPin = '';
  }

  closePinPopup(){
    this.showPinPopup = false;
    this.enteredPin = '';
  }

  verifyPin(){
    if (this.enteredPin === this.validPin) {
      this.isPinVerified = true;
      this.showPinPopup = false;
      console.log('PIN verified successfully');
    } else {
      console.error('Invalid PIN');
      this.isPinVerified = false;
      this.showPinPopup = false;
      alert('Invalid PIN. Please try again.');
    }
  }

   calculateCustomExpenses(customFrequency: string, customCategory: string) {
    const recentTransactions = (this.recentTransactions[0] || []).filter(
      (exp: any) => exp.incomeType === customCategory
    );
    console.log(recentTransactions);
    const now = new Date();
    let filteredIncome = [];

    if (customFrequency === 'Daily') {
      filteredIncome = recentTransactions.filter((exp: any) => {
        const expDate = new Date(exp.date);
        return expDate.toDateString() === now.toDateString();
      });
    } else if (customFrequency === 'Weekly') {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      filteredIncome = recentTransactions.filter((exp: any) => {
        const expDate = new Date(exp.date);
        return expDate >= startOfWeek && expDate <= endOfWeek;
      });
    } else if (customFrequency === 'Monthly') {
      filteredIncome = recentTransactions.filter((exp: any) => {
        const expDate = new Date(exp.date);
        return (
          expDate.getMonth() === now.getMonth() &&
          expDate.getFullYear() === now.getFullYear()
        );
      });
    } else if (customFrequency === 'Yearly') {
      filteredIncome = recentTransactions.filter((exp: any) => {
        const expDate = new Date(exp.date);
        return expDate.getFullYear() === now.getFullYear();
      });
    } else {
      filteredIncome = recentTransactions;
    }

    this.totalIncome = filteredIncome
      .reduce((total: number, exp: any) => {
        return total + (parseFloat(exp.amount) || 0);
      }, 0)
      .toFixed(2);
  }
}
