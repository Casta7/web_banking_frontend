import { Component, Input, signal } from '@angular/core'; // Aggiunto signal
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ServizioMovimenti } from '../../services/servizio-movimenti';

@Component({
  selector: 'app-deposito',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './deposito.html',
  styleUrls: ['./deposito.css']
})
export class Deposito {
  @Input() mode: 'home' | 'full' = 'full';
  
  // Trasforma caricamento in un Signal
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

    // Imposta il signal a true
    this.caricamento.set(true);

    this.servizio.createDeposit(valore, descrizione.trim()).subscribe({
      next: (risposta: any) => {
        console.log('Deposito registrato con successo:', risposta);
        
        if (risposta && risposta.balance_after !== undefined) {
          this.servizio.balance.set(Number(risposta.balance_after));
        }

        // Il reset dello stato va fatto prima della navigazione
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
