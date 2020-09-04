// created in lesson 86
// to make the list of members be displayed as nice cards, not just a list.

import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {

  @Input() user: User; // input is stuff sent from a parent to a child.
    // here, member-list is the parent.

  constructor() { }

  ngOnInit() {
  }

}
