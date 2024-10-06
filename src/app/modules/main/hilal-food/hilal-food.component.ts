import { Component } from '@angular/core';

@Component({
  selector: 'app-hilal-food',
  templateUrl: './hilal-food.component.html',
  styleUrls: ['./hilal-food.component.scss'],
})
export class HilalFoodComponent {
  responsiveOptions: any[] = [];

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
