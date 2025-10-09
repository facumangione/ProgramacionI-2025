import { CanActivateFn } from '@angular/router';

export const roladminGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('rol')==='ADMIN'){
    return true
  }
  return false;
};
