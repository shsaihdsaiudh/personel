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
    name: "长时 Agent 执行与评测框架",
    description:
      "面向 UE 建筑资产生成的长任务 Agent 运行时。用 LangGraph 承担确定性流程编排，DeepAgent 只负责需要模型判断的环节，形成 Producer → QC → 纯代码 Router 的分层结构：QC 通过前产物不正式落盘，重试次数受限，节点状态可 checkpoint。支持长任务中断恢复与单节点局部重跑，避免用户只对某一步不满意时整链路重跑。配套 LangSmith 轨迹观测与真实 UE 环境回归验证，显著提升非文本生成任务的稳定性与可控性。",
    techStack: [
      "LangGraph",
      "DeepAgent",
      "Python",
      "LangSmith",
      "Unreal Engine",
      "Multi-Agent",
    ],
  },
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
  },
];
