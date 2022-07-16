import React, { Component } from 'react';

class Clock extends Component {
  centerX = 130
  centerY = 130
  radius = 120

  constructor (props) {
    super(props)

    this.state = {
      angleRotated: 0,
      isMouseDown: false,
      time: {
        minutes: 0,
        seconds: 0
      }
    }

    this.canvasRef = React.createRef()

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  handleMouseDown () {
    this.setState({ isMouseDown: true })
  }

  handleMouseUp () {
    this.setState({ isMouseDown: false })
  }

  handleMouseLeave () {
    this.setState({ isMouseDown: false })
  }

  handleMouseMove (e) {
    if (!this.state.isMouseDown) return

    const mouseX = e.clientX
    const mouseY = e.clientY
    const rect = this.canvasRef.current.getBoundingClientRect()
    const canvasCenterX = rect.left + this.centerX
    const canvasCenterY = rect.top + this.centerY

    const angle = Math.atan(
      (mouseY - canvasCenterY) /
      (mouseX - canvasCenterX)
    )

    this.spinClock(angle)
  }

  formatTime () {
    const minutes = this.state.time.minutes.toString().padStart(2, '0')
    const seconds = this.state.time.seconds.toString().padStart(2, '0')
    return `${minutes}:${seconds}`
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

    const lineLength = 8

    for (let i = 0; i < 60; i++) {
      ctx.save()
      ctx.beginPath()

      ctx.translate(this.centerX, this.centerY)
      ctx.rotate(i * (2 * Math.PI / 60))

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

  spinClock (targetAngle) {
    const ctx = this.getCanvasContext()

    const angleToRotate = 0.1 * Math.PI / 180
    this.setState(state => ({
      angleRotated: state.angleRotated + angleToRotate
    }))

    ctx.save()
    ctx.clearRect(0, 0, 260, 260)
    ctx.translate(this.centerX, this.centerY)
    ctx.rotate(this.state.angleRotated)
    ctx.translate(-this.centerX, -this.centerY)
    this.drawClock()
    ctx.restore()

    this.drawTime()

    if (this.state.angleRotated < targetAngle) {
      window.requestAnimationFrame(() => this.spinClock(targetAngle))
    }
  }

  componentDidMount () {
      this.drawClock()
      document.fonts.load('40px Roboto').then(() => {
      this.drawTime()
    })
  }

  render() {
    return (
      <div>
        <canvas
          ref={this.canvasRef}
          id="clock-canvas"
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
