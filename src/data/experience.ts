export interface ExperienceItem {
  /** 时间段，例如 "2023.07 – 2023.10" */
  time: string;
  /** 公司或学校名称 */
  organization: string;
  /** 职位或专业 */
  role: string;
  /** 简短描述 */
  description: string;
}

export const experiences: ExperienceItem[] = [
  {
    time: "2025.06 – 2025.09",
    organization: "腾讯科技",
    role: "前端开发实习生",
    description:
      "参与内部组件库的维护与迭代，使用 React + TypeScript 开发了 3 个通用业务组件，覆盖率达 90%+。",
  },
  {
    time: "2024.12 – 2025.04",
    organization: "字节跳动",
    role: "全栈开发实习生",
    description:
      "负责抖音创作者平台部分后端接口开发，基于 Node.js 优化 API 响应延迟 30%。",
  },
  {
    time: "2023.09 – 2026.06",
    organization: "北京大学",
    role: "计算机科学与技术 · 硕士",
    description:
      "研究方向为分布式系统与云计算，GPA 3.8/4.0，发表 CCF-A 类论文一篇。",
  },
  {
    time: "2019.09 – 2023.06",
    organization: "华中科技大学",
    role: "软件工程 · 学士",
    description:
      "核心课程包括数据结构、操作系统、计算机网络，获国家奖学金。",
  },
];
