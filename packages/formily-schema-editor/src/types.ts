import { FormPath, Schema, FormPathPattern } from './shared'
import { ISchema } from '@formily/react-schema-renderer'
import { ValidateDescription } from '@formily/validator'
export interface IExtensionContext {
  locale?: { [name: string]: any }
}
export interface ISchemaEditorExtension {
  type?: string //类型标识 object/array/number/string/date/boolean/layout
  'x-component'?: string //组件标识 Input/Select/Checkbox...
  extensionKey?: string // 扩展的唯一标识别，默认为`${x-component}Extension`
  isRoot?: boolean
  isLeaf?: boolean
  title?: string //控件名称，内置扩展需要从locale中读取
  icon?: React.ReactNode //图标
  configs: {
    defaultProps?: {} //默认配置数据
    schema?: ISchema //配置schema
  }
}

export interface ISchemaEditorProps {
  schema?: ISchema
  currentSchema?: Schema //支持受控schema
  locale?: { [name: string]: any } //国际化文案
  onChange?: (schema: ISchema) => void //支持实时获取Schema
  extensions?: SchemaEditorExtension[]
  initialMode: 'PREVIEW_ONLY' | 'EDIT_ONLY' | 'HALF_PREVIEW'
  renderToolbar?: (context?: ISchemaEditor) => void // 外部控制右上角操作按钮
  expression?: boolean // 是否启用表达式输入功能
}

export type SchemaEditorExtension = (
  context: IExtensionContext
) => ISchemaEditorExtension

export interface ISchemaEditor {
  locale: { [name: string]: any } //上下文国际化文案
  types: Array<{ label: string; value: string; icon: React.ReactNode }> //当前所有扩展类型列表
  ['x-components']: Array<{
    label: string
    value: string
    icon: React.ReactNode
    type: string
  }> //当前所有扩展控件列表
  isRoot: boolean
  selectedPath: FormPath //当前选择路径
  schema: Schema // 全局Schema
  currentSchema: Schema // 当前选择Schema
  extensionSchema: Schema //当前选择的Schema所对应的配置器Schema
  extensionDefaultProps: {} //当前选择的Schema所对应的配置器表单默认值
  initialMode: 'PREVIEW_ONLY' | 'EDIT_ONLY' | 'HALF_PREVIEW'
  expression?: boolean
  getSchema?: (json?: boolean) => Schema | ISchema
  setSchema?: (newSchema: ISchema) => void
  renderToolbar?: (context?: ISchemaEditor) => void
  updateSchemaSelfProps: (props: ISchema) => void
  updateSchemaXLinkages: (props: ISchema['x-linkages']) => void
  updateSchemaXRules: (props: ISchema['x-rules']) => void
  appendSchemaNode: (
    path: FormPathPattern,
    node: ISchema & { key: string }
  ) => void
  appendAfterSchemaNode: (
    path: FormPathPattern,
    node: ISchema & { key: string }
  ) => void
  appendBeforeSchemaNode: (
    path: FormPathPattern,
    node: ISchema & { key: string }
  ) => void
  moveAfterSchemaNode: (
    source: FormPathPattern,
    target: FormPathPattern
  ) => void
  moveBeforeSchemaNode: (
    source: FormPathPattern,
    target: FormPathPattern
  ) => void
  moveChildrenSchemaNode?: (source: FormPath, target: FormPath) => void
  removeSchemaNode: (path: FormPathPattern) => void
  selectSchemaNode: (path: FormPathPattern) => void
  allowUndo: () => boolean
  allowRedo: () => boolean
  undo: () => void
  redo: () => void
}

export interface IMove {
  path: FormPath
  index: number
}

export interface ISchemaTreeWidgetProps {
  schema?: Schema
  currentSchema: Schema // 当前选择Schema
  locale?: {}
  types?: Array<{ label: string; value: string }>
  'x-components'?: Array<{ label: string; value: string; type: string }>
  effects?: any
  //当前选择路径
  selectedPath?: FormPath
  //新增节点，并追加到父节点的子节点集合中
  onAppend?: (target: FormPath, schema: ISchema & { key: string }) => void
  //新增节点，并插入到指定节点的后面
  onAppendAfter?: (target: FormPath, schema: ISchema & { key: string }) => void
  //新增节点，并插入到指定节点的前面
  onAppendBefore?: (target: FormPath, schema: ISchema & { key: string }) => void
  //删除节点
  onRemove?: (target: FormPath) => void
  onDelete?: (target: FormPath) => void
  //移动节点
  onMoveBefore?: (source: FormPath, target: FormPath) => void
  //移动节点
  onMoveChildren?: (source: FormPath, target: FormPath) => void
  //移动节点
  onMoveAfter?: (source: FormPath, target: FormPath) => void
  //选择节点
  onSelect?: (path: FormPath) => void
}

export interface IFormProps {
  effects: any
  locale?: {}
  types?: Array<{ label: string; value: string }>
  'x-components'?: Array<{ label: string; value: string; type: string }>
  onSubmit?: (value: Record<string, any>) => void
  onCancel?: () => void
  onUpdate?: (values: Record<string, any>) => void
  type?: string
  parent: any
}

export interface ISwitchProps {
  locale?: {}
  types?: Array<{ label: string; value: string }>
  'x-components'?: Array<{ label: string; value: string; type?: string }>
  onSubmit?: (value: Record<string, any>, path: string) => void
  type?: string
  path: string
}

export interface IAddIconProps {
  onClick?: (event: any) => void
}

export interface ITreeNodeProps {
  swapFrom: any
  swapDepth: any
  swapLength: any
  canDrop: boolean
  draggedNode: any
  listIndex: any
  scaffoldBlockPxWidth: any
  lowerSiblingCounts: any
  connectDropTarget: any
  isOver: any
  treeIndex: any
  node: any
  path: any
  rowDirection: any
  selectPath: string
}

export interface INodeRendererProps {
  effects: any
  isSearchMatch: boolean
  isSearchFocus: boolean
  canDrag: boolean
  toggleChildrenVisibility: any
  buttons: any[]
  className: string
  style: {}
  parentNode: any
  draggedNode: any
  canDrop: boolean
  title: any
  subtitle: any
  rowDirection: string
  scaffoldBlockPxWidth: any
  connectDragPreview: any
  connectDragSource: any
  isDragging: any
  node: any
  path: any
  treeIndex: any
  didDrop: any
  treeId: any
  isOver: any
  nodeActived: any
  onCancel: any
  onUpdate: any
  handleClick: any
  selectPath: any
  types: any
  nodeAtom: any
  showLeaf: boolean
  showSibling: boolean
  schemaInsert: any
  onInsert: (e: any, params: any) => void
}

export interface XRulesSpec {}
export interface IRulesWidgetProps {
  formLayout?: {}
  defaultValue?: ValidateDescription[]
  value?: ValidateDescription[]
  locale?: { [name: string]: any }
  type?: 'object' | 'array' | 'string' | 'number' | 'boolean'
  xComponent?: string
  onChange?: (rules: ValidateDescription[]) => void
}

interface keyValuePairs {
  [key: string]: any
}

interface XLinkageSpec {
  name: string
  type: string
  condition: string
  target: string
  state?: keyValuePairs
  schema?: keyValuePairs
  otherwise: keyValuePairs
}

type XLinkagesSpec = Array<XLinkageSpec>

export interface LinkageWidgetProps {
  defaultValue?: XLinkagesSpec
  value?: XLinkagesSpec
  locale?: { [name: string]: any }
  type?: 'object' | 'array' | 'string' | 'number' | 'boolean'
  onChange: (linkages: XLinkagesSpec) => void
}
export interface ICursorProps {
  showSibling: boolean
  showLeaf: boolean
  schemaInsert?: any
  currentSchema?: Schema
  activedNodePath?: string
  setActivedNode: (node: { nodeType: string; activedNodePath: string }) => void
}
