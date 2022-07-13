import React, { Component } from 'react';

class Clock extends Component {
  getCanvasContext () {
    const el = document.getElementById('clock-canvas')
    return el.getContext('2d')
  }

  drawClock () {
    const ctx = this.getCanvasContext()

    const centerX = 130
    const centerY = 130
    const radius = 120

    ctx.arc(centerX, centerY, radius, 0, (2 * Math.PI))

    for (let i = 0; i < 12; i++) {
      ctx.save()

      ctx.translate(centerX, centerY)
      ctx.rotate(i * (2 * Math.PI / 12))

      const quarterPoints = [0, 3, 6, 9]
      const length = quarterPoints.includes(i) ? 30 : 15
      ctx.moveTo(radius, 0)
      ctx.lineTo(radius - length, 0)

      ctx.restore()
    }

    ctx.moveTo(centerX + radius, centerY)

    ctx.stroke()
  }

  componentDidMount () {
    this.drawClock()
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
