import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Saldo } from '../saldo/saldo';
import { ListaMovimenti } from '../lista-movimenti/lista-movimenti';

@Component({
  selector: 'app-home',
  imports: [Saldo, ListaMovimenti, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
