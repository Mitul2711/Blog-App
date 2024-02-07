import { Component, OnInit } from '@angular/core';
import { Sub } from '../models/sub';
import { SubscriberService } from '../services/subscriber.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent implements OnInit {

  isSubscribe: boolean = false

  constructor(private subService: SubscriberService, private toast: NgToastService) {}

  ngOnInit(): void {
    
  }

  onSubmit(formVal: any) {
    const subData: Sub = {
      name: formVal.name,
      email: formVal.email
    }
    
    this.subService.checkSub(subData.email).subscribe(val => {
      if(val.empty) {
        this.subService.addSubs(subData)
        this.isSubscribe = true
        this.toast.success({'detail': 'SUCCESS', summary: 'Subscribed successfully..', duration: 4000})
      } else {
        this.toast.error({'detail': 'ERROR', summary: "Email address is already in used", duration: 4000})
      }
    })
  }

  

}
