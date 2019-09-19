import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConexaoProvider } from '../../providers/conexao/conexao';
import {HomePage} from '../../pages/home/home'
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  tipo: boolean;
  public list : any = [];
  responseData   : any;
  userData = { "email": "", "senha": "" };
  constructor(public navCtrl: NavController, public navParams: NavParams, public ConexaoProvider : ConexaoProvider ) {
}

login(){
  this.ConexaoProvider.postData({"apikey":"8bfc2faf7f670ae99b325f773988bd83","request":"user","search":{"field": {"email":this.userData.email, "senha":this.userData.senha }}}, '/services/').then((result) => {
    this.responseData = result;
    if (!this.responseData.error) {
      console.log(this.responseData);
      this.list = Object["values"](this.responseData);
      localStorage.setItem('UserData', JSON.stringify(this.responseData));
      this.navCtrl.push(HomePage);
    }},);
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  exibirOuOcultar(){
    this.tipo = !this.tipo;
  }

}



