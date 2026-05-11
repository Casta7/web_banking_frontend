import { Injectable } from '@angular/core';
import { Movimento } from '../models/movimento/movimento-module';

@Injectable({
  providedIn: 'root'
})
export class ServizioMovimenti {
  // Popoliamo l'array con i nuovi dati dettagliati
  private movimenti: Movimento[] = [
    { 
      id: 1, 
      tipo: 'versamento', 
      importo: 1500, 
      data: new Date('2024-05-10T09:30:00'), 
      descrizione: 'Stipendio Maggio',
      categoria: 'Lavoro',
      metodoPagamento: 'Bonifico SEPA',
      stato: 'confermato'
    },
    { 
      id: 2, 
      tipo: 'prelievo', 
      importo: 50, 
      data: new Date('2024-05-11T18:45:00'), 
      descrizione: 'Aperitivo centro',
      categoria: 'Svago',
      metodoPagamento: 'Carta di Debito',
      stato: 'confermato'
    },
    { 
      id: 3, 
      tipo: 'prelievo', 
      importo: 120, 
      data: new Date(), // Data e ora attuale
      descrizione: 'Spesa Esselunga',
      categoria: 'Alimentari',
      metodoPagamento: 'Apple Pay',
      stato: 'in attesa'
    }
  ];

  constructor() { }

  // Ritorna tutta la lista
  getMovimenti(): Movimento[] {
    return this.movimenti;
  }

  // NUOVO: Cerca un movimento specifico per ID (per la pagina dettaglio)
  getMovimentoById(id: number): Movimento | undefined {
    return this.movimenti.find(m => m.id === id);
  }

  // Aggiorniamo anche il metodo aggiungi per gestire i nuovi campi
  aggiungiOperazione(tipo: 'versamento' | 'prelievo', importo: number, descrizione: string) {
    const nuovo: Movimento = {
      id: this.movimenti.length + 1,
      tipo: tipo,
      importo: importo,
      data: new Date(), // Salva automaticamente data e ora del momento del click
      descrizione: descrizione,
      categoria: 'Generica', // Valore di default
      metodoPagamento: 'App Online',
      stato: 'confermato'
    };
    this.movimenti.unshift(nuovo);
  }
}
