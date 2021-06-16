import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {UserResponse} from "../model/user-response";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UserModal} from "../model/user-modal";
import {MatDialog} from "@angular/material/dialog";
import {UsersService} from "../users.service";
import {TokenStorageService} from "../../auth/service/token-storage.service";
import {NotificationSnackService} from "../../../core/commons/notification-component/notification-snack.service";
import {getUsers} from "../model/users-response";
import {ConfirmDeleteComponent} from "../../../core/commons/confirm-delete/confirm-delete.component";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  animations: [
    trigger('toggleFilters', [
      transition(':enter', [
        style({
          opacity: 0,
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
        }),
        animate('0.15s 0ms ease-out', style({
          opacity: 1,
          height: '*',
          paddingTop: '16px',
          paddingBottom: '16px',
        }))
      ]),
      transition(':leave', [
        animate('0.15s 0ms ease-out', style({
          opacity: 0,
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
        }))
      ]),
    ]),
    trigger('toggleSeacrhButton', [
      state('open', style({
        transform: 'rotate(180deg)',
      })),
      state('closed', style({
        transform: 'rotate(0deg)',
      })),
      transition('open <=> closed', [
        animate('0.15s 0ms ease-out')
      ])
    ]),
    trigger('toggleSearch', [
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
    ]),
  ],
})
export class ListUserComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'age', 'actions'];
  data: UserResponse[] = [];
  dataSource = new MatTableDataSource<UserResponse>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sortTable!: MatSort;

  pageSize = 8; // page size
  pageIndex = 0;
  length = 0; // total count of elements on database
  sortExpression = 'id,asc'; // ordanamiento por defecto

  isShowFiltersEnabled = false;
  isShowClearFiltersEnabled = false;

  filter: UserModal = {
    name: '',
    age: null!,
    email: ''
  };

  searchCtrl!: string;
  searchValue = '';
  loading = false;

  constructor(public dialog: MatDialog,
              private userService: UsersService,
              private tokenStorageService: TokenStorageService,
              private ns: NotificationSnackService) {
  }

  ngOnInit(): void {
    this.initDatatable();
  }

  initDatatable() {
    this.loadData();
  }

  refreshPaginator(size:number) {
    if (size === 0 && this.paginator.hasPreviousPage()) {
      this.paginator.previousPage();
    }
  }

  loadData(doOnSuccess?:any, doOnError?:any) {
    this.userService.filter(this.pageIndex, this.pageSize, this.sortExpression,this.filter).subscribe(response => {
      this.data = getUsers(response);
      this.dataSource.data = this.data;
      this.length = response.page.totalElements;

      this.refreshPaginator(this.data.length);
    }, error => {
    });
  }

  getServerData(event:any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    if (this.searchValue !== '') {
      this.searchDataEvent(this.searchValue);
    } else {
      this.loadData();
    }
  }

  sort(event:any) {
    this.sortExpression = `${event.active},${event.direction}`;
    this.loadData();
  }

  filterEventData(event?:any) {
    this.isShowClearFiltersEnabled = true;
    this.isShowFiltersEnabled = true;
    this.pageIndex = 0;
    this.loadData();
  }

  clearFilters() {
    this.loading = true;
    this.filter = {
      name: '',
      age: null!,
      email: ''
    };
    this.pageSize = 8;
    this.pageIndex = 0;
    this.length = 0;
    this.sortTable.active = 'id';
    this.sortTable.direction = 'asc';
    this.sortTable.sortChange.emit({active: 'id', direction: 'asc'});
    this.isShowClearFiltersEnabled = false;
    this.isShowFiltersEnabled = false
    this.searchValue = '';
    this.loadData();
    this.loading = false;
  }

  showConfirmDeleteDialog(user: UserResponse): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      panelClass: 'panel-class-confirm-delete',
      data: {type: 'el Usuario', name: user.name},
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.deleteUser(user);
      }
    });
  }

  deleteUser(user: UserResponse) {
    this.userService.delete(user.id).subscribe(result => {
      this.ns.openFromComponent({
        title: `Usuario ${user.name}`,
        message: 'Se ha eliminado satisfactoriamente el usuario',
        icon: 'info',
        search: user.name
      }, null!, 9000, 'success');
      this.initDatatable();
    }, error => {
        this.ns.openFromComponent({
          title: `Usuario ${user.name}`,
          message: 'Ha ocurrido un error al eliminar el Usuario.',
          icon: 'error',
          search: user.name
        }, null!, 9000, 'danger');
    });
  }

  searchDataEvent(value?: string) {
    this.loading = true;
    if (value !== undefined) {
      this.searchValue! = value;
    }

    this.userService.search(this.searchValue,this.pageIndex, this.pageSize, this.sortExpression).subscribe(response => {
      this.data = getUsers(response);
      this.dataSource.data = this.data;
      this.length = response.page.totalElements;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
}
