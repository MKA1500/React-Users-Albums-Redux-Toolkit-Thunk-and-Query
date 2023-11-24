import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { faker } from '@faker-js/faker';
// import { pause } from '../../shared/utils/staticUtils';

const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
        // // fetchFn allows to override 'fetch' if needed,
        // // here for demonstration only:
        // fetchFn: async (...args) => {
        //     await pause (800);
        //     return fetch(...args)
        // }
    }),
    endpoints(builder) {
        return {
            addAlbum: builder.mutation({
                invalidatesTags:  (result, error, user) => {
                    return [{ type: 'Album', id: user.id }]
                },
                // ['Album'],
                query: (user) => {
                    return {
                        url: '/albums',
                        method: 'POST',
                        body: {
                            userId: user.id,
                            title: faker.commerce.productName()
                        }
                    };
                }
            }),
            fetchAlbums: builder.query({
                providesTags: (result, error, user) => {
                    return [{ type: 'Album', id: user.id }]
                },
                // ['Album'], // to repeate outdated requests with this tag, after the data was updated by mutation with the same tag (above). It is a fnction to have it dynamic. 
                query: (user) => {
                    return {
                        url: '/albums',
                        params: {
                            userId: user.id
                        },
                        method: 'GET'
                    };
                }
            })
        };
    }
});

export const { 
    useFetchAlbumsQuery,
    useAddAlbumMutation
} = albumsApi;
export { albumsApi };
