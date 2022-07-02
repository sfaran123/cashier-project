import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

import { HelpersService } from 'src/app/shared/_services/generic/helpers.service';

import { fade } from 'src/app/shared/_consts/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
  animations: [fade]
})
export class AppComponent implements OnInit {

  isLoading = false;

  constructor(private router: Router, private helpers: HelpersService) {}

  ngOnInit() {
    this.helpers.pageSpinnerShown.subscribe(showSpinner => this.isLoading = showSpinner);

    this.router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      }

      if (event instanceof NavigationEnd) {
        this.isLoading = false;
        this.helpers.urlChanged.next(event.urlAfterRedirects);
        window.scrollTo(0, 0);
      }
    });
  }
}
