import { Component, ChangeDetectorRef } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';


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
  constructor(
    public db: AngularFirestore,
    private route: ActivatedRoute,
    private toastrService: NbToastrService) {
    console.log('this.route.queryParams', this.route.snapshot.params.id);
    this.id = this.route.snapshot.params.id;
    this.getData();

  }

  getData() {
    this.familiesCollection = this.db.collection<any>('family');
    this.families = this.familiesCollection.valueChanges();

    this.families.subscribe(res => {
      this.allFamilies = res;
      this.family = this.allFamilies.find(f => f.id === this.id);
      if (!this.family) {
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

  save() {
    this.familiesCollection.doc(this.id).set(this.family);
    this.showToast();
  }

  showToast() {
    this.toastrService.show(
      status || 'Success',
      `Збережено ;)`);
  }

}
