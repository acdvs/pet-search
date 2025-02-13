import { Metadata } from 'next';

import SearchFilters from '@/components/search-filters/SearchFilters';
import SearchResults from '@/components/SearchResults';

export const metadata: Metadata = {
  title: 'Search',
};

export default async function Search() {
  return (
    <>
      <h2>Search</h2>
      <SearchFilters />
      <SearchResults />
    </>
  );
}
