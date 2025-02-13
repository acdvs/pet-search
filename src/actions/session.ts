'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import setCookieParser from 'set-cookie-parser';

// Workaround for set-cookie-parser Cookie type
type SameSite = 'lax' | 'strict' | 'none' | boolean | undefined;
type Cookie = Omit<setCookieParser.Cookie, 'sameSite'> & {
  sameSite: SameSite;
};

export async function getSession() {
  const c = await cookies();
  const token = c.get('fetch-access-token')?.value;

  return {
    isLoggedIn: !!token,
  };
}

const loginSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export async function login(_: unknown, formData: FormData) {
  const parsed = loginSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  });

  if (!parsed.success) {
    return {
      messages: {
        ...parsed.error.flatten().fieldErrors,
        result: null,
      },
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
        }),
      }
    );

    await forwardCookieHeaders(res);
    redirect('/search');
  } catch (err) {
    return {
      messages: {
        name: null,
        email: null,
        result: err as string,
      },
    };
  }
}

export async function logout() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
      {
        method: 'POST',
        credentials: 'include',
      }
    );

    console.log(res);

    await forwardCookieHeaders(res);
    redirect('/');
  } catch (err) {
    return {
      messages: {
        name: null,
        email: null,
        result: err as string,
      },
    };
  }
}

async function forwardCookieHeaders(res: Response) {
  // Handle *all* Set-Cookie headers just for fun
  const setCookies = setCookieParser.parse(res.headers.getSetCookie());
  const c = await cookies();

  // Need to enforce custom type because set-cookie-parser
  // uses a vague/incompatible type for `sameSite`
  setCookies.forEach((x) => c.set(x as Cookie));
}
