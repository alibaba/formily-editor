import React from "react";
import { 
  SchemaForm,
  FormButtonGroup,
  Submit,
  Reset,
  FormSpy,
  LifeCycleTypes
} from "@formily/next";
import Printer from "@formily/printer";
import { useEditor } from '../../hooks/useEditor'
import { withErrorBoundary } from 'react-error-boundary'
import ErrorBoundaryFallbackComponent  from '../../components/ErrorBoundaryFallbackComponent'
import './style.scss'

const Panel = ({ isFullScreen = false }) => {
  const { schema } = useEditor()

  return (
    <div className={`preview-panel ${isFullScreen ? 'full-screen' : ''}`}>
      <div className="preview-content">
        <FormSpy selector={LifeCycleTypes.ON_FORM_VALUES_CHANGE}>
          {({ form: spyForm }) => {
            return (
              <Printer>
              <SchemaForm
                schema={schema}
              >
                <FormButtonGroup offset={10} sticky>
                  <Reset>重置</Reset>
                  ​<Submit>查看提交数据</Submit>​​
                </FormButtonGroup>
              </SchemaForm>
            </Printer>
            )
          }}
        </FormSpy>
      </div>
    </div>
  );
}

export const PreviewPanel = withErrorBoundary(Panel, ErrorBoundaryFallbackComponent());


