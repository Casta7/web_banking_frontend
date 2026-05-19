import { Component, Input } from '@angular/core';
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
  caricamento: boolean = false;

  constructor(
    private servizio: ServizioMovimenti,
    private router: Router
  ) {}

  confermaDeposito(importo: string, descrizione: string) {
    // Trasforma in numero float e pulisce i punti/virgole estranei
    const valore = parseFloat(importo);

    if (isNaN(valore) || valore <= 0) {
      alert("Inserisci un importo valido maggiore di zero!");
      return;
    }

    if (!descrizione || descrizione.trim() === '') {
      alert("Inserisci una descrizione per il versamento!");
      return;
    }

    this.caricamento = true;

    // Passiamo 'valore' che ora è un NUMBER nativo e non una stringa
    this.servizio.createDeposit(valore, descrizione).subscribe({
      next: () => this.router.navigate(['/home'])
    });

  }
}
