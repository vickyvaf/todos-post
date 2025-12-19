import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import {
  fetchPosts,
  fetchCommentsByPostId,
  fetchPostById,
} from "../../services/api";
import {
  Search,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  User,
  Loader,
} from "lucide-react";

export default function PostsPage() {
  const [searchId, setSearchId] = useState("");
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);

  const isSearching = Boolean(searchId);

  const { ref, inView } = useInView();

  const {
    data: postsData,
    isLoading: isLoadingAll,
    error: errorAll,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    enabled: !isSearching,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const allPosts = postsData?.pages.flat() || [];

  const {
    data: searchedPost,
    isLoading: isLoadingSearch,
    error: errorSearch,
  } = useQuery({
    queryKey: ["post", searchId],
    queryFn: () => fetchPostById(Number(searchId)),
    enabled: isSearching && !Number.isNaN(Number(searchId)),
    retry: false,
  });

  const { data: comments, isLoading: isLoadingComments } = useQuery({
    queryKey: ["comments", expandedPostId],
    queryFn: () => fetchCommentsByPostId(expandedPostId ?? 0),
    enabled: !!expandedPostId,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const displayedPosts = isSearching
    ? searchedPost
      ? [searchedPost]
      : []
    : allPosts || [];

  const isLoading = isSearching ? isLoadingSearch : isLoadingAll;
  const error = isSearching ? errorSearch : errorAll;

  const togglePost = (postId: number) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <h1 className="text-3xl font-bold text-gray-900">Community Posts</h1>

        <form onSubmit={handleSearch} className="relative w-full md:w-64">
          <input
            type="number"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Search by ID..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
        </form>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center p-8">
          <Loader className="animate-spin w-8 h-8 text-blue-600" />
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center justify-center">
          {isSearching && errorSearch
            ? "Post not found"
            : "Error loading posts"}
        </div>
      ) : displayedPosts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500">No posts found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-shadow hover:shadow-md"
            >
              <button
                type="button"
                className="w-full text-left p-6 cursor-pointer"
                onClick={() => togglePost(post.id)}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold">
                        #{post.id}
                      </span>
                      <span>User {post.userId}</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 capitalize">
                      {post.title}
                    </h2>
                    <p className="text-gray-600">{post.body}</p>
                  </div>
                  <button type="button" className="text-gray-400">
                    {expandedPostId === post.id ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </button>
                </div>
              </button>

              {/* Comments Section */}
              {expandedPostId === post.id && (
                <div className="bg-gray-50 border-t border-gray-100 p-6 space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <MessageSquare size={18} />
                    Comments
                  </h3>

                  {isLoadingComments ? (
                    <div className="flex justify-center py-4">
                      <div className="flex justify-center items-center p-8">
                        <Loader className="animate-spin w-8 h-8 text-blue-600" />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {comments?.map((comment) => (
                        <div
                          key={comment.id}
                          className="bg-white p-4 rounded-lg shadow-sm"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="bg-gray-200 p-1 rounded-full">
                              <User size={14} className="text-gray-500" />
                            </div>
                            <span className="font-medium text-sm text-gray-900">
                              {comment.email}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm">
                            {comment.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {!isSearching && isFetchingNextPage && (
                <div className="flex justify-center items-center p-4">
                  <Loader className="animate-spin w-8 h-8 text-blue-600" />
                </div>
              )}
              <div ref={ref} className="h-4" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
