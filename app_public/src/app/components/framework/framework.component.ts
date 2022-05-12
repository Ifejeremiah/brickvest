import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Renderer2, Inject } from '@angular/core';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.css']
})
export class FrameworkComponent implements OnInit {

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.attachScripts()
  }

  private attachScripts() {
    let script = this.renderer.createElement('script');
    script.type = `text/javascript`;
    script.src = `assets/javascripts/script.js`;
    this.renderer.appendChild(this.document.body, script);
  }

}
