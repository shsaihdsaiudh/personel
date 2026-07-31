export interface ExperienceItem {
  /** 时间段，例如 "2023.07 – 2023.10" */
  time: string;
  /** 公司或学校名称 */
  organization: string;
  /** 职位或专业 */
  role: string;
  /** 简短描述 */
  description: string;
  /** 高亮标签（可选） */
  highlights?: string[];
}

export const experiences: ExperienceItem[] = [
  {
    time: "2026.05 – 至今",
    organization: "腾讯",
    role: "AI Agent 开发 · 实习",
    description:
      "负责面向 UE 建筑资产生成的长时 Agent 执行与评测框架建设。从零搭建并跑通长任务主链路，主导 LangGraph + DeepAgent 混合架构设计，解决长任务恢复、局部重跑与产物质量可控性问题。框架已由团队同事实际使用并持续迭代。",
    highlights: [
      "LangGraph 确定性编排",
      "Producer / QC 多智能体",
      "Checkpoint 断点恢复",
      "事务性产物管理",
      "LangSmith 轨迹观测",
    ],
  },
  {
    time: "2024.09 – 2028.06",
    organization: "电子科技大学",
    role: "信息与通信工程 · 本科",
    description:
      "985 高校，信息与通信工程学院。在校期间深入参与技术实践与竞赛，积累了扎实的工程基础与团队协作经验。",
    highlights: [
      "信通协技术部骨干",
      "挑战者杯「揭榜挂帅」全国一等奖",
      "GitHub 开源项目「九齿」算子优化贡献者",
    ],
  },
];
