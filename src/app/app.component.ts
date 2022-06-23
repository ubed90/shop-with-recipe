import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shop-with-recipe';
  featureToShow: string = 'recipe';

  onNavigate(feature: string): void {
    this.featureToShow = feature;
  }
}
