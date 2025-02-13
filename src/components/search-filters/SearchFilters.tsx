'use client';

import { useSearchFilters, useSorting, DEFAULT_FILTERS } from '@/lib/state';
import BreedsFilter from './BreedsFilter';
import AgeFilter from './AgeFilter';
import CityStateFilter from './CityStateFilter';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const PAGE_SIZES = [10, 20, 30];

function SearchFilters({ className }: { className?: string }) {
  const {
    breeds,
    minAge,
    maxAge,
    zipCodes,
    pageSize,
    resetFilters,
    setPageSize,
  } = useSearchFilters();
  const { breed: breedSort, toggleSorting } = useSorting();

  const hasFilters =
    breeds.length > 0 ||
    zipCodes.length > 0 ||
    minAge !== DEFAULT_FILTERS.minAge ||
    maxAge !== DEFAULT_FILTERS.maxAge;

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-3">
        <div className="space-x-3">
          <BreedsFilter />
          <AgeFilter />
          <CityStateFilter />
          {/* <ZipCodeFilter /> */}
          {hasFilters && (
            <Button
              variant="link"
              className="px-0"
              onClick={resetFilters}
              aria-label="Reset filters"
            >
              Reset
            </Button>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <span id="sort-breed" className="text-muted-foreground">
            Sort by breed:
          </span>
          <Button
            id="sort-breed-val"
            className="px-2"
            variant="link"
            onClick={() => toggleSorting('breed')}
            aria-labelledby="sort-breed sort-breed-val"
          >
            {breedSort === 'asc' ? 'A-Z' : 'Z-A'}
          </Button>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-muted-foreground">View:</span>
          <Select
            value={pageSize.toString()}
            onValueChange={(x) => setPageSize(parseInt(x))}
          >
            <SelectTrigger className="w-18">
              <SelectValue placeholder="Select a breed" />
            </SelectTrigger>
            <SelectContent align="end">
              {PAGE_SIZES.map((x) => (
                <SelectItem
                  key={x}
                  value={x.toString()}
                  disabled={pageSize === x}
                >
                  {x}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

export default SearchFilters;
