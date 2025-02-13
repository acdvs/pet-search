'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';

import { useFetch } from '@/lib/fetch';
import { DEFAULT_FILTERS, useSearchFilters } from '@/lib/state';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { FilteredItem, SearchFilter } from './SearchFilter';

function BreedsFilter() {
  const _fetch = useFetch();

  const { breeds, setBreeds } = useSearchFilters();
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedList, setSelectedList] = useState(breeds);

  const { data: options } = useQuery({
    queryKey: ['breeds'],
    queryFn: () => _fetch<API.Dogs.Breeds.Results>('/dogs/breeds'),
  });

  const onAdd = () => {
    if (!selectedList.includes(selectedItem)) {
      setSelectedList((prev) => [...prev, selectedItem].sort());
      setSelectedItem('');
    }
  };

  const removeBreed = (x: string) =>
    setSelectedList((prev) => prev.filter((y) => y !== x));

  const selectionText = breeds.length > 0 ? breeds.length.toString() : '';

  return (
    <SearchFilter
      label="Breed"
      selectionText={selectionText}
      onSubmit={() => setBreeds(selectedList)}
      onReset={() => setBreeds(DEFAULT_FILTERS.breeds)}
      onOpenChange={() => setSelectedList(breeds)}
    >
      <Label>Filter by breed</Label>
      <form className="flex items-center gap-1">
        <Select
          name="breed"
          value={selectedItem}
          onValueChange={setSelectedItem}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a breed" />
          </SelectTrigger>
          <SelectContent>
            {options?.map((x) => (
              <SelectItem key={x} value={x} disabled={selectedList.includes(x)}>
                {x}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          type="submit"
          variant="outline"
          className="px-2"
          disabled={!selectedItem}
          onClick={onAdd}
          aria-label="Add breed"
        >
          <Plus className="h-5" />
        </Button>
      </form>
      {selectedList.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedList.map((x) => (
            <FilteredItem key={x} value={x} remove={removeBreed} />
          ))}
        </div>
      )}
    </SearchFilter>
  );
}

export default BreedsFilter;
