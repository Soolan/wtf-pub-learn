import {Component, Input, OnInit} from '@angular/core';
import {MatLegacySnackBar as MatSnackBar} from '@angular/material/legacy-snack-bar';

@Component({
  selector: 'app-share-buttons',
  templateUrl: './share-buttons.component.html',
  styleUrls: ['./share-buttons.component.scss']
})
export class ShareButtonsComponent implements OnInit {
  @Input() shareUrl!: string;
  @Input() message!: string;
  facebook: string = '';
  twitter: string = '';

  constructor(
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.facebook = `https://www.facebook.com/sharer/sharer.php?u=${this.shareUrl}&t=${this.message}`;
    this.twitter =
      `https://twitter.com/intent/tweet?text=${this.message}%0a&url=${this.shareUrl}%0a&via=soolan%0a&hashtags=WriteTheFuture,crypto,course,NFTCertificate`;
  }

  share(url: string) {
    return window.open(url, "_blank");
  }

  copy(): void {
    this.snackBar.open('Page url copied to clipboard', 'X', {duration: 3000})
  }
}
