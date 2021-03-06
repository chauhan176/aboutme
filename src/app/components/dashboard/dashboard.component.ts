import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  visits;
  total_count;
  total_average;
  maxmindata;
  constructor(private apiService: ApiService) { 
  }

  ngOnInit(): void {
    this.apiService.getvisits().subscribe((data)=>{
      console.log(data);
      this.visits = data['all_data'];
      this.total_count = data['total_counter'];
      this.total_average = data['total_average'];
      this.maxmindata = data['maxmindata'];
    });
  }
}
