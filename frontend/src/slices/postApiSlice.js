import { apiSlice } from "./apiSlice";
import { POSTS_URL} from "../constants";



const postApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createPost: builder.mutation({
            query: (data) => ({
                url: `${POSTS_URL}/create-post`,
                method: 'POST',
                body: data
            }),
        }),
        uploadPostImage: builder.mutation({
            query: (data) => ({
              url: `/api/upload`,
              method: 'POST',
              body: data,
            }),
        }),
        getPosts: builder.query({
            query: () => ({
                url: POSTS_URL,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Posts'], // To evoid refreshing the page
        }),
        getPostById: builder.query({
            query: (postId) => ({
              url: `${POSTS_URL}/${postId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        updatePosts: builder.mutation({
            query: (data) => ({
              url: `${POSTS_URL}/${data.postId}`,
              method: 'PUT',
              body: data,
            }),
            invalidatesTags: ['Posts'],
        }),
        deletePost: builder.mutation({
            query: (postId) => ({
              url: `${POSTS_URL}/${postId}`,
              method: 'DELETE',
            }),
            providesTags: ['Posts'],
        }),
        getFilterPosts: builder.query({
            query: () => ({
                url: `${POSTS_URL}/filter-posts`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Posts'], // To evoid refreshing the page
        }),
    })
});

export const {
    useCreatePostMutation,
    useUploadPostImageMutation,
    useGetPostsQuery,
    useGetPostByIdQuery,
    useUpdatePostsMutation,
    useDeletePostMutation,
    useGetFilterPostsQuery
} = postApiSlice