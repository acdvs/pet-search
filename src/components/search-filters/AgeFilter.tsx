'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { useSearchFilters } from '@/lib/state';
import { RangeSlider } from '../ui/range-slider';
import SearchFilter from './SearchFilter';
import { Label } from '../ui/label';

function AgeFilter() {
  const [values, setValues] = useState([0, 30]);
  const { minAge, maxAge, setMinAge, setMaxAge } = useSearchFilters();

  const searchParams = useSearchParams();

  useEffect(() => {
    const ageMinParam = searchParams.get('ageMin');
    const ageMaxParam = searchParams.get('ageMax');

    if (ageMinParam && parseInt(ageMinParam)) {
      setMinAge(parseInt(ageMinParam));
    }

    if (ageMaxParam && parseInt(ageMaxParam)) {
      setMaxAge(parseInt(ageMaxParam));
    }
  }, [searchParams, setMinAge, setMaxAge]);

  const onSubmit = () => {
    setMinAge(values[0]);
    setMaxAge(values[1]);
  };

  useEffect(() => setValues([minAge, maxAge]), [minAge, maxAge]);

  return (
    <SearchFilter
      label="Age"
      selectionText={`${minAge}-${maxAge}`}
      onSubmit={onSubmit}
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
