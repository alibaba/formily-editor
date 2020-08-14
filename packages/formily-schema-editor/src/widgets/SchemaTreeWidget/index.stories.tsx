import React from 'react';
import SchemaTreeWidget from './index';
import { Schema } from '../../shared'

export default { title: 'SchemaTreeWidget' };

const schema: Schema = new Schema({
  "type": "object",
  "properties": {
    "string": {
      "type": "string",
      "title": "输入框组件",
      "x-component": "input"
    },
  }
})

const currentSchema: Schema = new Schema({
  "type": "object",
  "properties": {}
})

const schema2: Schema = new Schema({
  "type": "object",
  "properties": {
    "NO_NAME_FIELD_$0": {
      "type": "object",
      "x-component": "step",
      "x-component-props": {
        "style": {
          "marginBottom": 20
        },
        "dataSource": [
          {
            "title": "步骤1",
            "name": "basicInfo"
          },
          {
            "title": "步骤2",
            "name": "*(companyInfo,itemInfo)"
          },
          {
            "title": "步骤3",
            "name": "businessInfo"
          }
        ]
      }
    },
    "basicInfo": {
      "type": "object",
      "properties": {
        "NO_NAME_FIELD_$1": {
          "type": "object",
          "x-component": "layout",
          "x-component-props": {
            "labelCol": 8,
            "wrapperCol": 8
          },
          "properties": {
            "a1": {
              "type": "string",
              "title": "字段1",
              "required": true,
              "x-component": "input"
            }
          }
        }
      }
    },
    "businessInfo": {
      "type": "object",
      "properties": {
        "NO_NAME_FIELD_$4": {
          "type": "object",
          "x-component": "layout",
          "x-component-props": {
            "labelCol": 8,
            "wrapperCol": 8
          },
          "properties": {
            "a1": {
              "type": "string",
              "title": "字段4",
              "required": true,
              "x-component": "input"
            }
          }
        }
      }
    }
  }
})

const schema3: Schema = new Schema({
  "type": "object",
  "properties": {
    "formCard1": {
      "type": "FormCard",
      "properties": {
        "a1": {
          "type": "object",
          "x-component": "layout",
          "x-component-props": {
            "labelCol": 8,
            "wrapperCol": 8
          },
          "properties": {
            "b1": {
              "type": "string",
              "required": true,
              "x-component": "input"
            }
          }
        }
      }
    },
    "businessInfo": {
      "type": "object",
      "properties": {
        "NO_NAME_FIELD_$4": {
          "type": "object",
          "x-component": "layout",
          "x-component-props": {
            "labelCol": 8,
            "wrapperCol": 8
          },
          "properties": {
            "a4": {
              "type": "string",
              "title": "字段4",
              "required": true,
              "x-component": "input"
            }
          }
        }
      }
    }
  }
})



export const CommonScene = () => {
  
  return (
    <SchemaTreeWidget
      schema={schema}
      currentSchema={currentSchema}
      types={[
        { value: 'string', label: '字符串' },
        { value: 'number', label: '数字' },
        { value: 'boolean', label: '布尔值' },
        { value: 'array', label: '数组' },
        { value: 'object', label: '对象' },
        { value: 'layout', label: '布局' },

      ]}
      x-components={[
        { value: 'Input', label: '输入框', type: 'string'}
      ]}
      onAppend={(path, schema) => {
        console.log('onAppend: ', path, schema)
      }}
      onRemove={(path) => {
        console.log('onRemove: ', path)
      }}
      onSelect={(path) => {
        console.log('onSelect: ', path)
      }}
      onMoveChildren={(sourcePath, targetPath) => {
        console.log('onMoveChildren: ', sourcePath, targetPath)
      }}
      onMoveBefore={(sourcePath, targetPath) => {
        console.log('onMoveBefore: ', sourcePath, targetPath)
      }}
      onMoveAfter={(sourcePath, targetPath) => {
        console.log('onMoveAfter: ', sourcePath, targetPath)
      }}
    />
  )
}

export const ObjectSecne = () => {
  return (
    <SchemaTreeWidget
      schema={schema2}
      currentSchema={currentSchema}
      types={[
        { value: 'string', label: '字符串' },
        { value: 'number', label: '数字' },
        { value: 'boolean', label: '布尔值' },
        { value: 'array', label: '数组' },
        { value: 'object', label: '对象' },
        { value: 'layout', label: '布局' },

      ]}
      x-components={[
        { value: 'Input', label: '输入框', type: 'string'}
      ]}
      onAppend={(path, schema) => {
        console.log('onAppend: ', path, schema)
      }}
      onRemove={(path) => {
        console.log('onRemove: ', path)
      }}
      onSelect={(path) => {
        console.log('onSelect: ', path)
      }}
      onMoveChildren={(sourcePath, targetPath) => {
        console.log('onMoveChildren: ', sourcePath, targetPath)
      }}
      onMoveBefore={(sourcePath, targetPath) => {
        console.log('onMoveBefore: ', sourcePath, targetPath)
      }}
      onMoveAfter={(sourcePath, targetPath) => {
        console.log('onMoveAfter: ', sourcePath, targetPath)
      }}
    />
  )
}

export const LayoutSecne = () => {
  return (
    <div style={{ width: '600px' }}>
      <SchemaTreeWidget
        schema={schema3}
        currentSchema={currentSchema}
        types={[
          { value: 'string', label: '字符串' },
          { value: 'number', label: '数字' },
          { value: 'boolean', label: '布尔值' },
          { value: 'array', label: '数组' },
          { value: 'object', label: '对象' },
          { value: 'layout', label: '布局' },

        ]}
        x-components={[
          { value: 'Input', label: '输入框', type: 'string' }
        ]}
        onAppend={(path, schema) => {
          console.log('onAppend: ', path, schema)
        }}
        onRemove={(path) => {
          console.log('onRemove: ', path)
        }}
        onSelect={(path) => {
          console.log('onSelect: ', path)
        }}
        onMoveChildren={(sourcePath, targetPath) => {
          console.log('onMoveChildren: ', sourcePath, targetPath)
        }}
        onMoveBefore={(sourcePath, targetPath) => {
          console.log('onMoveBefore: ', sourcePath, targetPath)
        }}
        onMoveAfter={(sourcePath, targetPath) => {
          console.log('onMoveAfter: ', sourcePath, targetPath)
        }}
      />
    </div>
  )
}