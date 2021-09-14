import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver} from '@angular/cdk/layout';
import { ActivatedRoute, NavigationEnd, Router, UrlSegment } from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Ionic';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  review_btn: boolean;

    constructor(
      private observer: BreakpointObserver,
      private router: ActivatedRoute,
      private routerPath: Router
    ) {
      routerPath.events.pipe(
        filter((event: any) => event instanceof NavigationEnd)
    )
        .subscribe(event => {
            this.hideSideBar(event.url)
        });
        this.review_btn=true;
    }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
    this.review_btn =true
  }

  goTo(menu: string){
    const userId = localStorage.getItem('id')
    const token = localStorage.getItem('token')
    switch(menu) {
      case 'logIn':
        this.routerPath.navigate([`/`]);
        localStorage.clear();
        this.review_btn =true;
        break;
      case 'album':
        this.routerPath.navigate([`/albumes/${userId}/${token}`]);
        this.review_btn =true;
        break;
      case 'cancion':
        this.routerPath.navigate([`/canciones/${userId}/${token}`]);
        this.review_btn =false;
        break;
      case 'perfil':
        this.routerPath.navigate([`/perfil/${userId}/${token}`]);
        this.review_btn =true;
        break;
    }
  }

  hideSideBar(url: any) {
    if (url == "/" || url == "/signup") {
      this.sidenav.close();
      this.sidenav.mode = 'side';
    } else {
      this.sidenav.open();
    }
  }
}

