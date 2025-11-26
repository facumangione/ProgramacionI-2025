import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export function roleGuard(roles: string[]): CanActivateFn {
  return (route, state) => {
    const router = inject(Router);
    const userRole = localStorage.getItem('rol');

    if (userRole && roles.includes(userRole)) {
      return true;
    }
    
    console.warn(`Acceso denegado`);
    router.navigate(['/home']);
    return false;
  };
}