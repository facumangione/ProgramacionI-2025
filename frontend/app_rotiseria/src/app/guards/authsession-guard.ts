import { CanActivateFn } from '@angular/router';

export const authsessionGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('token')){
    return true
  }
  return false;
};
