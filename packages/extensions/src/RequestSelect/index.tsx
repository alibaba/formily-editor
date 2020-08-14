import { IExtensionConfig } from '../types'

export const RequestSelectExtension:IExtensionConfig = {
  type: 'string',
  'x-component': 'RequestSelect',
  extensionKey: 'requestselectExtension',
  title: '下拉选择框(动态数据源)',
  defaultProps: {
    hasClear: true,
    useVirtual: false,
    filterLocal: false,
    showSearch: true,
    autoLoad: true,
  },
  getSchema: () => {
    return {
      type: "object",
      properties: {
        "placeholder": {
          title: "输入提示",
          type: "string"
        },
        "url": {
          type: 'string',
          title: '接口地址',
          required: false,
          'x-component': 'input',
        },
        params: {
          type: 'array',
          title: '接口参数',
          'x-component': 'SimpleArrayTable',
          'x-component-props': {
            canRemoveAll: true,
          },
          items: {
            type: 'object',
            properties: {
              key: {
                type: 'string',
                title: '参数名',
              },
              value: {
                type: 'string',
                title: '参数值',
              },
            },
          },
        },
        labelKey: {
          type: 'string',
          title: '作为选项文案的字段',
          placeholder: 'label',
          default: 'label',
        },
        valueKey: {
          type: 'string',
          title: '作为选项值的字段',
          placeholder: 'value',
          default: 'value',
        },
        filterLocal: {
          type: 'boolean',
          title: "是否本地搜索", // 默认是本地，不显示
          
          "x-linkages": [{
            type: 'value:visible',
            target: '.queryKey',
            condition: '{{!!!$value}}'
          }]
        },
        queryKey: { 
          type: 'string',
          title: '关键词的参数名',
          default: 'keyword',
          description: '用户搜索时输入的字符作为哪一个请求参数',
          required: false,
          'x-component': 'input',
        },
      }
    }
  }
}
