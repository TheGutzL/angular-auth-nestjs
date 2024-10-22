import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthStateService } from '../shared/data-access/auth-state.service';
import { DashboardService } from './data-access/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styles: ``,
})
export default class DashboardComponent {
  dashboardService = inject(DashboardService);
  authState = inject(AuthStateService);
  private _router = inject(Router);

  users = toSignal(this.dashboardService.getUsers());

  logout() {
    this.authState.signOut();
    this._router.navigateByUrl('/auth/login');
  }
}
