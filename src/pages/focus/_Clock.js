import React, { Component } from 'react';
import styles from './_Clock.module.scss'

class Clock extends Component {
  centerX = 130
  centerY = 130
  radius = 120

  constructor (props) {
    super(props)

    this.state = {
      isMouseDown: false,
      time: {
        minutes: 0,
        seconds: 0
      },
      fromAngle: 0,
      toAngle: 0,
      angleRotated: 0
    }

    this.canvasRef = React.createRef()

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  handleMouseDown (e) {
    const currentAngle = this.calculateAngleFromCordinate(e.clientX, e.clientY)
    this.setState({
      isMouseDown: true,
      fromAngle: currentAngle,
      toAngle: currentAngle
    })
  }

  handleMouseUp () {
    this.endSpin()
  }

  handleMouseLeave () {
    this.endSpin()
  }

  handleMouseMove (e) {
    if (!this.state.isMouseDown) return

    this.setState({
      toAngle: this.calculateAngleFromCordinate(e.clientX, e.clientY)
    })

    this.spinClock()
  }

  endSpin () {
    this.setState({
      isMouseDown: false,
      fromAngle: 0,
      toAngle: 0
    })
  }

  formatTime () {
    const minutes = this.state.time.minutes.toString().padStart(2, '0')
    const seconds = this.state.time.seconds.toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  calculateAngleFromCordinate (x, y) {
    const rect = this.canvasRef.current.getBoundingClientRect()
    const canvasCenterX = rect.left + this.centerX
    const canvasCenterY = rect.top + this.centerY

    const atan = Math.atan(
      (y - canvasCenterY) /
      (x - canvasCenterX)
    )

    let angle = atan
    if (x < canvasCenterX) {
      angle = Math.PI + atan
    } else if (x >= canvasCenterX && y < canvasCenterY) {
      angle = (2 * Math.PI) + atan
    }

    return angle
  }

  getCanvasContext () {
    const el = document.getElementById('clock-canvas')
    return el.getContext('2d')
  }

  drawClock () {
    const ctx = this.getCanvasContext()

    ctx.beginPath()
    ctx.arc(this.centerX, this.centerY, this.radius, 0, (2 * Math.PI))
    ctx.stroke()

    const lineLength = 10
    const lineCount = 4

    for (let i = 0; i < lineCount; i++) {
      ctx.save()
      ctx.beginPath()

      ctx.translate(this.centerX, this.centerY)
      ctx.rotate(i * (2 * Math.PI / lineCount))

      ctx.moveTo(this.radius, 0)
      ctx.lineTo(this.radius - lineLength, 0)

      ctx.stroke()
      ctx.restore()
    }

    ctx.beginPath()
    ctx.arc(this.centerX, this.centerY, this.radius - lineLength, 0, (2 * Math.PI))
    ctx.stroke()
  }

  drawTime () {
    const ctx = this.getCanvasContext()
    ctx.save()
    ctx.font = '40px Roboto'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(this.formatTime(), this.centerX, this.centerY)
    ctx.restore()
  }

  /**
   * Check if the spinning direction is clockwise or counter-clockwise
   */
  checkClockWise (fromAngle, toAngle) {
    const oppositeAngle = (fromAngle + Math.PI) % (2 * Math.PI)
    let clockWise
    if (oppositeAngle > fromAngle) {
      clockWise = toAngle > fromAngle && toAngle < oppositeAngle
    } else {
      clockWise = !(toAngle < fromAngle && toAngle > oppositeAngle)
    }
    return clockWise
  }

  spinClock () {
    const minimumSpinAngle = 1 * Math.PI / 180
    const rotateBy = 0.04 * Math.PI / 180
    const toAngle = this.state.toAngle
    const fromAngle = this.state.fromAngle

    if (Math.abs(toAngle - fromAngle) <= minimumSpinAngle) return

    const crossedFullCircle = Math.abs(toAngle - fromAngle) > Math.PI

    const clockWise = this.checkClockWise(fromAngle, toAngle)

    if (crossedFullCircle && clockWise) {
      this.setState({ fromAngle: 0 })
    } else if (crossedFullCircle && !clockWise) {
      this.setState({ fromAngle: 2 * Math.PI })
    }

    this.setState(state => ({
      fromAngle: clockWise ? state.fromAngle + rotateBy : state.fromAngle - rotateBy,
      angleRotated: clockWise ? state.angleRotated + rotateBy : state.angleRotated - rotateBy
    }))

    const ctx = this.getCanvasContext()
    ctx.save()
    ctx.clearRect(0, 0, 260, 260)
    ctx.translate(this.centerX, this.centerY)
    ctx.rotate(this.state.angleRotated)
    ctx.translate(-this.centerX, -this.centerY)
    this.drawClock()
    ctx.restore()

    this.drawTime()

    if (
      (clockWise && this.state.fromAngle < this.state.toAngle) ||
      (!clockWise && this.state.fromAngle > this.state.toAngle)
    ) {
      window.requestAnimationFrame(() => this.spinClock())
    }
  }

  componentDidMount () {
    this.drawClock()
    document.fonts.load('40px Roboto').then(() => this.drawTime())
  }

  render() {
    return (
      <div>
        <canvas
          ref={this.canvasRef}
          id="clock-canvas"
          className={styles['clock-canvas']}
          width="260px"
          height="260px"
          onMouseDown={this.handleMouseDown}
          onMouseLeave={this.handleMouseLeave}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
        ></canvas>
      </div>
    );
  }
}

export default Clock;
