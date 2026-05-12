import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; // Per tornare alla lista dopo il deposito
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
  
  constructor(
    private servizio: ServizioMovimenti,
    private router: Router
  ) {}

  // Passiamo direttamente i valori dall'HTML
  confermaDeposito(importo: string, descrizione: string) {
    const valore = parseFloat(importo);

    if (valore > 0 && descrizione.trim() !== '') {
      this.servizio.aggiungiOperazione('versamento', valore, descrizione);
      
      // Se sei in Home, vuoi che i dati si aggiornino subito senza ricaricare la rotta
      // Se vuoi comunque forzare un passaggio alla pagina home/lista:
      this.router.navigate(['/home']);
    } else {
      alert("Inserisci un importo valido e una descrizione!");
    }
  }
}

