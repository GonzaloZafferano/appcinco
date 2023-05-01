import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, LoadingController } from '@ionic/angular';
import { ChatComponent } from 'src/app/components/chat/chat.component';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-sala4a',
  templateUrl: './sala4a.component.html',
  styleUrls: ['./sala4a.component.scss'],
  standalone : true,
  imports: [CommonModule, ChatComponent, IonicModule]
})
export class Sala4aComponent  implements OnInit {
  // suscripcion: any;
  // listaMensajes: any[] = [];

  constructor(private firestore: FirestoreService,public loadingController: LoadingController
    ) { }

  async ngOnInit() {
    // const loading =await this.presentChats();
    // setTimeout(() => {
    //   this.suscripcion = this.firestore.obtenerMensajesObservable(0).subscribe((data) => {
    //     this.listaMensajes = data;   
    //   }); 
    //   setTimeout(() => {
    //     loading.dismiss();        
    //   }, 1000);
    // }, 500);
  }

  ngOnDestroy(){
    // if(this.suscripcion){
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
