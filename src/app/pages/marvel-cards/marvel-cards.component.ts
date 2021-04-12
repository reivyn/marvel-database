import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-marvel-cards',
  templateUrl: './marvel-cards.component.html',
  styleUrls: ['./marvel-cards.component.sass']
})
export class MarvelCardsComponent {
  @Input() marvelData$: Observable<any>
  @Input() type: string
  @Input() buttons: {first; second; third;}
}
