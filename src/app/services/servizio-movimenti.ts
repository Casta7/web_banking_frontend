import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs'; // Aggiunto 'tap'

@Injectable({
  providedIn: 'root',
})
export class ServizioMovimenti {
  private baseUrl = 'https://mini-banking-api.up.railway.app/api';
  private accountId = '550e8400-e29b-41d4-a716-446655440000';

  public balance = signal(0);
  
  // 1. AGGIUNGI: Signal centralizzato per i movimenti, accessibile da tutta l'app
  public movimenti = signal<any[]>([]);

  constructor(private http: HttpClient) {}

  getBalance() {
    this.http.get(`${this.baseUrl}/accounts/${this.accountId}/balance`, { responseType: 'text' }).subscribe({
      next: (response) => {
        try {
          const jsonObj = JSON.parse(response);
          const valoreNumerico = jsonObj.balance !== undefined ? jsonObj.balance : jsonObj;
          this.balance.set(Number(valoreNumerico));
        } catch (e) {
          this.balance.set(Number(response));
        }
      },
      error: (err) => console.error('Errore getBalance:', err)
    });
  }

  // 2. MODIFICA: Usiamo .pipe(tap(...)) per salvare la lista normalizzata nel Signal globale
  getTransactions(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/accounts/${this.accountId}/transactions`).pipe(
      map(res => {
        let lista: any[] = [];
        
        if (res && Array.isArray(res.transactions)) {
          lista = res.transactions;
        } else if (Array.isArray(res)) {
          lista = res;
        }

        const listaNormalizzata = lista.map((m, index) => ({
          ...m,
          idUnico: m.id !== undefined ? `${m.id}-${index}` : `tx-${index}`
        }));

        return { transactions: listaNormalizzata };
      }),
      // Intercettiamo il risultato di 'map' e aggiorniamo il Signal
      tap(risultatoNormalizzato => {
        this.movimenti.set(risultatoNormalizzato.transactions);
      })
    );
  }

  getTransactionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/accounts/${this.accountId}/transactions/${id}`);
  }

  updateTransaction(id: number, newDescription: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/accounts/${this.accountId}/transactions/${id}`, { description: newDescription });
  }

  createWithdrawal(amount: number, description: string): Observable<any> {
    const payload = { amount, description };
    return this.http.post<any>(`${this.baseUrl}/accounts/${this.accountId}/withdrawals`, payload).pipe(
      // Dopo il prelievo, aggiorna sia il saldo che la lista movimenti automaticamente
      tap(() => {
        this.getBalance();
        this.getTransactions().subscribe();
      })
    );
  }

  // 3. MODIFICA: Aggiorna automaticamente transazioni e saldo subito dopo il deposito
  createDeposit(amount: number, description: string): Observable<any> {
    const payload = { amount, description };
    return this.http.post<any>(`${this.baseUrl}/accounts/${this.accountId}/deposits`, payload).pipe(
      // Sfrutta il tap per rinfrescare l'intero stato dell'applicazione in background
      tap(() => {
        this.getBalance();
        this.getTransactions().subscribe();
      })
    );
  }

  // 4. MODIFICA: Rinfresca i dati se viene eliminata una transazione
  deleteTransaction(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/accounts/${this.accountId}/transactions/${id}`).pipe(
      tap(() => {
        this.getBalance();
        this.getTransactions().subscribe();
      })
    );
  }

  convertToFiat(fiatCurrency: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/accounts/${this.accountId}/balance/convert/fiat?to=${fiatCurrency}`);
  }

  convertToCrypto(cryptoCurrency: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/accounts/${this.accountId}/balance/convert/cryptos?to=${cryptoCurrency}`);
  }
}
