import { Routes } from '@angular/router';
import { DashboadComponent } from './Components/dashboad-component/dashboad-component';
import { SignUpComponent } from './Components/sign-up-component/sign-up-component';
import { IncomeSourcesComponent } from './Components/income-sources-component/income-sources-component';
import { ExpensesTrackerComponent } from './Components/expenses-tracker-component/expenses-tracker-component';
import { LoginComponent } from './Components/login-component/login-component';

export const routes: Routes = [
    {path: '', redirectTo: '/SignUp', pathMatch: 'full'},
    { path: 'dashboard', component: DashboadComponent },
    { path: 'SignUp', component: SignUpComponent },
    { path: 'income', component: IncomeSourcesComponent },
    { path: 'expenses', component: ExpensesTrackerComponent },
    { path: 'login', component: LoginComponent },
    {path: '**', redirectTo: '/SignUp'}
];
