import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CharactersService} from '../../services/characters.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.sass']
})
export class CharacterDetailsComponent implements OnInit, OnDestroy {
  characterData: any;
  relatedComics: any;
  relatedStories: any;
  protected unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private charactersService: CharactersService
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.charactersService.getByID(id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(value => {
        const valueResults = value?.results;
        this.relatedComics = valueResults[0]?.comics || [];
        this.relatedStories = valueResults[0]?.stories || [];
        this.characterData = valueResults[0] || [];
      });
  }

  ngOnDestroy(): void {
    // This aborts all HTTP requests.
    this.unsubscribe.next();
    // This completes the subject properlly.
    this.unsubscribe.complete();
  }


}
