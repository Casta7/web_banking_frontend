import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ServizioMovimenti {
  // URL base centralizzato per il backend su Railway
  private baseUrl = 'https://mini-banking-api.up.railway.app/api';
  
  // ID fisso del conto utilizzato per tutte le operazioni
  private accountId = '550e8400-e29b-41d4-a716-446655440000';

  // Signal per esporre il saldo in tempo reale ai componenti
  public balance = signal(0);

  constructor(private http: HttpClient) {}

  // 1. Sincronizza il saldo gestendo risposte sia JSON che Testo puro (Risolve errore 200 OK)
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

  // 2. Recupera lo storico transazioni adattando la risposta (Risolve errore NG0900)
  getTransactions(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/accounts/${this.accountId}/transactions`).pipe(
      map(res => {
        if (res && Array.isArray(res.transactions)) return res;
        if (Array.isArray(res)) return { transactions: res };
        return { transactions: [] };
      })
    );
  }

  // 3. Cerca un singolo movimento specifico tramite il suo ID unico
  getTransactionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/accounts/${this.accountId}/transactions/${id}`);
  }

  // 4. Modifica la descrizione di un movimento esistente tramite chiamata PUT
  updateTransaction(id: number, newDescription: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/accounts/${this.accountId}/transactions/${id}`, { description: newDescription });
  }

  // 5. Invia un prelievo iniettando l'ID casuale per evitare il crash 1364 di MySQL
  createWithdrawal(amount: number, description: string): Observable<any> {
    const payload = {
      amount: amount,
      description: description
    };
    return this.http.post<any>(`${this.baseUrl}/accounts/${this.accountId}/withdrawals`, payload);
  }

  // 6. Invia un deposito iniettando l'ID casuale per evitare il crash 1364 di MySQL
  createDeposit(amount: number, description: string): Observable<any> {
    const payload = {
      amount: amount,
      description: description
    };
    return this.http.post<any>(`${this.baseUrl}/accounts/${this.accountId}/deposits`, payload);
  }

  // 7. Cancella l'ultima transazione effettuata per preservare la consistenza
  deleteTransaction(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/accounts/${this.accountId}/transactions/${id}`);
  }

  // 8. Effettua la conversione del saldo in una valuta fiat specifica (es. USD)
  convertToFiat(fiatCurrency: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/accounts/${this.accountId}/balance/convert/fiat?to=${fiatCurrency}`
    );
  }

  // 9. Effettua la conversione del saldo in una criptovaluta specifica (es. BTC)
  convertToCrypto(cryptoCurrency: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/accounts/${this.accountId}/balance/convert/cryptos?to=${cryptoCurrency}`
    );
  }
}
