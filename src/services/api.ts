export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async (page = 1, limit = 10): Promise<Post[]> => {
  const response = await fetch(
    `${BASE_URL}/posts?_page=${page}&_limit=${limit}`
  );
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
};

export const fetchPostById = async (id: number): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts/${id}`);
  if (!response.ok) {
    if (response.status === 404) throw new Error("Post not found");
    throw new Error("Failed to fetch post");
  }
  return response.json();
};

export const fetchCommentsByPostId = async (
  postId: number
): Promise<Comment[]> => {
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);
  if (!response.ok) throw new Error("Failed to fetch comments");
  return response.json();
};
