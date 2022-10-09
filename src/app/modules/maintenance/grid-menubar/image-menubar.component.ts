import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IProduct } from 'app/interfaces/mt-Products';
import { Observable } from 'rxjs';

interface IValue {
  value: string;
  viewValue: string;
  menuDesc: string;
}

@Component({
  selector: 'images-menubar',
  templateUrl: './image-menubar.component.html',
  styleUrls: ['./image-menubar.component.scss'],
})
export class ImagesMenubarComponent implements OnInit {
  @Output() notifyParentAdd: EventEmitter<any> = new EventEmitter();
  @Output() notifyParentRefresh: EventEmitter<any> = new EventEmitter();
  @Output() notifyParentDelete: EventEmitter<any> = new EventEmitter();
  @Output() notifyParentClone: EventEmitter<any> = new EventEmitter();
  @Output() notifyMenuItemChanged: EventEmitter<any> = new EventEmitter();

  @Input() public inTitle: string;
  @Input() public selected: string;
  public menuItems: IValue[];

  constructor() { }

  ngOnInit(): void {

  }

  onRefresh(): void {
    this.notifyParentRefresh.emit();
  }

  onClickAdd(): void {
    console.log('Menu bar nofication emit');
    this.notifyParentAdd.emit();
  }

  onClickDelete(): void {
    console.log('Menu bar nofication emit');
    this.notifyParentDelete.emit();
  }

  onClickClone(): void {
    console.log('Menu bar nofication emit');
    this.notifyParentClone.emit();
  }

  onClickRefresh(): void {
    console.log('Menu bar nofication emit');
    this.onRefresh();
  }
}
