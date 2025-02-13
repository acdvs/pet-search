'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';

import { useSearchFilters } from '@/lib/state';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import SearchFilter from './SearchFilter';

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

function FilteredItem({
  value,
  remove,
}: {
  value: string;
  remove: (x: string) => void;
}) {
  return (
    <div className="flex items-center pl-3 pr-2 text-sm bg-foreground text-background rounded-full cursor-default group">
      <span>{value}</span>
      <X
        className="delete h-3 stroke-2 pl-1 cursor-pointer group-hover:stroke-3 group-hover:stroke-red-500 "
        onClick={() => remove(value)}
      >
        x
      </X>
    </div>
  );
}

export default ZipCodeFilter;
