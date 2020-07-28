import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <iframe width="560" height="315" src="https://www.youtube.com/embed/I7CfaDYzTVM" frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})

export class AppComponent { }
