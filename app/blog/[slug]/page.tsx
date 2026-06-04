import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Temporary blog data - replace with database fetch
const blogPosts = [
  {
    id: 1,
    title: "Comprehensive Solutions for Every Workshop Need",
    excerpt: "Discover how our garage equipment can transform your workshop efficiency...",
    content: `
      <p>At Muaz Technology, we understand that every workshop has unique needs. From small independent garages to large service centers, our comprehensive range of equipment is designed to meet your specific requirements.</p>
      <h2>Why Choose Our Equipment?</h2>
      <p>Our products are sourced from leading manufacturers and tested for durability and performance. We offer complete solutions including:</p>
      <ul>
        <li>Lifting equipment for vehicles of all sizes</li>
        <li>Diagnostic tools for accurate troubleshooting</li>
        <li>Denting and painting equipment for bodywork</li>
        <li>Repairing tools for all types of maintenance</li>
        <li>Supporting equipment for workshop organization</li>
      </ul>
      <p>Contact our team today to find the right solution for your workshop.</p>
    `,
    date: "June 1, 2026",
    slug: "comprehensive-solutions-for-workshop",
  },
  {
    id: 2,
    title: "Top 5 Garage Equipment Every Workshop Should Have",
    excerpt: "Essential tools and equipment that every professional workshop needs...",
    content: `
      <p>Building a well-equipped workshop requires careful planning. Here are the top 5 essential equipment every professional workshop should have:</p>
      <h2>1. Quality Vehicle Lift</h2>
      <p>A reliable two-post or four-post lift is the backbone of any workshop.</p>
      <h2>2. Diagnostic Scanner</h2>
      <p>Modern vehicles require advanced diagnostic tools for accurate troubleshooting.</p>
      <h2>3. Air Compressor</h2>
      <p>A good air compressor powers many pneumatic tools essential for daily operations.</p>
      <h2>4. Tool Cabinet</h2>
      <p>Organization is key to efficiency. Quality tool storage saves time and prevents loss.</p>
      <h2>5. Welding Equipment</h2>
      <p>Essential for bodywork and custom fabrication needs.</p>
    `,
    date: "May 25, 2026",
    slug: "top-5-garage-equipment",
  },
];

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition"
        >
          <ArrowLeft size={18} />
          Back to Blog
        </Link>

        {/* Blog post content */}
        <article className="max-w-3xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <Calendar size={14} />
              <span>{post.date}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              {post.title}
            </h1>
          </div>

          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-li:text-gray-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </main>
  );
}