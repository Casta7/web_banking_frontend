import { Component } from '@angular/core';
import { Saldo } from '../saldo/saldo';
import { ListaMovimenti } from '../lista-movimenti/lista-movimenti';
import { Deposito } from '../deposito/deposito';
import { devOnlyGuardedExpression } from '@angular/compiler';
import { Preleva } from '../preleva/preleva';

@Component({
  selector: 'app-home',
  imports: [Saldo, ListaMovimenti, Deposito, Preleva],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
