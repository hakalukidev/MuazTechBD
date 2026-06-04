import { Newspaper } from "lucide-react";
import Link from "next/link";

// Temporary blog data - you can replace this with database fetch later
const blogPosts = [
  {
    id: 1,
    title: "Comprehensive Solutions for Every Workshop Need",
    excerpt: "Discover how our garage equipment can transform your workshop efficiency...",
    date: "June 1, 2026",
    slug: "comprehensive-solutions-for-workshop",
  },
  {
    id: 2,
    title: "Top 5 Garage Equipment Every Workshop Should Have",
    excerpt: "Essential tools and equipment that every professional workshop needs...",
    date: "May 25, 2026",
    slug: "top-5-garage-equipment",
  },
  // Add more blog posts as needed
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Blog Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Newspaper size={32} />
            <h1 className="text-3xl md:text-4xl font-bold">Blog</h1>
          </div>
          <p className="text-blue-100 text-lg max-w-2xl">
            Latest news, tips, and updates from Muaz Technology
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <div className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition duration-300 hover:border-blue-200">
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm mb-3">
                  {post.date}
                </p>
                <p className="text-gray-500 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-4 text-blue-600 font-medium text-sm group-hover:underline">
                  Read More →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}