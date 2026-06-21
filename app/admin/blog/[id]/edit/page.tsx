import { redirect } from 'next/navigation';

type AdminEditBlogRouteProps = {
  params: {
    id: string;
  };
};

export default function AdminEditBlogRoute({
  params,
}: AdminEditBlogRouteProps) {
  redirect(`/admin/blog/${params.id}/edit`);
}

