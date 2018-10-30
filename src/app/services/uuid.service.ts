import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UuidService {

  constructor() { }

  haveUuid(): boolean {
    return !!localStorage.getItem('spooky_uuid');
  }

  setUuid(): void {
    localStorage.setItem('spooky_uuid', this.generateUUID());
  }

  getUuid(): string {
    if (this.haveUuid()) {
      return localStorage.getItem('spooky_uuid');
    } else {
      throw new Error('UuidService : getUuid() : no uuid founded');
    }
  }

  // From : https://stackoverflow.com/a/8809472
  private generateUUID(): string { // Public Domain/MIT
    let d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
      d += performance.now(); // use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      // tslint:disable-next-line:no-bitwise
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      // tslint:disable-next-line:no-bitwise
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
}
