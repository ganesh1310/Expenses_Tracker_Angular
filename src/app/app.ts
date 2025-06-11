import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonServices } from './Services/common-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , CommonModule, RouterLink , RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Expenses_Tracker';
  isLogin: boolean = false;
  userName: string = '';
  selectedButton: string = '';

  constructor(
    private router: Router,
    private commonServices: CommonServices
  ) { 
    this.commonServices.isUserLoggedIn.subscribe((status:any)=>{
      this.isLogin = status;
      console.log('User login status:', this.isLogin);
      });

    this.commonServices.userName.subscribe((name:any)=>{
      this.userName = name;
    });
  }

  ngOnInit() {
    this.commonServices.getTotalAmountAdded();
    this.commonServices.getAllExpenses();
    this.commonServices.calculateTotalExpenses();
  }

  goToIncomePage(source: string){
    this.selectedButton = source;
    this.router.navigate(['/income']);
  }
  
  goToExpensesPage(source: string){
    this.selectedButton = source;
    this.router.navigate(['/expenses']);
  }

  gotoDashboardPage(source: string){
    this.selectedButton = source;
    this.router.navigate(['/dashboard']);
  }

  goToLoginPage(){
    this.router.navigate(['/login']);
  }

  logout(){
    this.isLogin = false;
    console.log('User logged out');
    this.commonServices.isLoggedUserSubject.next(false);
    this.router.navigate(['/login']);
  }
}
