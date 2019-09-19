import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConexaoProvider } from '../../providers/conexao/conexao';
import { StatusBar } from '@ionic-native/status-bar';
import { Chart } from 'chart.js';
import { CurrencyPipe, PercentPipe } from '@angular/common'
/**
 * Generated class for the GraficosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-graficos',
  templateUrl: 'graficos.html',
})
export class GraficosPage {
  @ViewChild('chartCanvas') chartCanvas;
  @ViewChild('chartLegend') chartLegend;
  chart: any;
  public list : any = [];
  responseData   : any;
  JsonData = {"nome": ""}
  public dataChart: any = { disponivel: 0, utilizado: 0, capacidade: 0 }
  constructor(public navCtrl: NavController, public navParams: NavParams,private statusBar: StatusBar,private conexao: ConexaoProvider, ) {
    this.statusBar.backgroundColorByHexString('#2d52a3');
    this.statusBar.overlaysWebView(true);                                                                            
    var teste = JSON.parse(localStorage.getItem('JsonData'));

    console.log(teste);                                                                   
    this.conexao.postData({ "apikey": "8bfc2faf7f670ae99b325f773988bd83", "request": "device", "search": { "field": "mac", "value": teste[0].mac }},'/services/').then((result) => {
      this.responseData = result;
      if (!this.responseData.error) {
        console.log(this.responseData);
        this.list = Object["values"](this.responseData);
        this.createChart();
        localStorage.setItem('UserData', JSON.stringify(this.responseData));
      }},);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GraficosPage');
  }

createChart() {
    const currencyPipe = new CurrencyPipe('en_US');
    const percentPipe = new PercentPipe('en_US');

    for (let i = 0; i < this.list.length; i++) {
      this.dataChart.disponivel+= Number(this.list[i].disponivel);
      this.dataChart.capacidade+= Number(this.list[i].capacidade);
    }

    this.dataChart.disponivel = (this.dataChart.utilizado * 100);
    this.dataChart.capacidade = this.dataChart.capacidade.toFixed(2);


    const colors = {
      backgroundColor: [
        'rgba(26, 188, 156, 0.8)',  // turquese
        'rgba(155, 89, 182, 0.8)',  // violet
      ],
      hoverBackgroundColor: [
        '#1abc9c', // turquese
        '#9b59b6', // violet
      ]
    };

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Alimentação', 'Combustível', 'Garagem', 'Lazer', 'Outros'],
        datasets: [{
          data: [
            this.dataChart.disponivel - this.dataChart.utilizado - this.dataChart.capacidade
          ],
          backgroundColor: colors.backgroundColor,
          hoverBackgroundColor: colors.hoverBackgroundColor,
          borderColor: '#34495e',
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 80,
        legend: false,
        /*
        legendCallback: function(chart) {
          let legendHtml = [];
          let item = chart.data.datasets[0];

          legendHtml.push('<ul>');

          for (let i = 0; i < item.data.length; i++) {
            let value = currencyPipe.transform(item.data[i]);
            // let value = '$' + item.data[i];

            legendHtml.push('<li>');
            legendHtml.push(`<span class="chart-legend-bullet" style="color:${item.backgroundColor[i]}"></span>`);
            legendHtml.push(`<span class="chart-legend-label-text">${chart.data.labels[i]}</span>`);
            legendHtml.push(`<span class="chart-legend-label-value">${value}</span>`);
            legendHtml.push('</li>');
          }

          legendHtml.push('</ul>');

          return legendHtml.join("");
        },
        */

        tooltips: {
          enabled: true,
          mode: 'single',
          fontSize: 14,
          fontColor: '#3b3a3e',
          fontFamily: 'Roboto',
          /*
          callbacks: {
            title: function (tooltipItem, data) { return data.labels[tooltipItem[0].index]; },
            label: function (tooltipItem, data) {
                const amount = parseFloat(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
                const total = parseFloat(eval(data.datasets[tooltipItem.datasetIndex].data.join("+")));
                const percent = percentPipe.transform((amount / total));
                // const percent = (amount / total);

                return percent;
            },
            // footer: function(tooltipItem, data) { return 'Total: 100 planos.'; }
          }
          */
        },

      }
    });

    this.chartLegend.nativeElement.innerHTML = this.chart.generateLegend();
  }
}
