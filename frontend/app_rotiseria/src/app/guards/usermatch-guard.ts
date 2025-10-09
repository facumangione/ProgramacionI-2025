import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, } from '@angular/router';

export const usermatchGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const idFromUrl = route.paramMap.get('id_usuario');
  const idFromStorage = localStorage.getItem('id_usuario');
  const rol=localStorage.getItem('rol')
  if ( (idFromUrl && idFromStorage=== idFromStorage) || rol === 'ADMIN'){
    return true;
  } else{
    return false
  }
};
