import {Component, Input, OnInit} from '@angular/core';

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

  constructor() {
  }

  ngOnInit(): void {
    // let searchParams = new URLSearchParams();
    // searchParams.set('url', this.shareUrl);

    this.facebook = `https://www.facebook.com/sharer/sharer.php?u=${this.shareUrl}&t=${this.message}`;
    this.twitter =
      `https://twitter.com/intent/tweet?url=${this.shareUrl}%0a&via=soolan&text=${this.message}%0a&hashtags=WinTheFuture,crypto,course,xrpl,NFTCertificate`;
  }

  share(url: string) {
    return window.open(url, "_blank");
  }
}
