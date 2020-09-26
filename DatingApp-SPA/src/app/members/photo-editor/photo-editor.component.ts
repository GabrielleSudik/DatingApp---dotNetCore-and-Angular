import { Component, OnInit, Input } from '@angular/core';
import { Photo } from 'src/app/_models/photo';

// created in (new number) lesson 367

@Component({
  selector: 'app-photo-editor', // put this in the member-edit html: the parent.
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {

  // this comp is a child of member-edit comp, so we to Input()
  @Input() photos: Photo[]

  constructor() { }

  ngOnInit() {
  }

}
