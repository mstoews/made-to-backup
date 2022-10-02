import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { finalize} from 'rxjs/operators';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { tap} from 'rxjs/operators';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase/compat/app';
import { CommonModule } from '@angular/common';
import { DndDirective } from '../../loaddnd/dnd.directive';



@Component({
  standalone: true,
  imports: [CommonModule, DndDirective, MatDialogModule, ReactiveFormsModule, FormsModule ],
  selector: 'upload-image',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent  {

  public file: any ={};


  percentage: any;
  snapshot: Observable<firebase.storage.UploadTaskSnapshot> | undefined;
  downloadURL!: string;

  constructor(private storage: Storage) {
    this.percentage = of(0);
  }

  chooseFile(event: any) {
    this.file = event.target.files[0];
  }


  addData() {
    const storageRef = ref(this.storage, this.file.name);
    const uploadTask = uploadBytesResumable(storageRef, this.file);

    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    () => {

      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
      });
    });
  }

}
