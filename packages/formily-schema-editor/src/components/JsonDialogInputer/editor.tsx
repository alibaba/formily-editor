import React, { useEffect, useRef } from 'react';
import AceEditor from 'brace';
import 'brace/theme/solarized_light';
import 'brace/mode/json';

  
function processSize(size) {
  return !/^\d+$/.test(size) ? size : `${size}px`;
}

interface IEditorProps {
  value?: string
  defaultValue?: string,
  mode?: string,
  theme?: string,
  readOnly?: boolean,
  editorDidMount?: (editor: any) => void,
  onChange?: (v?: string) => void,
  width?: number | string,
  height?: number | string,
}

const BraceEditor = React.forwardRef((props: IEditorProps, ref: React.MutableRefObject<any>) => {
  const containerRef = useRef(null)
  const editorRef = ref || useRef(null)

  const initBrace = () => {
    const value =  props.value || props.defaultValue || '';

    const { mode = 'ace/mode/json', theme = 'ace/theme/solarized_light', readOnly = false } = props;
    if (containerRef.current) {
      editorRef.current = AceEditor.edit(containerRef.current);
      editorRef.current.getSession().setMode(mode);
      editorRef.current.setTheme(theme);
      editorRef.current.setReadOnly(readOnly);
      editorRef.current.setValue(value);
    }
  }

  const destroyBrace = () => {
    editorRef.current = null
    containerRef.current = null
  }

  useEffect(() => {
    initBrace()

    props.editorDidMount(editorRef.current)

    editorRef.current.getSession().on('change', (input) => {
      const { action } = input
      if (['insert', 'remove'].includes(action)) {
        props.onChange( editorRef.current.getSession().getDocument().getValue())
      }
    })

    return () => {
      destroyBrace()
    }
  }, [])

  const { width, height } = props;
  const fixedWidth = processSize(width);
  const fixedHeight = processSize(height);
  const style = {
    width: fixedWidth,
    height: fixedHeight,
  };

  return (
    <div
      ref={containerRef}
      style={style}
      className="brace-editor-container"
    />
  );
})

export default BraceEditor;

