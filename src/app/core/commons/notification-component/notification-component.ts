import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";
import {NotificationComponentData} from "./notification-component-data";

@Component({
  selector: 'app-role-in-user-information',
  templateUrl: './notification-component.html',
  styleUrls: ['./notification-component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(
    public sbRef: MatSnackBarRef<NotificationComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: NotificationComponentData
  ) {}

  ngOnInit(): void {
  }

  public getInnerHtml(element:any) {
    return `<div>${element}</div>`;
  }
}
