import { Data } from '@angular/router';

export interface AppState {
  activatedRouteData: Data;
  previousUrl: string;
  pageTitle: string;
  inboxCount: number;
}
