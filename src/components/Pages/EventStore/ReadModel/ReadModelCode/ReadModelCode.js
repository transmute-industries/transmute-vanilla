import React, {Component} from 'react'
import { render } from 'react-dom'
import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/javascript'
import 'brace/theme/monokai'

function onChange(newValue) {
  console.log('change',newValue)
}

import classes from './ReadModelCodeEditor.scss'


export default class ReadModelCode extends Component {
  render() {
    return (
        <div className={classes.ReadModelCodeEditorWrapper}>
        <AceEditor
            mode='javascript'
            theme='monokai'
            onChange={onChange}
            name='ReadModelCodeEditor'
            editorProps={{$blockScrolling: true}}
            />
        </div>
    )
  }
}
