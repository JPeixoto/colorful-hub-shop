import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ExternalLink } from 'lucide-react';
import { useCountry } from '@/hooks/use-country';
import { COUNTRIES, CountryCode, Country } from '@/data/countries';
import { cn } from '@/lib/utils';

interface SmartBookButtonProps {
    amazonId: string;
    className?: string;
    variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function SmartBookButton({
    amazonId,
    className,
    variant = 'default',
    size = 'default',
}: SmartBookButtonProps) {
    const { countryCode, setCountryCode } = useCountry();
    const country = COUNTRIES[countryCode] ?? COUNTRIES.US;
    const sanitizedId = amazonId?.trim();
    const currentLink = sanitizedId ? `https://${country.marketplace}/dp/${sanitizedId}` : '#';

    const currentCountry = country;

    const handleCountrySelect = (code: CountryCode) => {
        setCountryCode(code);
    };

    return (
        <div className={cn("flex items-center w-full", className)}>
            {/* Container with primary border to match the button color */}
            <div className="flex w-full isolate rounded-md shadow-sm border-2 border-primary overflow-hidden">
                <Button
                    variant={variant}
                    size={size}
                    asChild
                    className="relative flex-1 rounded-none border-none focus-visible:z-10 focus-visible:ring-0"
                >
                    <a
                        href={currentLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-center items-center"
                    >
                        <span className="mr-2">Get Book</span>
                        <ExternalLink className="h-4 w-4 opacity-80" />
                        <span className="sr-only">on Amazon {currentCountry.name}</span>
                    </a>
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="secondary"
                            size={size}
                            className={cn(
                                "relative rounded-none px-3 min-w-[3.5rem]",
                                "bg-white hover:bg-gray-50 focus-visible:z-10 focus-visible:ring-inset",
                                // Valid border left matching the container outline
                                "border-l-2 border-primary",
                                "text-foreground p-0 flex items-center justify-center"
                            )}
                            aria-label={`Select Country (Current: ${currentCountry.name})`}
                        >
                            <img
                                src={currentCountry.flagUrl}
                                alt={currentCountry.name}
                                className="w-6 h-auto shadow-sm rounded-sm transition-transform hover:scale-110 object-cover"
                            />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px] max-h-[300px] overflow-y-auto z-50">
                        {Object.values(COUNTRIES).map((country: Country) => (
                            <DropdownMenuItem
                                key={country.code}
                                onClick={() => handleCountrySelect(country.code)}
                                className="cursor-pointer gap-3 py-2"
                            >
                                <img
                                    src={country.flagUrl}
                                    alt={country.name}
                                    className="w-6 h-auto shadow-sm rounded-sm object-cover"
                                />
                                <span className="font-medium">{country.name}</span>
                                {countryCode === country.code && (
                                    <span className="ml-auto flex h-2 w-2 rounded-full bg-primary" />
                                )}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
