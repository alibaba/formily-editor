import React, { Fragment } from 'react';
import cls from 'classnames';
import SortableTree from 'react-sortable-tree';
import { Message } from '@alifd/next';
import { ISchemaTreeWidgetProps } from '../../types';
import { useSchemaTree } from './hooks/useSchemaTree';
import CustomNodeContentRenderer from './nodeRenderer';
import CustomTreeNodeRenderer from './treeNodeRenderer';
import useClipboard from '../../hooks/useClipboard'
// import { nodeRendererActions } from './context';
// import Cursor from './cursor';
import 'react-sortable-tree/style.css';
import '../../assets/iconfont.css';
import './style.scss';

const copyPath = (copy, path) => {
  const copyText = path.map(item => item === '0' ? '[]' : item).join('.')
  copy(copyText).then(() => {
    Message.success(`复制路径${copyText}成功`)
  })
}

const SchemaTreeWidget: React.FC<ISchemaTreeWidgetProps> = (props) => {
  const {
    treeData,
    schemaDragStateChange, 
    schemaChange,
    schemaDelete,
    schemaSelect,
    onMoveNode,
    schemaInsert,
    schemaRemove,
    schemaUpdate,
    onVisibilityToggle,
    onDrop,
    canDrag,
    canNodeHaveChildren,
    activedNodePath,
    // setActivedNode,
    showLeaf,
    showSibling,
  } = useSchemaTree(props)

  const { copy } = useClipboard()

  return (
    <div>
      <SortableTree
        treeData={treeData}
        theme={{
          nodeContentRenderer: CustomNodeContentRenderer as any,
          treeNodeRenderer: CustomTreeNodeRenderer as any,
          scaffoldBlockPxWidth: 16,
        }}
        onVisibilityToggle={onVisibilityToggle}
        isVirtualized={false} // https://github.com/frontend-collective/react-sortable-tree/issues/264
        canNodeHaveChildren={canNodeHaveChildren}
        onMoveNode={onMoveNode}
        canDrop={onDrop}
        canDrag={canDrag}
        rowHeight={(nodeData) => {
          const { node: { data = {} } } = nodeData as any;
          if (data.status === 'init') return 320
          return 48
        }}
        onChange={schemaChange}
        onDragStateChanged={schemaDragStateChange}
        generateNodeProps={(nodeAtom) => {
          const { node } = nodeAtom
          const { data = {}, key } = node
          const { path = [] } = data;
          return {
            title: (
              <Fragment>
                {key !== '@@root' && <i className={cls('node-icon', `iconfont icon-${data.icon}`)}/>} 
                <span className="card-title">{key !== '@@root' ? node.data.key : '表单'}</span>
              </Fragment>
            ),
            onClick: () => { schemaSelect(node) },
            nodeAtom, // 没有办法，为了生活
            onUpdate: schemaUpdate(nodeAtom),
            selectPath: activedNodePath ,
            onCancel: schemaRemove(nodeAtom),
            types: props.types,
            'x-components': props['x-components'],
            buttons: [
              <i style={{ fontSize: '14px', marginRight: '8px' }} className="next-icon next-icon-copy" onClick={(e) => {
                e.stopPropagation()
                copyPath(copy, path)
              }} />,
              <i style={{ fontSize: '14px' }} className="next-icon next-icon-ashbin" onClick={schemaDelete(data)} />
            ],
            effects: props.effects,
            showLeaf,
            showSibling,
            schemaInsert
          }
        }}
      />
      {/* <Cursor
        showSibling={showSibling}
        showLeaf={showLeaf}
        schemaInsert={schemaInsert}
        currentSchema={props.currentSchema}
        activedNodePath={activedNodePath}
        setActivedNode={setActivedNode}
      /> */}
    </div>
  );
}

export default SchemaTreeWidget