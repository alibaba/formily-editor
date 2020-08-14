import React from 'react'
import { useEditorProvider } from './hooks/useEditor'
import { EditorContext } from './shared'
import { ISchemaEditorProps } from './types'
import { MainPanel } from './panels/MainPanel'
import { withErrorBoundary } from 'react-error-boundary'
import ErrorBoundaryFallbackComponent from './components/ErrorBoundaryFallbackComponent'

import setup from './setup'

setup()

const Component: React.FC<ISchemaEditorProps> = props => {
  return (
    <EditorContext.Provider value={useEditorProvider(props)}>
      <MainPanel />
    </EditorContext.Provider>
  )
}

export const SchemaEditor = withErrorBoundary(
  Component,
  ErrorBoundaryFallbackComponent('full')
)
