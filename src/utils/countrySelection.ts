import { countries } from '../data/countries';

const generateDailySeed = () => {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
};

const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

const encodeCountry = (countryName: string): string => {
  return encodeURIComponent(btoa(encodeURIComponent(countryName)));
};

const decodeCountry = (encoded: string): string | null => {
  try {
    return decodeURIComponent(atob(decodeURIComponent(encoded)));
  } catch {
    return null;
  }
};

export const getRandomCountry = (usedCountries: Set<string>, allCountries: any[], shareId?: string | null) => {
  if (shareId === 'daily') {
    const seed = generateDailySeed();
    const index = hashString(seed) % allCountries.length;
    return allCountries[index];
  }

  if (shareId) {
    const countryName = decodeCountry(shareId);
    if (countryName) {
      const country = allCountries.find(c => c.name === countryName);
      if (country) return country;
    }
  }

  const availableCountries = allCountries.filter(c => !usedCountries.has(c.name));
  if (availableCountries.length === 0) {
    return allCountries[Math.floor(Math.random() * allCountries.length)];
  }
  
  return availableCountries[Math.floor(Math.random() * availableCountries.length)];
};

export const generateShareableLink = (countryName: string, isDaily: boolean = false): string => {
  const baseUrl = window.location.origin;
  const params = isDaily ? 'daily' : encodeCountry(countryName);
  return `${baseUrl}?c=${params}`;
};