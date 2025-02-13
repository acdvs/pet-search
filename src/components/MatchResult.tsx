'use client';

import { useQuery } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';

import { useFetch } from '@/lib/fetch';
import { useFavorites } from '@/lib/state';
import PlaceholderContainer from '@/components/PlaceholderContainer';
import Result from '@/components/Result';
import Results from './Results';

function MatchResult() {
  const _fetch = useFetch();
  const { favorites } = useFavorites();

  const matchQuery = useQuery({
    queryKey: ['match', 'favorites', favorites],
    queryFn: () =>
      _fetch<API.Dogs.Match.Results>('/dogs/match', {
        method: 'POST',
        body: favorites,
      }),
    enabled: favorites.length > 0,
  });

  const dogQuery = useQuery({
    queryKey: ['match', 'dog', matchQuery.data?.match],
    queryFn: () =>
      _fetch<API.Dogs.Results>('/dogs', {
        method: 'POST',
        body: [matchQuery.data?.match],
      }),
    placeholderData: (prev) => prev,
    enabled: !!matchQuery.data?.match,
  });

  if (favorites.length === 0) {
    return (
      <PlaceholderContainer>
        <p>You haven&apos;t selected any favorites yet.</p>
      </PlaceholderContainer>
    );
  }

  if (dogQuery.isFetching) {
    return (
      <PlaceholderContainer>
        <LoaderCircle className="animate-spin" />
      </PlaceholderContainer>
    );
  }

  if (!dogQuery.data || dogQuery.data.length === 0) {
    return (
      <PlaceholderContainer>
        <p>Unable to find a match.</p>
      </PlaceholderContainer>
    );
  }

  return <Results data={dogQuery.data} />;
}

export default MatchResult;
