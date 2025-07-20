import { useMutation } from '@tanstack/react-query';

export interface JsonPlaceholderPost {
  id?: number;
  title: string;
  body: string;
  userId: number;
}

async function createPost(data: Omit<JsonPlaceholderPost, 'id'>): Promise<JsonPlaceholderPost> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create post');
  }
  return response.json();
}

export function useJsonPlaceholderCreatePost() {
  return useMutation({
    mutationFn: createPost,
  });
}
