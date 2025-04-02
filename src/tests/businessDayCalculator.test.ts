import { BusinessDayCalculator } from '../services';
import { FixedDayInMonthHoliday, IPublicHoliday, Month } from '../models';

// Declare Jest test functions to fix TypeScript errors
declare const describe: (name: string, fn: () => void) => void;
declare const beforeEach: (fn: () => void) => void;
declare const test: {
  (name: string, fn: () => void): void;
  each: (table: any[]) => (name: string, fn: (...args: any[]) => void) => void;
};
declare const expect: (actual: any) => any;

describe('BusinessDayCalculator', () => {
  let calculator: BusinessDayCalculator;

  beforeEach(() => {
    calculator = new BusinessDayCalculator();
  });

  test('should return zero when dates are subsequent days', () => {
    // Arrange
    const expectedResult = 0;
    const startDate = new Date(2025, 1, 3); // Monday, February 3rd
    const endDate = new Date(2025, 1, 4); // Tuesday, February 4th
    const holidays: IPublicHoliday[] = [];

    // Act
    const result = calculator.businessDaysBetweenTwoDates(startDate, endDate, holidays);

    // Assert
    expect(result).toBe(expectedResult);
  });

  test('should return one when date between Monday to Wednesday and no holidays', () => {
    // Arrange
    const expectedResult = 1;
    const startDate = new Date(2025, 1, 3); // Monday, February 3rd
    const endDate = new Date(2025, 1, 5); // Wednesday, February 5th
    const holidays: IPublicHoliday[] = [];

    // Act
    const result = calculator.businessDaysBetweenTwoDates(startDate, endDate, holidays);

    // Assert
    expect(result).toBe(expectedResult);
  });

  test('should calculate properly when passing one week with no holidays', () => {
    // Arrange
    const expectedResult = 4;
    const startDate = new Date(2025, 1, 3); // Monday, February 3rd
    const endDate = new Date(2025, 1, 10); // Monday, February 10th
    const holidays: IPublicHoliday[] = [];

    // Act
    const result = calculator.businessDaysBetweenTwoDates(startDate, endDate, holidays);

    // Assert
    expect(result).toBe(expectedResult);
  });

  test('should return zero when date between Monday and Wednesday with Tuesday holiday', () => {
    // Arrange
    const expectedResult = 0;
    const startDate = new Date(2025, 1, 3); // Monday, February 3rd
    const endDate = new Date(2025, 1, 5); // Wednesday, February 5th
    const holidays: IPublicHoliday[] = [
      new FixedDayInMonthHoliday('Test Holiday', 4, Month.February)
    ];

    // Act
    const result = calculator.businessDaysBetweenTwoDates(startDate, endDate, holidays);

    // Assert
    expect(result).toBe(expectedResult);
  });

  test('should calculate properly when one week and there is one holiday in between', () => {
    // Arrange
    const expectedResult = 3;
    const startDate = new Date(2025, 1, 3); // Monday, February 3rd
    const endDate = new Date(2025, 1, 10); // Monday, February 10th
    const holidays: IPublicHoliday[] = [
      new FixedDayInMonthHoliday('Test Holiday', 4, Month.February)
    ];

    // Act
    const result = calculator.businessDaysBetweenTwoDates(startDate, endDate, holidays);

    // Assert
    expect(result).toBe(expectedResult);
  });

  test('should calculate properly when passing a month with in and out holidays', () => {
    // Arrange
    const expectedResult = 21;
    const startDate = new Date(2024, 0, 1); // Monday, January 1st
    const endDate = new Date(2024, 0, 31); // Wednesday, January 31st
    const holidays: IPublicHoliday[] = [
      new FixedDayInMonthHoliday("New year's eve", 1, Month.January),
      new FixedDayInMonthHoliday("Christmas", 25, Month.December)
    ];

    // Act
    const result = calculator.businessDaysBetweenTwoDates(startDate, endDate, holidays);

    // Assert
    expect(result).toBe(expectedResult);
  });

  test.each([
    [new Date(2024, 9, 7), new Date(2024, 9, 9), 1], // Oct 7 to Oct 9
    [new Date(2024, 9, 5), new Date(2024, 9, 14), 5], // Oct 5 to Oct 14
    [new Date(2024, 9, 7), new Date(2025, 0, 1), 61], // Oct 7 to Jan 1
    [new Date(2024, 9, 7), new Date(2024, 9, 5), 0] // Oct 7 to Oct 5 (reverse)
  ])('should return expected result when not using holidays (%s, %s, %i)', 
    (firstDate, secondDate, expectedDays) => {
      // Act
      const result = calculator.businessDaysBetweenTwoDates(firstDate, secondDate, []);

      // Assert
      expect(result).toBe(expectedDays);
    }
  );

  test.each([
    [new Date(2024, 9, 7), new Date(2024, 9, 9), 1], // Oct 7 to Oct 9
    [new Date(2024, 11, 24), new Date(2024, 11, 27), 0], // Dec 24 to Dec 27
    [new Date(2024, 9, 7), new Date(2025, 0, 1), 59] // Oct 7 to Jan 1
  ])('should return expected result when adding holidays (%s, %s, %i)',
    (firstDate, secondDate, expectedDays) => {
      // Arrange
      const holidays: IPublicHoliday[] = [
        new FixedDayInMonthHoliday('Christmas', 25, Month.December),
        new FixedDayInMonthHoliday('Boxing Day', 26, Month.December),
        new FixedDayInMonthHoliday('New Years', 1, Month.January)
      ];

      // Act
      const result = calculator.businessDaysBetweenTwoDates(firstDate, secondDate, holidays);

      // Assert
      expect(result).toBe(expectedDays);
    }
  );
});
