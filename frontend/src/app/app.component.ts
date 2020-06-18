import { Component, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { GoogleAnalyticsService } from './service/google-analytics.service';
import { environment } from '../environments/environment';
import { ProjectQuery } from './project/state/project/project.query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(
    public router: Router,
    public projectQuery: ProjectQuery,
    private _googleAnalytics: GoogleAnalyticsService
  ) {
    if (environment.production) {
      this.handleGoogleAnalytics();
    }
  }

  handleGoogleAnalytics() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._googleAnalytics.sendPageView(event.urlAfterRedirects);
      }
    });
  }
}
