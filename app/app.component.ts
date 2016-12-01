//our root app component
import {Component, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

export class Cat {
  id: number = 0;
  name: string = '';
  yield: number = 0;
  duration: number = 0;
  elapsed: number = 0;
  hunting: boolean = false;
  train_cost: number = 0;
}

@Component({
  selector: 'my-app',
  templateUrl: `app/app.component.html`
})
export class AppComponent {
  cash: number = 0;

  cats = [
    { 'id': 1, 'name': 'Sapphire', 'yield': 2, 'duration': 2, 'elapsed': 0, 'hunting': false, 'train_cost': 2},
    { 'id': 2, 'name': 'Cookie Dough', 'yield': 17, 'duration': 7, 'elapsed': 0, 'hunting': false, 'train_cost': 4 },
    { 'id': 3, 'name': 'Charlie', 'yield': 38 , 'duration': 16, 'elapsed': 0, 'hunting': false, 'train_cost': 8 }
  ];

  constructor() {
  }

  train(cat:Cat) {
    this.cash -= cat.train_cost;
    cat.yield = cat.yield * 1.5;
    cat.train_cost = cat.train_cost * 1.6;
  }
  
  hunt(cat:Cat) {
    cat.hunting = true;
  }
  
  finish(cat:Cat) {
    this.cash += cat.yield;
    cat.elapsed = 0;
    cat.hunting = false;
  }

  nextTurn() {
    for (let cat of this.cats) {
      if (cat.hunting) {
        cat.elapsed += 1;
        if (cat.elapsed >= cat.duration) {
          this.finish(cat);
        }
      }
    }
  }
}

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
