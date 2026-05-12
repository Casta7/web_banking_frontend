import { Component } from '@angular/core';
import { Saldo } from '../saldo/saldo';
import { ListaMovimenti } from '../lista-movimenti/lista-movimenti';
import { Deposito } from '../deposito/deposito';
import { devOnlyGuardedExpression } from '@angular/compiler';

@Component({
  selector: 'app-home',
  imports: [Saldo, ListaMovimenti, Deposito],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
