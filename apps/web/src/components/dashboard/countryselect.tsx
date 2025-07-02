import { Button } from '@dr/ui/components/base/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@dr/ui/components/base/command';
import { Popover, PopoverContent, PopoverTrigger } from '@dr/ui/components/base/popover';
import { cn } from '@dr/ui/lib/utils';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

type Option = {
  value: string;
  label: string;
};

interface CountryListCommandProps {
  height: string;
  options: Option[];
  placeholder: string;
  selectedOption: string;
  onSelectOption?: (option: string) => void;
}

const CountryList = ({
  height,
  options,
  placeholder,
  selectedOption,
  onSelectOption,
}: CountryListCommandProps) => {
  const [filteredOptions, setFilteredOptions] = React.useState<Option[]>(options);
  const [focusedIndex, setFocusedIndex] = React.useState(0);
  const [isKeyboardNavActive, setIsKeyboardNavActive] = React.useState(false);

  const parentRef = React.useRef(null);

  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  const virtualOptions = virtualizer.getVirtualItems();

  const scrollToIndex = (index: number) => {
    virtualizer.scrollToIndex(index, {
      align: 'center',
    });
  };

  const handleSearch = (search: string) => {
    setIsKeyboardNavActive(false);
    setFilteredOptions(
      options.filter((option) => option.value.toLowerCase().includes(search.toLowerCase() ?? []))
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        setIsKeyboardNavActive(true);
        setFocusedIndex((prev) => {
          const newIndex = prev === -1 ? 0 : Math.min(prev + 1, filteredOptions.length - 1);
          scrollToIndex(newIndex);
          return newIndex;
        });
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        setIsKeyboardNavActive(true);
        setFocusedIndex((prev) => {
          const newIndex = prev === -1 ? filteredOptions.length - 1 : Math.max(prev - 1, 0);
          scrollToIndex(newIndex);
          return newIndex;
        });
        break;
      }
      case 'Enter': {
        event.preventDefault();
        if (filteredOptions[focusedIndex]) {
          onSelectOption?.(filteredOptions[focusedIndex].value);
        }
        break;
      }
      default:
        break;
    }
  };

  React.useEffect(() => {
    if (selectedOption) {
      const option = filteredOptions.find((option) => option.value === selectedOption);
      if (option) {
        const index = filteredOptions.indexOf(option);
        setFocusedIndex(index);
        virtualizer.scrollToIndex(index, {
          align: 'center',
        });
      }
    }
  }, [selectedOption, filteredOptions, virtualizer]);

  return (
    <Command shouldFilter={false} onKeyDown={handleKeyDown}>
      <CommandInput onValueChange={handleSearch} placeholder={placeholder} />
      <CommandList
        ref={parentRef}
        style={{
          height: height,
          width: '100%',
          overflow: 'auto',
        }}
        className="no_scrollbar scrollbar-hidden"
        onMouseDown={() => setIsKeyboardNavActive(false)}
        onMouseMove={() => setIsKeyboardNavActive(false)}
      >
        <CommandEmpty>No item found.</CommandEmpty>
        <CommandGroup>
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {virtualOptions.map((virtualOption) => (
              <CommandItem
                key={filteredOptions[virtualOption.index]?.value}
                disabled={isKeyboardNavActive}
                className={cn(
                  'absolute left-0 top-0 w-full bg-transparent',
                  focusedIndex === virtualOption.index && 'bg-accent text-accent-foreground',
                  isKeyboardNavActive &&
                    focusedIndex !== virtualOption.index &&
                    'aria-selected:bg-transparent aria-selected:text-primary'
                )}
                style={{
                  height: `${virtualOption.size}px`,
                  transform: `translateY(${virtualOption.start}px)`,
                }}
                value={filteredOptions[virtualOption.index]?.value}
                onMouseEnter={() => !isKeyboardNavActive && setFocusedIndex(virtualOption.index)}
                onMouseLeave={() => !isKeyboardNavActive && setFocusedIndex(-1)}
                onSelect={onSelectOption}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    selectedOption === filteredOptions[virtualOption.index]?.value
                      ? 'opacity-100'
                      : 'opacity-0'
                  )}
                />
                {filteredOptions[virtualOption.index]?.label}
                <img
                  className="w-4"
                  src={`https://flagsapi.com/${filteredOptions[virtualOption.index]?.label.split('-')[1]}/flat/64.png`}
                />
              </CommandItem>
            ))}
          </div>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

interface CountryComboboxProps {
  options: string[];
  searchPlaceholder?: string;
  width?: string;
  height?: string;
  value?: string;
  className?: string;
  onChange?: (value: string) => void;
}

export const CountryCombobox = React.forwardRef<HTMLButtonElement, CountryComboboxProps>(
  function CountryCombobox(
    {
      options,
      searchPlaceholder = 'Choose country',
      height = '400px',
      value,
      onChange,
      className,
    },
    ref
  ) {
    const [open, setOpen] = React.useState(false);
    const selectedOption = value ?? '';
    const countryCode = selectedOption.split('-')[1];

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`justify-between w-full ${className} font-light text-xs lg:text-sm`}
          >
            {selectedOption ? (
              <span className='flex items-center gap-2'>
                {options.find((option) => option === selectedOption)}
                <img
                  className="w-4"
                  src={`https://flagsapi.com/${countryCode}/flat/64.png`}
                />
              </span>
            ) : (
              searchPlaceholder
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[270px] lg:w-[400px] max-w-98">
          <CountryList
            height={height}
            options={options.map((option) => ({ value: option, label: option }))}
            placeholder={searchPlaceholder}
            selectedOption={selectedOption}
            onSelectOption={(currentValue) => {
              onChange?.(currentValue === selectedOption ? '' : currentValue);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    );
  }
);
