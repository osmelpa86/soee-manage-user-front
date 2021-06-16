import {Component, ContentChild, HostListener, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  @ViewChild('rightSidenav') public rightSidenav?: MatSidenav;
  reason = '';
  @Input()
  public sidenavContentTemplate?: TemplateRef<any>;
  @Input()
  public filterContentTemplate?: TemplateRef<any>;
  @Input() public filterContentTemplateHeader?: TemplateRef<any>;
  @Input() public filterContentTemplateFooter?: TemplateRef<any>;

  constructor() {
  }

  public open() {
    this.rightSidenav!.open();
  }

  public close(reason: string) {
    this.reason = reason;
    this.rightSidenav!.close();
  }

  public toggle() {
    this.rightSidenav!.toggle();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(evt: KeyboardEvent) {
    this.rightSidenav!.close();
  }
}
