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

  // initializing the parameters which the filters should take to give the correct filteing resluts
  onFilter(): void {
    this.filteredlaunches = this.launches.filter((launch: any) => {
      
      // only a year which is in the api will give information
      const launch_year_match = 
        !this.launch_year || launch.launch_year.toString() === this.launch_year;

      // success rate given as true in the api will come as true in here, else it will be false
      const launch_success_match = 
        !this.launch_success || launch.launch_success === (this.launch_success === 'true');

      // same concept as launch_success
      const land_success_match = 
        !this.land_success || launch.land_success == (this.land_success === 'true');

      return launch_year_match && launch_success_match && land_success_match;
    });


    // allow for the instancialized data to be retrieved and emited as a filter
    this.filterChange.emit({
      launch_year: this.launch_year,
      launch_success: this.launch_success,
      land_success: this.land_success
    });
  }

  // set the filters button linked in the html
  onFilterSubmit(): void {
    this.onFilter();
  }

  // reseting filters by setting their values to null/NaN and emiting changes
  filterReset() {
    this.launch_year = '';
    this.launch_success = '';
    this.land_success = '';
    this.filteredlaunches = this.launches;

    this.filterChange.emit({});
  }
}
