'use client';

import { useRouter } from 'next/navigation';
import {
  isEmpty,
  isNil,
  isPlainObject,
  mapValues,
  merge,
  omitBy,
} from 'lodash';

type FetchOptions = Omit<RequestInit, 'body'> & {
  params?: Record<string, string | number | undefined>;
  body?: Record<string, unknown> | unknown[];
};

export function useFetch<T>() {
  const router = useRouter();

  return async function <T>(endpoint: string, options?: FetchOptions) {
    options = Object.assign({}, options, {
      credentials: 'include',
    } satisfies RequestInit);

    if (options?.params) {
      const stringParams = mapValues(options.params, (x) =>
        typeof x === 'number' ? x.toString() : x
      );
      const filteredParams = omitBy(stringParams, isEmpty) as Record<
        string,
        string
      >;
      const urlParams = new URLSearchParams(filteredParams);

      endpoint += '?' + urlParams.toString();
    }

    if (options?.body) {
      const filteredBody = isPlainObject(options.body)
        ? omitBy(options.body, isNil)
        : options.body;

      options = merge(options, {
        body: JSON.stringify(filteredBody),
        headers: {
          'Content-Type': 'application/json',
        },
      } satisfies RequestInit);
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
      options as RequestInit
    );

    if (!res.ok) {
      if (res.status === 401) {
        router.push('/');
      } else {
        throw new Error(res.statusText);
      }
    }

    if (res.headers.get('Content-Type')?.includes('application/json')) {
      return (await res.json()) as T;
    }
  };
}
