import { Component, ChangeDetectorRef } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { Route } from '@angular/compiler/src/core';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  // template:`heloworld`,
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  private familiesCollection: AngularFirestoreCollection<any>;
  public families: Observable<any[]>;
  public allFamilies: any[] = [];
  public id: string;
  public family: any;
  public test;
  public hideTab = false;
  private data: any[] = [];
  customColumn = 'name';
  defaultColumns = ['last_name', 'toast', 'description', 'music', 'send'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  dataSource: NbTreeGridDataSource<any>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
  constructor(
    public db: AngularFirestore,
    private route: ActivatedRoute,
    public router: Router,
    private toastrService: NbToastrService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>) {
    this.id = this.route.snapshot.params.id;
    this.getData();

  }

  getData() {
    this.familiesCollection = this.db.collection<any>('family');
    this.families = this.familiesCollection.valueChanges();

    this.families.subscribe(res => {
      this.allFamilies = res;
      this.data = [];
      this.allFamilies.map(f => {
        this.data.push({
          data: { name: f.name, id: f.id, kind: 'dir', send: f.send || false },
          children: [],
        });
        if (f.members) {
          f.members.map(m => {
            this.data[this.data.length - 1].children.push({ data: m });
            const child = this.data[this.data.length - 1].children[this.data[this.data.length - 1].children.length - 1].data;
            child.id = f.id;
            child.music = child.music || '';
            this.data[this.data.length - 1].data.toast = this.data[this.data.length - 1].data.toast || false;
            this.data[this.data.length - 1].data.toast = m.toast ? true : this.data[this.data.length - 1].data.toast;
            this.data[this.data.length - 1].data.music = !this.data[this.data.length - 1].data.music ? child.music : this.data[this.data.length - 1].data.music + '; ' + child.music;

          });
        }
      });
      this.dataSource = this.dataSourceBuilder.create(this.data);
      this.family = this.allFamilies.find(f => f.id === this.id);
      if (!this.family || !this.family.members) {
        this.id = 'adminadmin';
        return;
      }

      const selected = this.family.members.find(m => m.selected === true);
      this.family.members[0].selected = selected ? this.family.members[0].selected : true;

    });

  }

  changeTab($event) {
    this.family.members.map(m => m.selected = false);
    const member = this.family.members.find(m => m.name === $event.tabTitle);
    member.selected = true;
  }

  changeField($event, member, field) {
    member[field] = $event.target.value;
  }

  save(row?) {
    if (row) {
      let family = this.allFamilies.find(f => f.id === row.data.id);
      family.send = !row.data.send;
      this.familiesCollection.doc(row.data.id).set(family);
      this.showToast()
      return;

    }
    this.familiesCollection.doc(this.id).set(this.family);
    this.showToast();
  }

  showToast() {
    this.toastrService.show('',
      `Збережено ;)`);
  }

  getColumnName(column) {
    switch (column) {
      case 'name':
        return 'Имя';
      case 'last_name':
        return 'Фамилия';
      case 'toast':
        return 'Тост';
      case 'description':
        return 'О себе';
      case 'music':
        return 'Музика';
      case 'send':
        return 'Отправлено'
    }
  }

  goTo(data) {
    if (data.kind === 'dir') {
      return;
    }
    window.open(`https://wedding-invitation-oplachko.herokuapp.com/${data.id}`);
    // window.open(`http://localhost:4200/${data.id}`);
  }

}
