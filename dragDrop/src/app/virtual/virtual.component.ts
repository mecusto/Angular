import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-virtual',
  templateUrl: './virtual.component.html',
  styleUrls: ['./virtual.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport, {static : true}) viewport: CdkVirtualScrollViewport;

  personas = Array(500).fill(0);

  constructor() { }

  ngOnInit() {
    console.log(this.personas);
  }

  GoToEnd() {
    this.viewport.scrollToIndex(this.personas.length);
  }

  GoToStart() {
    this.viewport.scrollToIndex(0);
  }

  GoToCenter() {
    this.viewport.scrollToIndex(this.personas.length / 2);
  }

}
