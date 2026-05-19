import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ServizioMovimenti } from '../../services/servizio-movimenti'; // Controlla che il percorso sia corretto

@Component({
  selector: 'app-deposito',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './deposito.html',
  styleUrls: ['./deposito.css']
})
export class Deposito {
  @Input() mode: 'home' | 'full' = 'full';
  caricamento: boolean = false;

  constructor(
    private servizio: ServizioMovimenti,
    private router: Router
  ) {}

  confermaDeposito(importo: string, descrizione: string) {
    const valore = parseFloat(importo);

    // Validazione preliminare dei campi di input
    if (isNaN(valore) || valore <= 0) {
      alert("Inserisci un importo valido maggiore di zero!");
      return;
    }

    if (!descrizione || descrizione.trim() === '') {
      alert("Inserisci una descrizione per il versamento!");
      return;
    }

    this.caricamento = true;

    // Esegue la chiamata POST verso l'endpoint /deposits del backend su Railway
    this.servizio.createDeposit(valore, descrizione.trim()).subscribe({
      next: (risposta: any) => {
        console.log('Deposito registrato con successo:', risposta);
        
        // Sincronizza subito il Signal globale con il saldo restituito dal server (es. 602)
        if (risposta && risposta.balance_after !== undefined) {
          this.servizio.balance.set(Number(risposta.balance_after));
        }

        // Forza la navigazione verso la home per mostrare i dati aggiornati a schermo
        setTimeout(() => {
          this.caricamento = false;
          this.router.navigate(['/home']);
        });
      },
      error: (err) => {
        console.error('Errore durante la registrazione del deposito:', err);
        alert('Si è verificato un errore nel server durante il salvataggio.');
        setTimeout(() => {
          this.caricamento = false;
        });
      }
    });
  }
}
