const fs = require('fs');
const path = require('path');

// Create the content/blog directory if it doesn't exist
const blogDir = path.join(process.cwd(), 'content', 'blog');
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
}

// Sample blog posts
const blogPosts = [
  {
    slug: 'habitat-restoration',
    title: 'Habitat Restoration',
    description: 'Discover how we restore and protect natural habitats for wildlife.',
    date: '2024-03-10',
    readingTime: 7,
    tags: ['Conservation', 'Habitat', 'Restoration'],
    image: '/blog/habitat.jpg',
    author: {
      name: 'Jane Smith',
      avatar: '/authors/jane-smith.jpg',
      bio: 'Environmental scientist specializing in habitat restoration'
    },
    content: `
# Habitat Restoration

## Why Habitat Restoration Matters

Habitat restoration is a critical component of wildlife conservation. As human activities continue to encroach on natural areas, many species face habitat loss, which is the primary driver of biodiversity decline worldwide.

## Our Approach

Our habitat restoration projects focus on:

1. **Assessment**: Evaluating degraded habitats to understand what's been lost
2. **Planning**: Developing comprehensive restoration plans
3. **Implementation**: Executing restoration activities
4. **Monitoring**: Tracking progress and making adjustments

## Success Stories

We've successfully restored over 5,000 acres of habitat across different ecosystems:

- Wetland restoration in coastal areas
- Forest regeneration in tropical regions
- Grassland restoration in temperate zones

## How You Can Help

- Volunteer for local restoration projects
- Support organizations working on habitat restoration
- Practice sustainable living to reduce your environmental footprint
    `
  },
  {
    slug: 'community-engagement',
    title: 'Community Engagement',
    description: 'How local communities are making a difference in conservation.',
    date: '2024-03-05',
    readingTime: 6,
    tags: ['Community', 'Education', 'Conservation'],
    image: '/blog/community.jpg',
    author: {
      name: 'Michael Johnson',
      avatar: '/authors/michael-johnson.jpg',
      bio: 'Community outreach coordinator with 15 years of experience'
    },
    content: `
# Community Engagement in Conservation

## The Power of Local Communities

Conservation efforts are most successful when local communities are actively involved. People who live alongside wildlife have the most direct impact on conservation outcomes.

## Successful Community Programs

Our community engagement programs include:

- **Education initiatives** that teach conservation principles
- **Sustainable livelihood projects** that reduce dependence on natural resources
- **Community-based monitoring** where locals help track wildlife populations

## Case Study: The Village Wildlife Guardians

In the Serengeti region, we've trained over 200 local residents as Wildlife Guardians who:

- Monitor wildlife movements
- Report poaching activities
- Educate their communities about conservation

## Join the Movement

- Participate in local conservation groups
- Support community-based conservation initiatives
- Share conservation knowledge with your community
    `
  },
  {
    slug: 'wildlife-photography-tips',
    title: 'Wildlife Photography Tips',
    description: 'Expert advice for capturing stunning wildlife photographs.',
    date: '2024-02-20',
    readingTime: 8,
    tags: ['Photography', 'Wildlife', 'Tips'],
    image: '/blog/photography.jpg',
    author: {
      name: 'Sarah Williams',
      avatar: '/authors/sarah-williams.jpg',
      bio: 'Award-winning wildlife photographer and conservationist'
    },
    content: `
# Wildlife Photography Tips

## Getting Started with Wildlife Photography

Wildlife photography is both challenging and rewarding. It requires patience, technical skill, and respect for the animals you're photographing.

## Essential Equipment

- A camera with good autofocus capabilities
- Telephoto lenses (200mm minimum, 400mm+ preferred)
- Tripod or monopod for stability
- Camouflage gear to blend into the environment

## Techniques for Better Wildlife Photos

1. **Research your subjects** - Understand animal behavior to predict movements
2. **Master the light** - Early morning and late afternoon offer the best lighting
3. **Be patient** - Great wildlife photos often require hours of waiting
4. **Focus on the eyes** - Sharp eyes create a connection with the viewer
5. **Consider the environment** - Include habitat context when appropriate

## Ethical Considerations

- Never disturb or stress animals for a photograph
- Maintain a safe distance from wildlife
- Follow all park rules and regulations
- Avoid baiting or manipulating animal behavior

## Share Your Conservation Message

Use your wildlife photography to raise awareness about conservation issues and inspire others to protect endangered species.
    `
  }
];

// Generate the blog post files
blogPosts.forEach(post => {
  const { slug, title, description, date, readingTime, tags, image, author, content } = post;
  
  // Create frontmatter
  const frontmatter = `---
title: '${title}'
description: '${description}'
date: '${date}'
readingTime: ${readingTime}
tags: ${JSON.stringify(tags)}
image: '${image}'
author:
  name: '${author.name}'
  avatar: '${author.avatar}'
  bio: '${author.bio}'
---

${content}`;

  // Write to file
  const filePath = path.join(blogDir, `${slug}.mdx`);
  fs.writeFileSync(filePath, frontmatter);
  
  console.log(`Created blog post: ${filePath}`);
});

console.log('Blog post generation complete!');
