import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ServizioMovimenti } from '../../services/servizio-movimenti';
import { Movimento } from '../../models/movimento/movimento-module';

@Component({
  selector: 'app-dettaglio-movimento',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movimento-dettaglio.html',
  styleUrls: ['./movimento-dettaglio.css']
})
export class MovimentoDettaglio implements OnInit {
  movimento?: Movimento;

  constructor(
    private route: ActivatedRoute,
    private servizio: ServizioMovimenti
  ) {}

  ngOnInit() {
    // Leggiamo l'ID dall'URL (es: /dettaglio/1)
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movimento = this.servizio.getMovimentoById(id);
  }
}
