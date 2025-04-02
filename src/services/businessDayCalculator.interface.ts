import { IPublicHoliday } from '../models';

export interface IBusinessDayCalculator {
  businessDaysBetweenTwoDates(firstDate: Date, secondDate: Date, publicHolidays: IPublicHoliday[]): number;
}
