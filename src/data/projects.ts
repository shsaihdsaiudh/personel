export interface ProjectItem {
  /** 项目名称 */
  name: string;
  /** 项目简介 */
  description: string;
  /** 技术栈标签 */
  techStack: string[];
  /** 链接地址（可选） */
  link?: string;
  /** 链接按钮文案，默认"查看项目" */
  linkText?: string;
}

export const projects: ProjectItem[] = [
  {
    name: "MiniGit",
    description:
      "用 TypeScript 实现的简化版 Git 版本控制系统，支持 init、add、commit、branch、merge 等核心命令。",
    techStack: ["TypeScript", "Node.js", "OOP"],
    link: "https://github.com",
    linkText: "GitHub",
  },
  {
    name: "ChatVault",
    description:
      "AI 驱动的聊天记录分析与归档工具，支持全文检索和语义摘要，日均处理 10k+ 条消息。",
    techStack: ["Python", "LangChain", "PostgreSQL", "React"],
    link: "https://github.com",
  },
  {
    name: "个人主页",
    description:
      "极简黑白风格的个人主页，基于 Astro + Tailwind CSS 构建，Lighthouse 评分 100。",
    techStack: ["Astro", "Tailwind CSS", "TypeScript"],
    link: "https://github.com",
  },
  {
    name: "PulseDash",
    description:
      "轻量级实时监控面板，使用 WebSocket 推送服务指标，支持自定义告警规则和图表面板。",
    techStack: ["Go", "Svelte", "WebSocket", "Docker"],
    link: "https://github.com",
  },
];
