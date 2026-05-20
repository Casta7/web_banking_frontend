import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServizioMovimenti } from '../../services/servizio-movimenti';

@Component({
  selector: 'app-preleva',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preleva.html',
  styleUrls: ['./preleva.css']
})
export class Preleva {
  @Input() mode: 'home' | 'full' = 'full';
  caricamento = signal<boolean>(false);

  constructor(
    private servizio: ServizioMovimenti, 
    private router: Router
  ) {}

  confermaPreleva(importo: string, descrizione: string) {
    const valore = parseFloat(importo);
    
    if (isNaN(valore) || valore <= 0) {
      alert("Inserisci un importo valido maggiore di zero!");
      return;
    }

    if (!descrizione || descrizione.trim() === '') {
      alert("Inserisci una descrizione per il prelievo!");
      return;
    }

    this.caricamento.set(true);

    this.servizio.createWithdrawal(valore, descrizione.trim()).subscribe({
      next: (risposta) => {
        if (risposta && risposta.balance_after !== undefined) {
          this.servizio.balance.set(Number(risposta.balance_after));
        }
        
        this.caricamento.set(false);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Errore prelievo:', err);
        alert('Errore durante il prelievo o fondi insufficienti.');
        
        this.caricamento.set(false);
        this.router.navigate(['/home']);
      }
    });
  }
}
