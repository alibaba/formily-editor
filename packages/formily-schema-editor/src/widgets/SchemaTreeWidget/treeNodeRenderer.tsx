import React, { Children, cloneElement, ReactElement } from 'react';
import cls from 'classnames';
import { ITreeNodeProps } from '../../types';
import { nodeRendererActions } from './context'


const TreeNode: React.FC<ITreeNodeProps> = (props) => {
  const { 
    children,
    listIndex,
    swapFrom,
    swapLength,
    swapDepth,
    scaffoldBlockPxWidth,
    lowerSiblingCounts,
    connectDropTarget,
    isOver,
    draggedNode,
    canDrop,
    treeIndex,
    node,
    rowDirection,
  } = props
  const rowDirectionClass = rowDirection === 'rtl' ? 'rst__rtl' : null;

  // Construct the scaffold representing the structure of the tree
  const scaffoldBlockCount = lowerSiblingCounts.length;
  const scaffold = [];
  lowerSiblingCounts.forEach((lowerSiblingCount, i) => {
    let lineClass = '';
    if (lowerSiblingCount > 0) {
      // At this level in the tree, the nodes had sibling nodes further down

      if (listIndex === 0) {
        // Top-left corner of the tree
        // +-----+
        // |     |
        // |  +--+
        // |  |  |
        // +--+--+
        lineClass =
          'rst__lineHalfHorizontalRight rst__lineHalfVerticalBottom';
      } else if (i === scaffoldBlockCount - 1) {
        // Last scaffold block in the row, right before the row content
        // +--+--+
        // |  |  |
        // |  +--+
        // |  |  |
        // +--+--+
        lineClass = 'rst__lineHalfHorizontalRight rst__lineFullVertical';
      } else {
        // Simply connecting the line extending down to the next sibling on this level
        // +--+--+
        // |  |  |
        // |  |  |
        // |  |  |
        // +--+--+
        lineClass = 'rst__lineFullVertical';
      }
    } else if (listIndex === 0) {
      // Top-left corner of the tree, but has no siblings
      // +-----+
      // |     |
      // |  +--+
      // |     |
      // +-----+
      lineClass = 'rst__lineHalfHorizontalRight';
    } else if (i === scaffoldBlockCount - 1) {
      // The last or only node in this level of the tree
      // +--+--+
      // |  |  |
      // |  +--+
      // |     |
      // +-----+
      lineClass = 'rst__lineHalfVerticalTop rst__lineHalfHorizontalRight';
    }

    scaffold.push(
      <div
        key={`pre_${1 + i}`}
        style={{ width: scaffoldBlockPxWidth }}
        className={cls('rst__lineBlock', lineClass, rowDirectionClass)}
      />
    );

    if (treeIndex !== listIndex && i === swapDepth) {
      // This row has been shifted, and is at the depth of
      // the line pointing to the new destination
      let highlightLineClass = '';

      if (listIndex === swapFrom + swapLength - 1) {
        // This block is on the bottom (target) line
        // This block points at the target block (where the row will go when released)
        highlightLineClass = 'rst__highlightBottomLeftCorner';
      } else if (treeIndex === swapFrom) {
        // This block is on the top (source) line
        highlightLineClass = 'rst__highlightTopLeftCorner';
      } else {
        // This block is between the bottom and top
        highlightLineClass = 'rst__highlightLineVertical';
      }

      let style;
      if (rowDirection === 'rtl') {
        style = {
          width: scaffoldBlockPxWidth,
          right: scaffoldBlockPxWidth * i,
        };
      } else {
        // Default ltr
        style = {
          width: scaffoldBlockPxWidth,
          left: scaffoldBlockPxWidth * i,
        };
      }

      scaffold.push(
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          style={style}
          className={cls(
            'rst__absoluteLineBlock',
            highlightLineClass,
            rowDirectionClass
          )}
        />
      );
    }
  });

  let style = { 
    // left: scaffoldBlockPxWidth * scaffoldBlockCount, 
    transform: `translate(${scaffoldBlockPxWidth * (scaffoldBlockCount - 1)}px)`,
    width: `calc(100% - ${scaffoldBlockPxWidth * (scaffoldBlockCount - 1)}px)`
  };
  return connectDropTarget(
    <div
      style={{
        height: node.data.key === '@@initial' ? 'auto' : '46px'
      }}
      className={cls('rst__node', rowDirectionClass, { active: nodeRendererActions.getActiveNodePath() === node.data.path.join('.') })}
    >
      <div className="rst__nodeContent" style={style}>
        {Children.map(children as any, child => {
          const onCancel = child.props.onCancel
          const onUpdate = child.props.onUpdate
          const selectPath = child.props.selectPath
          const nodeAtom = child.props.nodeAtom
          const showLeaf = child.props.showLeaf
          const showSibling = child.props.showSibling
          const schemaInsert = child.props.schemaInsert
          const isInit = child.props.nodeAtom.node.data.status === 'init'
          return cloneElement(child as ReactElement, {
            isOver,
            canDrop,
            draggedNode,
            onCancel,
            onUpdate,
            selectPath,
            nodeAtom,
            showLeaf,
            showSibling,
            schemaInsert,
            effects: child.props.effects,
            handleClick: (ref, parentPath, targetNode) => {
              if (isInit) return
              requestAnimationFrame(() => {
                nodeRendererActions.getSelectRow(ref, parentPath, targetNode)
                requestAnimationFrame(() => {
                  child.props.onClick && child.props.onClick()
                })
              })
            },
          })}
        )}
      </div>
    </div>
  );
}

export default TreeNode;
