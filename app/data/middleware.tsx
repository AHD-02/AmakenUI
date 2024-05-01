import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { BASE_URL } from '../env';
import { persistor, RootState } from '../state/store';
import { setTokens } from '../state/user/slice';
import { logoutAction } from '../state/actions/logout';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api/`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any)?.user?.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    }
    return headers;
  },
});
const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const urlEnd = typeof args === 'string' ? args : args.url;
  const adjustedArgs =
    typeof args === 'string' ? urlEnd : { ...args, url: urlEnd };

  await mutex.waitForUnlock();
  // console.debug(`${new Date()} Api Call to  ${adjustedUrl} `);
  let result = (await baseQuery(adjustedArgs, api, extraOptions)) as any;
  //console.debug(`${new Date()} Response  ${adjustedUrl} `);

  if (result?.error?.data?.status >= 400) {
    console.warn(
      `Api Call to  ${(args as any).url} Failed`,
      adjustedArgs,
      api,
      extraOptions,
    );
  }
  if (result?.error?.data?.status === 401) {
    console.debug(
      `${new Date()} Got an unauthorized response from ${(args as any).url} `,
    );

    // if (!mutex.isLocked()) {
    //   const release = await mutex.acquire();
    //   try {
    //     const refreshToken: any = (api.getState() as RootState)?.user
    //       ?.refreshToken;
    //     console.debug(`${new Date()} Using as a refreshToken`);
    //     if (refreshToken) {
    //       const refreshResult = (await baseQuery(
    //         {
    //           url: 'StaffUsers/login',
    //           method: 'POST',
    //           body: {
    //             refreshToken,
    //           },
    //         },
    //         api,
    //         extraOptions,
    //       )) as any;

    //       if (refreshResult?.data?.jwt) {
    //         console.debug(`${new Date()} Getting a new access token`);

    //         const accessToken = refreshResult.data?.jwt;
    //         const refreshToken1 = refreshResult?.data?.refreshToken;

    //         api.dispatch(
    //           setTokens({
    //             accessToken,
    //             refreshToken: refreshToken1,
    //           }),
    //         );
    //         await persistor.flush();
    //       }
    //       if (refreshResult.data) {
    //         result = await baseQuery(args, api, extraOptions);
    //         console.debug(
    //           `${new Date()} Retired the request successfully with the new jwt `,
    //         );
    //       } else {
    //         console.debug('logout');
    //         api.dispatch(logoutAction());
    //       }
    //     } else {
    //       console.debug('logout');
    //       api.dispatch(logoutAction());
    //     }
    //   } finally {
    //     release();
    //   }
    // } else {
    //   await mutex.waitForUnlock();
    //   result = await baseQuery(args, api, extraOptions);
    // }
  }

  return result;
};

export default customFetchBase;  