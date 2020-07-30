import { Component } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


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
  private id:string;
  public family:any;
  constructor(
    db: AngularFirestore,
    private route: ActivatedRoute) {
    console.log('this.route.queryParams', this.route.snapshot.params.id);
    this.id= this.route.snapshot.params.id;

    this.familiesCollection = db.collection<any>('family');
    this.families = this.familiesCollection.valueChanges();

    this.families.subscribe(res => {
        this.allFamilies = res;
        this.family= this.allFamilies.find(f=>f.id===this.id);
    });

  }
}
