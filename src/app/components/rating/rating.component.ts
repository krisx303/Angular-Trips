import {
  Component,
  Directive,
  QueryList,
  ViewChildren,
  Input,
  EventEmitter,
  Output,
  OnInit,
} from '@angular/core';

@Directive({ selector: '.star' })
export class Star {
  @Input() id!: string;
}

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  @ViewChildren('star') stars!: QueryList<any>;
  @Input() rating: number = 0;
  @Output() addRating = new EventEmitter<number>();
  clicked: boolean = false;

  ngOnInit(): void {
    if (this.rating != 0) {
      this.clicked = true;
      this.actual = this.rating;
    }
  }

  actual: number = 0;
  onStartHover(index: number) {
    if (this.clicked) return;
    this.actual = index;
  }

  onEndHover() {
    if (!this.clicked) this.actual = 0;
  }

  onStarClick(index: number) {
    if (this.clicked) return;
    this.rating = index;
    this.clicked = true;
    this.addRating.emit(this.rating);
  }
}
