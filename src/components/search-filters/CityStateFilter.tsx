'use client';

import { useState } from 'react';

import { DEFAULT_FILTERS, useSearchFilters } from '@/lib/state';
import { useFetch } from '@/lib/fetch';
import { STATES } from '@/lib/utils';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { SearchFilter } from './SearchFilter';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

function CityStateFilter() {
  const _fetch = useFetch();

  const { setZipCodes } = useSearchFilters();
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const onSubmit = async () => {
    if (!city || !state) {
      return;
    }

    const data = await _fetch<API.Location.Search.Results>(
      '/locations/search',
      {
        method: 'POST',
        body: {
          city,
          states: [state],
          size: 50,
        } satisfies API.Location.Search.Input,
      }
    );

    console.log(data);

    if (data && data.results.length > 0) {
      setZipCodes(data.results.map((x) => x.zip_code));
    }
  };

  const onReset = () => {
    setCity('');
    setState('');
    setZipCodes(DEFAULT_FILTERS.zipCodes);
  };

  return (
    <SearchFilter label="City/State" onSubmit={onSubmit} onReset={onReset}>
      <Label>Filter by location</Label>
      <div className="flex items-center gap-1">
        <Input
          type="text"
          name="city"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
        />
        <Select name="state" value={state} onValueChange={setState}>
          <SelectTrigger className="w-30">
            <SelectValue placeholder="State" />
          </SelectTrigger>
          <SelectContent>
            {STATES?.map((x) => (
              <SelectItem key={x.code} value={x.code}>
                {x.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </SearchFilter>
  );
}

export default CityStateFilter;
