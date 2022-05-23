import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
export class Data {
  totalResults!: number;
  perPage!: number;
  currentPage!: number;
  totalPages!: number;
  pagingCounter!: number;
  hasPrevPage!: boolean;
  hasNextPage!: boolean
  prevPage!: null | number;
  nextPage!: null | number;
  totalLimit!: number;
}

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css']
})
export class PaginateComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  @Input() public allData!: Data;

  @Output() returnDataEvent = new EventEmitter<any>();

  private getUserId(): string {
    return this.authService.getCurrentUserId()
  }

  public previous() {
    const { hasPrevPage, prevPage, totalLimit } = this.allData;
    const toPreviousPage = hasPrevPage ? prevPage : 1;

    this.returnDataEvent.emit({
      userId: this.getUserId(),
      page: toPreviousPage,
      limit: totalLimit
    });
  }

  public next() {
    const { hasNextPage, nextPage, totalPages, totalLimit } = this.allData;
    const toNextPage = hasNextPage ? nextPage : totalPages;
    this.returnDataEvent.emit({
      userId: this.getUserId(),
      page: toNextPage,
      limit: totalLimit
    });
  }

}
