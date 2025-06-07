import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonServices } from './Services/common-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Expenses_Tracker';
  isLogin: boolean = false;

  constructor(
    private router: Router,
    private commonServices: CommonServices
  ) { 
    this.commonServices.isUserLoggedIn.subscribe((status:any)=>{
      this.isLogin = status;
      console.log('User login status:', this.isLogin);
    })
  }

  goToIncomePage(){
    this.router.navigate(['/income']);
  }
  
  goToExpensesPage(){
    this.router.navigate(['/expenses']);
  }

  gotoDashboardPage(){
    this.router.navigate(['/dashboard']);
  }

  goToLoginPage(){
    this.router.navigate(['/login']);
  }

  logout(){
    this.isLogin = false;
    console.log('User logged out');
    this.router.navigate(['/login']);
  }
}
