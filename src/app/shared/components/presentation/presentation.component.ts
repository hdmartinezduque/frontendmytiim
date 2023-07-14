import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit{
  errorMessage: string = '';
  showError: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
