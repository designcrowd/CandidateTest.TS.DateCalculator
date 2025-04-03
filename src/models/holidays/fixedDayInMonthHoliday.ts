import { Month } from '..';
import { PublicHoliday } from './publicHoliday';

export class FixedDayInMonthHoliday implements PublicHoliday {
  holidayName: string;
  day: number;
  month: Month;

  constructor(holidayName: string, day: number, month: Month) {
    this.holidayName = holidayName;
    this.day = day;
    this.month = month;
  }

  getHolidayDate(year: number): Date {
    return new Date(year, this.month - 1, this.day);
  }
}
