import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Mensaje } from '../interface/mensaje.interface';
import { userInfo } from 'os';





@Injectable({
  providedIn: 'root'
})
export class ChatService {

  //------------------------------------------------------------------//
  //---------------------------Variables----------------------------------//
  //------------------------------------------------------------------//
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats           : Mensaje[] = [];
  public usuario         : any={};
  //------------------------------------------------------------------//
  //---------------------------Constructor----------------------------------//
  //------------------------------------------------------------------//
  constructor(private afs: AngularFirestore,public afAuth: AngularFireAuth) { 
    this.afAuth.authState.subscribe( user =>{
      console.log('Estado del usuario',user);

      if(!user){
        return
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid    = user.uid
    });

  }
  //------------------------------------------------------------------//
  //---------------------------Login----------------------------------//
  //------------------------------------------------------------------//
  login(proveedor:string) {
    this.afAuth.auth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
  }
  //------------------------------------------------------------------//
  //---------------------------Logout----------------------------------//
  //------------------------------------------------------------------//
  logout() {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }

  //------------------------------------------------------------------//
  //---------------------------Cargar Mensajes----------------------------------//
  //------------------------------------------------------------------//
  cargarMensajes(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha','desc').limit(7));
    return this.itemsCollection.valueChanges();
    
  }

  //------------------------------------------------------------------//
  //---------------------------Agregar Mensajes----------------------------------//
  //------------------------------------------------------------------//
  agregarMensaje( texto:string){
  
    // TODO falta el UID del usuario
    let mensaje: Mensaje ={
      nombre:this.usuario.nombre,
      mensaje:texto,
      fecha: new Date().getTime(),
      uid:this.usuario.uid
    }
    return this.itemsCollection.add(mensaje);
  }
}
