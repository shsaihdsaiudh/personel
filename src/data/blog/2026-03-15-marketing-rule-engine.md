---
slug: "marketing-rule-engine"
title: "营销规则引擎：从臃肿的 if-else 到可编排的校验框架"
description: "面对不断增加的营销玩法导致的逻辑臃肿问题，应用责任链与策略模式构建活动校验框架，并通过线程池并行加载业务试算数据，有效降低代码耦合度并显著缩短接口响应耗时。"
date: 2026-03-15
tags: ["Java", "设计模式", "DDD", "SpringBoot"]
---

## 背景

在拼团营销交易系统的迭代过程中，营销玩法从最初的满减、折扣两种，迅速扩展到秒杀、拼团返利、阶梯优惠、新客专享等十余种。每增加一种玩法，活动校验逻辑就多一层 `if-else`，代码逐步走向不可维护。

## 问题分析

最初的校验代码长这样：

```java
if ("DISCOUNT".equals(activity.getType())) {
    // 折扣校验逻辑
    validateDiscount(activity, order);
} else if ("GROUP_BUY".equals(activity.getType())) {
    // 拼团校验逻辑
    validateGroupBuy(activity, order);
} else if ("FLASH_SALE".equals(activity.getType())) {
    // 秒杀校验逻辑
    validateFlashSale(activity, order);
}
// ... 每新增玩法就往这里加
```

这带来三个问题：

1. **开闭原则违背**：每次新玩法都要改核心校验代码
2. **代码耦合**：不同玩法的校验逻辑混在一个类里
3. **性能瓶颈**：串行调用多个外部服务获取试算数据

## 解决方案

### 责任链 + 策略模式

将每种营销玩法抽象为一个独立的 `ActivityValidator` 策略，通过责任链串联执行：

```java
public interface ActivityValidator {
    ValidationResult validate(ActivityContext context);
    boolean supports(ActivityType type);
}

@Component
public class DiscountValidator implements ActivityValidator {
    @Override
    public boolean supports(ActivityType type) {
        return ActivityType.DISCOUNT.equals(type);
    }

    @Override
    public ValidationResult validate(ActivityContext context) {
        // 折扣专属校验逻辑
    }
}
```

### 并行试算

通过线程池并行加载各玩法的业务试算数据，将原本串行 200ms+ 的链路压缩到 60ms 以内：

```java
List<CompletableFuture<TrialResult>> futures = validators.stream()
    .map(v -> CompletableFuture.supplyAsync(
        () -> v.trial(context), trialExecutor
    ))
    .collect(Collectors.toList());

CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
```

## 效果

- **代码耦合度**：新增玩法只需添加一个 `Validator` 实现类，核心逻辑零改动
- **接口响应耗时**：从 200ms 降至 60ms，降幅 70%
- **可测试性**：每个 Validator 可独立单测，覆盖率从 35% 提升至 85%

---

这套模式后来被复用到 AI Agent 可编排系统中，成为内部组件标准化接入的参考范式。
