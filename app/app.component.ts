//our root app component
import {Component, NgModule, NgOnInit} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {AppService} from './app.service'

export class Cat {
  id: number = 0;
  name: string = '';
  yield: number = 0;
  duration: number = 0;
  elapsed: number = 0;
  hunting: boolean = false;
  train_cost: number = 0;
  auto: boolean = false;
  level: number = 1;
}

@Component({
  selector: 'my-app',
  templateUrl: `app/app.component.html`,
  providers: [AppService]
})
export class AppComponent {
  cash: number = 0;
  running: boolean = false;
  timer: any = null;

  constructor(private app:AppService) {
  }

  ngOnInit() {
    this.start();
  }

  cats = [
    { 'id': 1, 'name': 'Sapphire', 'yield': 2, 'duration': 2, 'elapsed': 0, 'hunting': false, 'train_cost': 2, 'auto': false, 'level': 1},
    { 'id': 2, 'name': 'Cookie Dough', 'yield': 17, 'duration': 7, 'elapsed': 0, 'hunting': false, 'train_cost': 4, 'auto': false, 'level': 1 },
    { 'id': 3, 'name': 'Charlie', 'yield': 38 , 'duration': 16, 'elapsed': 0, 'hunting': false, 'train_cost': 8, 'auto': false, 'level': 1 }
  ];

  start() {
    this.running = true;
    this.timer = setInterval(() => this.nextTurn(), 10);
  }

  stop() {
    this.running = false;
    clearInterval(this.timer);
  }

  train(cat:Cat) {
    this.cash -= cat.train_cost;
    cat.yield = cat.yield * 1.5;
    cat.train_cost = cat.train_cost * 1.6;
    cat.level++;
    if (cat.level == 5) {
      cat.auto = true;
    }
  }
  
  hunt(cat:Cat) {
    cat.hunting = true;
  }
  
  finish(cat:Cat) {
    this.cash += cat.yield;
    cat.elapsed = 0;

    if (!cat.auto) {
      cat.hunting = false;
    }
  }

  nextTurn() {
    for (let cat of this.cats) {
      if (cat.hunting) {
        cat.elapsed += .01;
        if (cat.elapsed >= cat.duration) {
          this.finish(cat);
        }
      }
    }
  }
}
