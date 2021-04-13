import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {


  // Dummy data declaration.
  dummyDescription = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
    'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, ' +
    'when an unknown printer took a galley of type and scrambled it to make a type specimen book. ' +
    'It has survived not only five centuries, but also the leap into electronic typesetting, remaining ' +
    'essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing ' +
    'Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including ' +
    'versions of Lorem Ipsum.';

  homeCardData = [
    {
      title: 'Marvel Characters',
      description: this.dummyDescription,
      imgUrl: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/wrapup_4.jpg',
      btnLabel: 'Characters',
      route: '/characters'
    },
    {
      title: 'Marvel Comics',
      description: this.dummyDescription,
      imgUrl: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengers_card_image_1.jpg',
      btnLabel: 'Comics',
      route: '/comics'
    },
    {
      title: 'Marvel Stories',
      description: this.dummyDescription,
      imgUrl: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/mattymatt.jpg',
      btnLabel: 'Stories',
      route: '/stories'
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }
}
