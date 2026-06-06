import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: "杨晔塬's Journal",
    description: "技术笔记与思考，记录后端开发、分布式系统和 AI Agent 相关实践。",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/post/${post.id}`,
    })),
    customData: `<language>zh-CN</language>`,
  });
}
