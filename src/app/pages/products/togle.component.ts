import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "toggle",
  template: `
  <div class="item" [class.checked]="checked" (click)="toggle()">adsad</div>
  `,
  styles:[
    `
      .item{
        background:blue;
        width:200px;
        height:200px
      }
      .checked{
        background:red;
      }
    `
  ]
})
export class ToggleComponent {
  @Input() checked= true;
  @Output() checkedChange = new EventEmitter<boolean>();

  toggle(){
    this.checkedChange.emit(!this.checked)
  }
}
