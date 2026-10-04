"use client";

import { useMemo } from "react";
import * as mdx from "@mdx-js/react";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { Callout } from "@/components/mdx/callout";
import { Tabs, TabsItem } from "@/components/mdx/tabs";
import { Accordion } from "@/components/mdx/accordion";
import { Steps, Step } from "@/components/mdx/steps";
import { Pre } from "@/components/mdx/pre";
import { BilibiliVideo } from "@/components/mdx/bilibili-video";
import { Quote } from "@/components/mdx/quote";
import { Kbd } from "@/components/mdx/kbd";
import { Diff } from "@/components/mdx/diff";
import { Timeline, TimelineItem } from "@/components/mdx/timeline";
import { Download } from "@/components/mdx/download";

// MDX 文章里可以直接使用的组件（组件名大写）
// pre 覆盖所有代码块，统一加上「复制」按钮
const components = {
  Callout,
  Tabs,
  TabsItem,
  Accordion,
  Steps,
  Step,
  Quote,
  Kbd,
  Diff,
  Timeline,
  TimelineItem,
  Download,
  BilibiliVideo,
  pre: Pre,
};

// 与 serialize 的编译模式保持一致：开发环境编译为 jsxDEV，生产环境编译为 jsx/jsxs
import * as jsxDevRuntime from "react/jsx-dev-runtime";
import * as jsxProdRuntime from "react/jsx-runtime";

const jsxRuntime =
  process.env.NODE_ENV === "production" ? jsxProdRuntime : jsxDevRuntime;

/**
 * 渲染服务端 serialize 预编译的 MDX 内容。
 *
 * 说明：next-mdx-remote 主入口的 MDXRemote 在 Next.js 14.2 的客户端组件里
 * 有已知 bug（客户端引用解析为 undefined，报 "Element type is invalid"），
 * 所以这里按它的实现自己做了等价的求值 + MDXProvider 渲染，
 * 依赖仍是 next-mdx-remote@6（服务端 serialize 编译）。
 */
export function MdxContent({ source }: { source: MDXRemoteSerializeResult }) {
  const Content = useMemo(() => {
    const opts = { ...mdx, ...jsxRuntime };
    const fullScope = Object.assign(
      { opts },
      { frontmatter: source.frontmatter },
      source.scope
    );
    const keys = Object.keys(fullScope);
    const values = Object.values(fullScope);
    // 编译产物通过 arguments[0]（opts）和 arguments[1]（frontmatter）取运行时
    const hydrateFn = Reflect.construct(Function, keys.concat(source.compiledSource));
    return hydrateFn.apply(hydrateFn, values).default;
  }, [source]);

  return (
    <mdx.MDXProvider components={components}>
      <Content />
    </mdx.MDXProvider>
  );
}
