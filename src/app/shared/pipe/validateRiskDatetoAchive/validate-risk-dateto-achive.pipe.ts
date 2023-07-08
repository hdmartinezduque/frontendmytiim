import { Pipe, PipeTransform } from '@angular/core';
import { Compromise } from '../../interfaces/objectives/objective.interface';
import * as moment from 'moment';

@Pipe({
  name: 'validateRiskDatetoAchive',
})
export class ValidateRiskDatetoAchivePipe implements PipeTransform {
  transform(data: Compromise): unknown {
    if (data.commitmentAdvance >= data.commitmentGoal) {
      return false;
    }
    const currentDate = moment(new Date());
    const tableDate = moment(data.commitmentDate, 'DD/MM/YYYY');
    const riskConst = tableDate.toDate().getTime() - 86400000 * 2;
    const riskDate = moment(new Date(riskConst));

    return (
      currentDate.isSameOrBefore(tableDate, 'day') &&
      currentDate.isSameOrAfter(riskDate, 'day')
    );
  }
}
