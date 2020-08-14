import { useMemo, useRef, useState, useEffect } from 'react';
import { useEva } from 'react-eva';
import { nodeRendererActions } from '../context';
import { Schema } from '../../../shared'
import { insertNode, removeNodeAtPath, getNodeAtPath } from '../../../shared/tree'
import { ISchemaTreeWidgetProps } from '../../../types'
import { 
  pathParser,
  flattenForest,
  getChildIndex,
  iconMap,
  // NODE_TYPE,
} from '../../../shared/tree';
// import { Message } from '@alifd/next';

const noop = () => {}

export const useSchemaTree = (props: ISchemaTreeWidgetProps) => {
  const [childrenVisible, setChildrenVisible] = useState({})
  const traversalSchema = useMemo(() => {
    return function _traversal(schema: Schema, path: string[] = [], index: number = 0, title?: string) {
      const type = schema.type
      const visible = childrenVisible[path.join('.')]
      return {
        type,
        title: title,
        key: `@@${path.join('.') || 'root'}`,
        expanded: visible === undefined ? true : visible,
        data: {
          key: schema.key,
          title: schema.title,
          icon: iconMap[schema['type']] || 'xiugai',
          nodeType: type,
          path,
          index,
          children: undefined,
        },
        children: schema.type === 'array' 
        ? ((schema.items || {} as any).children || []).map((child, idx) => {
          return _traversal(child, path.concat('0', child.key), idx, child.key)
        })
        : (schema.children || []).map((child, idx) => {
          return _traversal(child, path.concat(child.key), idx, child.key)
        }),
      }
    }
  }, [childrenVisible])

  const [treeData, setTreeData] = useState([])
  const draggingNode = useRef(null)
  const preTreeData = useRef(treeData)

  const [activedNode, setActivedNode] = useState({ activedNodePath: "", nodeType: "object" });
  const { implementActions } = useEva({ actions: nodeRendererActions });
  
  const { activedNodePath, nodeType } = activedNode

  const showLeaf = ['object', 'layout', 'array', 'root'].includes(nodeType)
  const showSibling = activedNodePath != "";

  implementActions({
    setActiveNode: (node) => {
      setActivedNode(node)
    },
    setChildrenVisible: ({ pathName, visible }) => {
      setChildrenVisible({
        ...childrenVisible,
        [pathName]: visible
      })
    },
    getChildrenVisible: (pathName) => {
      return childrenVisible[pathName]
    },
    getActiveNodePath: () => {
      const { activedNodePath } = activedNode
      return activedNodePath
    }
  });

  useEffect(() => {
    requestAnimationFrame(() => {
      const data = traversalSchema(props.schema)
      setTreeData([data])
    })
  }, [props.schema['__ID__']])

  useEffect(() => {
    const currentPath = props.selectedPath.entire
    setActivedNode({ activedNodePath: currentPath, nodeType: props.currentSchema.type })
  }, [props.selectedPath.entire])
  
  // useEffect(() => {
  //   // setTimeout(() => {
  //   //   nodeRendererActions.updateCursorPosition(props.selectedPath.entire)
  //   // }, 200)
  // }, [treeData])

  const schemaChange = (data) => {
    if (draggingNode.current) { // dragging
      const { data: { nodeType, path } } = draggingNode.current
      setActivedNode({ activedNodePath: path.join('.'), nodeType })
      // nodeRendererActions.updateCursorPosition(path.join('.'))
    }
    setTreeData(data)
  }

  const setNodeFocus = (path = "", nodeType = "object") => { // path、nodeType用来描述节点类型，给cursor消费
    setActivedNode({ activedNodePath: path, nodeType });
    // 拖拽后将焦点置为根结点
  }

  const onMoveNode = (node) => {
    setTimeout(() => {
      const { 
        onMoveChildren = noop,
        onMoveBefore = noop,
        onMoveAfter = noop
      } = props;
      const { nextPath } = node
      nextPath.pop();
      // 不去拿当前父节点快照计算孩子个数的原因是，拖拽层级变化复杂，导致onMoveNode拿到的路径信息获取不到争取的父节点
      const targetNode = node.nextParentNode
      /** targetNode 为当前拖拽到的父节点的快照信息 */
      const {
        children: parentChildren = [],
        data: { path: parentPath = [] }
      } = targetNode;
  
      // let currentPath // 拖拽后的路径
  
      /** draggingNode 为当前被拖拽的节点信息 
       * sourcePath 为拖拽节点原Path name为当前节点的字段名
      */
      const { data: { path: sourcePath = [], key } } = draggingNode.current  // 此时可以拿到node维护的 source path, name 用来生成新Path
      if (!(parentChildren.length - 1)) { // 当父节点没有孩子时
        // debugger;
        onMoveChildren(
          // pathParser(parentPath.concat(key)), 
          pathParser(parentPath), 
          pathParser(sourcePath)
        )
      } else { // 当父节点有孩子时，要判断孩子的是插入到第一个还是最后一个还是中间
        const index = getChildIndex(targetNode.children, key)
        // 如果index = 0,需要找到后面相邻的兄弟的path作为锚点
        // 如果index != 0, 需要找到前面相邻的兄弟的path作为锚点
        if (index === 0) {
          const targetpath = targetNode.children[1].data.path
          // debugger;
          onMoveBefore(pathParser(targetpath), pathParser(sourcePath))
        } else {
          const targetpath = targetNode.children[index - 1].data.path
          onMoveAfter(pathParser(targetpath), pathParser(sourcePath))
        }
      }
      draggingNode.current = null;
    }, 0)
    
  }

  const schemaDragStateChange = ({ isDragging, draggedNode }) => {
    if (isDragging) {
      draggingNode.current = draggedNode
    }
  }

  const _insertLeafNode = (treeData, targetDepth, targetIndex, newNode) => {
    return insertNode({
      treeData,
      depth: targetDepth,
      minimumTreeIndex: targetIndex + 1,
      newNode,
      getNodeKey: () => {},
      ignoreCollapsed: true,
      expandParent: true
    }).treeData
  } 

  const _insertSliblingNode = (treeData, targetDepth, targetIndex, newNode) => {
    return insertNode({
      treeData,
      depth: targetDepth - 1,
      minimumTreeIndex: targetIndex,
      newNode,
      getNodeKey: () => {},
      ignoreCollapsed: true,
      expandParent: true
    }).treeData
  }

  const schemaRemove = (nodeElement) => () => {
    const { path, parentNode } = nodeElement;
    const newData = removeNodeAtPath({
      treeData,
      path,
      getNodeKey: ({ treeIndex: number}) => {
        // https://github.com/frontend-collective/react-sortable-tree/issues/51
        return number;
      } 
    })
    
    // 恢复游标
    setNodeFocus((parentNode.data.path || []).join('.'), parentNode.type);
    setTreeData(newData)
  }

  // 树组件中塞临时节点
  const schemaInsert = (e, { type, parentPath = [], nodeElement }) => {
    const targetDepth = nodeElement.path.length
    const targetIndex = nodeElement.treeIndex
    let newData
    const path = parentPath.concat(`${Date.now()}`)
    // TODO
    const newNode = { 
      title: '新增节点', 
      data: { 
        nodeType: type, 
        status: 'init', 
        key: '@@initial',
        path,
        sourcePath: parentPath // 添加当前节点的锚点
      } 
    }
    if (type === 'leaf') {
      // 检验孩子节点中是否有重复name 
      newData = _insertLeafNode(treeData, targetDepth, targetIndex, newNode)
    } else if (type === 'sibling') {
      const gap = (flattenForest([nodeElement.node]) || []).length
      // 检兄弟节点中是否有重复name
      newData = _insertSliblingNode(treeData, targetDepth, gap + targetIndex, newNode)
    }
    setTreeData(newData)
    // nodeRendererActions.updateCursorPosition(parentPath.join('.'))
    e.stopPropagation()
  }

  const schemaUpdate = (nodeElement) => (params) => {
    const insertNodeName = params.key
    const { onAppend = noop, onAppendAfter = noop, onAppendBefore = noop } = props;
    // const ancestorChildren = (nodeElement.parentNode || {}).children || [] // 要回溯到父亲，看他的孩子是否key重复
    const { 
      path,
      parentNode: { data: { path: parentPath = [] } },
      node: { data: { nodeType, sourcePath = [] } }
      // 此nodeType为中间状态，没有维护在schema中 leaf | sibling
    } = nodeElement

    // array类型要做特殊处理 sourcePath: array.*
    let parent = nodeElement.parentNode.type === 'array' ? [...sourcePath, '0'] : [...sourcePath]
    // debugger;

    //ancestorChildren里是初始化inset进去的孩子 即name: @test,所以是>0
    // if (ancestorChildren.filter(child => child.data.key == insertNodeName).length > 0) {
    //   Message.error('该层级存在同名节点，添加失败！')
    //   return
    // }
    const targetNode = getNodeAtPath({
      treeData,
      path,
      getNodeKey: ({ treeIndex: number}) => {
        // https://github.com/frontend-collective/react-sortable-tree/issues/51
        return number;
      } 
    })

    const currentPath = parentPath.concat(insertNodeName)
    targetNode.node.type = params.type
    targetNode.node.title = params.title
    targetNode.node.key = params.key
    targetNode.node.data = {
      ...targetNode.node.data, 
      ...params, 
      icon: iconMap[params['x-component']],
      path: currentPath,
      status: undefined
    }
    /** nodeElement 为新增节点的父节点快照信息 */
    const { parentNode: { children = [] } } = nodeElement
    if (nodeType === 'leaf') {
      // 添加叶子节点
      if (!(children.length - 1)) { // 当前父节点没有孩子，调用onAppend  
        // debugger
        onAppend(pathParser(parent), { ...params })
        // debugger;
      } else { // 如果父节点有孩子，调用onAppendBefore
        const targetpath = children[1].data.path
        onAppendBefore(pathParser(targetpath), { ...params })
        // debugger;
      }
    } else {
      // 添加兄弟节点
      // debugger;
      onAppendAfter(pathParser(sourcePath), { ...params })
    }
    setNodeFocus([...parent, params.key].join('.'), params.type)
  }

  const schemaDelete = (data) => (e) => { 
    const { onRemove = noop } = props;
    onRemove(pathParser(data.path))
    setNodeFocus();
    e.stopPropagation() 
  }

  const schemaSelect = (node) => {
    const { onSelect = noop } = props;
    onSelect(pathParser(node.data.path))
  }

  const schemaAdd = (schema, path) => {
    const { onAppend = noop } = props;
    onAppend(pathParser(path), schema)
  }

  const onVisibilityToggle = ({ treeData })  => {
    setTreeData([...treeData])
  }

  const onDrop = (params) => {
    const { nextParent, node: { data: { key } } } = params
    if (!nextParent) { // 不能当根结点
      return false
    }
    const { children: nextParentChildren = [] } = nextParent
    if (nextParent.data.status === 'init') { // 新节点不能当父亲
      return false
    }
    if (nextParentChildren.filter(child => child.data.key == key).length > 1) {
      //该children不是快照，是拖拽的结果，所以计算length时候要注意
      return false
    }
    return true
  }

  const canDrag = ({ node }) => {
    const { data: { status } } = node
    if (status === 'init') {
      return false
    }
    return true
  }

  const canNodeHaveChildren = (node) => {
    return !['string', 'boolean', 'number'].includes(node.type)
  }

  return {
    traversalSchema,
    schemaDragStateChange,
    schemaChange,
    schemaDelete,
    schemaSelect,
    schemaAdd,
    schemaInsert,
    schemaUpdate,
    schemaRemove,
    onVisibilityToggle,
    onDrop,
    canDrag,
    onMoveNode,
    canNodeHaveChildren,
    setActivedNode,
    activedNodePath,
    showLeaf,
    showSibling,
    treeData,
    preTreeData,
    draggingNode,
  }
}