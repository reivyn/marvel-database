import { Component, OnInit } from '@angular/core';
import  { faLinkedinIn }  from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faAtom } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {
  faLinkedinIn = faLinkedinIn
  faAtom = faAtom

  constructor() { }

  ngOnInit(): void {
  }

}
