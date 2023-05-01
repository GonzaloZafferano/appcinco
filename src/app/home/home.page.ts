import { Component } from '@angular/core';
import { IonicModule, LoadingController } from '@ionic/angular';
import { LoginComponent } from '../components/login/login.component';
import { FormsModule } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from '../components/registro/registro.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { BienvenidoComponent } from '../components/bienvenido/bienvenido.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule,
    CommonModule,
    FormsModule,
    LoginComponent,
    RegistroComponent,
    BienvenidoComponent], //Array de MODULOS Y 'COMPONENTES QUE SEAN STANDALONE:true'
})
export class HomePage {
  constructor(private loginService: LoginService, private router: Router, public loadingController: LoadingController) {

  }

  async logout() {
    const loading = await this.presentLoading();

    setTimeout(() => {
      this.loginService.desloguear();
      this.router.navigate(['/login']);
      loading.dismiss();
    }, 2000);

  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cerrando sesión',
      spinner: 'lines',
      translucent: true,
      cssClass: 'custom-class'
    });

    await loading.present();
    return loading;
  }

  async presentChats() {
    const loading = await this.loadingController.create({
      message: 'Cargando chats',
      spinner: 'lines',
      translucent: true,
      cssClass: 'custom-class'
    });

    await loading.present();
    return loading;
  }

  async abrirSala4A() {
    // const loading = await this.presentChats();

    // setTimeout(() => { 
       this.router.navigate(['/sala4a']);
    //   loading.dismiss();
    // }, 2000);
  }
  async abrirSala4B() {
    // const loading = await this.presentChats();

    // setTimeout(() => {  
       this.router.navigate(['/sala4b']);
    //   loading.dismiss();
    // }, 2000);
  }
}
