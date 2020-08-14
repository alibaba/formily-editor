
  const extensionConfigs = {
    "Card": {
        "title": {
            "title": "卡片标题"
        },
        "subTitle": {
            "title": "卡片副标题"
        },
        "schema": {
            "type": "object",
            "properties": {
                "title": {
                    "type": "string",
                    "title": "卡片标题",
                    "required": false,
                    "x-component": "input"
                },
                "subTitle": {
                    "type": "string",
                    "title": "卡片副标题",
                    "required": false,
                    "x-component": "input"
                }
            }
        }
    },
    "DatePicker": {
        "placeholder": {},
        "format": {
            "title": "格式",
            "description": "如：YYYY-MM-DD 为 2020-03-27"
        },
        "showTime": {
            "title": "是否使用时间控件"
        },
        "schema": {
            "type": "object",
            "properties": {
                "placeholder": {
                    "type": "string",
                    "title": "输入提示",
                    "required": false,
                    "x-component": "input"
                },
                "format": {
                    "type": "string",
                    "title": "格式",
                    "required": false,
                    "default": "YYYY-MM-DD",
                    "x-component": "input",
                    "description": "如：YYYY-MM-DD 为 2020-03-27"
                },
                "showTime": {
                    "type": "",
                    "title": "是否使用时间控件",
                    "required": false,
                    "default": false,
                    "x-component": ""
                }
            }
        }
    },
    "Form": {
        "size": {
            "title": "表单尺寸",
            "editable": false
        },
        "labelAlign": {
            "title": "标签位置",
            "editable": false
        },
        "labelTextAlign": {
            "title": "标签对齐方式",
            "editable": false
        },
        "labelCol": {
            "title": "标签宽度",
            "description": "标签宽度说明"
        },
        "wrapperCol": {
            "title": "控件宽度",
            "description": "控件宽度说明"
        },
        "schema": {
            "type": "object",
            "properties": {
                "size": {
                    "type": "string",
                    "title": "表单尺寸",
                    "required": false,
                    "default": "medium",
                    "enum": [
                        {
                            "label": "大",
                            "value": "large"
                        },
                        {
                            "label": "中",
                            "value": "medium"
                        },
                        {
                            "label": "小",
                            "value": "small"
                        }
                    ],
                    "x-component": "radio",
                    "editable": false
                },
                "labelAlign": {
                    "type": "string",
                    "title": "标签位置",
                    "required": false,
                    "default": "left",
                    "enum": [
                        {
                            "label": "上",
                            "value": "top"
                        },
                        {
                            "label": "左",
                            "value": "left"
                        },
                        {
                            "label": "内",
                            "value": "inset"
                        }
                    ],
                    "x-component": "radio",
                    "editable": false
                },
                "labelTextAlign": {
                    "type": "string",
                    "title": "标签对齐方式",
                    "required": false,
                    "enum": [
                        {
                            "label": "左",
                            "value": "left"
                        },
                        {
                            "label": "右",
                            "value": "right"
                        }
                    ],
                    "x-component": "radio",
                    "editable": false
                },
                "labelCol": {
                    "type": "",
                    "title": "标签宽度",
                    "required": false,
                    "x-component": "",
                    "description": "标签宽度说明"
                },
                "wrapperCol": {
                    "type": "",
                    "title": "控件宽度",
                    "required": false,
                    "x-component": "",
                    "description": "控件宽度说明"
                }
            }
        }
    },
    "Input": {
        "placeholder": {},
        "addonTextBefore": {},
        "addonTextAfter": {},
        "schema": {
            "type": "object",
            "properties": {
                "placeholder": {
                    "type": "string",
                    "title": "输入提示",
                    "required": false,
                    "x-component": "input"
                },
                "addonTextBefore": {
                    "type": "string",
                    "title": "输入框前附加文字",
                    "required": false,
                    "x-component": "input"
                },
                "addonTextAfter": {
                    "type": "string",
                    "title": "输入框后附加文字",
                    "required": false,
                    "x-component": "input"
                }
            }
        }
    },
    "NumberPicker": {
        "step": {},
        "precision": {},
        "innerAfter": {
            "title": "数字后附加内容"
        },
        "schema": {
            "type": "object",
            "properties": {
                "step": {
                    "type": "",
                    "title": "步长",
                    "required": false,
                    "default": 1,
                    "x-component": ""
                },
                "precision": {
                    "type": "number",
                    "title": "保留小数点后位数",
                    "required": false,
                    "default": 0,
                    "x-component": "numberPicker"
                },
                "innerAfter": {
                    "type": "string",
                    "title": "数字后附加内容",
                    "required": false,
                    "x-component": "input"
                }
            }
        }
    },
    "Transfer": {
        "mode": {
            "description": "simple代表选中选项后自动移动，normal代表选中选项后需手动点击移动"
        },
        "notFoundContent": {},
        "sortable": {},
        "showSearch": {},
        "schema": {
            "type": "object",
            "properties": {
                "mode": {
                    "type": "string",
                    "title": "移动选项模式",
                    "required": false,
                    "default": "normal",
                    "enum": [
                        {
                            "label": "normal",
                            "value": "normal"
                        },
                        {
                            "label": "simple",
                            "value": "simple"
                        }
                    ],
                    "x-component": "radio",
                    "description": "simple代表选中选项后自动移动，normal代表选中选项后需手动点击移动"
                },
                "notFoundContent": {
                    "type": "string",
                    "title": "列表为空显示内容",
                    "required": false,
                    "default": "Not Found",
                    "x-component": "input"
                },
                "sortable": {
                    "type": "boolean",
                    "title": "是否允许拖拽排序",
                    "required": false,
                    "default": false,
                    "x-component": "switch"
                },
                "showSearch": {
                    "type": "boolean",
                    "title": "是否显示搜索框",
                    "required": false,
                    "default": false,
                    "x-component": "switch"
                }
            }
        }
    },
    "TimePicker": {
        "placeholder": {},
        "format": {
            "title": "格式",
            "description": "如：HH:mm:ss 代表 xx时xx分xx秒"
        },
        "schema": {
            "type": "object",
            "properties": {
                "placeholder": {
                    "type": "string",
                    "title": "输入框提示",
                    "required": false,
                    "x-component": "input"
                },
                "format": {
                    "type": "string",
                    "title": "格式",
                    "required": false,
                    "default": "HH:mm:ss",
                    "x-component": "input",
                    "description": "如：HH:mm:ss 代表 xx时xx分xx秒"
                }
            }
        }
    }
}
  export default extensionConfigs
  