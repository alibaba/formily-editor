import { registerFormFields, connect, createControllerBox } from '@formily/next'
import { setup, ArrayTable, FormCard, ArrayCards } from '@formily/next-components'

import { 
  Input, 
  Select, 
  NumberPicker, 
  Radio, 
  Checkbox, 
  Switch, 
  TimePicker, 
  DatePicker, 
  Rating,
  Range,
} from '@alifd/next'
import withExpression from './components/withExpression'
import JsonDialogInputer from './components/JsonDialogInputer'

import LinkageWidget from './widgets/LinkageWidget'
import RulesWidget from './widgets/RulesWidget' 

import SchemaFieldLayout from './components/SchemaFieldLayout'
import GridColsInputer from './components/GridColsInputer'
import SimpleArrayTable from './components/SimpleArrayTable'
import TypeCascaderSelector from './components/TypeCacaderSelector'


export default () => {
    setup()
    registerFormFields({
      inputWithExpression: connect()(withExpression(Input)),
      selectWithExpression: connect()(withExpression(Select)),
      numberPickerWithExpression: connect()(withExpression(NumberPicker)),
      radioWithExpression: connect()(withExpression(Radio.Group)),
      checkboxWithExpression: connect()(withExpression(Checkbox.Group)),
      switchWithExpression: connect()(withExpression(Switch)),
      timePickerWithExpression: connect()(withExpression(TimePicker)),
      datePickerWithExpression: connect()(withExpression(DatePicker)),
      ratingWithExpression: connect()(withExpression(Rating)),
      rangeWithExpression: connect()(withExpression(Range)),
      // -------

      select: connect()(Select),
      input: connect()(Input),
      numberpicker: connect()(NumberPicker),
      arraytable: ArrayTable,
      arrayCards: ArrayCards,
      formcard: FormCard,
      switch: connect({ valueName: 'checked' })(Switch),
      datepicker: connect()(DatePicker),
      timepicker: connect()(TimePicker),
      //-----------
      LinkageWidget: connect()(LinkageWidget),
      RulesWidget: connect()(RulesWidget),
      GridColsInputer: connect()(GridColsInputer),
      SimpleArrayTable: SimpleArrayTable,
      TypeCascaderSelector: connect()(TypeCascaderSelector),
      JsonDialogInputer: connect()(JsonDialogInputer)
    })

    createControllerBox('SchemaFieldLayout', SchemaFieldLayout)
}