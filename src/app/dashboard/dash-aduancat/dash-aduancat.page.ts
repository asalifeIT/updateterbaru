import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ModalController, LoadingController, ToastController, Platform } from '@ionic/angular';
import { ReplaySubject } from "rxjs/index";
import { UtilService } from 'src/app/services/util.service';
import { UpdateStatusComponent } from './update-status/update-status.component';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { stringify } from 'querystring';

@Component({
  selector: 'app-dash-aduancat',
  templateUrl: './dash-aduancat.page.html',
  styleUrls: ['./dash-aduancat.page.scss'],
})
export class DashAduancatPage implements OnInit {
  [x: string]: any;
  FormStatus: FormGroup;
  authenticationState = new ReplaySubject();
  authService: any;
  message: any;
  Data: any;
  DataLogin: any;
  DataResponse: any;
  DataCheckLogin: any;
  DataRecord: any;
  test: any;
  validations = {
    'status': [
     { type: 'required', message: 'pilihan edit status harus di isi' }
    ],
    'id': [
      { type: 'required', message: 'pilihan edit status harus di isi' }
     ]
    };

  constructor(
    private serviceService: ServiceService,
    private navCtrl: NavController,
    public loadingController: LoadingController,
    public modalController: ModalController,
    private platform: Platform,
    public toastController: ToastController,
    private router: Router,
    public util: UtilService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.FormStatus = this.formBuilder.group({
      status: new FormControl('', Validators.compose([Validators.required])),
    });

    console.log(this.FormStatus.errors);
    this.serviceService.getRecord('catering/all').subscribe(
      data => {
        this.DataRecord = data.body;
        localStorage.getItem(JSON.stringify(this.DataRecord));
        console.log(this.DataRecord);
      },
      error => {
        console.log("err", error);
      }
    );
    let dataStorage = JSON.parse(localStorage.getItem(this.serviceService.TOKEN_KEY));
    // this.Username=dataStorage.data.Username;
    this.serviceService.CekUser().subscribe(
      data => {
        this.DataLogin = data;
        console.log(this.DataLogin)
        this.Username = this.DataLogin.body.name;
        localStorage.getItem(JSON.parse(localStorage.getItem("role")));
      },
      error => {
        console.log("error");
      }
    );
  }

  async updateaduan(id:string){
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();
    this.serviceService.updateaduan(this.FormStatus.value, 'catering/update-status/'+ 'id').subscribe(
      data => {
        this.presentToast("Edit Status Aduan Catering Sukses");
        console.log(this.FormStatus.value);
        this.FormStatus.reset();
        loading.dismiss();
      },

      error => {
        console.log(error);
        this.presentToast("Edit Status Aduan Catering Gagal!!");
        console.log(this.FormStatus.value);
        this.FormStatus.reset();
        loading.dismiss();
      }  
    );
  }

  async presentToast(Message) {
    const toast = await this.toastController.create({
      message: Message,
      duration: 2500,
      position: "top"
    });
    toast.present();
  }

  signout() {
    this.router.navigate(['dashboard']);
  }

  ngOnDestroy() {
    if (typeof this.routerEvents !== 'undefined') this.routerEvents.unsubscribe();
  }
  
  async openModal(data) {
    const modal = await this.modalController.create({
      component: UpdateStatusComponent,
      componentProps: {
        id: data.id,
        status: data.status
      }
    });
    await modal.present();
    const message = await modal.onWillDismiss();
    if (message.data === 'success') {
      this.ngOnInit();
    }
    if (message.data) {
      this.presentToast(message.data);
    }
  }
}
