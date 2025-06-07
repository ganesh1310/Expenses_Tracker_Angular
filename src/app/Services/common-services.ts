import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { addDoc } from 'firebase/firestore';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonServices {

  public isLoggedUserSubject = new BehaviorSubject<boolean>(false);
  isUserLoggedIn = this.isLoggedUserSubject.asObservable();

  public userNameSubject = new BehaviorSubject<string>('');
  userName = this.userNameSubject.asObservable();

  public totalAmoutnSubject = new BehaviorSubject<string>('0.00');
  totalAmount = this.totalAmoutnSubject.asObservable();

  public totalExpensesSubjet = new BehaviorSubject<string>('0.00');
  totalExpenses = this.totalExpensesSubjet.asObservable();

  constructor(private fireBase: Firestore, private router: Router) {
    this.getRegisteredUser().subscribe((users: any) => {
      if (users.length > 0) {
        const user = users[0]; // Assuming the first user is the one we want
        this.userNameSubject.next(user.userName);
        console.log('User Name:', user.userName);
      } else {
        console.log('No users found');
      }
    });
  }

  getRegisteredUser() {
    const usersCollection = collection(this.fireBase, 'Users');
    return collectionData(usersCollection, { idField: 'id' });
  }

  addUser(userData: any) {
    const usersCollection = collection(this.fireBase, 'Users');
    return addDoc(usersCollection, userData);
  }

  loginUser(userData: any) {
    const usersCollection = collection(this.fireBase, 'Users');
    return collectionData(usersCollection, { idField: 'id' }).subscribe(
      (users) => {
        const user = users.find(
          (u: any) =>
            u.email === userData.email && u.password === userData.password
        );
        if (user) {
          console.log('User logged in:', user);
          this.router.navigate(['/dashboard']);
          this.isLoggedUserSubject.next(true);
          return user;
        } else {
          this.isLoggedUserSubject.next(false);
          console.error('Invalid email or password');
          return null;
        }
      }
    );
  }

  addPayment(paymentData: any) {
    const paymentsCollection = collection(this.fireBase, 'Payments');
    return addDoc(paymentsCollection, paymentData).then(() => {
      console.log('Payment added successfully');
    }).catch((error) => {
      console.error('Error adding payment:', error);
    });
  }

  getPaymentRecords() {
    const paymentsCollection = collection(this.fireBase, 'Payments');
    return collectionData(paymentsCollection, { idField: 'id' })
  }

  async addExpenses(expenseData: any) {
    const expensesCollection = collection(this.fireBase, 'Expenses');
    try {
      await addDoc(expensesCollection, expenseData);
      console.log('Expense added successfully');
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  }

  getAllExpenses(){
    const getExpensesCollection = collection(this.fireBase, 'Expenses');
    return collectionData(getExpensesCollection, { idField: 'id' })
  }

  getTotalAmountAdded(){
    const paymentsCollection = collection(this.fireBase, 'Payments');
    return collectionData(paymentsCollection, { idField: 'id' }).subscribe((payments: any) => {
      let total = 0;
      payments.forEach((payment: any) => {
        if (payment.amount) {
          total += parseFloat(payment.amount);
        }
      });
      this.totalAmoutnSubject.next(total.toFixed(2));
      console.log('Total Amount:', total.toFixed(2));
    });
  }

  calculateTotalExpenses() {
    const expensesCollection = collection(this.fireBase , 'Expenses');
    return collectionData(expensesCollection , {idField: 'id'}).subscribe((expemses:any)=>{
      let total = 0;
      expemses.forEach((amount:any)=>{
        if(amount.amountPaid){
          total += parseFloat(amount.amountPaid);
        }
      });
      this.totalExpensesSubjet.next(total.toFixed(2));
      console.log('Total Expenses:' , total.toFixed(2));
    })
  }

}
