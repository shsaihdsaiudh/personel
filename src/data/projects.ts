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
    name: "拼团营销交易系统",
    description:
      "基于微服务架构与 DDD 思想构建的商品营销平台，支持满减、折扣等多种营销玩法的灵活组合与分发管理。通过责任链+策略模式构建活动校验框架，采用数据库原子更新+团维度分段锁实现高并发库存扣减，搭建预热+多级缓存+限流防护体系保障大促流量洪峰下的稳定性。",
    techStack: [
      "SpringBoot",
      "MyBatis",
      "MySQL",
      "Redis",
      "RabbitMQ",
      "Docker",
      "Prometheus",
    ],
    link: "https://github.com",
  },
  {
    name: "AI Agent 可编排系统",
    description:
      "基于 Spring AI 与分层架构构建的企业级智能体中台，提供标准化大模型服务、灵活工作流调度及 RAG 知识库检索能力。设计自主规划/工作流编排/固定链路三种执行模式，构建「分析-执行-评审」循环验证机制，基于 PGVector 构建向量知识库并集成 Tika 自动化文档清洗。",
    techStack: [
      "Spring AI",
      "SpringBoot",
      "PostgreSQL",
      "PGVector",
      "Redis",
      "React",
      "Docker",
    ],
    link: "https://github.com",
  },
];
