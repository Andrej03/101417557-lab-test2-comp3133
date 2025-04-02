import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.services';

@Component({
  selector: 'app-missionfilter',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './missionfilter.component.html',
  styleUrl: './missionfilter.component.css'
})

export class MissionfilterComponent implements OnInit {
  @Output() filterChange = new EventEmitter<{[key: string]: any}>();

  launches: any = [];
  filteredlaunches: any = [];

  // Values to filter
  launch_year: string = '';
  launch_success: string = '';
  land_success: string = '';

  constructor(private DataService: DataService) {};

  ngOnInit(): void {
    this.DataService.getLaunches().subscribe(data => {
      this.launches = data;
      this.filteredlaunches = this.launches;
    });
  }

  onFilter(): void {
    this.filteredlaunches = this.launches.filter((launch: any) => {
      
      const launch_year_match = 
        !this.launch_year || launch.launch_year.toString() === this.launch_year;

      const launch_success_match = 
        !this.launch_success || launch.launch_success === (this.launch_success === 'true');

      const land_success_match = 
        !this.land_success || launch.land_success == (this.land_success === 'true');

      return launch_year_match && launch_success_match && land_success_match;
    });

    this.filterChange.emit({
      launch_year: this.launch_year,
      launch_success: this.launch_success,
      land_success: this.land_success
    });
  }

  onFilterSubmit(): void {
    this.onFilter();
  }

  filterReset() {
    this.launch_year = '';
    this.launch_success = '';
    this.land_success = '';
    this.filteredlaunches = this.launches;

    this.filterChange.emit({});
  }
}
