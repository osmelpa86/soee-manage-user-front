import { Directive, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[appMaxLength]"
})
export class MaxLengthDirective {
  @Input() appMaxLength:string='';
  constructor() {}

  @HostListener("keydown", ["$event"]) onKeydown(event:any) {
    const value = event.target.value;
    const maxLength = parseInt(this.appMaxLength);
    if (value.length > maxLength -1) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
