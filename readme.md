# Formily-Schema-Editor
从表单数据结构出发，帮助你快速搭建表单。

<video 
  preload="none" 
  data-src="https://cloud.video.taobao.com/play/u/1326/p/1/d/hd/e/6/t/1/261319855255.mp4?auth_key=YXBwX2tleT04MDAwMDAwMTMmYXV0aF9pbmZvPXsidGltZXN0YW1wRW5jcnlwdGVkIjoiZDhmZGJjZjg5OTVkN2QwM2NkOGZhYjg0OTA5N2IwOWQifSZkdXJhdGlvbj0mdGltZXN0YW1wPTE1OTc3NTEyNTQ=" 
  webkit-playsinline="webkit-playsinline" 
  playsinline="playsinline" 
  class="lozad" 
  poster="https://img.alicdn.com/imgextra/i3/6000000000131/O1CN01ftmQFT1Cq2TyMdnQX_!!6000000000131-0-tbvideo.jpg" 
  src="https://cloud.video.taobao.com/play/u/1326/p/1/d/hd/e/6/t/1/261319855255.mp4?auth_key=YXBwX2tleT04MDAwMDAwMTMmYXV0aF9pbmZvPXsidGltZXN0YW1wRW5jcnlwdGVkIjoiZDhmZGJjZjg5OTVkN2QwM2NkOGZhYjg0OTA5N2IwOWQifSZkdXJhdGlvbj0mdGltZXN0YW1wPTE1OTc3NTEyNTQ=" 
  data-loaded="true" 
  controls="" 
  controlslist="nodownload">
</video>

## 背景
Formily提供了[JSON SCHEMA开发表单](https://formilyjs.org/#/0yTeT0/8MsesjHa)的能力，因此我们可以实现通过一份JSON SCHEMA渲染出一个表单。

这份SCHEMA可以通过开发者手写，但是更多的时候需要开放给非技术人员通过配置的方式生成。

因此，Formily-Schema-Editor出现了，它帮助不熟悉具体技术细节的用户生产SCHEMA，进而可以自己设计属于他们的表单。


## 功能
https://yuque.antfin-inc.com/docs/share/5ac32b31-2291-494e-8da7-f1f697156280?# 《表单配置器说明书》

## 安装

```javascript
import { SchemaEditor } from "@formily-editor/schema-editor";
import extensions from "@formily-editor/extensions";

const renderToolbar = (context) => {
  // 定制你的导航
}

const demo = () => {
  return <SchemaEditor 
    extensions={Object.values(extensions)} // 扩展组件
    renderToolbar={renderToolbar} // 定制导航
    schema={schema} // 初始schema
  />
}

```

## Demo
[使用示例](https://codesandbox.io/s/formlily-schema-editor-vb0ch)

## 贡献代码


## LICENSE

Formily-Schema-Editor is open source software licensed as
[MIT](https://github.com/alibaba/formily/blob/master/LICENSE.md).