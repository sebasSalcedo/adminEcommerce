import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { GlobalService } from '../services/global.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private _globalService: GlobalService, private _router: Router) {}

  canActivate(): any {
    if (!this._globalService.isAuthenticated(['admin'])) {
      this._router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
