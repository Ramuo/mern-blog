import { apiSlice } from "./apiSlice";
import { POSTS_URL, UPLOAD_URL } from "../constants";



const postApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createPost: builder.mutation({
            query: (data) => ({
                url: `${POSTS_URL}/createpost`,
                method: 'POST',
                body: data
            }),
        }),
        uploadPostImg: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: data
            }),
        }),
        getPosts: builder.query({
            query: () => ({
                url: `${POSTS_URL}/getposts`
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Posts']
        }),
    })
});

export const {
    useCreatePostMutation,
    useUploadPostImgMutation,
    useGetPostsQuery,
} = postApiSlice