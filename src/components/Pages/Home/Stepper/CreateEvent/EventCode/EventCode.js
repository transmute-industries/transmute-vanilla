import React, {Component} from 'react'
import { render } from 'react-dom'
import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/json'
import 'brace/theme/monokai'

function onChange(newValue) {
  console.log('change',newValue)
}

import classes from './EventCode.scss'

let defaultCode = `
{
  "iss": "transmute.industries",
  "exp": 1300819380,
  "transmute.industries.name": "Bob Ross",
  "transmute.industries.admin": true
}
`
export default class EventCode extends Component {
  render() {
    return (
        <div className={classes.EventCode}>
        <AceEditor
            mode='json'
            theme='monokai'
            onChange={onChange}
            name='EventCode'
            value={defaultCode}
            editorProps={{$blockScrolling: true}}
            />
        </div>
    )
  }
}
