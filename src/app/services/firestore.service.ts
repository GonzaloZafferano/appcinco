import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, addDoc, deleteDoc, doc, getDocs, limit, orderBy, query, setDoc, updateDoc, where } from '@angular/fire/firestore';

import { Firestore, collectionData, collection, } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Chat } from '../models/chats';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  guardar(mensaje: Chat) {
    const coleccion = collection(this.firestore, 'mensajes');
    addDoc(coleccion, { ...mensaje });
  }

  obtenerMensajesObservable(sala: number) {
    const coleccion = collection(this.firestore, 'mensajes');
    const q = query(coleccion, orderBy('fecha', 'asc'), where('sala', '==', sala));   
    return collectionData(q);
  }

  obtenerUsuarios(){
    
  }
}
