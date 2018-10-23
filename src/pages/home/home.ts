import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DataServiceProvider } from '../../providers/data-service/data-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  products: any[] = [];
  selectedProduct: any;
  productFound:boolean = false;

  constructor(
    public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    public dataService: DataServiceProvider,
    private toast: ToastController) {
      this.dataService.getProducts()
        .subscribe((response)=> {
            this.products = response
            console.log(this.products);
        });
  }

  scan() {
    this.selectedProduct = {};
    this.barcodeScanner.scan().then((barcodeData) => {
      this.selectedProduct = this.products.find(product => product.plu === barcodeData.text);
      alert(this.selectedProduct)
      if(this.selectedProduct !== undefined) {
        this.productFound = true;
        console.log(this.selectedProduct);
      } else {
        this.selectedProduct = {};
        this.productFound = false;
        alert(this.productFound)
      }
    }, (err) => {
      alert(err)
      let toast = this.toast.create({
        message: err.message,
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
    });
  }
}
