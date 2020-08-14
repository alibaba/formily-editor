import React from 'react'
import { Button } from '@alifd/next'
import { isFn } from '@formily/shared'
import { MODES } from './hooks/useMode'

const Header = ({  mode, ...context }) => {
  const { locale, allowRedo, allowUndo, undo, redo, setMode, renderToolbar, setSchema, getSchema } = context
   return (<header className="header">
      <div className="header-left">
      <div className="logo">{locale.title}</div>
        <div className="undo-redo">
          <Button.Group>
            <Button className="icon-button height-32" disabled={!allowUndo()} onClick={undo}>
              <i className=" iconfont icon-undo" />
              {locale.undo}
            </Button>
            <Button className="icon-button height-32" disabled={!allowRedo()} onClick={redo}>
              <i className="iconfont icon-signout" />
              {locale.redo}
            </Button>
          </Button.Group>
        </div>
      </div>
      <div className="header-right">
        {isFn(renderToolbar) && renderToolbar({
          mode,
          MODES,
          setMode,
          getSchema,
          setSchema,
        })}
      </div>
    </header>)
}

export default Header