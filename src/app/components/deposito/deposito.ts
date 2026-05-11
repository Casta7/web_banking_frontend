import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Per tornare alla lista dopo il deposito
import { ServizioMovimenti } from '../../services/servizio-movimenti';

@Component({
  selector: 'app-deposito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deposito.html',
  styleUrls: ['./deposito.css']
})
export class Deposito {
  
  constructor(
    private servizio: ServizioMovimenti,
    private router: Router
  ) {}

  confermaDeposito(event: Event) {
    event.preventDefault(); // Evita il refresh della pagina
    
    // Recuperiamo i dati dagli input (usando l'evento target o ViewChild, qui usiamo l'approccio semplice)
    const form = event.target as HTMLFormElement;
    const importo = parseFloat((form.elements[0] as HTMLInputElement).value);
    const descrizione = (form.elements[1] as HTMLInputElement).value;

    if (importo > 0 && descrizione.trim() !== '') {
      // Usiamo il metodo del servizio
      this.servizio.aggiungiOperazione('versamento', importo, descrizione);
      
      // Torniamo alla lista movimenti per vedere il risultato
      this.router.navigate(['/home']);
    }
  }
}
