import { useMutation, useQueryClient, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import {
  getFollowingTweets,
  updateTweet,
  deleteTweet,
  postTweet,
  getTweet,
  getTweetsByPage
} from '@/api/Tweet';

const usePostTweet = (reset) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tweet) => postTweet(tweet),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['tweets', { id: variables.id }], data);
      reset();
    },
    onError: (error, data) => console.log(error, data)
  });
};

const useDeleteTweet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteTweet(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tweets'] });
    },
    onError: (error) => {
      console.log(error);
    }
  });
};
const useUpdateTweet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tweet) => updateTweet(tweet),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['tweet', { id: variables.id }], data);
    },
    onError: (error) => console.log(error)
  });
};

const useGetFollowingTweets = () =>
  useQuery({
    queryKey: ['tweets'],
    queryFn: () => getFollowingTweets(),
    keepPreviousData: true
  });

const useGetTweet = (id) =>
  useQuery({
    queryKey: ['tweet', id],
    queryFn: () => getTweet(id),
    enabled: Boolean(id)
  });

const useGetAllTweetsByPage = () => {
  return useInfiniteQuery(['tweets'], getTweetsByPage, {
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined
  });
};

export {
  useUpdateTweet,
  useDeleteTweet,
  usePostTweet,
  useGetFollowingTweets,
  useGetTweet,
  useGetAllTweetsByPage
};
