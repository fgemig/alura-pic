import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { element } from 'protractor';

import { UserService } from './../../../core/user/user.service';

@Directive({
  selector: '[appShowIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {

  constructor(
    private element: ElementRef<any>,
    private renderer: Renderer2,
    private userService: UserService) {

  }
  ngOnInit(): void {
    if (!this.userService.isAuthenticated()) {
      this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
    }
  }
}
