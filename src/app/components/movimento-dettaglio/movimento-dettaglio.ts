import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ServizioMovimenti } from '../../services/servizio-movimenti'; // Controlla il percorso del file

@Component({
  selector: 'app-dettaglio-movimento',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movimento-dettaglio.html',
  styleUrls: ['./movimento-dettaglio.css']
})
export class MovimentoDettaglio implements OnInit {
  movimento: any;
  erroreMessaggio?: string;
  caricamentoSalvataggio: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servizio: ServizioMovimenti
  ) {}

  ngOnInit() {
    // Recupera l'ID del movimento presente nell'URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    if (id) {
      this.caricaDettaglio(id);
    } else {
      this.erroreMessaggio = 'ID movimento non valido.';
    }
  }

  caricaDettaglio(id: number) {
    this.servizio.getTransactionById(id).subscribe({
      next: (dati) => {
        this.movimento = dati;
      },
      error: (err) => {
        console.error('Errore nel recupero del movimento:', err);
        this.erroreMessaggio = 'Impossibile trovare il movimento richiesto.';
      }
    });
  }

  // Sfrutta l'endpoint PUT per aggiornare la causale
  salvaNuovaDescrizione(nuovaDescrizione: string) {
    if (!nuovaDescrizione || nuovaDescrizione.trim() === '') {
      alert('Inserisci una descrizione valida!');
      return;
    }

    this.caricamentoSalvataggio = true;
    this.servizio.updateTransaction(this.movimento.id, nuovaDescrizione.trim()).subscribe({
      next: (risposta) => {
        alert('Descrizione aggiornata con successo!');
        this.movimento.description = nuovaDescrizione; // Aggiorna la vista locale
        this.caricamentoSalvataggio = false;
      },
      error: (err) => {
        console.error('Errore durante la modifica:', err);
        alert('Impossibile aggiornare la descrizione.');
        this.caricamentoSalvataggio = false;
      }
    });
  }

  // Sfrutta l'endpoint DELETE per rimuovere l'ultimo movimento (regola di consistenza Slim 4)
  eliminaQuestoMovimento() {
    if (this.movimento && confirm('Sei sicuro di voler eliminare questa transazione?')) {
      this.servizio.deleteTransaction(this.movimento.id).subscribe({
        next: () => {
          alert('Transazione eliminata correttamente.');
          this.router.navigate(['/home']); // Ritorna alla dashboard principale
        },
        error: (err) => {
          console.error('Errore durante l\'eliminazione:', err);
          alert('Errore: puoi cancellare solo l\'ultima transazione per mantenere coerente lo storico dei saldi.');
        }
      });
    }
  }
}
