import { Component, NgModule, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Mensaje } from '../../interface/mensaje.interface';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {


  mensajes: Mensaje[] =[];
  mensaje:string = '';
  elemento:HTMLElement;
  form:FormGroup;


//------------------------------------------------------------------//
//----------------Constructor---------------------------------//
//-----------------------------------------------------------------//

  constructor( public chatServices: ChatService,private formBuilder: FormBuilder) {
    

    this.crearFormularios();
    console.log('constructor');
    this.leerFormulario();
    
  }

//------------------------------------------------------------------//
//----------------ngOnInit---------------------------------//
//-----------------------------------------------------------------//
  ngOnInit(): void {
    console.log('OnInit');
    this.elemento = document.getElementById('app-mensajes'); 
    
  }

//------------------------------------------------------------------//
//----------------Crear Formulario---------------------------------//
//-----------------------------------------------------------------//
  crearFormularios(){

    this.form = this.formBuilder.group(
      {'app-mensaje':this.formBuilder.array([])}
    )

    this.form.reset({ 'app-mensaje':[]});
  }

//------------------------------------------------------------------//
//----------------leer Formulario---------------------------------//
//-----------------------------------------------------------------//
  leerFormulario(){
    this.chatServices.cargarMensajes().subscribe(mensajes =>{
       this.mensajes = [];
   
      for  (const mensaje of mensajes) {
       this.mensajes.unshift(mensaje);
  
      }
      console.log(this.mensajes)
       

   
    setTimeout( () =>{
      this.elemento.scrollTop = this.elemento.scrollHeight;
    },20)


    
    
    
  });
}

//------------------------------------------------------------------//
//----------------enviar mensaje---------------------------------//
//-----------------------------------------------------------------//
  enviarMensaje(){
    
  
    console.log(this.mensajes);
    
    

    if(this.mensajes.length ===0 ){
      return;
    }

    this.chatServices.agregarMensaje(this.mensaje)
    .then( ()=>
      this.mensaje = ""
    ).catch( (error) =>{
      console.log(error);
    });


    this.elemento.scrollTop = this.elemento.scrollHeight;
 
  }

}
