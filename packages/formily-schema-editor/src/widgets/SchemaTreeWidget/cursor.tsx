import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useEva } from 'react-eva';
import { nodeRendererActions } from './context';
import { ICursorProps } from '../../types';
import AddIcon from './icon';
import useToggle from '../../hooks/useToggle';

const Cursor: React.FC<ICursorProps> = ({ showSibling, showLeaf, schemaInsert, currentSchema, setActivedNode}) => {
  const [cursorPosition, setCursor] = useState({ left: 0, top: 0 })
  const [cursorNodeParentPath, setCursorNodeParentNodePath] = useState(null)
  const [targetNode, setTargetNode] = useState(null); 
  const { implementActions } = useEva({ actions: nodeRendererActions });
  const [ hovered, toggleHovered ] = useToggle(false)
  const containerDomPostion = useRef({ left: 0, top: 0 })
  const containerDomRef = useRef({ scrollTop: 0 })

  useEffect(() => {
    const containerRef = document.querySelector('.main-left')
    const containerPosition = containerRef.getBoundingClientRect()
    const { x, y } = containerPosition;
    containerDomRef.current = containerRef;
    containerDomPostion.current = { left: x, top: y }
  }, [])

  useEffect(() => {
    requestAnimationFrame(() => { // requestAnimationFrame等到目标dom挂载后，拿到
      const dom = document.querySelector(`[data-path='${currentSchema.path}']`)
      if (dom) {
        const position = dom.getBoundingClientRect();
        const { x, y } = position
        setCursor({ left: x, top: y })
        setActivedNode({ activedNodePath: currentSchema.path, nodeType: currentSchema.type })
      }
    })
    
  }, [`${currentSchema.path}_${currentSchema['x-index']}`])
  
  const updateCursorPosition = (ref, parentPath, node) => {
    setTimeout(() => {
      const position = ref.getBoundingClientRect();
      const { x, y } = position
      setCursor({ left: x, top: y })
      setCursorNodeParentNodePath(parentPath)
      setTargetNode(node)
    }, 0)
  }

  implementActions({
    getSelectRow: (dom, path, node) => updateCursorPosition(dom, path, node),
    updateCursorPosition: (path) => {
      const dom = document.querySelector(`[data-path='${path}']`)
      if (dom) {
        setTimeout(() => {
          const position = dom.getBoundingClientRect();
          const { x, y } = position
          setCursor({ left: x, top: y })
        }, 200)
      }
    }
  });

  const insertChildNode =(e, type: 'leaf' | 'sibling') => {
    schemaInsert(e, {
      type,
      parentPath: cursorNodeParentPath,
      nodeElement: targetNode
    });
  }

  const onMounseEnter = () => {
    toggleHovered()
  }
  const onMounseLeave = () => {
    toggleHovered()
  }

  return (
    <Fragment>
      <div
        className="rst__rowCursor"
        style={{
          left: cursorPosition.left - 3,
          top: cursorPosition.top - containerDomPostion.current.top +  containerDomRef.current.scrollTop + 32
        }}
        onMouseEnter={onMounseEnter}
        onMouseLeave={onMounseLeave}
      >
       <div className="rst__rowCursor__cnt">
        <AddIcon />
        { hovered && (
          <div className="rst__rowCursor__cnt__iconContaner">
            <div className="zoom-cnt">
              <div className="zoon-cnt__iconContainer">
                { showLeaf && <i className="zoom-cnt__iconContainer__icon iconfont icon-zijiedian" onClick={(e) => insertChildNode(e, 'leaf')} /> }
                { showSibling && <i className="zoom-cnt__iconContainer__icon iconfont icon-xiongjiedian" onClick={(e) => insertChildNode(e, 'sibling')} /> }
              </div>
            </div>
          </div>
        ) }
       </div>
      </div>
      <i
        className="rst__rowCursor__pointer iconfont icon-arrow"
        style={{
          top: cursorPosition.top - containerDomPostion.current.top + containerDomRef.current.scrollTop + 27,
          left: cursorPosition.left + 6
        }}
      />
    </Fragment>
  )
}

export default Cursor