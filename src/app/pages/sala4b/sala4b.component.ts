import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, LoadingController } from '@ionic/angular';
import { ChatComponent } from 'src/app/components/chat/chat.component';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-sala4b',
  templateUrl: './sala4b.component.html',
  styleUrls: ['./sala4b.component.scss'],
  standalone: true,
  imports: [CommonModule, ChatComponent, IonicModule]
})
export class Sala4bComponent implements OnInit {

  // suscripcion: any;
  // listaMensajes: any[] = [];

  constructor(private firestore: FirestoreService, public loadingController: LoadingController) { }

  async ngOnInit() {
    // const loading = await this.presentChats();
    // setTimeout(() => {
    //   this.suscripcion = this.firestore.obtenerMensajesObservable(1).subscribe((data) => {
    //     this.listaMensajes = data;
    //   });
    //   setTimeout(() => {
    //     loading.dismiss();        
    //   }, 1000);
    // }, 1000);
  }

  ngOnDestroy() {
    // if (this.suscripcion) {
    //   this.suscripcion.unsubscribe();
    // }
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
