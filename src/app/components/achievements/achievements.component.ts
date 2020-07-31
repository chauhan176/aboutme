import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {

  constructor(private apiService: ApiService) { 
  }

  ngOnInit(): void {
    this.apiService.updateachievements().subscribe((data)=>{
      console.log(data);
    });
  }

}
