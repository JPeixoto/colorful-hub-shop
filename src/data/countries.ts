export type CountryCode = 'US' | 'ES' | 'DE' | 'UK' | 'FR' | 'IT' | 'PT' | 'BR' | 'CA' | 'AU' | 'NL' | 'OTHER';

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
  ES: { code: 'ES', name: 'Spain', flagUrl: getFlagUrl('es'), marketplace: 'amazon.es', region: 'EU' },
  DE: { code: 'DE', name: 'Germany', flagUrl: getFlagUrl('de'), marketplace: 'amazon.de', region: 'EU' },
  UK: { code: 'UK', name: 'United Kingdom', flagUrl: getFlagUrl('gb'), marketplace: 'amazon.co.uk', region: 'EU' }, // Note: UK uses 'gb' for flag
  FR: { code: 'FR', name: 'France', flagUrl: getFlagUrl('fr'), marketplace: 'amazon.fr', region: 'EU' },
  IT: { code: 'IT', name: 'Italy', flagUrl: getFlagUrl('it'), marketplace: 'amazon.it', region: 'EU' },
  PT: { code: 'PT', name: 'Portugal', flagUrl: getFlagUrl('pt'), marketplace: 'amazon.es', region: 'EU' },
  BR: { code: 'BR', name: 'Brazil', flagUrl: getFlagUrl('br'), marketplace: 'amazon.com.br', region: 'SA' },
  CA: { code: 'CA', name: 'Canada', flagUrl: getFlagUrl('ca'), marketplace: 'amazon.ca', region: 'NA' },
  AU: { code: 'AU', name: 'Australia', flagUrl: getFlagUrl('au'), marketplace: 'amazon.com.au', region: 'OC' },
  NL: { code: 'NL', name: 'Netherlands', flagUrl: getFlagUrl('nl'), marketplace: 'amazon.nl', region: 'EU' },
  OTHER: { code: 'OTHER', name: 'Other', flagUrl: 'https://flagcdn.com/w40/un.png', marketplace: 'amazon.com', region: 'Global' },
};

// Map actual user country to the target store country
export const COUNTRY_MAPPING: Record<string, CountryCode> = {
  PT: 'ES', // Portugal -> Spain
  AT: 'DE', // Austria -> Germany
  CH: 'DE', // Switzerland -> Germany
  BE: 'NL', // Belgium -> Netherlands
  IE: 'UK', // Ireland -> UK
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
