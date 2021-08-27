import { Component, ElementRef, forwardRef, Input, OnInit, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
  providers:[{
    provide:NG_VALUE_ACCESSOR,
    useExisting: forwardRef( () => TextInputComponent),
    multi:true
  },
  {
    provide:NG_VALIDATORS,
    useExisting: forwardRef( () => TextInputComponent),
    multi:true
  }]
})
export class TextInputComponent implements ControlValueAccessor {
  // @Input() label:string;
  // @Input() type:'text';


  @ViewChild('input') input: ElementRef;
  disabled;
  @Input() type = 'text';
  @Input() isRequired: boolean = false;
  @Input() pattern: string = null;
  @Input() label: string = null;
  @Input() placeholder: string;
  @Input() errorMsg: string;

  // constructor(@Self() public ngControl: NgControl){
  //   this.ngControl.valueAccessor = this; 
  // }

  onChange(event) { }

  onTouched() { }


  writeValue(obj: any): void {
    this.input.nativeElement.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
