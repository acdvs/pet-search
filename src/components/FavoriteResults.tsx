'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { useFavorites } from '@/lib/state';
import { useFetch } from '@/lib/fetch';
import Results from '@/components/Results';
import PlaceholderContainer from '@/components/PlaceholderContainer';

const PAGE_SIZE = 10;

function FavoriteResults() {
  const _fetch = useFetch();
  const { favorites } = useFavorites();

  const query = useInfiniteQuery({
    queryKey: ['favorites', favorites],
    queryFn: ({ pageParam }) =>
      _fetch<API.Dogs.Results>('/dogs', {
        method: 'POST',
        body: favorites.slice(pageParam, pageParam + PAGE_SIZE),
      }),
    initialPageParam: 0,
    getPreviousPageParam: (firstPage, pages, firstPageParam) => {
      const prevIdx = firstPageParam - PAGE_SIZE;
      return favorites[prevIdx] ? prevIdx : null;
    },
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      const nextIdx = lastPageParam + PAGE_SIZE;
      return nextIdx < favorites.length ? nextIdx : null;
    },
    placeholderData: (prev) => prev,
    maxPages: 1,
    enabled: favorites.length > 0,
  });

  if (favorites.length === 0) {
    return (
      <PlaceholderContainer>
        <p>You haven&apos;t selected any favorites yet.</p>
      </PlaceholderContainer>
    );
  }

  return <Results query={query} data={query.data?.pages[0]} />;
}

export default FavoriteResults;
