import { Component, OnInit } from '@angular/core';
import { BuscarService } from './buscar/buscar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BuscarService]
})
export class AppComponent implements OnInit {
  public dados;

  constructor(private buscarService: BuscarService) {
    console.log('BuscarService carregou...');
  }

  ngOnInit() {
    /*
     * poderias quebrar isso se ficar mais fácil de enteder:
     * this.dados = this.buscarService.buscar();
     * this.dados.subscribe( ... )
     */
    this.dados = this.buscarService.buscar().subscribe(
      (result) => console.log('resultado: ', result),
      (error: any) =>
        console.error('Error status: ', error.status, 'Error details: ', error),
      () => console.log('Observable completo!')
    );
  }
}
