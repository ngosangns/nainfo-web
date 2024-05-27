import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isLoggedIn = await authService.isLoggedIn();

  if (isLoggedIn) {
    return true;
  } else {
    // Optionally, you can store the attempted URL for redirection after login
    // router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    await router.navigateByUrl('/login');
    return false;
  }
};
