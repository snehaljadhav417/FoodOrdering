import { Component, OnInit } from '@angular/core';
import {MenuService} from "../services/menu/menu.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  content: any;
  chunkedData = [];
  chunkSize = 3;
  tab = 1;

  constructor(private menuService: MenuService, private route: ActivatedRoute) {
    this.route.data
      .subscribe((data) => {
        this.content = data.content;
      });
  }

  ngOnInit(): void {
    this.divideDataToChunks('indian');
  }

  setTab(tabNumber: number, cuisine: string) {
    this.tab = tabNumber;
    this.divideDataToChunks(cuisine);
  }

  divideDataToChunks(cuisine: string) {
    this.chunkedData = [];
    for(let i = 0; i < this.content[cuisine].length; i += this.chunkSize) {
      this.chunkedData.push(this.content[cuisine].slice(i, i + this.chunkSize));
    }
  }
}
