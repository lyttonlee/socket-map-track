<template>
  <!-- 地图 -->
  <div :id="`map-${randomStr}-${idName}`" class="map" :style="`height: ${height}px`"></div>
</template>
<script>
  export default {
    props: {
      idName: {
        type: String
      },
      height: {
        default: 500
      },
      hasZoom: {
        type: Boolean,
        default: true
      },
      centerPoint: {
        default: () => {
          return {
            lng: 116.404,
            lat: 39.915
          }
        }
      },
      hasCityControl: {
        default: true,
        type: Boolean
      }
    },
    data() {
      return {
        map: '',
        randomStr: ''
      }
    },
    methods: {
      addNavigationControl() {
        let navigationControl = new window.BMap.NavigationControl({
          anchor: window.BMAP_ANCHOR_BOTTOM_RIGHT,
          type: window.BMAP_NAVIGATION_CONTROL_ZOOM,
          offset: new window.BMap.Size(22, 340),
          showZoomInfo: true
        })
        this.map.addControl(navigationControl)
      },
      addMapTypeController() {
        let offset = new window.BMap.Size(18, 300)
        let mapTypeControl = new window.BMap.MapTypeControl({
          mapTypes: [window.BMAP_NORMAL_MAP, window.BMAP_HYBRID_MAP],
          anchor: window.BMAP_ANCHOR_BOTTOM_RIGHT,
          offset: offset
        })
        this.map.addControl(mapTypeControl)
      },
      // addGeolocationControl() {
      //   let geolocationControl = new window.BMap.GeolocationControl({
      //     anchor: window.BMAP_ANCHOR_BOTTOM_RIGHT,
      //     type: window.BMAP_NAVIGATION_CONTROL_ZOOM,
      //     size: new window.BMap.Size(30, 30),
      //     offset: new window.BMap.Size(22, 438)
      //   })
      //   this.map.addControl(geolocationControl)
      // },
      createCityControl () {
        let size = new BMap.Size(20, 20)
        this.cityListControl = new BMap.CityListControl({
          anchor: window.BMAP_ANCHOR_TOP_RIGHT,
          offset: size
        })
        // console.log(cityListControl)
      },
      addCityListControl() {
        this.cityListControl && this.map.addControl(this.cityListControl)
      },
      removeCityControl () {
        this.cityListControl && this.map.removeControl(this.cityListControl)
      },
      createMap() {
        if (document.getElementById(`map-${this.randomStr}-${this.idName}`)) {
          // 创建地图实例
          this.map = new BMap.Map(`map-${this.randomStr}-${this.idName}`, {
            // 地图底图不可点击
            enableMapClick: false,
            enableAutoResize: false
          })
          // this.createCityControl()
          // this.hasZoom && this.addNavigationControl()
          // this.addMapTypeController()
          // this.hasCityControl && this.addCityListControl()
          // 创建点坐标
          let point
          let geolocation = new BMap.Geolocation()
          geolocation.getCurrentPosition((r) => {
            // console.log(r)
            point = r.point || new BMap.Point(this.centerPoint.lng, this.centerPoint.lat)
            // 初始化地图，设置中心点坐标和地图级别
            this.map.centerAndZoom(point, 12)
            // 可以使用鼠标缩放地图
            this.map.enableScrollWheelZoom(true)
            // this.map = map
            this.$emit('getMap', this.map)
          }, {
            enableHighAccuracy: true
          })
        }
      },
      randomString(len=16) {
        let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
        let maxPos = chars.length
        let pwd = ''
        for (let i = 0; i < len; i++) {
          pwd += chars.charAt(Math.floor(Math.random() * maxPos))
        }
        return pwd
      }
    },
    mounted() {
      this.createMap()
      // bus.$on('removeCityControl', () => {
      //   this.removeCityControl()
      // })
      // bus.$on('addCityControl', () => {
      //   // console.log(2)
      //   this.addCityListControl()
      // })
    },
    created() {
      this.randomStr = this.randomString(10)
      // console.log(this.randomStr)
    },
    beforeDestroy () {
      // bus.$emit('MapDestroy')
    }
  }
</script>
<style lang="less" scoped>
  .map {
    width: auto;
    height: 40vh;
  }
</style>