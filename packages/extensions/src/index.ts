import { ArrayCardsExtension } from './ArrayCards'
import { ArrayTableExtension } from './ArrayTable'
import { CheckboxExtension } from './Checkbox'
import { DatePickerExtension } from './DatePicker'
import { FormCardExtension } from './FormCard'
import { InputExtension } from './Input'
import { NumberPickerExtension } from './NumberPicker'
import { RadioExtension } from './Radio'
import { RangeExtension } from './Range'
import { FormExtension } from './Form'
import { SwitchExtension } from './Switch'
import { TimePickerExtension } from './TimePicker'
import { TransferExtension } from './Transfer'
import { RequestSelectExtension } from './RequestSelect'
import { RequestSelectMultiExtension } from './RequestSelectorMulti'
import { SelectExtension } from './Select'
import { SelectMultiExtension } from './SelectMulti'
import { FormDialogExtension } from './FormDialog'

import factory from './factory'

const extensionList = [
  ArrayCardsExtension,
  ArrayTableExtension,
  CheckboxExtension,
  DatePickerExtension,
  FormCardExtension,
  InputExtension,
  NumberPickerExtension,
  RadioExtension,
  RangeExtension,
  FormExtension,
  SwitchExtension,
  TimePickerExtension,
  TransferExtension,
  RequestSelectExtension,
  RequestSelectMultiExtension,
  SelectExtension,
  SelectMultiExtension,
  FormDialogExtension
]

export const extensions = extensionList.reduce((buf, cur) => {
  const extensionKey =
    cur.extensionKey || `${cur['x-component'].toLowerCase()}Extension`

  buf[extensionKey] = factory(cur)

  return buf
}, {})

// Object.keys(extensions).forEach(key => {
//   console.log(JSON.stringify(extensions[key](), null, 4))
// })

export default extensions
