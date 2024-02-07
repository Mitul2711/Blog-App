import { Component, OnInit } from '@angular/core';
import { SubscriberService } from '../services/subscriber.service';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent implements OnInit {

  subscribersArray: any;

  constructor(private subService: SubscriberService) {}

  ngOnInit(): void {
    this.subService.loadData().subscribe(val => {
      this.subscribersArray = val
    }) 
  }

  onDelete(id: any){
    this.subService.deleteData(id);
  }

}
