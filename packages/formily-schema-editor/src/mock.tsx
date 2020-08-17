import locale from './locale'
import { ISchemaEditorProps } from './types'

import extensions from '@formily-editor/extensions'

// const schema = {
//   "type": "object",
//   "properties": {
//     "table": {
//       "type": "array",
//       "x-component": "arraytable",
//       "items": {
//         "type": "object",
//         "properties": {
//           "a": {
//             "type": "string",
//             "x-component": "input",
//             "title": "aa",
//             "required": true
//           }
//         }
//       }
//     }
//   }
// }

// const schema = {
//   "type": "object",
//   "x-component-props": {
//     "size": "medium",
//     "labelAlign": "left",
//     "labelTextAlign": "right",
//     "labelCol": 7,
//     "wrapperCol": 12
//   },
//   "properties": {
//     "card_1": {
//       "x-component": "card",
//       "type": "layout",
//       "x-index": 0,
//       "x-component-props": {
//         "title": "基本信息",
//         "subTitle": "",
//         "showTitleBullet": false,
//         "showHeadDivider": true,
//         "hasBorder": false
//       },
//       "title": "",
//       "properties": {
//         "basicInfo": {
//           "type": "object",
//           "x-index": 0,
//           "x-component-props": {
//             "size": "medium",
//             "labelAlign": "left",
//             "labelTextAlign": "right",
//             "labelCol": 7,
//             "wrapperCol": 12
//           },
//           "x-rules": [],
//           "title": "",
//           "description": "",
//           "properties": {
//             "grid_3": {
//               "x-component": "grid",
//               "type": "layout",
//               "x-index": 0,
//               "x-component-props": {
//                 "gutter": 16,
//                 "cols": [
//                   8,
//                   8,
//                   8
//                 ]
//               },
//               "title": "",
//               "properties": {

//               }
//             },
//             "gender": {
//               "x-component": "radio",
//               "type": "string",
//               "x-index": 1,
//               "x-component-props": {
//                 "dataSource": [
//                   {
//                     "label": "男",
//                     "value": "male"
//                   },
//                   {
//                     "label": "女",
//                     "value": "female"
//                   }
//                 ]
//               },
//               "x-rules": [],
//               "title": "性别"
//             },
//             "phone": {
//               "x-component": "input",
//               "type": "string",
//               "title": "电话",
//               "x-rules": [
//                 {
//                   "format": "phone"
//                 }
//               ]
//             },
//             "job": {
//               "x-component": "radio",
//               "type": "string",
//               "x-index": 2,
//               "x-component-props": {
//                 "dataSource": [
//                   {
//                     "label": "是",
//                     "value": "1"
//                   },
//                   {
//                     "label": "否",
//                     "value": "0"
//                   }
//                 ]
//               },
//               "title": "是否就业",
//               "default": "1",
//               "x-rules": [],
//               "description": "截止202004",
//               "x-linkages": [
//                 {
//                   "id": "6ka5cgsgskl",
//                   "name": "",
//                   "type": "value:state",
//                   "condition": "{{$self.value==\"1\"}}",
//                   "target": "basicInfo.company",
//                   "state": {
//                     "visible": true
//                   },
//                   "otherwise": {}
//                 },
//                 {
//                   "id": "6ka5cgsgskl",
//                   "name": "",
//                   "type": "value:state",
//                   "condition": "{{$self.value==\"1\"}}",
//                   "target": "basicInfo.company",
//                   "state": {},
//                   "otherwise": {
//                     "visible": false
//                   }
//                 }
//               ]
//             },
//             "company": {
//               "x-component": "input",
//               "type": "string",
//               "x-index": 3,
//               "x-component-props": {
//                 "placeholder": "",
//                 "addonTextBefore": "",
//                 "addonTextAfter": "",
//                 "trim": true,
//                 "hasClear": true,
//                 "useVirtual": true
//               },
//               "title": "就职单位",
//               "x-linkages": []
//             },
//             "birthday": {
//               "x-component": "timepicker",
//               "type": "string",
//               "x-index": 4,
//               "x-component-props": {
//                 "placeholder": "",
//                 "format": "HH:mm:ss",
//                 "hasClear": true
//               },
//               "title": "出生日期"
//             },
//             "name": {
//               "x-component": "input",
//               "type": "string",
//               "x-index": 0,
//               "x-component-props": {
//                 "placeholder": "",
//                 "addonTextBefore": "",
//                 "addonTextAfter": "",
//                 "trim": true,
//                 "hasClear": true
//               },
//               "title": "姓名",
//               "x-rules": [
//                 {
//                   "required": true
//                 }
//               ],
//               "description": ""
//             }
//           }
//         }
//       }
//     },
//     "card_2": {
//       "x-component": "card",
//       "type": "layout",
//       "x-index": 1,
//       "x-component-props": {
//         "title": "详细信息",
//         "subTitle": "",
//         "showTitleBullet": false,
//         "showHeadDivider": true,
//         "hasBorder": false
//       },
//       "title": "",
//       "properties": {
//         "c": {
//           "x-component": "numberpicker",
//           "type": "number",
//           "x-index": 1,
//           "x-component-props": {
//             "step": 1,
//             "precision": 0,
//             "innerAfter": ""
//           },
//           "title": "c",
//           "x-rules": [
//             {
//               "maximum": 0,
//               "minimum": 10
//             }
//           ],
//           "description": "",
//           "x-linkages": []
//         },
//         "a": {
//           "x-component": "input",
//           "type": "string",
//           "x-index": 0,
//           "x-component-props": {
//             "placeholder": "",
//             "addonTextBefore": "",
//             "addonTextAfter": "",
//             "trim": true,
//             "hasClear": true
//           },
//           "x-rules": [],
//           "title": "a",
//           "description": "",
//           "x-linkages": [
//             {
//               "id": "j4es40kawg8",
//               "name": "",
//               "type": "value:schema",
//               "condition": "{{$self.value !== undefined}}",
//               "target": "c",
//               "schema": {
//                 "x-component-props": {
//                   "disabled": false
//                 }
//               },
//               "otherwise": {}
//             },
//             {
//               "id": "j4es40kawg8",
//               "name": "",
//               "type": "value:schema",
//               "condition": "{{$self.value !== undefined}}",
//               "target": "c",
//               "schema": {},
//               "otherwise": {
//                 "x-component-props": {
//                   "disabled": true
//                 }
//               }
//             }
//           ]
//         }
//       }
//     }
//   }
// }

// const schema = {
//   "x-component-props": {
//       "size": "medium",
//       "labelAlign": "left",
//       "wrapperCol": 12,
//       "labelTextAlign": "right",
//       "labelCol": 7
//   },
//   "type": "object",
//   "properties": {
//     "channelName": {
//       "type": "array",
//       "title": "xxx",
//       "x-component": "select",
//       "default": [{"hello": "world"}],
//       "x-index": 0,
//       "key": "channelName",
//       "x-component-props": {
//           "addonTextBefore": "",
//           "trim": true,
//           "hasClear": true,
//           "placeholder": "",
//           "addonTextAfter": ""
//       },
//     },
//   }
// }

const schema = {
  'x-component-props': {
    size: 'medium',
    labelAlign: 'left',
    wrapperCol: 12,
    labelTextAlign: 'right',
    labelCol: 7
  },
  type: 'object',
  properties: {
    xx: {
      type: 'string',
      'x-component': 'input',
      'x-component-props': {
        addonTextBefore: '',
        trim: true,
        hasClear: true,
        placeholder: '',
        addonTextAfter: ''
      },
      title: 'xx',
      'x-index': 0,
      key: 'xx'
    }
  }
}

export const props: ISchemaEditorProps = {
  schema,
  locale,
  extensions: Object.values(extensions),
  expression: false,
  initialMode: 'EDIT_ONLY'
}
