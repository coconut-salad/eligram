import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressIndicatorService {
  private isLoadingNotifier = new Subject<boolean>();
  constructor() {}

  getLoadingStatusNotifier() {
    return this.isLoadingNotifier.asObservable();
  }

  turnOnLoading() {
    this.isLoadingNotifier.next(true);
  }

  turnOffLoading() {
    this.isLoadingNotifier.next(false);
  }
}
