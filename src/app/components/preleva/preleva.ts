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
  
  caricamento: boolean = false; // Blocca i clic ripetuti durante l'invio HTTP

  constructor(
    private servizio: ServizioMovimenti,
    private router: Router
  ) {}

  // Gestisce la chiamata API asincrona per registrare l'uscita
  confermaPreleva(importo: string, descrizione: string) {
    const valore = parseFloat(importo);

    // Validazione dei dati inseriti dall'utente
    if (isNaN(valore) || valore <= 0) {
      alert("Inserisci un importo valido maggiore di zero!");
      return;
    }

    if (descrizione.trim() === '') {
      alert("Inserisci una descrizione per il prelievo!");
      return;
    }

    this.caricamento = true;

    // Chiama aggiungiOperazione passando il tipo 'prelievo' per attivare l'endpoint POST /withdrawals
    this.servizio.createWithdrawal(valore, descrizione).subscribe({
      next: () => this.router.navigate(['/home'])
    });

  }
}
