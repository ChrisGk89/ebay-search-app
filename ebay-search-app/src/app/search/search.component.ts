import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { SearchService } from './search.service';
import * as Rx from 'rxjs/Rx';


export interface PaginationOutput {
  entriesPerPage: string;
  pageNumber: string;
  totalEntries: string;
  totalPages: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit, AfterViewInit {

  items: any[] = [];
  paginationOutput: PaginationOutput | any = {};
  searchResults: any[] = [];
  entriesPerPage = 20;
  resultsToLoad = 100;
  loading = false;
  searchTerm: string;
  @ViewChild('searchBox') input: ElementRef;

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    const debounceInput = Rx.Observable.fromEvent(this.input.nativeElement, 'keyup')
      .map(e =>  (<any>e).target.value).debounceTime(300).filter(val => val.length > 4);

      debounceInput.subscribe((input) => {
        this.loading = true;
        this.searchTerm = input;
        this.searchService.search(this.searchTerm).subscribe((res) => {
          this.loading = false;
          this.items = res;
          this.paginationOutput = {
            entriesPerPage: this.items[0].paginationOutput[0].entriesPerPage[0],
            pageNumber: this.items[0].paginationOutput[0].pageNumber[0],
            totalEntries: this.items[0].paginationOutput[0].totalEntries[0],
            totalPages: this.items[0].paginationOutput[0].totalPages[0]
          };
          this.searchResults = this.items[0].searchResult[0].item;
        });
      });


  }

}
