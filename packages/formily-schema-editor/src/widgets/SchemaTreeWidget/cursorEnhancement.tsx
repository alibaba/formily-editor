import React, { useState } from 'react';
import { useEva } from 'react-eva';
import { nodeRendererActions } from './context';
// import { ICursorProps } from '../../types';
import AddIcon from './icon';

const Cursor: React.FC<any> = ({ showSibling, showLeaf, schemaInsert, nodeElement, parentPath }) => {
  const [cursorNodeParentPath, setCursorNodeParentNodePath] = useState(parentPath)
  const [targetNode, setTargetNode] = useState(nodeElement); 
  const { implementActions } = useEva({ actions: nodeRendererActions });

  const updateCursorPosition = (ref, parentPath, node) => {
    setTimeout(() => {
      setCursorNodeParentNodePath(parentPath)
      setTargetNode(node)
    }, 0)
  }

  implementActions({
    getSelectRow: (dom, path, node) => updateCursorPosition(dom, path, node),
  });

  const insertChildNode =(e, type: 'leaf' | 'sibling') => {
    schemaInsert(e, {
      type,
      parentPath: cursorNodeParentPath,
      nodeElement: targetNode
    });
  }

  return (
    <div className="rst__rowCursor__container">
      <div
        className="rst__rowCursor"
      >
       <div className="rst__rowCursor__cnt">
        <AddIcon />
        <div className="rst__rowCursor__cnt__iconContaner">
          <div className="zoom-cnt">
            <div className="zoon-cnt__iconContainer">
              { showLeaf && <i className="zoom-cnt__iconContainer__icon iconfont icon-zijiedian" onClick={(e) => insertChildNode(e, 'leaf')} /> }
              { showSibling && <i className="zoom-cnt__iconContainer__icon iconfont icon-xiongjiedian" onClick={(e) => insertChildNode(e, 'sibling')} /> }
            </div>
          </div>
        </div>
       </div>
      </div>
      <i className="rst__rowCursor__pointer iconfont icon-arrow"/>
    </div>
  )
}

export default Cursor