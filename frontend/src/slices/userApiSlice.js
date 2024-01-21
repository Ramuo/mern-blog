import {apiSlice} from './apiSlice';
import {USERS_URL, UPLOAD_URL} from '../constants';


const authApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
    uploadProfileImage: builder.mutation({
        query: (data) => ({
            url: `${UPLOAD_URL}`,
            method: 'POST',
            body: data
        }),
    }),
    getUserProfile: builder.query({
        query: () => ({
            url: `${USERS_URL}/profile`, 
        }),
        keepUnusedDataFor: 5
    }),
    updateUser: builder.mutation({
        query: (data) => ({
            url: `${USERS_URL}/profile`,
            method: 'PUT',
            body: data
        }),
        invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation({
        query: (userId) => ({
            url: `${USERS_URL}/${userId}`,
            method: 'DELETE'
        }),
    }),
   }),
})


export const {
    useUploadProfileImageMutation,
    useUpdateUserMutation,
    useGetUserProfileQuery,
    useDeleteUserMutation,
} = authApiSlice