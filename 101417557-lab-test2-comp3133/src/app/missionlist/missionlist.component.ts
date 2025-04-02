import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// linked imports from other components

import {MissiondetailsComponent} from '../missiondetails/missiondetails.component';
import {MissionfilterComponent} from '../missionfilter/missionfilter.component';

// linked models
import { Launch} from '../../models/spaceX.model';
import { DataService } from '../../services/data.services';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [CommonModule, MissiondetailsComponent, MissionfilterComponent],
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})

export class MissionlistComponent implements OnInit {
  launches: Launch[] = [];
  filteredLaunch: Launch[] = [];
  selectedLaunch: Launch | null = null;

  // recievers
  loading = true; // base set if the data is correct
  error = false; // base set if the data is correct, no errors

  ngOnInit(): void {
    this.fetchLaunches();
  }

  constructor(private dataService: DataService) {}

  fetchLaunches(filter: { [key: string]: any} = {}): void {    
    this.loading = true;
    this.error = false;

    // gets called to fetch the data and allow filters to be applied
    this.dataService.getFilteredLaunches(filter)
      // .subscribe(launches => {
      //   this.launches = launches;
      //   this.filteredLaunch = this.launches;
      //   this.loading = false;
      // add internal error handling
      
      .subscribe({
      next: (launches) => {
        this.launches = launches;
        this.filteredLaunch = this.launches;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
      }
    );
  }

  // Sets base for filters of the data
  applyLaunchFilter(filter: {[key: string]: any}): void {
    this.fetchLaunches(filter);
    this.selectedLaunch = null;
  }

  // Examines the data for the selected launch
  onSelectLaunch(launch: Launch): void {
    this.selectedLaunch = launch;
  }
}
