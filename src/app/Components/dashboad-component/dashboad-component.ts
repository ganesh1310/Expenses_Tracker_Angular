import { Component } from '@angular/core';
import { CommonServices } from '../../Services/common-services';

@Component({
  selector: 'app-dashboad-component',
  imports: [],
  templateUrl: './dashboad-component.html',
  styleUrl: './dashboad-component.scss'
})
export class DashboadComponent {
  totalIncomeCredited : string = '';
  totalExpensesDone : string = '';

  constructor(private commonServices : CommonServices){ }

  ngOnInit(){
    this.commonServices.calculateTotalExpenses();
    this.commonServices.totalAmount.subscribe((amount : any)=>{
      this.totalIncomeCredited = amount;
    });
    this.commonServices.totalExpenses.subscribe((expenses:any)=>{
      this.totalExpensesDone = expenses;
    });
  }

}
