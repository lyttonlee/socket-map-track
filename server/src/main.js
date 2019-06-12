
const server = require('http').createServer()
const socketIo = require('socket.io')(server)
const CreatePoint = require('./CreatePoint.js')

// 所有已连接的客户端
socketIo.on('connection', (client) => {
  // console.log(client)
  // 断开时删除
  client.on('disconnect', () => {
    // 。。。
  })
  // 当客户端触发setPoint事件之后，socket就向客户端推送新的坐标
  client.on('setPoint', (point) => {
    console.log(point)
    // 1. 创建一个创造坐标的实例
    let CreateCustomPoint = new CreatePoint(point)
    // 每隔3秒向客户端推送一次坐标
    setInterval(() => {
      client.emit('newPoint', CreateCustomPoint.randomAction())
    }, 3000)
  })
})



server.listen(3000, '192.168.1.202', () => {
  console.log('this server is listening on port 3000')
})