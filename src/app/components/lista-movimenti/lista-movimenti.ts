import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServizioMovimenti } from '../../services/servizio-movimenti';
import { Movimento } from '../../models/movimento/movimento-module';

@Component({
  selector: 'app-lista-movimenti',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-movimenti.html',
  styleUrl: `./lista-movimenti.css`
})

export class ListaMovimenti implements OnInit {
  movimenti: Movimento[] = [];

  constructor(private ServizioMovimenti: ServizioMovimenti) {}

  ngOnInit() {
    this.movimenti = this.ServizioMovimenti.getMovimenti();
  }
}

