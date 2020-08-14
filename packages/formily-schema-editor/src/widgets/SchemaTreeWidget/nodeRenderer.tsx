import React, { useRef, useEffect, Fragment } from 'react';
import { isDescendant } from '../../shared/tree';
import cls from 'classnames';
import Form from './addition';
import { INodeRendererProps } from '../../types';
import { nodeRendererActions } from './context';
import Cursor from './cursorEnhancement';


const NodeRenderer: React.FC<INodeRendererProps> = React.memo((props) => {
  const {
    // scaffoldBlockPxWidth,
    toggleChildrenVisibility,
    connectDragPreview,
    connectDragSource,
    isDragging,
    canDrop,
    canDrag,
    node,
    title,
    subtitle,
    draggedNode,
    path,
    treeIndex,
    isSearchMatch,
    isSearchFocus,
    buttons,
    className,
    style,
    didDrop,
    onCancel,
    onUpdate,
    handleClick,
    selectPath,
    nodeAtom,
    showLeaf,
    showSibling,
    schemaInsert
  } = props;

  const contentRef = useRef(null)
  // const [ hovered, toggleHovered ] = useToggle(false);
  const getPathName = (path) => {
    return path.join('.') || ''
  }

  useEffect(() => {
    const { data: { path = [] } } = node; 
    if (getPathName(path) == selectPath) {
      nodeRendererActions.getSelectRow(
        document.querySelector(`[data-path='${props.selectPath}']`), 
        node.data.path,
        nodeAtom
      )
    }
  }, [props.selectPath])

  const saveContentRef = (refs: HTMLElement) => {
    contentRef.current = refs
  }
  const nodeTitle = title || node.title;
  const nodeSubtitle = subtitle || node.subtitle;

  let drag
  if (canDrag) {
    drag = connectDragSource
  } else {
    drag = e => e
  }

  const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
  const isLandingPadActive = !didDrop && isDragging;
  const { data = {} } = node
  const { status, nodeType, path: nodePath } = data
  const isRoot = node.key === '@@root'
  const pathName = getPathName(nodePath)
  const actived = pathName === selectPath
  const handleSelectRow = () => {
    // 1. 高亮非受控
    // debugger;
    nodeRendererActions.setActiveNode({ activedNodePath: pathName, nodeType });
    // 2. 设置游标，并通知面板
    handleClick(contentRef.current, node.data.path, nodeAtom)
  }


  const renderNormal = () => {
    return (
      <div
        className={cls('rst__contentWrapper')}
        data-path={pathName}
        onClick={handleSelectRow}
      >
        <div className={cls('rst__rowLabel')}>
          {toggleChildrenVisibility && !isRoot && 
            node.children &&
            (node.children.length > 0 || typeof node.children === 'function') && (
              <div
                className={cls(
                  node.expanded ? 'rst__collapse' : 'rst__expand',
                )}
                onClick={(e) => {
                  toggleChildrenVisibility({ node, path, treeIndex })
                  nodeRendererActions.setChildrenVisible({
                    pathName,
                    visible: !node.expanded
                  })
                  handleSelectRow();
                  e.stopPropagation();
                }}
              >
              </div>
            )}
          <span className={cls('rst__rowTitle', {
            leaf: !node.children ||  (Array.isArray(node.children) && node.children.length == 0 )
          })}>
            {typeof nodeTitle === 'function'
              ? nodeTitle({
                  node,
                  path,
                  treeIndex,
                })
              : nodeTitle}
          </span>

          {nodeSubtitle && (
            <span className="rst__rowSubtitle">
              {typeof nodeSubtitle === 'function'
                ? nodeSubtitle({
                    node,
                    path,
                    treeIndex,
                  })
                : nodeSubtitle}
            </span>
          )}
        </div>
        {!isRoot && (
          <div className="rst__rowName">{ node.data.title }</div>
        ) }
        {!isRoot && (
          <div className="rst__rowToolbar">
            {buttons.map((btn, index) => (
              <div
                key={index} // eslint-disable-line react/no-array-index-key
                className="rst__toolbarButton"
              >
                {btn}
              </div>
            ))}
        </div>)}
      </div>
    )}

  const renderForm = () => {
    return (
      <div className="rst__formWrapper">
        <div className="rst__formWrapper__title">{nodeType === 'leaf' ? "添加子节点" : "添加兄弟节点"}</div>
          <Form
            onCancel={onCancel}
            onUpdate={onUpdate}
            types={props.types}
            x-components={props['x-components']}
            parent={nodeAtom}
            effects={props.effects}
          />
      </div>
    )
  }
  return (
    <Fragment>
      {drag(<div style={{ height: '100%' }}>
      <div className={cls('rst__rowWrapper')}>
        {/* Set the row preview to be used during drag and drop */}
        {connectDragPreview(
          <div
            className={cls(
              'rst__row',
              isLandingPadActive && 'rst__rowLandingPad',
              isLandingPadActive && !canDrop && 'rst__rowCancelPad',
              isSearchMatch && 'rst__rowSearchMatch',
              isSearchFocus && 'rst__rowSearchFocus',
              className
            )}
            style={{ opacity: isDraggedDescendant ? 0.5 : 1, ...style,}}
          >
            <div
              ref={saveContentRef}
              className={cls('rst__rowContents', {
                'rst__rowContentsDragDisabled': !canDrag,
                actived
              })}
            >
              {status === 'init' ? renderForm() : renderNormal()}
            </div>
          </div>
        )}
      </div>
    </div>)}
    {actived && (
       <Cursor
          showLeaf={showLeaf}
          showSibling={showSibling}
          schemaInsert={schemaInsert}
          nodeElement={nodeAtom}
          parentPath={node.data.path}
       />
    )}
    </Fragment>
  )
}, () => {
  return false
})

NodeRenderer.defaultProps = {
  isSearchMatch: false,
  isSearchFocus: false,
  canDrag: false,
  toggleChildrenVisibility: null,
  buttons: [],
  className: '',
  style: {},
  parentNode: null,
  draggedNode: null,
  canDrop: false,
  title: null,
  subtitle: null,
  rowDirection: 'ltr',
};

export default NodeRenderer;