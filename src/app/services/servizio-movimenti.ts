import { Injectable } from '@angular/core';
import { Movimento } from '../models/movimento/movimento-module'; 


@Injectable({
  providedIn: 'root' 
})

export class ServizioMovimenti {
  // Array simulato (il nostro "database")
  private movimenti: Movimento[] = [
    { id: 1, tipo: 'versamento', importo: 1500, data: new Date(), descrizione: 'Stipendio Aprile' },
    { id: 2, tipo: 'prelievo', importo: 50, data: new Date(), descrizione: 'Prelievo bancomat' }
  ];

  constructor() { }

  // Restituisce tutti i movimenti
  getMovimenti(): Movimento[] {
    return this.movimenti;
  }

  // Calcola il saldo totale
  getSaldo(): number {
    return this.movimenti.reduce((acc, mov) => {
      return mov.tipo === 'versamento' ? acc + mov.importo : acc - mov.importo;
    }, 0);
  }

  // Aggiunge un'operazione
  aggiungiOperazione(tipo: 'versamento' | 'prelievo', importo: number, descrizione: string) {
    const nuovo: Movimento = {
      id: this.movimenti.length + 1,
      tipo,
      importo,
      data: new Date(),
      descrizione
    };
    this.movimenti.push(nuovo);
  }
}