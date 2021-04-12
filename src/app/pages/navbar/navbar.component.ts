import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
// Font-Awesome Icons import
import { faAtom } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {

  //Icon list declaration
  faAtomIcon = faAtom;

  menuList = [
    {title: 'Home', url: ''},
    {title: 'Characters', url: 'characters'},
    {title: 'Comics',url: 'comics'},
    {title: 'Stories',url: ''},
    {title: 'My Bookmarks',url: ''}]

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

}
