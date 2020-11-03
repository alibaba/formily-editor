// import pick from "lodash.pick"
import { ISchema } from '@formily/react-schema-renderer'
import { SupportedProps } from './types'

// const supportedTypes = ["bool", "node", "enum", "string", "number"];

// const getSchemaPropertyType = (name : string) : string => {
//   if (!supportedTypes.includes(name) || !name) return '';

//   let type = name;
//   switch (name) {
//     case "bool":
//       type = "boolean"
//       break
//     case "node":
//       type = "string"
//       break
//     case "enum":
//       type = "string"
//       break
//     default:
//       type = name
//   }
//   return type
// };

// const getXComponentType = (schemaProperty: ISchema):string => {
//   const { type } = schemaProperty;

//   if (type === 'number') return 'numberPicker'

//   if (type === 'boolean') return 'switch'
//   if (type === "string" ){
//     if(!Array.isArray(schemaProperty.enum))return 'input'

//     return schemaProperty.enum.length <=3 ? 'radio': 'select'
//   }

//   return ''
// }

// const buildSchemaProperty = (prop, defaultProp = {}) => {
//   const { type, description, required, defaultValue } = prop

//   const schemaPropertytype = getSchemaPropertyType(type.name)
//   let schemaProperty : ISchema = {
//     type: schemaPropertytype,
//     title: description,
//     required,
//   };
//   if (defaultValue) {
//     schemaProperty.default = eval(`(${defaultValue.value})`)
//   }
//   if (type.name === "enum") {
//     const { value = [] } = prop.type;

//     schemaProperty.enum = value.map(item => ({
//       label: item.description || eval(`(${item.value})`),
//       value: eval(`(${item.value})`)
//     }));
//   }

//   schemaProperty["x-component"] = getXComponentType(schemaProperty)

//   return Object.assign(schemaProperty, defaultProp)
// };

export const apiSchemaToJSONSchema = (
  supportedProps: SupportedProps<object>
): ISchema => {
  return {
    type: 'object',
    properties: supportedProps
  }
  // if(apiSchema == undefined || !apiSchema.props || Object.keys(apiSchema.props).length === 0)return;

  // const props = pick(apiSchema.props, Object.keys(supportedProps))
  // let schema: ISchema = { type: "object", properties: {} }

  // Object.keys(props).forEach(propKey => {
  //   const schemaProperty = buildSchemaProperty(props[propKey], supportedProps[propKey]);
  //   if (schemaProperty) schema.properties[propKey] = schemaProperty
  // })

  // return schema
}

export const buildDataSourceSchema = (
  title?: string,
  description?: string
): ISchema => {
  const dataSourceSchema = {
    type: 'array',
    title: title || '数据源',
    description: description,
    'x-component': 'SimpleArrayTable',
    'x-component-props': {
      canRemoveAll: true
    },
    items: {
      type: 'object',
      properties: {
        label: {
          type: 'string',
          required: true,
          default:'',
          'x-component-props': {
            placeholder: '标签'
          }
        },
        value: {
          type: 'string',
          required: true,
          default:'',
          'x-component-props': {
            placeholder: '值'
          }
        }
        // "disabled": {
        //   type: "boolean",
        //   title: "是否禁用",
        // }
      }
    }
  }

  return dataSourceSchema
}
