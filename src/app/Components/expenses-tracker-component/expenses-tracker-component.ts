import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonServices } from '../../Services/common-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expenses-tracker-component',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './expenses-tracker-component.html',
  styleUrl: './expenses-tracker-component.scss',
})
export class ExpensesTrackerComponent {
  expensesList: any[] = [];
  filteredExpensesList: any[] = [];
  selectedCategory: string = '';
  sectionToShow: string = '';
  customFrequency: string = '';
  customCategory: string = '';
  customTotalExpenses: string = '';
  constructor(private commonService: CommonServices) {}

  ngOnInit() {
    this.commonService.getAllExpenses().subscribe((exp: any) => {
      this.expensesList.push(exp);
      this.filteredExpensesList = this.expensesList[0] || [];
      console.log(this.expensesList);
    });
  }

  filterByCategory(event: any) {
    this.selectedCategory = event.target.value;
    const category = this.selectedCategory;
    if (!category) {
      this.filteredExpensesList = this.expensesList[0] || [];
    } else {
      this.filteredExpensesList = (this.expensesList[0] || []).filter(
        (item: any) => item.expenseCategory === category
      );
    }
  }

  expensesForm = new FormGroup({
    paidAmount: new FormControl(null, Validators.required),
    paidFor: new FormControl('', Validators.required),
    paidDate: new FormControl('', Validators.required),
    expenseCategory: new FormControl('', Validators.required),
  });

  addToExpenses() {
    if (this.expensesForm.valid) {
      const expensesData = this.expensesForm.value;
      this.commonService.addExpenses(expensesData);
      this.expensesForm.reset();
    }
  }

  deleteExpense(expenseId: string) {
    this.commonService.deleteExpneses(expenseId);
  }

  viewSection(section: string) {
    this.sectionToShow = section;
  }

  calculateCustomExpenses(customFrequency: string, customCategory: string) {
    const expenesesToFilter = (this.expensesList[0] || []).filter(
      (exp: any) => exp.expenseCategory === customCategory
    );
    console.log(expenesesToFilter);
    const now = new Date();
    let filteredExpenses = [];

    if (customFrequency === 'Daily') {
      filteredExpenses = expenesesToFilter.filter((exp: any) => {
        const expDate = new Date(exp.paidDate);
        return expDate.toDateString() === now.toDateString();
      });
    } else if (customFrequency === 'Weekly') {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      filteredExpenses = expenesesToFilter.filter((exp: any) => {
        const expDate = new Date(exp.paidDate);
        return expDate >= startOfWeek && expDate <= endOfWeek;
      });
    } else if (customFrequency === 'Monthly') {
      filteredExpenses = expenesesToFilter.filter((exp: any) => {
        const expDate = new Date(exp.paidDate);
        return (
          expDate.getMonth() === now.getMonth() &&
          expDate.getFullYear() === now.getFullYear()
        );
      });
    } else if (customFrequency === 'Yearly') {
      filteredExpenses = expenesesToFilter.filter((exp: any) => {
        const expDate = new Date(exp.paidDate);
        return expDate.getFullYear() === now.getFullYear();
      });
    } else {
      filteredExpenses = expenesesToFilter;
    }

    this.customTotalExpenses = filteredExpenses
      .reduce((total: number, exp: any) => {
        return total + (parseFloat(exp.paidAmount) || 0);
      }, 0)
      .toFixed(2);
  }
}
