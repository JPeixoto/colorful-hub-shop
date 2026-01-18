import { CountryCode } from './countries';

// Map: Book ID -> Country Code -> URL
export const BOOK_LINKS: Record<string, Partial<Record<CountryCode, string>>> = {
    'magical-animals': {
        US: 'https://www.amazon.com/dp/B0DJLK7786',
        ES: 'https://www.amazon.es/dp/B0DJLK7786',
        DE: 'https://www.amazon.de/dp/B0DJLK7786',
        UK: 'https://www.amazon.co.uk/dp/B0DJLK7786',
        FR: 'https://www.amazon.fr/dp/B0DJLK7786',
        IT: 'https://www.amazon.it/dp/B0DJLK7786',
        BR: 'https://www.amazon.com.br/dp/B0DJLK7786',
        CA: 'https://www.amazon.ca/dp/B0DJLK7786',
        AU: 'https://www.amazon.com.au/dp/B0DJLK7786',
        NL: 'https://www.amazon.nl/dp/B0DJLK7786',
    },
    'ocean-friends': {
        US: 'https://www.amazon.com/dp/B0DJ7T6M4S',
        ES: 'https://www.amazon.es/dp/B0DJ7T6M4S',
        DE: 'https://www.amazon.de/dp/B0DJ7T6M4S',
        UK: 'https://www.amazon.co.uk/dp/B0DJ7T6M4S',
        FR: 'https://www.amazon.fr/dp/B0DJ7T6M4S',
        IT: 'https://www.amazon.it/dp/B0DJ7T6M4S',
        CA: 'https://www.amazon.ca/dp/B0DJ7T6M4S',
    },
    'dinosaur-world': {
        US: 'https://www.amazon.com/dp/B0DLL64F1S',
        ES: 'https://www.amazon.es/dp/B0DLL64F1S',
        DE: 'https://www.amazon.de/dp/B0DLL64F1S',
        UK: 'https://www.amazon.co.uk/dp/B0DLL64F1S',
        FR: 'https://www.amazon.fr/dp/B0DLL64F1S',
        IT: 'https://www.amazon.it/dp/B0DLL64F1S',
    },
    'fairy-garden': {
        US: 'https://www.amazon.com/dp/B0DJ7K6451',
        ES: 'https://www.amazon.es/dp/B0DJ7K6451',
        DE: 'https://www.amazon.de/dp/B0DJ7K6451',
        UK: 'https://www.amazon.co.uk/dp/B0DJ7K6451',
        FR: 'https://www.amazon.fr/dp/B0DJ7K6451',
        IT: 'https://www.amazon.it/dp/B0DJ7K6451',
    }
};

export const getBookLink = (bookId: string, countryCode: CountryCode): string => {
    const book = BOOK_LINKS[bookId];
    if (!book) return '#';

    return book[countryCode] || book['US'] || '#';
};
