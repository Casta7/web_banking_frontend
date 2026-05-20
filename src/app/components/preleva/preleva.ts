import { Component, Input, signal } from '@angular/core'; // Aggiunto signal
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
  
  // Trasforma caricamento in un Signal reattivo
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

    // Attiva lo stato di caricamento
    this.caricamento.set(true);

    this.servizio.createWithdrawal(valore, descrizione.trim()).subscribe({
      next: (risposta) => {
        // Il servizio centralizzato aggiorna già saldo e lista movimenti grazie al .pipe(tap(...))
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
