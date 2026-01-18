import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CountryCode, getMappedCountry } from '@/data/countries';

interface CountryContextType {
    countryCode: CountryCode;
    setCountryCode: (code: CountryCode) => void;
    isLoading: boolean;
    error: string | null;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export function CountryProvider({ children }: { children: ReactNode }) {
    const [countryCode, setCountryCode] = useState<CountryCode>('US');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await fetch('https://ipapi.co/json/');
                if (!response.ok) {
                    throw new Error('Failed to fetch location');
                }
                const data = await response.json();
                const mappedInfo = getMappedCountry(data.country_code);
                setCountryCode(mappedInfo);
                if (import.meta.env.DEV) {
                    console.log(`Detected country: ${data.country_code} -> Mapped to: ${mappedInfo}`);
                }
            } catch (err) {
                if (import.meta.env.DEV) {
                    console.error('Geolocation error:', err);
                }
                setError('Could not determine location');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCountry();
    }, []);

    return (
        <CountryContext.Provider value={{ countryCode, setCountryCode, isLoading, error }}>
            {children}
        </CountryContext.Provider>
    );
}

export function useCountry() {
    const context = useContext(CountryContext);
    if (context === undefined) {
        throw new Error('useCountry must be used within a CountryProvider');
    }
    return context;
}
