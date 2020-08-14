import React, { useEffect }  from "react";
import { Resizable } from 're-resizable'
import { Breadcrumb } from '@alifd/next'
import { FormProvider } from '@formily/next'

import { TreePanel } from '../TreePanel'
import { ConfigurePanel } from '../ConfigurePanel'
import { PreviewPanel } from '../PreviewPanel'

import { useEditor } from "../../hooks/useEditor"
import useMode, { MODES } from './hooks/useMode' 
import useFormLayout from './hooks/useFormLayout'

import Header from './header'

import './style.scss'


const getBreadCrumbDataSource = (path, includeVirtual = true) => {
  const pathData = path.toArray().filter(item => typeof item === 'string').map(item => item === '0' ? '[]' : item)
  return  ['form'].concat(pathData || []);
}

const Tree = ({ handleResizeStop }) => {
  return (
    <Resizable 
        className="main-left"
        minWidth="20%"
        maxWidth="60%"
        defaultSize={{
          width: '33%',
          height: '100%',
        }}
        enable={{
          top:false, 
          right:true, 
          bottom:false, 
          left:false,
          topRight:false, 
          bottomRight:false, 
          bottomLeft:false, 
          topLeft:false 
        }}
        onResizeStop={handleResizeStop}
      >
        <TreePanel />
      </Resizable>
  )
}

export const MainPanel = () => {
  const context = useEditor()
  const { selectedPath: path, initialMode } = context

  const { mode, setMode, isPreviewMode } = useMode(initialMode)
  const { layout, setCompactLayout, setLooseLayout } = useFormLayout()
  const handleResizeStop = () => {
    const width = document.querySelector(".main-content").clientWidth;

    if(width < 390)setCompactLayout()
    else setLooseLayout()
  }

  useEffect(() => {
    handleResizeStop()
  }, [mode])

  return <div className="main-panel">
    <Header {...context} mode={mode} setMode={setMode} />

    <FormProvider>
      <section className="main">
        <Tree handleResizeStop={handleResizeStop} />
        
        <div className="main-right">
          <Resizable 
            className="main-content"
            minWidth={isPreviewMode ? "33%" : "100%"} 
            maxWidth={isPreviewMode ? "60%" : "100%"}
            defaultSize={{
              width: isPreviewMode ? "33%" : "100%",
              height: '100%',
            }}
            enable={{
              top:false, 
              right: isPreviewMode, 
              bottom:false, 
              left:false,
              topRight:false, 
              bottomRight:false, 
              bottomLeft:false, 
              topLeft:false 
            }}
            onResizeStop={handleResizeStop}
          >
            <Breadcrumb separator="/" className="breadcrumb" maxNode={10}>
              {getBreadCrumbDataSource(path, true).map(item => (
                <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
              ))}
            </Breadcrumb>
          
            <ConfigurePanel layout={layout} /> 
          </Resizable>

          <div style={{ display: isPreviewMode ? 'block' : 'none', width: '100%'}}>
            <PreviewPanel isFullScreen={mode === MODES.PREVIEW_ONLY.value} />
          </div>
            
        </div>
      </section>
    </FormProvider>
  </div>
};
