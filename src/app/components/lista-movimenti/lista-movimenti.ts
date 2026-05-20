import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServizioMovimenti } from '../../services/servizio-movimenti';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-movimenti',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-movimenti.html',
  styleUrl: './lista-movimenti.css'
})
export class ListaMovimenti implements OnInit {
  caricamento: boolean = true;
  erroreMessaggio?: string;

  // Legge in tempo reale i movimenti centralizzati dal servizio
  get movimenti() {
    return this.servizio.movimenti();
  }

  constructor(private servizio: ServizioMovimenti) {}

  ngOnInit() {
    this.caricaMovimenti();
  }

  caricaMovimenti() {
    this.caricamento = true;
    this.servizio.getTransactions().subscribe({
      next: () => {
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
