import React from 'react'
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'


import CreateEventStore from './CreateEventStore'
import CreateEvent from './CreateEvent'

import { connect } from 'react-redux'

@connect(
  ({ mercury }) => ({
    mercury: mercury
  })
)
export default class VerticalLinearStepper extends React.Component {

  state = {
    data: [],
    finished: false,
    stepIndex: 0,
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.mercury.demo.step){
      this.setState({
        stepIndex: nextProps.mercury.demo.step
      })
    }
  }

  handleNext = () => {
    const {stepIndex} = this.state
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    })
  }

  handlePrev = () => {
    const {stepIndex} = this.state
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1})
    }
  }

  renderStepActions(step) {
    const {stepIndex} = this.state
  
    return (
      <div style={{margin: '12px 0', textAlign:'right'}}>
        {step > 0 && (
          <FlatButton
            label='Back'
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        )}
        <RaisedButton
          label={stepIndex === 4 ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
        />
      </div>
    )
  }

  render() {
    const {finished, stepIndex} = this.state
    const stepData = this.state.data[stepIndex]
    return (
      <div>
        <Stepper activeStep={stepIndex} orientation='vertical'>
           <Step key={index}>
                  <StepLabel>Create Event Store</StepLabel>
                  <StepContent>
                    <CreateEventStore />
                    {this.renderStepActions(0)}
                  </StepContent>
                </Step>
          {
            this.state.data && 
            this.state.data.map((step, index) => {
              return (
                <Step key={index}>
                  <StepLabel>{step.Type}</StepLabel>
                  <StepContent>
                    {JSON.stringify(step)}
                    <CreateEvent />
                    {this.renderStepActions(index + 1)}
                  </StepContent>
                </Step>
              )
            })
          }
        </Stepper>
        {finished && (
          <div style={{margin: '20px 0', textAlign: 'center'}}>
            <RaisedButton
            label='Reset'
            disableTouchRipple={true}
            disableFocusRipple={true}
            primary={true}
            onTouchTap={ () =>{this.setState({stepIndex: 0, finished: false})} }
            style={{marginRight: 12}}
            />
          </div>
        )}
      </div>
    )
  }
}
