import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-validate-input',
  templateUrl: './validate-input.component.html'
})
export class ValidateInputComponent {

  @Input() errorMessage = '';

  constructor() { }
}
