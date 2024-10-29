import { asianCountries } from './countries/asia';
import { europeanCountries } from './countries/europe';
import { americanCountries } from './countries/americas';
import { africanCountries } from './countries/africa';
import { oceaniaCountries } from './countries/oceania';

export const countries = [
  ...asianCountries,
  ...europeanCountries,
  ...americanCountries,
  ...africanCountries,
  ...oceaniaCountries
];