let config = {
  configureWebpack: {
    externals: {
      BMap: 'BMap'
    }
  },
  chainWebpack: (config) => {
    config.externals({
      BMap: 'BMap',
      BMapLib: 'BMapLib',
      INFOBOX_AT_TOP: 'INFOBOX_AT_TOP',
      BMAP_ANCHOR_BOTTOM_RIGHT: 'BMAP_ANCHOR_BOTTOM_RIGHT',
      BMAP_NAVIGATION_CONTROL_ZOOM: 'BMAP_NAVIGATION_CONTROL_ZOOM',
      BMAP_MAPTYPE_CONTROL_MAP: 'BMAP_MAPTYPE_CONTROL_MAP'
    })
  }
}

module.exports = config
