import { Routes } from "@angular/router";
import { Deposito } from "./components/deposito/deposito";
import { ListaMovimenti } from "./components/lista-movimenti/lista-movimenti";
import { Preleva } from "./components/preleva/preleva";
import { Saldo } from "./components/saldo/saldo";
import { MovimentoDettaglio } from "./components/movimento-dettaglio/movimento-dettaglio";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect alla home all'avvio
  { path: 'home', component: ListaMovimenti },
  { path: 'preleva', component: Preleva },
  { path: 'saldo', component: Saldo },
  { path: 'deposito', component: Deposito },
  { path: 'dettaglio/:id', component: MovimentoDettaglio },
  { path: '**', redirectTo: '/home' } // Wildcard: se la rotta non esiste torna in home
];