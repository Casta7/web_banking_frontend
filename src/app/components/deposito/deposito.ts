import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServizioMovimenti } from '../../services/servizio-movimenti';

@Component({
  selector: 'app-deposito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deposito.html',
  styleUrls: ['./deposito.css']
})
export class Deposito {
  @Input() mode: 'home' | 'full' = 'full';
  caricamento = signal<boolean>(false);

  constructor(
    private servizio: ServizioMovimenti,
    private router: Router
  ) {}

  confermaDeposito(importo: string, descrizione: string) {
    const valore = parseFloat(importo);

    if (isNaN(valore) || valore <= 0) {
      alert("Inserisci un importo valido maggiore di zero!");
      return;
    }

    if (!descrizione || descrizione.trim() === '') {
      alert("Inserisci una descrizione per il versamento!");
      return;
    }

    this.caricamento.set(true);

    this.servizio.createDeposit(valore, descrizione.trim()).subscribe({
      next: (risposta: any) => {
        console.log('Deposito registrato con successo:', risposta);
        
        if (risposta && risposta.balance_after !== undefined) {
          this.servizio.balance.set(Number(risposta.balance_after));
        }

        this.caricamento.set(false);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Errore durante la registrazione del deposito:', err);
        alert('Si è verificato un errore nel server durante il salvataggio.');
        
        this.caricamento.set(false);
        this.router.navigate(['/home']);
      }
    });
  }
}
