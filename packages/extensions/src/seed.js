KISSY.config({
  "modules": {
    "@alife/formily-schema-editor-ascp-extensions/apiSchemaToJSONSchema": {
      "requires": []
    },
    "@alife/formily-schema-editor-ascp-extensions/ArrayCards/index": {
      "requires": []
    },
    "@alife/formily-schema-editor-ascp-extensions/ArrayTable/index": {
      "requires": []
    },
    "@alife/formily-schema-editor-ascp-extensions/Checkbox/index": {
      "requires": [
        "../util"
      ]
    },
    "@alife/formily-schema-editor-ascp-extensions/Radio/index": {
      "requires": [
        "../util"
      ]
    },
    "@alife/formily-schema-editor-ascp-extensions/Select/index": {
      "requires": [
        "../util"
      ]
    },
    "@alife/formily-schema-editor-ascp-extensions/SelectMulti/index": {
      "requires": [
        "../util"
      ]
    },
    "@alife/formily-schema-editor-ascp-extensions/Transfer/index": {
      "requires": [
        "../util"
      ]
    },
    "@alife/formily-schema-editor-ascp-extensions/config": {
      "requires": []
    },
    "@alife/formily-schema-editor-ascp-extensions/DatePicker/index": {
      "requires": []
    },
    "@alife/formily-schema-editor-ascp-extensions/factory": {
      "requires": [
        "./config"
      ]
    },
    "@alife/formily-schema-editor-ascp-extensions/Form/index": {
      "requires": []
    },
    "@alife/formily-schema-editor-ascp-extensions/FormCard/index": {
      "requires": []
    },
    "@alife/formily-schema-editor-ascp-extensions/FormDialog/index": {
      "requires": []
    },
    "@alife/formily-schema-editor-ascp-extensions/FormItemGrid/index": {
      "requires": []
    },
    "@alife/formily-schema-editor-ascp-extensions/index": {
      "requires": [
        "./ArrayCards/index",
        "./ArrayTable/index",
        "./Checkbox/index",
        "./DatePicker/index",
        "./FormCard/index",
        "./Input/index",
        "./NumberPicker/index",
        "./Radio/index",
        "./Range/index",
        "./Form/index",
        "./Switch/index",
        "./TimePicker/index",
        "./Transfer/index",
        "./RequestSelect/index",
        "./RequestSelectorMulti/index",
        "./Select/index",
        "./SelectMulti/index",
        "./FormDialog/index",
        "./factory"
      ]
    },
    "@alife/formily-schema-editor-ascp-extensions/Input/index": {
      "requires": []
    },
    "@alife/formily-schema-editor-ascp-extensions/NumberPicker/index": {
      "requires": []
    },
    "@alife/formily-schema-editor-ascp-extensions/Range/index": {
      "requires": []
    },
    "@alife/formily-schema-editor-ascp-extensions/RequestSelect/index": {
      "requires": []
    },
    "@alife/formily-schema-editor-ascp-extensions/RequestSelectorMulti/index": {
      "requires": []
    },
    "@alife/formily-schema-editor-ascp-extensions/Switch/index": {
      "requires": []
    },
    "@alife/formily-schema-editor-ascp-extensions/TimePicker/index": {
      "requires": []
    },
    "@alife/formily-schema-editor-ascp-extensions/types": {
      "requires": []
    },
    "@alife/formily-schema-editor-ascp-extensions/util": {
      "requires": []
    }
  },
  "packages": {
    "@alife/formily-schema-editor-ascp-extensions": {
      "version": "1.0.7",
      "base": "//g.alicdn.com/ascp-fe/formily-schema-editor-ascp-extensions/1.0.7/",
      "ignorePackageNameInUri": true,
      "debug": true,
      "group": "tm",
      "muiVersion": 5
    }
  }
});