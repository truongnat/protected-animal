import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { FormattedDate } from '@/components/ui/formatted-date'
import { Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog | Protected Animal',
  description: 'Latest news and articles about wildlife conservation',
}

// Function to get all blog posts directly from the file system
async function getBlogPosts() {
  const contentDirectory = path.join(process.cwd(), 'content', 'blog')
  const filenames = fs.readdirSync(contentDirectory)

  const posts = filenames.map(filename => {
    const filePath = path.join(contentDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)

    // Get author name - ensure it's always a string
    let author = '';
    if (data.author) {
      if (typeof data.author === 'string') {
        author = data.author;
      } else if (typeof data.author === 'object' && data.author.name) {
        // Handle case where author is an object with a name property
        author = data.author.name;
      }
    }

    return {
      slug: filename.replace('.mdx', ''),
      title: data.title,
      description: data.description,
      date: data.date,
      author: author,
      readingTime: data.readingTime || 5 // Default to 5 minutes if not specified
    }
  })

  // Sort posts by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default async function BlogPage() {
  // Get all blog posts
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-8"
          asChild
        >
          <Link href="/landing">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-6xl font-bold mb-6 text-foreground tracking-tight">
            Conservation Blog
          </h1>
          <p className="text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Stay updated with the latest news and insights about wildlife conservation.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {posts.length > 0 ? posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center justify-between">
                      <FormattedDate date={post.date} format="short" />
                      <div className="flex items-center text-xs">
                        <Clock className="mr-1 h-3 w-3" />
                        {post.readingTime} min read
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{post.excerpt || post.description}</p>
                </CardContent>
              </Card>
            </Link>
          )) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-lg text-muted-foreground">No blog posts found.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}