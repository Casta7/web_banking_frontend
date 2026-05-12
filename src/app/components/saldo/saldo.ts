// dashboard.component.ts
import { CommonModule } from '@angular/common'; // <--- AGGIUNGI QUESTO
import { ServizioMovimenti } from '../../services/servizio-movimenti';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-saldo',
  standalone: true,
  imports: [CommonModule, RouterLink], // <--- E AGGIUNGILO QUI
  templateUrl: './saldo.html',
  styleUrls: ['./saldo.css']
})

export class Saldo implements OnInit {
  @Input() mode: 'home' | 'full' = 'full'; // Default a 'full'

  saldo: number = 0; // Inizializzato a 0

  constructor(private servizio: ServizioMovimenti) {}

  ngOnInit() {
    this.saldo = this.servizio.getSaldo();
  }
}

