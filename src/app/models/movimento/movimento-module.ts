export interface Movimento {
  id: number;
  tipo: 'versamento' | 'prelievo'; // Usiamo i literal types per sicurezza
  importo: number;
  data: Date;
  descrizione: string;
  categoria?: string; // Opzionale (es. Spesa, Stipendio, Svago)
}