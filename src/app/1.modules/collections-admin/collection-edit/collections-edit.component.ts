import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Collections } from 'app/5.models/collection';
import { CollectionsService } from 'app/4.services/collections.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DndComponent } from 'app/3.components/loaddnd/dnd.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-collection-edit',
  templateUrl: './collections-edit.component.html',
})
export class CollectionsEditComponent implements OnInit {
  cRAG: any;
  sTitle: any;
  collectionGroup: any;
  isFormDirty = false;
  //collectionImages$: any;

  sub: any;
  @Input() collectionId: string;
  para: string;
  body: string;
  conclusion: string;

  collectionItem: Observable<Collections>;
  allCollectionss$: Observable<Collections[]>;

  collection!: Collections;

  constructor(
    private matDialog: MatDialog,
    private activateRoute: ActivatedRoute,
    private _location: Location,
    private collectionService: CollectionsService,
    private fb: FormBuilder,
    private afs: AngularFirestore,
    @Optional() @Inject(MAT_DIALOG_DATA) public parentId: string
  ) {}

  onValueChange() {
    this.isFormDirty = true;
    //console.debug('Value changed in text editor');
  }

  ngOnInit(): void {
    var id: string;
    this.collection = this.activateRoute.snapshot.data['collection'];
    //this.collectionImages$ = this.collectionService.getCollectionsImage(this.collection.id);

    // console.debug("Collections data", this.collection);

    if (this.collection) {
      this.collectionId = this.collection.id;
      this.body = this.collection.body;
      this.createForm(this.collection);
    }
  }

  UpdateInventoryItem(e: string) {
    console.debug('UpdateInventoryItem', e);
  }

  onUpdate(collection: Collections) {
    const dDate = new Date();
    const updateDate = dDate.toISOString().split('T')[0];
    collection = { ...this.collectionGroup.value } as Collections;
    console.debug('Product can be sold ...: ', collection.published);

    collection.body = this.body;

    collection.date_updated = updateDate;
    this.collectionService.update(collection);
  }

  onCreate(data: any) {
    const dDate = new Date();
    const updateDate = dDate.toISOString().split('T')[0];
    const newCollections = { ...this.collectionGroup.value } as Collections;
    newCollections.date_updated = updateDate;
    newCollections.date_created = updateDate;
    this.collectionService.createCollection(newCollections);
  }

  dateFormatter(params: any) {
    const dateAsString = params.value;
    const dateParts = dateAsString.split('-');
    return `${dateParts[0]} - ${dateParts[1]} - ${dateParts[2].slice(0, 2)}`;
  }

  onBackToCollections() {
    if (this.isFormDirty) {
      const collection = { ...this.collectionGroup.value } as Collections;
      this.onUpdate(collection);
    }
    this._location.back();
  }

  onPublish(collection: Collections) {
    this.collectionService.setToPublish(collection);
  }

  onDelete(data: Collections) {
    if (confirm('Are you sure you want to delete this collection?') === true) {
      this.collectionService.delete(data.id.toString());
    } else {
      console.debug('Cancelled deletion');
    }
  }

  closeDialog() {}

  createForm(collection: Collections) {
    this.sTitle = 'Collections - ' + collection.title;
    this.collectionGroup = this.fb.group({
      id: [collection.id],
      title: [collection.title],
      body: [collection.body],
      user_updated: [collection.user_updated],
      date_created: [collection.date_created],
      date_updated: [collection.date_updated],
      published: [collection.published],
    });
    this.collectionGroup.valueChanges.subscribe((x) => {
      this.isFormDirty = true;
    });
  }

  onImages() {
    const parentId = this.collectionGroup.getRawValue();
    const dialogRef = this.matDialog.open(DndComponent, {
      width: '500px',
      data: {
        parent: parentId.id,
        location: 'collection',
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === undefined) {
        result = { event: 'Cancel' };
      }
      switch (result.event) {
        case 'Create':
          this.create(result.data);
          break;
        case 'Cancel':
          break;
      }
    });
  }

  create(data: any) {
    const rawData = this.collectionGroup.getRawValue();
    this.collectionService.update(rawData);
    this.afs
      .collection('collection')
      .doc(rawData.id)
      .collection('images')
      .add(data);
  }

  createEmptyForm() {
    this.collectionGroup = this.fb.group({
      id: [''],
      title: [''],
      body: [''],
      user_updated: [''],
      date_created: [''],
      date_updated: [''],
    });
  }
}
