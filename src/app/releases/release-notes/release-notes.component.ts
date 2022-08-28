import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.scss']
})
export class ReleaseNotesComponent implements OnInit {

  @Input() title!: string;
  @Input() bullets!: string[];
  constructor() { }

  ngOnInit(): void {
  }

}
