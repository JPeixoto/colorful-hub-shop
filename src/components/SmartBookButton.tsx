import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ExternalLink, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
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
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={cn("flex items-center w-full gap-2", className)}
        >
            {/* Primary Get Book Button - Premium styling */}
            <motion.a
                href={currentLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg",
                    "bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-600",
                    "text-primary-foreground font-semibold text-sm sm:text-base",
                    "shadow-card hover:shadow-glow transition-all duration-300",
                    "border border-primary/20 hover:border-primary/40"
                )}
            >
                <span>Get Book</span>
                <motion.div animate={{ x: [0, 3, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                    <ExternalLink className="h-4 w-4 opacity-90" />
                </motion.div>
                <span className="sr-only">on Amazon {currentCountry.name}</span>
            </motion.a>

            {/* Country Selector Dropdown */}
            <DropdownMenu>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className={cn(
                                "h-11 w-12 rounded-lg flex items-center justify-center",
                                "border-2 border-primary/30 hover:border-primary/60",
                                "bg-white/50 hover:bg-white/80 backdrop-blur-sm",
                                "transition-all duration-300 shadow-card hover:shadow-card",
                                "group"
                            )}
                            aria-label={`Select Amazon Store (Current: ${currentCountry.name})`}
                        >
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                                className="flex items-center justify-center"
                            >
                                <img
                                    src={currentCountry.flagUrl}
                                    alt={currentCountry.name}
                                    title={currentCountry.name}
                                    className="w-6 h-5 shadow-sm rounded object-cover"
                                />
                            </motion.div>
                        </Button>
                    </DropdownMenuTrigger>
                </motion.div>

                <DropdownMenuContent align="end" className="w-[220px] max-h-[320px] overflow-y-auto z-50 rounded-xl shadow-elevated">
                    <div className="px-2 py-2 border-b border-border/20">
                        <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            <Globe className="w-3 h-3" />
                            Select Store
                        </div>
                    </div>

                    {Object.values(COUNTRIES).map((country: Country) => (
                        <DropdownMenuItem
                            key={country.code}
                            onClick={() => handleCountrySelect(country.code)}
                            className={cn(
                                "cursor-pointer gap-3 py-2.5 px-3 my-1 rounded-md transition-all duration-200",
                                countryCode === country.code
                                    ? "bg-primary/10 text-primary font-semibold"
                                    : "hover:bg-muted"
                            )}
                        >
                            <img
                                src={country.flagUrl}
                                alt={country.name}
                                className="w-6 h-5 shadow-sm rounded object-cover"
                            />
                            <span className="flex-1">{country.name}</span>
                            {countryCode === country.code && (
                                <motion.span
                                    layoutId="selectedCountry"
                                    className="flex h-2.5 w-2.5 rounded-full bg-primary"
                                    transition={{ type: "spring", bounce: 0.4 }}
                                />
                            )}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </motion.div>
    );
}
