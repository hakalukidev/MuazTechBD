import AdminShell from '@/components/admin/AdminShell';
import BlogPostEditor from '@/components/admin/BlogPostEditor';

export default function AdminNewBlogRoute() {
  return (
    <AdminShell>
      <BlogPostEditor mode="create" />
    </AdminShell>
  );
}
