import { PublicHoliday } from '../models';
import { DateUtils } from '../utils';

export class BusinessDayCalculator {
  businessDaysBetweenTwoDates(
    firstDate: Date,
    secondDate: Date,
    publicHolidays: PublicHoliday[],
  ): number {
    let businessDays = 0;
    const currentDate = new Date(firstDate);
    currentDate.setDate(currentDate.getDate() + 1);

    const holidays = this.getAllHolidays(firstDate, secondDate, publicHolidays);

    while (currentDate.getTime() < secondDate.getTime()) {
      if (
        !DateUtils.isWeekend(currentDate) &&
        !holidays.some(holiday => this.isSameDay(holiday, currentDate))
      ) {
        businessDays++;
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return businessDays;
  }

  private getAllHolidays(
    firstDate: Date,
    secondDate: Date,
    publicHolidays: PublicHoliday[],
  ): Date[] {
    const holidays: Date[] = [];
    for (
      let currentYear = firstDate.getFullYear();
      currentYear <= secondDate.getFullYear();
      currentYear++
    ) {
      for (const holiday of publicHolidays) {
        holidays.push(holiday.getHolidayDate(currentYear));
      }
    }
    return holidays;
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}
