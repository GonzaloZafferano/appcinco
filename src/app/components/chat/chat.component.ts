import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonItem, LoadingController } from '@ionic/angular';
import { Chat } from 'src/app/models/chats';
import { FormsModule, NgForm } from '@angular/forms';
import { IonInput, IonicModule, Platform } from '@ionic/angular';
import { CommonModule, NgForOf } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class ChatComponent implements OnInit {
  @Input() sala: number = 0;
  listaDeMensajes: any[] = [];
  mensajeEscrito: string = '';
  usuarioLogueado: string = '';
  guardando: boolean = false;
  @ViewChild('contenido', { static: true }) contenido: IonContent | undefined;
  suscripcion: any;
  constructor(private auth: AngularFireAuth, public router: Router, public loadingController: LoadingController, private firestore: FirestoreService) {
  }

  aula : string = '';

  async ngOnInit() {
    const loading = await this.presentChats();

    await this.auth.currentUser.then((x) => {
      this.usuarioLogueado = x?.email ? x.email : '';
    });

    this.aula = this.sala == 0 ?'Sala PPS 4A' : 'Sala PPS 4B';
    this.suscripcion = this.firestore.obtenerMensajesObservable(this.sala).subscribe((data) => {
      this.listaDeMensajes = data;
      setTimeout(() => {
        this.contenido?.scrollToBottom(500);
      }, 1000);
    });

    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
      this.suscripcion = null;
    }
  }

  enviarMensaje() {
    if (this.mensajeEscrito != '') {
      this.guardando = true; //MUESTRA EL SPINNER Y SACA EL BOTON
      setTimeout(() => {
        let mensajeNuevo = new Chat();
        mensajeNuevo.fecha = new Date();
        mensajeNuevo.mensaje = this.mensajeEscrito;
        mensajeNuevo.sala = this.sala;
        mensajeNuevo.usuario = this.usuarioLogueado;
        this.firestore.guardar(mensajeNuevo);
        this.mensajeEscrito = '';
        this.guardando = false; //MUESTRA EL BOTON Y SACA EL SPINNER 
      }, 500);
    }
  }

  volverHome() {
    this.router.navigate(['home']);
  }

  obtenerFechaString(chat: any) {
    //OBTENGO LA FECHA A PARTIR DE (SEGUNDOS TOTALES *1000)
    let fecha = new Date(chat.fecha.seconds * 1000);
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let anio = fecha.getFullYear();
    let hora = fecha.getHours();
    let minutos = fecha.getMinutes();

    let cadenaDia = dia < 10 ? '0' + dia.toString() : dia.toString();
    let cadenaMes = mes < 10 ? '0' + mes.toString() : mes.toString();

    return cadenaDia + '-' + cadenaMes + '-' + anio.toString() + ' ' + hora + ':' + minutos;
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
}
