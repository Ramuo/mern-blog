import {apiSlice} from './apiSlice';
import {AUTH_URL} from '../constants';


const authApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
    login: builder.mutation({
        query: (data) => ({
            url: `${AUTH_URL}/login`,
            method: 'POST',
            body: data
        }),
    }),
    register: builder.mutation({
        query: (data) => ({
            url: `${AUTH_URL}/register`,
            method: 'POST',
            body: data
        }),
    }),
    google: builder.mutation({
        query: (data) => ({
            url: `${AUTH_URL}/google`,
            method: 'POST',
            body: data,
            headers: {'Content-Type': 'application/json'},
        }),
    }),
    logout: builder.mutation({
        query: () => ({
            url: `${AUTH_URL}/logout`,
            method: 'POST'
        }),
    }),
   }),
})


export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useGoogleMutation
} = authApiSlice
