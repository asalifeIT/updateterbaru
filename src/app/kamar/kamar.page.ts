import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { ServiceService } from '../services/service.service';
import { ReplaySubject } from "rxjs";
import { UtilService } from 'src/app/services/util.service';
import { BarcodeScanner, BarcodeScannerOptions } from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: 'app-kamar',
  templateUrl: './kamar.page.html',
  styleUrls: ['./kamar.page.scss'],
})
export class KamarPage implements OnInit {
  scannedBarCode: {} = [null, null];
  barcodeScannerOptions: BarcodeScannerOptions;
  FormKamar: FormGroup;
  authenticationState = new ReplaySubject();
  authService: any;
  message: any;
  Username: any;
  DataLogin: any;
  validations = {
    'mess': [
      { type: 'required', message: 'harus di isi' }
    ],
    'nokamar': [
      { type: 'required', message: 'harus di isi' }
    ],
    'lantaikamar': [
      { type: 'required', message: 'harus di isi' }
    ],
    'lantaitoilet': [
      { type: 'required', message: 'harus di isi' }
    ],
    'lantailangitkamar': [
      { type: 'required', message: 'harus di isi' }
    ],
    'lantailangitkamarmand': [
      { type: 'required', message: 'harus di isi' }
    ],
    'wc': [
      { type: 'required', message: 'harus di isi' }
    ],
    'wastafel': [
      { type: 'required', message: 'harus di isi' }
    ],
    'tempattidur': [
      { type: 'required', message: 'harus di isi' }
    ],
    'sprei': [
      { type: 'required', message: 'harus di isi' }
    ],
    'selimut': [
      { type: 'required', message: 'harus di isi' }
    ],
    'ac': [
      { type: 'required', message: 'harus di isi' }
    ],
    'meja': [
      { type: 'required', message: 'harus di isi' }
    ],
    'cermin': [
      { type: 'required', message: 'harus di isi' }
    ],
    'keran': [
      { type: 'required', message: 'harus di isi' }
    ],
    'shower': [
      { type: 'required', message: 'harus di isi' }
    ],
    'tempatsampah': [
      { type: 'required', message: 'harus di isi' }
    ],
    'jendela': [
      { type: 'required', message: 'harus di isi' }
    ],
    'gorden': [
      { type: 'required', message: 'harus di isi' }
    ],
    'lemari': [
      { type: 'required', message: 'harus di isi' }
    ]
  };

  DataRecord: Object;

  constructor(
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public modalController: ModalController,
    public toastController: ToastController,
    public serviceService: ServiceService,
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
      let str = res.text;
      let data = str.split("|");
      this.scannedBarCode = data;
    }).catch(err => {
      alert(err);
    });
  }

  ngOnInit() {
    this.getUser();

    this.FormKamar = this.formBuilder.group({
      mess: new FormControl('', Validators.compose([
        Validators.required
      ])),
      nokamar: new FormControl('', Validators.compose([
        Validators.required
      ])),
      lantaikamar: new FormControl(false, Validators.compose([
        Validators.required
      ])),
      lantaitoilet: new FormControl(false, Validators.compose([
        Validators.required
      ])),
      lantailangitkamar: new FormControl(false, Validators.compose([
        Validators.required
      ])),
      lantailangitkamarmandi: new FormControl(false, Validators.compose([
        Validators.required
      ])),
      wc: new FormControl(false, Validators.compose([
        Validators.required
      ])),
      wastafel: new FormControl(false, Validators.compose([
        Validators.required
      ])),
      tempattidur: new FormControl(false, Validators.compose([
        Validators.required
      ])),
      sprei: new FormControl(false, Validators.compose([
        Validators.required
      ])),
      selimut: new FormControl(false, Validators.compose([
        Validators.required
      ])),
      ac: new FormControl(false, Validators.compose([
        Validators.required
      ])),
      meja: new FormControl(false, Validators.compose([
        Validators.required
      ])),
      cermin: new FormControl(false, Validators.compose([
        Validators.required
      ])),
      keran: new FormControl(false, Validators.compose([
        Validators.required
      ])),
      shower: new FormControl(false, Validators.compose([
        Validators.required
      ])),
      tempatsampah: new FormControl(false, Validators.compose([
        Validators.required
      ])),
      jendela: new FormControl(false, Validators.compose([
        Validators.required
      ])),
      gorden: new FormControl(false, Validators.compose([
        Validators.required
      ])),
      lemari: new FormControl(false, Validators.compose([
        Validators.required
      ])),
    });
  }

  getUser() {
    this.Username = this.serviceService.getUserName();
  }

  async submitKamar() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();

    if (this.FormKamar.valid) {
      this.serviceService.submitaduan(this.FormKamar.value, 'task/room-add').subscribe(
        data => {
          this.presentToast("Rincian Tugas Anda Terkirim");
        },
        error => {
          this.presentToast("Gagal Terkirim, Silahkan Kirim Tugas Lain Waktu!");
        }
      );
    }
    else {
      this.presentToast("Silahkan Lengkapi Isi Form!");
    }

    this.scannedBarCode = [null, null];
    this.ngOnInit();
    loading.dismiss();

  }
  async presentToast(Message) {
    const toast = await this.toastController.create({
      message: Message,
      duration: 2500,
      position: "top"
    });
    toast.present();
  }

  onBack() {
    this.router.navigate(['sub']);
  }
}
