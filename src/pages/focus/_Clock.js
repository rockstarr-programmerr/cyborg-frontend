import React, { Component } from 'react';

class Clock extends Component {
  centerX = 130
  centerY = 130
  radius = 120

  constructor (props) {
    super(props)

    this.state = {
      currentAngle: 0,
      isMouseDown: false
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

  getCanvasContext () {
    const el = document.getElementById('clock-canvas')
    return el.getContext('2d')
  }

  drawClock () {
    const ctx = this.getCanvasContext()

    ctx.beginPath()
    ctx.arc(this.centerX, this.centerY, this.radius, 0, (2 * Math.PI))
    ctx.stroke()

    for (let i = 0; i < 12; i++) {
      ctx.save()
      ctx.beginPath()

      ctx.translate(this.centerX, this.centerY)
      ctx.rotate(i * (2 * Math.PI / 12))

      const quarterPoints = [0, 3, 6, 9]
      const length = quarterPoints.includes(i) ? 30 : 15
      ctx.moveTo(this.radius, 0)
      ctx.lineTo(this.radius - length, 0)

      ctx.stroke()
      ctx.restore()
    }
  }

  spinClock (targetAngle) {
    const ctx = this.getCanvasContext()

    const angleToRotate = 0.1 * Math.PI / 180

    ctx.clearRect(0, 0, 260, 260)
    ctx.translate(this.centerX, this.centerY)
    ctx.rotate(angleToRotate)
    ctx.translate(-this.centerX, -this.centerY)

    this.drawClock()

    this.setState(state => ({
      currentAngle: state.currentAngle + angleToRotate
    }))

    if (this.state.currentAngle < targetAngle) {
      window.requestAnimationFrame(() => this.spinClock(targetAngle))
    }
  }

  componentDidMount () {
    this.drawClock()
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
