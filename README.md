# Business Day Calculator

The **Business Day Calculator** is an application designed to calculate the number of business days between two given dates. It takes into account weekends and public holidays, ensuring the result only includes weekdays that are not holidays.

### Features
- **Business Day Calculation**: Calculates business days between two dates.
- **Weekend Exclusion**: Excludes weekends (Saturday and Sunday) from the count.
- **Public Holiday Handling**: Excludes public holidays from the business day count.
- **Flexible Holiday List**: Easily configurable to add different public holidays.

### Key Classes

- **`BusinessDayCalculator`**: The main class responsible for calculating business days between two dates.
- **`FixedDayInMonthHoliday`**: Represents a public holiday that occurs on the same day every year.

### Installation

```bash
npm install
```

### Build

```bash
npm run build
```

### Example Usage

Here's how to use the `BusinessDayCalculator` to compute business days between two dates:

```typescript
import { 
  BusinessDayCalculator, 
  FixedDayInMonthHoliday, 
  Month 
} from './dist';

// List of public holidays (e.g., New Year's Day and Christmas Day)
const holidays = [
  new FixedDayInMonthHoliday("New year's eve", 1, Month.January),
  new FixedDayInMonthHoliday("Christmas", 25, Month.December)
];

// Instantiate the BusinessDayCalculator
const businessDayCalculator = new BusinessDayCalculator();

// Define the date range
const startDate = new Date(2024, 11, 1); // December 1, 2024
const endDate = new Date(2024, 11, 31);  // December 31, 2024

// Calculate business days
const businessDays = businessDayCalculator.businessDaysBetweenTwoDates(startDate, endDate, holidays);

// Output the result
console.log(`Business days between ${startDate.toLocaleDateString()} and ${endDate.toLocaleDateString()}: ${businessDays}`);
```

### Input
- **`firstDate`**: The starting date of the range.
- **`secondDate`**: The ending date of the range.
- **`publicHolidays`**: An array of `FixedDayInMonthHoliday` objects, each containing a `day` (number) and `month` (enum).

### Output
The method returns a number representing the number of business days between the two provided dates, excluding weekends and the specified public holidays.

### Example Output
```
Business days between 12/1/2024 and 12/31/2024: 21
```

### How It Works

1. **Excludes Weekends**: The function excludes Saturdays and Sundays by checking if the current date is a weekend.
2. **Excludes Public Holidays**: Public holidays are retrieved for the specified date range, and any date matching a holiday is excluded from the count.
3. **Counts business days**: The method counts the business days between `firstDate` and `secondDate` and checks each date for weekends or holidays.

### Testing

The project includes various unit tests that validate the behavior of the `BusinessDayCalculator`, ensuring that:

- Business days are correctly calculated.
- Weekends are properly excluded.
- Public holidays are properly handled.
- Edge cases like empty holiday lists or single-day ranges are managed.

Run the tests with:

```bash
npm test
```

## Project Structure

```
typescript-date-calculator/
├── src/
│   ├── models/
│   │   ├── DateUtils.ts
│   │   ├── FixedDayInMonthHoliday.ts
│   │   ├── IPublicHoliday.ts
│   │   └── Month.ts
│   ├── services/
│   │   ├── BusinessDayCalculator.ts
│   │   └── IBusinessDayCalculator.ts
│   ├── tests/
│   │   └── BusinessDayCalculator.test.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── jest.config.js
```

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.