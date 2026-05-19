import { CommonModule } from '@angular/common';
import { ServizioMovimenti } from '../../services/servizio-movimenti';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-saldo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './saldo.html',
  styleUrls: ['./saldo.css']
})
export class Saldo implements OnInit {
  @Input() mode: 'home' | 'full' = 'full';
  saldo: number = 0;

  constructor(private servizio: ServizioMovimenti) {}

  ngOnInit() {
    // Richiede al servizio di effettuare la chiamata HTTP per recuperare il saldo aggiornato
    this.servizio.getBalance();
  }
}
