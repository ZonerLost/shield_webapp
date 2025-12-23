"use client";

import { forwardRef, useState, useMemo, useEffect } from "react";
import {
  parsePhoneNumberFromString,
  AsYouType,
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
  CountryCode,
} from "libphonenumber-js";
import { PhoneIcon, ArrowDownIcon } from "./Icons";

interface PhoneInputProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      value,
      onChange,
      error,
      placeholder = "329 393 3230",
      disabled,
      className = "",
    },
    ref
  ) => {
    // Generate countries dynamically
    const countries = useMemo(
      () =>
        getCountries().map((code) => ({
          code,
          dialCode: `+${getCountryCallingCode(code)}`,
        })),
      []
    );

    // Initialize selectedCountry by parsing the value if it exists
    const getInitialCountry = () => {
      if (value) {
        const parsed = parsePhoneNumberFromString(value);
        if (parsed?.country) {
          const country = countries.find((c) => c.code === parsed.country);
          if (country) return country;
        }
      }
      return countries[0];
    };

    const [selectedCountry, setSelectedCountry] = useState(getInitialCountry);

    // Update selectedCountry when value changes (e.g., when loading saved data)
    useEffect(() => {
      if (value) {
        const parsed = parsePhoneNumberFromString(value);
        if (parsed?.country) {
          const country = countries.find((c) => c.code === parsed.country);
          if (country && country.code !== selectedCountry.code) {
            setSelectedCountry(country);
          }
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    // Extract phone number without country code
    const getPhoneNumber = () => {
      if (!value) return "";
      
      // Try to parse the phone number (auto-detect country from the number itself)
      const parsed = parsePhoneNumberFromString(value);
      if (parsed) {
        return parsed.nationalNumber || "";
      }
      
      // Fallback: remove the selected country dial code
      return value.replace(selectedCountry.dialCode, "").trim();
    };

    const phoneNumber = getPhoneNumber();

    // Format input and notify parent
    const handlePhoneChange = (phoneValue: string) => {
      const formatter = new AsYouType(selectedCountry.code as CountryCode);
      const formatted = formatter.input(phoneValue);

      const parsed = parsePhoneNumberFromString(
        formatted,
        selectedCountry.code
      );
      const fullNumber = parsed
        ? parsed.number
        : `${selectedCountry.dialCode}${phoneValue}`;

      onChange?.(fullNumber);
    };

    // Change country selection
    const handleCountryChange = (countryCode: string) => {
      const country =
        countries.find((c) => c.code === countryCode) || countries[0];
      setSelectedCountry(country);

      const parsed = parsePhoneNumberFromString(phoneNumber, country.code);
      const fullNumber = parsed
        ? parsed.number
        : `${country.dialCode}${phoneNumber}`;
      onChange?.(fullNumber);
    };

    // ✅ Stricter validation
    const isValid = value ? isValidPhoneNumber(value) : false;

    return (
      <div className={`relative ${className}`}>
        <div className="flex gap-3">
          {/* Phone Number Input */}
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-placeholder-gray">
              <PhoneIcon />
            </div>
            <input
              ref={ref}
              type="tel"
              value={phoneNumber}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder={placeholder}
              disabled={disabled}
              className={`
                w-full pl-10 pr-3 py-3 text-sm font-dm-sans
                bg-light-gray border rounded-lg
                focus:outline-none
                disabled:bg-gray-50 disabled:cursor-not-allowed
                transition-colors duration-200
                text-blue-primary placeholder-placeholder-gray
                ${
                  error || (value && !isValid)
                    ? "border-error-red"
                    : "border-placeholder-gray"
                }
              `}
            />
          </div>

          {/* Country Code Dropdown */}
          <div className="relative">
            <select
              value={selectedCountry.code}
              onChange={(e) => handleCountryChange(e.target.value)}
              disabled={disabled}
              className={`
                appearance-none px-3 py-3 pr-8 text-sm font-dm-sans
                bg-light-gray border rounded-lg
                focus:outline-none
                disabled:bg-gray-50 disabled:cursor-not-allowed
                transition-colors duration-200
                text-blue-primary cursor-pointer
                ${
                  error || (value && !isValid)
                    ? "border-error-red"
                    : "border-placeholder-gray"
                }
              `}
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.code} {country.dialCode}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ArrowDownIcon />
            </div>
          </div>
        </div>

        {/* Error message */}
        {(error || (value && !isValid)) && (
          <p className="mt-1 text-xs text-error-red font-dm-sans">
            {error || "Invalid phone number for selected country"}
          </p>
        )}
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";
