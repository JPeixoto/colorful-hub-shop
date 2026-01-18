export type CountryCode =
  | 'US'
  | 'UK'
  | 'DE'
  | 'FR'
  | 'ES'
  | 'IT'
  | 'NL'
  | 'PL'
  | 'SE'
  | 'BE'
  | 'IE'
  | 'JP'
  | 'CA'
  | 'AU';

export interface Country {
  code: CountryCode;
  name: string;
  flagUrl: string; // Changed from flag (emoji) to flagUrl (image)
  marketplace: string;
  region: string;
}

// Helper to get flag URL
const getFlagUrl = (isoCode: string) => `https://flagcdn.com/w40/${isoCode.toLowerCase()}.png`;

export const COUNTRIES: Record<CountryCode, Country> = {
  US: { code: 'US', name: 'United States', flagUrl: getFlagUrl('us'), marketplace: 'amazon.com', region: 'NA' },
  UK: { code: 'UK', name: 'United Kingdom', flagUrl: getFlagUrl('gb'), marketplace: 'amazon.co.uk', region: 'EU' }, // Note: UK uses 'gb' for flag
  DE: { code: 'DE', name: 'Germany', flagUrl: getFlagUrl('de'), marketplace: 'amazon.de', region: 'EU' },
  FR: { code: 'FR', name: 'France', flagUrl: getFlagUrl('fr'), marketplace: 'amazon.fr', region: 'EU' },
  ES: { code: 'ES', name: 'Spain', flagUrl: getFlagUrl('es'), marketplace: 'amazon.es', region: 'EU' },
  IT: { code: 'IT', name: 'Italy', flagUrl: getFlagUrl('it'), marketplace: 'amazon.it', region: 'EU' },
  NL: { code: 'NL', name: 'Netherlands', flagUrl: getFlagUrl('nl'), marketplace: 'amazon.nl', region: 'EU' },
  PL: { code: 'PL', name: 'Poland', flagUrl: getFlagUrl('pl'), marketplace: 'amazon.pl', region: 'EU' },
  SE: { code: 'SE', name: 'Sweden', flagUrl: getFlagUrl('se'), marketplace: 'amazon.se', region: 'EU' },
  BE: { code: 'BE', name: 'Belgium', flagUrl: getFlagUrl('be'), marketplace: 'amazon.com.be', region: 'EU' },
  IE: { code: 'IE', name: 'Ireland', flagUrl: getFlagUrl('ie'), marketplace: 'amazon.ie', region: 'EU' },
  JP: { code: 'JP', name: 'Japan', flagUrl: getFlagUrl('jp'), marketplace: 'amazon.co.jp', region: 'APAC' },
  CA: { code: 'CA', name: 'Canada', flagUrl: getFlagUrl('ca'), marketplace: 'amazon.ca', region: 'NA' },
  AU: { code: 'AU', name: 'Australia', flagUrl: getFlagUrl('au'), marketplace: 'amazon.com.au', region: 'APAC' },
};

// Map actual user country to the target store country
export const COUNTRY_MAPPING: Record<string, CountryCode> = {
  GB: 'UK', // United Kingdom (ISO code)
  PT: 'ES', // Portugal -> Spain
  AT: 'DE', // Austria -> Germany
  CH: 'DE', // Switzerland -> Germany
  NZ: 'AU', // New Zealand -> Australia
};

export function getMappedCountry(userCountryCode: string): CountryCode {
  const code = userCountryCode.toUpperCase();

  // 1. Check direct mapping
  if (COUNTRY_MAPPING[code]) {
    return COUNTRY_MAPPING[code];
  }

  // 2. Check if it's a supported country directly
  if (code in COUNTRIES) {
    return code as CountryCode;
  }

  // 3. Fallback
  return 'US';
}
