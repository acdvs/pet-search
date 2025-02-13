'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, X } from 'lucide-react';

import { cfetch } from '@/lib/fetch';
import { useSearchFilters } from '@/lib/state';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import SearchFilter from './SearchFilter';

function BreedsFilter() {
  const { breeds, setBreeds } = useSearchFilters();
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedList, setSelectedList] = useState(breeds);

  const { data: options } = useQuery({
    queryKey: ['breeds'],
    queryFn: () => cfetch<API.Dogs.Breeds.Results>('/dogs/breeds'),
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
      label="Breeds"
      selectionText={selectionText}
      onSubmit={() => setBreeds(selectedList)}
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

export default BreedsFilter;
