import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConexaoProvider } from '../../providers/conexao/conexao';
import { StatusBar } from '@ionic-native/status-bar';
import {GraficosPage} from '../../pages/graficos/graficos'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public list : any = [];
  responseData   : any;
  constructor(public navCtrl: NavController,private conexao: ConexaoProvider, private statusBar: StatusBar ) {
    this.list =[];
    this.conexao.postData({ "apikey": "8bfc2faf7f670ae99b325f773988bd83", "request": "devices", "search": { "field": "user_id", "value": "67" }},'/services/').then((result) => {
      this.responseData = result;
      if (!this.responseData.error) {
        console.log(this.responseData);
        this.list = Object["values"](this.responseData);
        localStorage.setItem('UserData', JSON.stringify(this.responseData));
      }},);}
    
      addgraficos(){
        this.navCtrl.push(GraficosPage);
      }

}
