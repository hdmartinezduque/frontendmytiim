import { Component, ElementRef, Input, ViewChildren, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit{
 @Input() message: string = '';
 @Input() type: string = '';
 @ViewChildren('alert') alert: ElementRef | undefined;

 ngOnInit(): void {
    // setTimeout(() => this.alert?.nativeElement.focus(), 200)
 }

}
