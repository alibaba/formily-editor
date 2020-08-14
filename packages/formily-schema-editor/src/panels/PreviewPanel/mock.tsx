export const schema = {
  "type": "object",
  "properties": {
    "roleBindCard": {
      "type": "object",
      "x-props": {
        "title": "供应商角色绑定"
      },
      "x-component": "card",
      "properties": {
        "enable": {
          "type": "string",
          "x-component": "radio",
          "enum": [
            {
              "label": "是",
              "value": 1
            },
            {
              "label": "否",
              "value": 0
            }
          ],
          "title": "是否启用"
        },
        "roles": {
          "type": "array",
          "x-component": "arraycards",
          "title": "绑定以下角色",
          "items": {
            "type": "object",
            "properties": {
              "saleType": {
                "type": "string",
                "x-component": "select",
                "enum": [
                  {
                    "label": "经销",
                    "value": 1
                  },
                  {
                    "label": "代销",
                    "value": 0
                  }
                ],
                "title": "经营方式"
              },
              "roleId": {
                "type": "string",
                "x-component": "select",
                "enum": [
                  {
                    "label": "角色1",
                    "value": 1
                  },
                  {
                    "label": "角色2",
                    "value": 0
                  }
                ],
                "title": "角色"
              }
            }
          }
        }
      }
    }
  }
}