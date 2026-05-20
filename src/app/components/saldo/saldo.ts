import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServizioMovimenti } from '../../services/servizio-movimenti';
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

  // Legge in tempo reale il valore del Signal esposto dal servizio
  get saldo(): number {
    return this.servizio.balance();
  }

  constructor(private servizio: ServizioMovimenti) {}

  ngOnInit() {
    // Richiede al servizio di effettuare la chiamata HTTP per recuperare il saldo iniziale
    this.servizio.getBalance();
  }
}
