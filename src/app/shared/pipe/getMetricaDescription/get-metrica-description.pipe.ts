import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Metrica } from 'src/app/shared/interfaces/objectives/objective.interface';

@Pipe({
  name: 'getMetricaDescription'
})
export class GetMetricaDescriptionPipe implements PipeTransform {

  transform(measureId: number, measures?: Array<Metrica>): string {
    return measures?.filter((measure: Metrica) => measure.measureId === measureId)[0]?.measureDescribe || '';
  }

}
