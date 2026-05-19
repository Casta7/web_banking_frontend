import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ServizioMovimenti } from '../../services/servizio-movimenti';

@Component({
  selector: 'app-preleva',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './preleva.html',
  styleUrls: ['./preleva.css']
})
export class Preleva {
  @Input() mode: 'home' | 'full' = 'full';
  caricamento: boolean = false;

  constructor(private servicio: ServizioMovimenti, private router: Router) {}

  confermaPreleva(importo: string, descrizione: string) {
    const valore = parseFloat(importo);
    if (isNaN(valore) || valore <= 0 || descrizione.trim() === '') return;

    this.caricamento = true;

    this.servicio.createWithdrawal(valore, descrizione.trim()).subscribe({
      next: (risposta) => {
        // Forza l'aggiornamento istantaneo del saldo condiviso
        this.servicio.getBalance();
        
        setTimeout(() => {
          this.caricamento = false;
          this.router.navigate(['/home']);
        });
      },
      error: (err) => {
        console.error('Errore prelievo:', err);
        alert('Errore o fondi insufficienti.');
        setTimeout(() => this.caricamento = false);
      }
    });
  }
}
