'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

import { DEFAULT_FILTERS, useSearchFilters } from '@/lib/state';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { FilteredItem, SearchFilter } from './SearchFilter';

function ZipCodeFilter() {
  const { zipCodes, setZipCodes } = useSearchFilters();
  const [selectedList, setSelectedList] = useState(zipCodes);

  const onAdd = (data: FormData) => {
    const zipCode = data.get('zipCode') as string;

    if (!!zipCode && !selectedList.includes(zipCode)) {
      setSelectedList((prev) => [...prev, zipCode].sort());
    }
  };

  const removeZipCode = (x: string) =>
    setSelectedList((prev) => prev.filter((y) => y !== x));

  const selectionText = zipCodes.length > 0 ? zipCodes.length.toString() : '';

  return (
    <SearchFilter
      label="Zip Codes"
      selectionText={selectionText}
      onSubmit={() => setZipCodes(selectedList)}
      onReset={() => setZipCodes(DEFAULT_FILTERS.zipCodes)}
      onOpenChange={() => setSelectedList(zipCodes)}
    >
      <Label>Filter by zip code</Label>
      <form className="flex items-center gap-1" action={onAdd}>
        <Input type="number" name="zipCode" min={10000} max={99999} step={1} />
        <Button type="submit" variant="outline" className="px-2">
          <Plus className="h-5" />
        </Button>
      </form>
      {selectedList.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedList.map((x) => (
            <FilteredItem key={x} value={x} remove={removeZipCode} />
          ))}
        </div>
      )}
    </SearchFilter>
  );
}

export default ZipCodeFilter;
