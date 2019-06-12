<template>
  <div class="home">
    <Map @getMap="getMap" height="700" />
    <button v-if="!hasMarker" @click="clickButton">click me</button>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Map from '@/components/Map.vue'

  export default {
    name: 'home',
    components: {
      Map
    },
    data () {
      return {
        map: '',
        hasMarker: false,
        Icon: '',
        overLay: '',
        points: []
      }
    },
    sockets: {
      // socket服务器连接时触发
      connect: () => {
        console.log('已成功连接到socket服务器')
      },
      // 接收socket服务器推送的newPoint事件
      newPoint (point) {
        console.log(`接收到socket服务器的新坐标${point}`)
        // console.log(this)
        this.points.push(point)
        // 关闭原来的标志物
        this.mkrTool.close()
        this.map.clearOverlays()
        // this.map.centerAndZoom(point, 15)
        // 在新坐标添加覆盖物
        this.freshOverlay(point)
      }
    },
    methods: {
      clickButton () {
        this.mkrTool.open()
      },
      // 刷新覆盖物
      freshOverlay (point) {
        // this.map.removeOverlay(this.overLay)
        let overLay = new BMap.Marker(point, {
          icon: this.Icon
        })
        let length = this.points.length
        this.map.addOverlay(new BMap.Polyline(this.points, {
          // enableMassClear: false,
          strokeColor: 'red',
          strokeOpacity: 0.7,
          strokeWeight: 3
        }))
        // console.log(line)
        this.overLay = overLay
        this.map.setViewport(this.points)
        
        this.map.addOverlay(overLay)
      },
      // 获取地图实例
      getMap (map) {
        this.map = map
        this.mkrTool = new BMapLib.MarkerTool( this.map, {autoClose: true, followText: ''})
        let Icon = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/fox.gif", new BMap.Size(300,158))
        this.Icon = Icon
        this.mkrTool.setIcon(Icon)
        this.mkrTool.addEventListener('markend', (ev) => {
          // console.log(ev)
          // 地图上已有标记
          this.hasMarker = true
          // 获取标记的坐标
          let point = ev.marker.point
          this.points.push(point)
          // 发送socket事件
          this.$socket.emit('setPoint', point)
        })
      }
    }
  }

</script>
