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
    time: "2024.09 – 2028.06",
    organization: "电子科技大学",
    role: "信息与通信工程 · 本科",
    description:
      "985 高校，信息与通信工程学院。在校期间深入参与技术实践与竞赛，积累了扎实的工程基础与团队协作经验。",
    highlights: [
      "信通协技术部骨干",
      '挑战者杯「揭榜挂帅」全国一等奖',
      'GitHub 开源项目「九齿」算子优化贡献者',
    ],
  },
];
