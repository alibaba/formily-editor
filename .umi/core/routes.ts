// @ts-nocheck
import { ApplyPluginsType } from '/Users/liuqiao/projects/git/SchemaEditor/node_modules/_@umijs_runtime@3.2.19@@umijs/runtime';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": (props) => require('react').createElement(require('../../node_modules/_@umijs_preset-dumi@1.0.34@@umijs/preset-dumi/lib/themes/default/layout.js').default, {
      ...{"menus":{"*":{"*":[{"path":"/","title":"README","meta":{"order":null}},{"title":"Zh-cn","path":"/zh-cn","meta":{},"children":[{"path":"/zh-cn/summary","title":"说明书","meta":{}}]}]}},"locales":[],"navs":{},"title":"Formily Schema Editor","mode":"doc","repoUrl":"https://github.com/alibaba/formily-editor"},
      ...props,
    }),
    "routes": [
      {
        "path": "/",
        "component": require('../../README.md').default,
        "exact": true,
        "meta": {
          "locale": "en-US",
          "title": "README",
          "order": null
        },
        "title": "README"
      },
      {
        "path": "/zh-cn/summary",
        "component": require('../../docs/zh-cn/summary.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/zh-cn/summary.md",
          "updatedTime": 1598256990000,
          "slugs": [
            {
              "depth": 1,
              "value": "说明书",
              "heading": "说明书"
            },
            {
              "depth": 1,
              "value": "功能概览",
              "heading": "功能概览"
            },
            {
              "depth": 1,
              "value": "全局操作",
              "heading": "全局操作"
            },
            {
              "depth": 2,
              "value": "导入数据",
              "heading": "导入数据"
            },
            {
              "depth": 3,
              "value": "导入JSON（建设中）",
              "heading": "导入json（建设中）"
            },
            {
              "depth": 3,
              "value": "导入JSON SCHEMA",
              "heading": "导入json-schema"
            },
            {
              "depth": 2,
              "value": "导出数据",
              "heading": "导出数据"
            },
            {
              "depth": 2,
              "value": "撤销还原 & 重做",
              "heading": "撤销还原--重做"
            },
            {
              "depth": 2,
              "value": "预览表单",
              "heading": "预览表单"
            },
            {
              "depth": 1,
              "value": "节点树",
              "heading": "节点树"
            },
            {
              "depth": 3,
              "value": "增加节点",
              "heading": "增加节点"
            },
            {
              "depth": 3,
              "value": "删除节点",
              "heading": "删除节点"
            },
            {
              "depth": 3,
              "value": "拖拽调整层级与顺序",
              "heading": "拖拽调整层级与顺序"
            },
            {
              "depth": 1,
              "value": "表单全局样式配置",
              "heading": "表单全局样式配置"
            },
            {
              "depth": 2,
              "value": "字段节点配置",
              "heading": "字段节点配置"
            },
            {
              "depth": 3,
              "value": "基本属性配置",
              "heading": "基本属性配置"
            },
            {
              "depth": 3,
              "value": "控件属性配置",
              "heading": "控件属性配置"
            },
            {
              "depth": 3,
              "value": "联动规则配置",
              "heading": "联动规则配置"
            },
            {
              "depth": 4,
              "value": "触发条件配置",
              "heading": "触发条件配置"
            },
            {
              "depth": 4,
              "value": "动作配置",
              "heading": "动作配置"
            },
            {
              "depth": 2,
              "value": "布局节点配置",
              "heading": "布局节点配置"
            }
          ],
          "title": "说明书",
          "group": {
            "path": "/zh-cn",
            "title": "Zh-cn"
          }
        },
        "title": "说明书"
      },
      {
        "path": "/zh-cn",
        "meta": {},
        "exact": true,
        "redirect": "/zh-cn/summary"
      }
    ],
    "title": "Formily Schema Editor"
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
