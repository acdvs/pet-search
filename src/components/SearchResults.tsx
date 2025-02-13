'use client';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { useFetch } from '@/lib/fetch';
import { useSearchFilters, useSorting } from '@/lib/state';
import Results from './Results';

function SearchResults() {
  const _fetch = useFetch();
  const { breeds, minAge, maxAge, zipCodes, pageSize } = useSearchFilters();
  const { breed: breedSort } = useSorting();

  const searchQuery = useInfiniteQuery({
    queryKey: [
      'search',
      { breeds, minAge, maxAge, zipCodes, pageSize, breedSort },
    ],
    queryFn: ({ pageParam }) =>
      _fetch<API.Dogs.Search.Results>('/dogs/search', {
        params: {
          breeds: breeds.join(','),
          ageMin: minAge,
          ageMax: maxAge,
          zipCodes: zipCodes.join(','),
          from: pageParam,
          size: pageSize,
          sort: `breed:${breedSort}`,
        } satisfies API.Dogs.Search.Input,
      }),
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => {
      const from = firstPage?.prev?.match(/from=(\d+)/)?.[1];
      return from ? parseInt(from) : null;
    },
    getNextPageParam: (lastPage) => {
      const from = lastPage?.next?.match(/from=(\d+)/)?.[1];
      return from ? parseInt(from) : null;
    },
    placeholderData: (prev) => prev,
    maxPages: 1,
  });

  const currentPage = searchQuery.data?.pages[0];
  const currentFrom = searchQuery.data?.pageParams[0];

  const dogsQuery = useQuery({
    queryKey: [
      'dogs',
      { breeds, minAge, maxAge, zipCodes, pageSize, breedSort },
      currentFrom,
    ],
    queryFn: () =>
      _fetch<API.Dogs.Results>('/dogs', {
        method: 'POST',
        body: currentPage?.resultIds,
      }),
    placeholderData: (prev) => prev,
    enabled: searchQuery.isFetched,
  });

  return <Results query={searchQuery} data={dogsQuery.data} />;
}

export default SearchResults;
