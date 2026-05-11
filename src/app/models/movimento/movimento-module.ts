export interface Movimento {
  id: number;
  tipo: 'versamento' | 'prelievo';
  importo: number;
  data: Date; // Contiene sia data che ora
  descrizione: string;
  categoria: string;      // Es: 'Stipendio', 'Alimentari', 'Affitto'
  metodoPagamento: string; // Es: 'Carta di Debito', 'Bonifico SEPA'
  stato: 'confermato' | 'in attesa';
}