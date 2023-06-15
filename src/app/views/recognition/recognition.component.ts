import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Recognition } from '../../shared/interfaces/recognition/recognition';
import { RecognitionServiceService } from '../../shared/services/recognition/recognition-service.service';

@Component({
  selector: 'app-recognition',
  templateUrl: './recognition.component.html',
  styleUrls: ['./recognition.component.scss']
})
export class RecognitionComponent implements OnInit{

  recognitionForm: FormGroup = this.formBuilder.group({
    listAddressees: [null, [Validators.required]],
    commentDescribe: [null, [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private recognitionServiceService: RecognitionServiceService,
  ) { }
 


public userRecogntion$: Observable<Array<Recognition>> | undefined


ngOnInit(): void {
this.recognitionForm.value
this.userRecogntion$ = this.recognitionServiceService.getListUserRecognition()
  
}

}
