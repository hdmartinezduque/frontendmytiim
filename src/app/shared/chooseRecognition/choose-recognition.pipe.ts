import { Pipe, PipeTransform } from '@angular/core';
import { Recognition, RecognitionGeneral } from '../interfaces/recognition/recognition';

@Pipe({
  name: 'chooseRecognition'
})
export class ChooseRecognitionPipe implements PipeTransform {

  transform(recognitionGeneral: RecognitionGeneral, buttonList: number): Array<Recognition> {
    return recognitionGeneral[Number(buttonList) === 1 ? 'userRecognitionData' : 'teamRecognitionData']
  }

}
