import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServizioMovimenti } from '../../services/servizio-movimenti'; // Controlla il percorso
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-movimenti',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-movimenti.html',
  styleUrl: './lista-movimenti.css'
})
export class ListaMovimenti implements OnInit {
  movimenti: any[] = [];
  caricamento: boolean = true;
  erroreMessaggio?: string;

  constructor(private servizio: ServizioMovimenti) {}

  ngOnInit() {
    this.caricaMovimenti();
  }

  // Spostiamo la logica in un metodo riutilizzabile
  caricaMovimenti() {
    this.caricamento = true;
    this.servizio.getTransactions().subscribe({
      next: (risposta) => {
        this.movimenti = risposta.transactions || [];
        this.caricamento = false;
      },
      error: (err) => {
        console.error('Errore nel recupero della lista movimenti:', err);
        this.erroreMessaggio = 'Impossibile caricare i movimenti.';
        this.caricamento = false;
      }
    });
  }
}
