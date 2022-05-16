import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.css']
})
export class FrameworkComponent implements OnInit {
  constructor(
  ) { }

  ngOnInit(): void {
    this.scripts()
  }

  private scriptElement!: HTMLScriptElement

  private scripts() {
    const scripts = [
      {
        src: 'assets/javascripts/script.js',
        elem: document.body,
      },
      {
        src: 'https://checkout.flutterwave.com/v3.js',
        elem: document.body
      }
    ]

    scripts.forEach((script) => {
      this.scriptElement = document.createElement('script')
      this.scriptElement.src = script.src
      script.elem.appendChild(this.scriptElement)
    })
  }

}
