```javascript
const fs = require('fs');
const path = require('path')
const pick = require('lodash.pick')

const config = require('./config.json')

const supportedTypes = ["bool", "node", "enum", "string", "number"];

const getSchemaPropertyType = (name) => {
  if (!supportedTypes.includes(name) || !name) return '';

  let type = name;
  switch (name) {
    case "bool":
      type = "boolean"
      break
    case "node":
      type = "string"
      break
    case "enum":
      type = "string"
      break
    default:
      type = name
  }
  return type
};

const getXComponentType = (schemaProperty) => {
  const { type } = schemaProperty;

  if (type === 'number') return 'numberPicker'

  if (type === 'boolean') return 'switch'
  if (type === "string" ){
    if(!Array.isArray(schemaProperty.enum))return 'input'

    return schemaProperty.enum.length <=3 ? 'radio': 'select'
  }

  return ''
}

const buildSchemaProperty = (prop, defaultProp = {}) => {
  const { type, description, required, defaultValue } = prop

  const schemaPropertytype = getSchemaPropertyType(type.name)
  let schemaProperty = {
    type: schemaPropertytype,
    title: description,
    required,
  };
  if (defaultValue) {
    schemaProperty.default = eval(`(${defaultValue.value})`)
  }
  if (type.name === "enum") {
    const { value = [] } = prop.type;

    schemaProperty.enum = value.map(item => ({
      label: item.description || eval(`(${item.value})`),
      value: eval(`(${item.value})`)
    }));
  }

  schemaProperty["x-component"] = getXComponentType(schemaProperty)

  return Object.assign(schemaProperty, defaultProp)
};

const template = content => {
  return `
  const extensionConfigs = ${content}
  export default extensionConfigs
  `
}

const transform = (apiSchema, supportedProps) => {
  let schema = { type: "object", properties: {} }

  if(apiSchema == undefined|| Object.keys(apiSchema).length === 0)return schema;
  
  const props = pick(apiSchema, Object.keys(supportedProps))

  Object.keys(props).forEach(propKey => {
    const schemaProperty = buildSchemaProperty(props[propKey], supportedProps[propKey]);
    if (schemaProperty) schema.properties[propKey] = schemaProperty
  })

  return schema
}

try {
  const packagePath = require.resolve("@alifd/next")
  const dirPath = path.join(path.dirname(packagePath), 'lib')
  fs.readdir(dirPath, (err, files) => {
    if(err){
      throw new Error('read next error')
    }

    files.forEach(fileName => {
      const fielPath = path.join(dirPath, fileName, 'api-schema.json')

      if(fs.existsSync(fielPath)) {
        const jsonStr = fs.readFileSync(fielPath, { encoding: 'utf-8' })
        const jsonObj = JSON.parse(jsonStr)

        if(!config[jsonObj.name])return
        
        config[jsonObj.name].schema = transform(jsonObj.props, config[jsonObj.name])
      }
      
    })

    fs.writeFileSync(path.join(path.dirname(__filename), 'config.ts'), template(JSON.stringify(config, null, 4)))
  })
  
} catch (error) {
  console.error(error)
}
```