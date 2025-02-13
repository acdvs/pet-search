'use client';

import { useEffect, useState } from 'react';

import { DEFAULT_FILTERS, useSearchFilters } from '@/lib/state';
import { RangeSlider } from '../ui/range-slider';
import { SearchFilter } from './SearchFilter';
import { Label } from '../ui/label';

function AgeFilter() {
  const [values, setValues] = useState([0, 30]);
  const { minAge, maxAge, setMinAge, setMaxAge } = useSearchFilters();

  const onSubmit = () => {
    setMinAge(values[0]);
    setMaxAge(values[1]);
  };

  const onReset = () => {
    setMinAge(DEFAULT_FILTERS.minAge);
    setMaxAge(DEFAULT_FILTERS.maxAge);
  };

  useEffect(() => setValues([minAge, maxAge]), [minAge, maxAge]);

  return (
    <SearchFilter
      label="Age"
      selectionText={`${minAge}-${maxAge}`}
      onSubmit={onSubmit}
      onReset={onReset}
      onOpenChange={() => setValues([minAge, maxAge])}
    >
      <Label>Filter by age</Label>
      <RangeSlider
        label={(x) => <p>{x}</p>}
        value={values}
        onValueChange={setValues}
        min={0}
        max={30}
        step={1}
      />
    </SearchFilter>
  );
}

export default AgeFilter;
