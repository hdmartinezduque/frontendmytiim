import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'validateFechaCumplimiento'
})
export class ValidateFechaCumplimientoPipe implements PipeTransform {

  transform(date: string): unknown {
    const currentDate =  moment(new Date())
    const tableDate = moment(date, "DD/MM/YYYY");

    return !currentDate.isSameOrBefore(tableDate, 'day');
  }

}
