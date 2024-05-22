import {apiSlice} from './apiSlice';
import {USERS_URL} from '../constants';



const authApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
    login : builder.mutation({
        query: (data) => ({
            url: `${USERS_URL}/login`,
            method: 'POST',
            body: data
        }),
    }),
    register: builder.mutation({
        query: (data) => ({
            url: `${USERS_URL}/register`,
            method: 'POST',
            body: data
        }),
    }),
    logout: builder.mutation({
        query: () => ({
            url: `${USERS_URL}/logout`,
            method: 'POST'
        }),
    }),
    updateUserprofile: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/profile`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['Users']
    }),
    uploadavatar: builder.mutation({
        query: (data) => ({
            url: `${USERS_URL}/uploadavatar`,
            method: 'PUT',
            body: data
        }),
        invalidatesTags: ['Users']
    }),
    deleteUser: builder.mutation({
        query: (userId) => ({
          url: `${USERS_URL}/${userId}`,
          method: 'DELETE',
        }),
    }),
    getUsers: builder.query({
        query: () => ({
          url: USERS_URL,
        }),
        providesTags: ['Users'],
        keepUnusedDataFor: 5,
    }),
    getUserById: builder.query({
        query: (id) => ({
          url: `${USERS_URL}/${id}`,
        }),
        providesTags: ['Users'],
        keepUnusedDataFor: 5,
    }),
    getUsersForDashboard: builder.query({
        query: () => ({
          url: `${ USERS_URL}/dashboard`,
        }),
        providesTags: ['Users'],
        keepUnusedDataFor: 5,
    }),
   }),
})


export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useUpdateUserprofileMutation,
    useUploadavatarMutation,
    useDeleteUserMutation,
    useGetUsersQuery,
    useGetUserByIdQuery,
    useGetUsersForDashboardQuery
} = authApiSlice;