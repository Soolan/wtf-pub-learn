import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.scss']
})
export class ReleaseNotesComponent implements OnInit {
  @Input() title!: string;
  @Input() bullets!: string[];
  entry: any = {
    Features: 'feature',
    Improvements: 'improvement',
    Fixes: 'fix',
    Operations: 'operation'
  }

  constructor() { }

  ngOnInit(): void {
    this.bullets = this.bullets.map(bullet => bullet[this.entry[this.title]]);
  }
}
