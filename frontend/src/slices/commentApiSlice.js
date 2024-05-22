import { apiSlice } from "./apiSlice";
import { COMMENTS_URL} from "../constants";




const commentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createComment: builder.mutation({
            query: (data) => ({
                url: `${COMMENTS_URL}/create-comment`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Comments']
        }),
        getPostComments: builder.query({
            query: (postId) => ({
                url: `${COMMENTS_URL}/getComments/${postId}`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Comments'], // To evoid refreshing the page
        }),
        getCommentById: builder.query({
            query: (commentId) => ({
              url: `${COMMENTS_URL}/${commentId}`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Comments'],
        }),
        likeComment: builder.mutation({
            query: (data) => ({
                url: `${COMMENTS_URL}/likeComment/${data.commentId}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Comments']
        }),
        editComment: builder.mutation({
            query: (data) => ({
                url: `${COMMENTS_URL}/editComment/${data.commentId}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Comments']
        }),
        deleteComment: builder.mutation({
            query: (commentId) => ({
                url: `${COMMENTS_URL}/deleteComment/${commentId}`,
                method: 'DELETE',
            }),
        }),
        getComments: builder.query({
            query: () => ({
                url: `${COMMENTS_URL}/getComments`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Comments']
        }),
    })
});

export const {
    useCreateCommentMutation,
    useGetPostCommentsQuery,
    useGetCommentByIdQuery,
    useLikeCommentMutation,
    useEditCommentMutation,
    useDeleteCommentMutation,
    useGetCommentsQuery,
} = commentApiSlice;