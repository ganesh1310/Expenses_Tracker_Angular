import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonServices } from '../../Services/common-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expenses-tracker-component',
  imports: [ReactiveFormsModule , FormsModule , CommonModule],
  templateUrl: './expenses-tracker-component.html',
  styleUrl: './expenses-tracker-component.scss'
})
export class ExpensesTrackerComponent {

  expensesList : any[] = [];
  constructor(private commonService : CommonServices){
  }
  
  ngOnInit(){
    this.commonService.getAllExpenses().subscribe((exp : any)=>{
      this.expensesList.push(exp);
      console.log(this.expensesList);
    })
  }

  expensesForm = new FormGroup({
    amountPaid : new FormControl('' , Validators.required),
    paidFor : new FormControl('' , Validators.required),
    paidDate : new FormControl('' , Validators.required),
  });

  addToExpenses(){
    if(this.expensesForm.valid){
      const expensesData = this.expensesForm.value;
      this.commonService.addExpenses(expensesData);
      this.expensesForm.reset();
    }
  }
}
