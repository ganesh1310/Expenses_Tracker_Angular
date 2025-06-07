import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServices } from '../app/Services/common-services';

export const authGuard: CanActivateFn = (route, state) => {
  const commonService = inject(CommonServices);
  const router = inject(Router);
  const isLoggedIn = commonService.isLoggedUserSubject.value;

  if (isLoggedIn) {
    return true;
  } else {
    alert('You are not authorized to access this page. Please login first.');
    return false;
  }
};
