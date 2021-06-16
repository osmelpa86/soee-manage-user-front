import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {MatProgressButtonOptions} from "mat-progress-buttons";

@Component({
  selector: 'search',
  styleUrls: ['./search.component.css'],
  animations: [trigger('toggleSearch', [
    transition(':enter', [
      style({
        opacity: 0,
        width: 0,
      }),
      animate('0.15s 0ms ease-out', style({
        opacity: 1,
        width: '*',
      }))
    ]),
    transition(':leave', [
      animate('0.15s 0ms ease-out', style({
        opacity: 0,
        width: 0,
      }))
    ]),
  ])],
  template: `
      <div [class]="displaySearch === true ? 'search-input-container' : 'search-input-container-no-background'"
           *ngIf="hideSearch">
          <input #searchInput id="searchInput" @toggleSearch
                 class="form-control-search"
                 [(ngModel)]="searchValue"
                 placeholder="¿Qué desea buscar"
                 *ngIf="displaySearch">

          <button mat-icon-button (click)="searchData()" color="primary"
                  [class]="loading && operation == 1 ? 'button-box-search-active' : 'button-box-search'"
                  [class.spinner]="loading && operation == 1"
                  [disabled]="loading && operation == 1"
                  matTooltip="Aceptar"
                  *ngIf="displaySearch">
              <mat-icon style="font-weight: bold;">check</mat-icon>
          </button>

          <button mat-icon-button (click)="clearSearchData()" color="primary"
                  [class]="loading && operation == 2 ? 'button-box-search-active' : 'button-box-search'"
                  [class.spinner]="loading && operation == 2"
                  [disabled]="loading && operation == 2"
                  matTooltip="Cancelar"
                  *ngIf="displaySearch">
              <mat-icon style="font-weight: bold;">close</mat-icon>
          </button>

          <button mat-icon-button (click)="toggleSearch()" color="primary"
                  [class]="loading ? 'button-box-search-toggle-active' : 'button-box-search-toggle'"
                  [class.spinner]="loading"
                  [disabled]="loading"
                  matTooltip="Búscar"
                  *ngIf="displaySearch==true ? false : true">
              <mat-icon>search</mat-icon>
          </button>
      </div>`
})
export class SearchComponent implements OnInit {

  searchValue = null;
  displaySearch = false;

  @Output('toggleSearch') toggle: EventEmitter<any> = new EventEmitter();
  @Output('searchDataEvent') searchDataEvent: EventEmitter<any> = new EventEmitter();
  @Output('clearSearchDataEvent') clearSearchDataEvent: EventEmitter<any> = new EventEmitter();
  @Input('hideSearch') hideSearch: boolean = false;
  @Input('loading') loading = false;
  operation = -1;

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleSearch() {
    this.loading = true;
    setTimeout(() => {
      this.displaySearch = !this.displaySearch;
      this.toggle.emit();
      this.loading = false;
    }, 300);
  }

  searchData() {
    this.operation = 1;
    this.searchDataEvent.emit(this.searchValue);
  }

  clearSearchData() {
    this.operation = 2;
    this.clearSearchDataEvent.emit();
    this.displaySearch = !this.displaySearch;
    this.searchValue = null;
  }
}
