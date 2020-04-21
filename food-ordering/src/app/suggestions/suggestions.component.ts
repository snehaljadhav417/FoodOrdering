import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {
  content: any;
  chunkedData = [];
  chunkSize = 3;

  constructor(private route: ActivatedRoute) {
    this.route.data
      .subscribe((data) => {
        this.content = data.content;
      });
  }

  ngOnInit(): void {
    this.divideDataToChunks('items');
  }

  divideDataToChunks(cuisine: string) {
    this.chunkedData = [];
    for (let i = 0; i < this.content[cuisine].length; i += this.chunkSize) {
      this.chunkedData.push(this.content[cuisine].slice(i, i + this.chunkSize));
    }
  }

}
