import { ServiceService } from './../services/service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-infoaduan',
  templateUrl: './infoaduan.page.html',
  styleUrls: ['./infoaduan.page.scss'],
})
export class InfoaduanPage implements OnInit {
  [x: string]: any;
  DataRecord: any;
  FormInfo: FormGroup;
  authService: any;
  message: any;
  aduan: any[1] = [
    { id: 1, name: '', src: '', background: '', page: '' },
  ];

  constructor(
    public serviceService: ServiceService,
    public loadingController: LoadingController,
    public modalController: ModalController,
    public toastController: ToastController,
    private router: Router,
    public util: UtilService
  ) { }

  ngOnInit() {
    this.serviceService.getRecord('catering/my').subscribe(
      data => {
        this.DataRecord = data.body;
      },
      error => {
        console.log("err", error);
      }
    );
  }

  onBack() {
    this.router.navigate(['catering']);
  }

  openAdcatering() {
    this.router.navigate(['aduancatering']);
  }

  getValueStatusBar(status) {
    if (status == 'INQUIRY') return 0.33;
    if (status == 'INVESTIGATION') return 0.66;
    if (status == 'CLOSED') return 1;
  }
}
