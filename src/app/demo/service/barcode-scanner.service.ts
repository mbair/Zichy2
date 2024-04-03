import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Injectable } from '@angular/core';

declare const onScan: any;

@Injectable({
  providedIn: 'root'
})
export class BarcodeScannerService {
    onClick: any;

    constructor(@Inject(DOCUMENT) public readonly document: Document) {}

  enableScanEvents() {
    onScan.attachTo(this.document); // Aktiváljuk a vonalkód beolvasás eseményeket a dokumentumon
    // this.document.addEventListener('scan', (sScancode: string, iQuantity: number) => {
    //   alert(`${iQuantity}x ${sScancode}`);
    //   // Itt további műveleteket végezhetünk a beolvasott vonalkóddal
    // });

    this.document.addEventListener('click', this.onClick.bind(this));

    // onClick(event) {
    //     console.log(event);
    //   }
  }
}
