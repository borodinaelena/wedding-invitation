import { Component } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  private familiesCollection: AngularFirestoreCollection<any>;
  private familyMembersCollection: AngularFirestoreCollection<any>;
  public families: Observable<any[]>;
  public familyMembers: Observable<any[]>;
  public allFamilies: any[] = [];
  constructor(
    db: AngularFirestore,
    private route: ActivatedRoute) {
    console.log('this.route.queryParams', this.route.snapshot.params.id);

    this.familiesCollection = db.collection<any>('family');
    this.familyMembersCollection = db.collection<any>('family_member');
    this.families = this.familiesCollection.valueChanges();
    this.familyMembers = this.familyMembersCollection.valueChanges();

    this.families.subscribe(f => {
      this.familyMembers.subscribe(m => {
        f.map(family => {
          family.membersInfo = [];
          family.members.map((member, i) => {
            family.membersInfo.push(m.find(element => element.id === member));
          });
        });
        this.allFamilies = f;
      });
    });
  }
}
