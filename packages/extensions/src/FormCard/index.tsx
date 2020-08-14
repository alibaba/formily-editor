
import { IExtensionConfig } from '../types'

export const FormCardExtension:IExtensionConfig = {
  type: 'layout',
  'x-component': 'Card',
  title: '卡片',
  defaultProps:{
    showTitleBullet: false,
    showHeadDivider: true,
    hasBorder: false,
  },
} 
