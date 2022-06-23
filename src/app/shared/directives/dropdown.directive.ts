import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen: boolean = false;

  // Opening and closing from The Same Button
  // @HostListener('click', ['$event'])
  // toggleOpen($event: Event) {
  //   this.isOpen = !this.isOpen;
  // }

  // constructor() {}

  // Opening from Button But closing by clicking Anyhwere Else
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    // console.log(this.elRef.nativeElement);
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }
  constructor(private elRef: ElementRef) {}
}
