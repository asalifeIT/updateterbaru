import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';

import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: 'app-sub',
  templateUrl: './sub.page.html',
  styleUrls: ['./sub.page.scss'],
})
export class SubPage implements OnInit {
  [x: string]: any;
  DataRecord: any;
  FormInfo: FormGroup;
  authService: any;
  message: any;
  kamar: any[] = [
    { id: 1, name: '', src: '', background: '', page: '' },

  ];

  nonkamar: any[] = [
    { id: 1, name: '', src: '', background: '', page: '' },

  ];

  barcode: any[] = [
    { id: 1, name: '', src: '', background: '', page: '' },

  ];
  barcode2: any[] = [
    { id: 1, name: '', src: '', background: '', page: '' },

  ];

  constructor(
    private router: Router,
    public util: UtilService,
    private scanner: BarcodeScanner
  ) {
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }
  scanBRcode() {
    this.scanner.scan().then(res => {
      this.scannedBarCode = res;
    }).catch(err => {
      alert(err);
    });
  }

  ngOnInit() {
  }
  openKamar() {
    this.router.navigate(['kamar']);
  }
  openNon() {
    this.router.navigate(['nonkamar']);
  }
  onBack() {
    this.router.navigate(['housekeeping']);
  }
  openBar() {
    this.router.navigate(['testbarcode']);
  }
}
