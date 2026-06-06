export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
}

export interface BlogPostInput {
  title: string;
  subtitle: string;
  content: string;
  imageUrl: string;
  published: boolean;
}