import React, { useEffect } from 'react'
import { SchemaForm, Field, createFormActions } from '@formily/next'

import { useEditor } from "../../hooks/useEditor" 
import getConfigurePanleProps from './getConfigurePanleProps'
import effect from './effect'
import { isEmpty, lowercase } from '../../shared'
import { set } from "lodash";

import './style.scss'

const actions = createFormActions()

export const ConfigurePanel = ({ layout }) => {

  const context = useEditor();
  const { 
    isRoot,
    extensionSchema,
    types = [],
    xComponents = [],
    xComponentDataSource = [],
    locale = {},
    commonConfigSchema,
    currentSchema,
    updateSchemaSelfProps,
    selectedPath,
    xComponentForDefaultField
   } = getConfigurePanleProps(context)
   
   const path = selectedPath.toString()

   const { type } = currentSchema
   const isObject = type === 'object'
   const isLayout = type === 'layout'

   useEffect(() => {
     // 根节点，布局，对象无联动tab
    actions.setFieldState("tabs", (state) => {
      set(
        state,
        `props.x-component-props.hiddenKeys`,
        !isObject && !isLayout && !isRoot ? [] : ["linkageTabPane"]
      );
    });

    actions.setFieldState(
      "tabs.propertyTabPane.xComponentPropsCard",
      (state) => {
        let display = true;
        if (isRoot) {
          display = true;
        } else if (isObject) {
          display = false;
        } else if (!extensionSchema || isEmpty(extensionSchema.properties)) {
          display = false;
        }
        state.display = display;
      }
    );

    // 根节点无基本属性配置
    actions.setFieldState("tabs.propertyTabPane.basicConfigure", (state) => {
      state.display = !isRoot;
    });

    // 更新基本属性配置 schema
    actions.setFieldState(
      "tabs.propertyTabPane.basicConfigure.commconConfig",
      (state) => {
        set(state, `props.x-component-props.fieldSchema`, commonConfigSchema);
      }
    );

    // 更新控件配置 schema
    actions.setFieldState(
      "tabs.propertyTabPane.xComponentPropsCard.x-component-props.extensionProps",
      (state) => {
        set(state, `props.x-component-props.fieldSchema`, extensionSchema);
      }
    );

    actions.setFieldState(
      "tabs.propertyTabPane.basicConfigure.commconConfig.x-rules",
      (state) => {
        set(state, `props.x-component-props.type`, type);
        set(
          state,
          `props.x-component-props.xComponent`,
          currentSchema["x-component"]
        );
        set(state, `props.x-component-props.formLayout`, layout);
      }
    );

    actions.setFieldState(
      "tabs.propertyTabPane.basicConfigure.commconConfig.x-component",
      (state) => {
        set(state, `props.x-component-props.dataSource`, xComponentDataSource);
      }
    );

    // 默认值配置项使用的输入组件
    actions.setFieldState(
      "tabs.propertyTabPane.basicConfigure.commconConfig.default",
      (state) => {
        set(state, `props.x-component`, xComponentForDefaultField);
        set(
          state,
          `props.x-component-props.emptyValue`,
          currentSchema.getEmptyValue()
        );
        set(state, `props.x-component-props.validator`, (v) => {
          return (
            lowercase(Object.prototype.toString.call(v)) ===
            `[object ${lowercase(currentSchema.type)}]`
          );
        });
      }
    );

   // path变化代表当前节点切换
   }, [path])

  return <div className="configure-panel">
      <SchemaForm 
        className="configure-form"
        {...layout}
        actions={actions}
        expressionScope={{
          types,
        }}
        value={currentSchema.getSelfProps()}
        onChange={v => {
          // console.log('submit values', v)
          updateSchemaSelfProps(v)
        }}
        effects={effect({ xComponents })}
      >

        <Field 
          type="object" 
          name="tabs" 
          x-component="tab"
          x-component-props={{
            animation: false,
            defaultActiveKey: "propertyTabPane"
          }}
        >
          <Field 
            type="object" 
            name="propertyTabPane" 
            x-component="tabpane" 
            x-component-props={{
              title: "属性",
            }}
          >
            <Field 
                type="object"
                name="basicConfigure"
                x-component="block" 
                x-component-props={{
                  title: isObject ? "" : "基本属性",
                  showTitleBullet: false,
                  showHeadDivider: false,
                  className: isObject ? "xcomponent-block-root" : ""
                }}
              >
                <Field 
                  type="object" 
                  name="commconConfig"
                  x-component="SchemaFieldLayout" 
                  x-component-props={{
                    locale,
                    fieldSchema: commonConfigSchema,
                  }}
                />
              </Field>
              <Field 
                type="object"
                name="xComponentPropsCard"
                x-component="block"
                x-component-props={{
                  title: isRoot ? "" : "控件属性",
                  showTitleBullet: false,
                  showHeadDivider: false,
                  className: isRoot ? "xcomponent-block-root" : ""
                }}
              > 
              <Field type="object" name="x-component-props">
                <Field 
                  name="extensionProps"
                  x-component="SchemaFieldLayout" 
                  x-component-props={{
                    fieldSchema: {},
                  }}
                />
              </Field>
            </Field>

          </Field>
          <Field 
            type="object" 
            name="linkageTabPane" 
            x-component="tabPane" 
            x-component-props={{
              title: "联动",
            }}
          >
            <Field 
              name="x-linkages" 
              type="array" 
              x-component="LinkageWidget"
            />
          </Field>
        </Field>
      </SchemaForm>

      {/* <Button style={{ position: 'absolute', bottom: '80px'}} onClick={() => { console.log(actions.getFormGraph()) }}>FormGraph</Button> */}
  </div>
}
