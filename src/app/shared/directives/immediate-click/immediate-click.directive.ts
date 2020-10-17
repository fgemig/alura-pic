import { Directive, ElementRef, OnInit } from '@angular/core';

import { PlatformDetectorService } from './../../../core/platform/platform-detector.service';

@Directive({
  selector: '[appImmediateClick]'
})
export class ImmediateClickDirective implements OnInit {

  constructor(private el: ElementRef<any>, private platformDetector: PlatformDetectorService) { }

  ngOnInit(): void {

    this.platformDetector.isPlatformBrowser() &&
      this.el.nativeElement.click();
  }
}
