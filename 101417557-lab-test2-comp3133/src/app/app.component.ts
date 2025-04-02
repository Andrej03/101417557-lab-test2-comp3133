import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MissionlistComponent } from './missionlist/missionlist.component'; './components/missionlist/missionlist.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '101417557-lab-test2-comp3133';
}
