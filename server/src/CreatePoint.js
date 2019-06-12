
/**
 * 这是一个用来创造一个随机点的类
 *
 * @class CreatePoint
 */
class CreatePoint {
  constructor (initPoint={
    lng: 121.245434,
    lat: 37.246542
  }) {
    // this.initPoint = initPoint
    this.randomPoint = initPoint
  }
  // 每次执行会在上一次坐标的基础上随机加减一个随机值
  randomAction () {
    let lng = this.randomComputed() === 'addition' ? this.randomPoint.lng + this.randomNum() : this.randomPoint.lng - this.randomNum()
    let lat = this.randomComputed() === 'addition' ? this.randomPoint.lat + this.randomNum() : this.randomPoint.lat - this.randomNum()
    this.randomPoint = {
      lng,
      lat
    }
    return this.randomPoint
  }
  randomComputed () {
    let sign = Math.random() > 0.5 ? 'addition' : 'subtraction'
    return sign
  }
  randomNum () {
    let num = Math.random() * 0.03
    return num
  }
}
module.exports = CreatePoint
