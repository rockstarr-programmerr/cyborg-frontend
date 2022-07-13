import React, { Component } from 'react';

class Clock extends Component {
  centerX = 130
  centerY = 130
  radius = 120

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

  spinClock () {
    const ctx = this.getCanvasContext()

    ctx.clearRect(0, 0, 260, 260)
    ctx.translate(this.centerX, this.centerY)
    ctx.rotate(0.1 * Math.PI / 180)
    ctx.translate(-this.centerX, -this.centerY)

    this.drawClock()
    window.requestAnimationFrame(() => this.spinClock())
  }

  componentDidMount () {
    this.spinClock()
  }

  render() {
    return (
      <div>
        <canvas id="clock-canvas" width="260px" height="260px"></canvas>
      </div>
    );
  }
}

export default Clock;
