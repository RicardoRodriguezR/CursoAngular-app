import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thank-you-page',
  template: `
  <div class="container">
  <h1 class="title">thank you!</h1>
  <p class="content">Your order is on the way</p>
  <span>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit similique eveniet nam corporis ea quaerat odio vel, sunt distinctio harum aperiam pariatur hic quos nemo 
    molestias illo asperiores. Quidem, aut!
  </span>
</div>`,
  styleUrls: ['./thank-you-page.component.scss']
})
export class ThankYouPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
