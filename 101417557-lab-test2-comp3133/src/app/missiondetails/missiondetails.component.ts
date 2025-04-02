import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Launch } from '../../models/spaceX.model';

@Component({
  selector: 'app-missiondetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './missiondetails.component.html',
  styleUrl: './missiondetails.component.css'
})
export class MissiondetailsComponent {
  @Input() mission: Launch | null = null;
}
