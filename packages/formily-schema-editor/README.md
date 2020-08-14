# Formily Schema Editor

> 目前暂时仅支持供应链场景的表单Schema编辑器，后续会考虑开源

## 文档

- [产品文档](https://yuque.antfin-inc.com/ascp-fe/f2e/ac8ki6)
- [架构文档](https://yuque.antfin-inc.com/ascp-fe/f2e/ac8ki6)

## 架构图

![](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/16211/1583895567278-0db54a84-1455-47bf-b2f6-84dcbe8ad368.png)

## 开发规范

- 统一typescript编写,所有类型定义统一在src/types.ts中维护，Interface类型统一以IXxxxx形式命名，type推导类型不能带I(且只用于推导类型)，推荐多用泛型
- 不依赖feloader，单纯webpack打包
- 逻辑统一在Hooks内编写，组件只负责渲染结构，只要需要使用useState/useEffect这类原生hooks的统一抽离成独立hooks
- 如果当前组件存在hooks，在当前组件目录下新建一个hooks目录，将hooks写到里面
- demo统一在当前目录的xxx.stories.tsx中编写
- 无分号语句
- React组件禁用Class Component，统一用Function Component

## 初始化

```
tnpm install
```

## 调试界面

> 基于每个具体组件中的index.stories.tsx来快速预览界面，帮助调试界面

```
npm start
```

## 构建

```
npm run build
```

## 发布

```
tnpm publish
```