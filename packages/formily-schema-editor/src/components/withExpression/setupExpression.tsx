import { registerFormFields, connect } from '@formily/next'
import { Input, Select, NumberPicker, Radio, Checkbox, Switch, TimePicker, DatePicker, Rating } from '@alifd/next'
import withExpression from './index'


export default () => {
  registerFormFields({
    inputWithExpression: connect()(withExpression(Input)),
    selectWithExpression: connect()(withExpression(Select)),
    numberPickerWithExpression: connect()(withExpression(NumberPicker)),
    radioWithExpression: connect()(withExpression(Radio.Group)),
    checkboxWithExpression: connect()(withExpression(Checkbox.Group)),
    switchWithExpression: connect()(withExpression(Switch)),
    timePickerWithExpression: connect()(withExpression(TimePicker)),
    datePickerWithExpression: connect()(withExpression(DatePicker)),
    ratingWithExpression: connect()(withExpression(Rating))
  })
}
