<template>
  <div class="mapLayout">
    <div id="container"></div>
  </div>
</template>
<script setup>
import AMapLoader from '@amap/amap-jsapi-loader'
import heatmapData from './hotJson.js'
import { message } from 'ant-design-vue'
import { getAssetsFile } from '@/utils'

const map = shallowRef(null)
const aMap = shallowRef({})
const buildingLayer = shallowRef(null)
const markers = ref([])
const heatmap = ref()
const trafficLayer = ref()

const optionsP = ref({
  hideWithoutStyle: true, //是否隐藏设定区域外的楼块
  areas: [
    {
      //围栏1
      //visible:false,//是否可见
      rejectTexture: false, //是否屏蔽自定义地图的纹理
      color1: '#7AF9FF', //楼顶颜色
      color2: '#5296E6', //楼面颜色
      path: [
        [119.99896166, 30.2831148],
        [119.99982841, 30.27960018],
        [120.00401138, 30.28007747],
        [120.00389834, 30.28114054],
        [120.00350893, 30.28169377],
        [120.00329539, 30.28213852],
        [120.00170007, 30.28186733],
        [120.00115993, 30.28379819],
        [119.99896166, 30.2831148],
      ],
    },
    {
      color1: '#7AF9FF', //楼顶颜色
      color2: '#5296E6', //楼面颜色
      path: [
        [119.99611019, 30.28231208],
        [119.99658755, 30.27986052],
        [119.99902447, 30.28030528],
        [119.99828333, 30.28294124],
        [119.99611019, 30.28231208],
      ],
    },
    {
      color1: '#7AF9FF', //楼顶颜色
      color2: '#5296E6', //楼面颜色
      path: [
        [120.00136092, 30.28378734],
        [120.00183825, 30.28205174],
        [120.00538061, 30.282887],
        [120.00515452, 30.28378734],
        [120.00266732, 30.28307141],
        [120.00232816, 30.28408022],
        [120.00136092, 30.28378734],
      ],
    },
    {
      color1: '#7AF9FF', //范围
      color2: '#5296E6', //
      path: [
        [120.32458561, 30.29934627],
        [120.3273501, 30.29868373],
        [120.32532073, 30.2978653],
        [120.32654592, 30.29883962],
        [120.32639116, 30.29946876],
        [120.32458561, 30.29934627],
      ],
    },
  ],
})

const areaPath = ref({
  hideWithoutStyle: true, //是否隐藏设定区域外的楼块
  areas: [
    {
      //围栏1
      //visible:false,//是否可见
      rejectTexture: false, //是否屏蔽自定义地图的纹理
      color1: '#7AF9FF', //楼顶颜色
      color2: '#5296E6', //楼面颜色
      path: [
        [119.99613923, 30.28233441],
        [119.99680481, 30.27902576],
        [120.0069319, 30.28054806],
        [120.00498924, 30.28503719],
        [119.99613923, 30.28233441],
      ],
    },
  ],
})

const pointData = ref([
  {
    name: '欧美金融城停车场',
    longitude: 120.002165,
    latitude: 30.281446,
    consumption: '5000',
    passenger: '762',
  },
  {
    name: '美瑭广场停车场',
    longitude: 120.001782,
    latitude: 30.282972,
    consumption: '828',
    passenger: '273',
  },
  {
    name: '万达广场停车场',
    longitude: 119.997548,
    latitude: 30.281112,
    consumption: '1000',
    passenger: '342',
  },
])

const initAMap = () => {
  window._AMapSecurityConfig = {
    securityJsCode: 'd85f31cf85119d684120b57a019ef15f',
  }
  AMapLoader.load({
    key: 'f44fb7567970a75745df78f118b11e52', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [
      'AMap.HeatMap',
      'AMap.Scale',
      'AMap.DistrictSearch',
      'AMap.TileLayer',
      'AMap.Polyline',
      'AMap.Object3DLayer',
      'AMap.Object3D',
    ],
  })
    .then((AMap) => {
      // aMap.value = AMap;
      // build();
      // map.value = new AMap.Map("container", {
      //     zooms: [10, 20], //设置地图级别范围
      //     zoom: 14,
      //     center: [120.320908, 30.3114],
      //     mapStyle: "amap://styles/darkblue",
      //     viewMode: '3D',
      //     // pitch: 15,
      //     showBuildingBlock: true,
      //     layers: [buildingLayer.value, AMap.createDefaultLayer(),]
      // });
      // map.value.addControl(new AMap.Scale())
      // setTraffic();
      // Polygon();
      // setPoint();
      // hotMap();

      //

      const opts = { subdistrict: 0, extensions: 'all', level: 'city' }
      aMap.value = AMap
      //利用行政区查询获取边界构建mask路径
      //也可以直接通过经纬度构建mask路径
      const district = new AMap.DistrictSearch(opts)
      district.search('浙江省', function (status, result) {
        const bounds = result.districtList[0].boundaries
        const mask = []
        for (let i = 0; i < bounds.length; i += 1) {
          mask.push([bounds[i]])
        }
        build()
        map.value = new AMap.Map('container', {
          mask: mask,
          center: [120.001707, 30.283873],
          viewMode: '3D',
          // showLabel: false,
          // labelzIndex: 130,
          pitch: 15,
          zooms: [10, 20], //设置地图级别范围
          zoom: 160,
          mapStyle: 'amap://styles/darkblue',
          showBuildingBlock: true,
          layers: [
            buildingLayer.value,
            AMap.createDefaultLayer(),
            // new AMap.TileLayer.RoadNet({
            //     rejectMapMask:true
            // }),
            // new AMap.TileLayer.Satellite()
          ],
        })

        //添加描边
        for (let i = 0; i < bounds.length; i += 1) {
          new AMap.Polyline({
            path: bounds[i],
            strokeColor: '#99ffff',
            strokeWeight: 4,
            map: map.value,
            height: 200,
            outlineColor: 'rgba(255,255,255,0.5)',
            borderWeight: 2,
            isOutline: true,
          })
        }
        map.value.addControl(new AMap.Scale())
        setTraffic()
        Polygon()
        setPoint()
        hotMap()
      })
      //添加高度面
      // let object3Dlayer = new aMap.value.Object3DLayer({ zIndex: 1 });
      // map.value.add(object3Dlayer)
      // let height = -8000;
      // let color = '#0088ffcc';//rgba
      // let wall = new aMap.value.Object3D.Wall({
      //     path: bounds,
      //     height: height,
      //     color: color
      // });
      // wall.transparent = true
      // object3Dlayer.add(wall)

      //创建自定义切片图层，指定 getTileUrl 属性
    })
    .catch((e) => {
      console.log(e)
    })
}
const build = () => {
  buildingLayer.value = new aMap.value.Buildings({
    zIndex: 130,
    zooms: [4, 20],
  })
  buildingLayer.value.setStyle(optionsP.value) //此配色优先级高于自定义mapStyle
}
// 区域围栏绘制
const Polygon = () => {
  new aMap.value.Polygon({
    bubble: true,
    fillOpacity: 0.4,
    strokeWeight: 1,
    path: optionsP.value.areas[0].path,
    map: map.value,
  })
  new aMap.value.Polygon({
    bubble: true,
    fillOpacity: 0.4,
    strokeWeight: 1,
    path: optionsP.value.areas[1].path,
    map: map.value,
  })
  new aMap.value.Polygon({
    bubble: true,
    // fillColor: 'green',
    fillOpacity: 0.2,
    strokeWeight: 1,
    path: optionsP.value.areas[2].path,
    map: map.value,
  })
  new aMap.value.Polygon({
    bubble: true,
    // fillColor: 'green',
    fillOpacity: 0.2,
    strokeWeight: 1,
    path: optionsP.value.areas[3].path,
    map: map.value,
  })
  new aMap.value.Polygon({
    bubble: true,
    // fillColor: 'rgba(255, 0, 0,.5)',
    fillOpacity: 0.1,
    strokeColor: '#ff0000',
    strokeWeight: 1,
    strokeStyle: 'dashed',
    strokeWeight: 4,
    path: areaPath.value.areas[0].path,
    map: map.value,
  })
}
// 热力图
const hotMap = () => {
  //初始化heatmap对象
  heatmap.value = new aMap.value.HeatMap(map.value, {
    radius: 25, //给定半径
    opacity: [0, 0.8],
    /*,
        gradient:{
            0.5: 'blue',
            0.65: 'rgb(117,211,248)',
            0.7: 'rgb(0, 255, 0)',
            0.9: '#ffea00',
            1.0: 'red'
        }
         */
  })
  heatmap.value.setDataSet({
    data: heatmapData,
    max: 100,
  })
  // heatmap.value.hide();
}
// 实时路况
const setTraffic = () => {
  //实时路况图层
  trafficLayer.value = new aMap.value.TileLayer.Traffic({
    zIndex: 10,
    zooms: [7, 22],
  })

  trafficLayer.value.setMap(map.value)
  // trafficLayer.value.hide();
}
// 标记点
const setPoint = () => {
  const icon = new aMap.value.Icon({
    size: new aMap.value.Size(50, 44), // 图标尺寸
    image: 'http://localhost:5173/src/assets/imgs/icon-new.png', // Icon的图像
    imageSize: new aMap.value.Size(50, 44), //
  })
  if (markers.value.length !== 0) {
    map.value.remove(markers.value)
  }
  const markerList = []
  pointData.value.forEach((item) => {
    const marker = new aMap.value.Marker({
      position: new aMap.value.LngLat(item.longitude, item.latitude),
      offset: new aMap.value.Pixel(-20, -60),
      icon: icon, // 添加 Icon 实例
      size: new aMap.value.Size(500, 440), // 图标尺寸
      extData: item,
      label: {
        direction: 'top',
        content: item.name,
      },
    })
    marker.setLabel({
      direction: 'top',
      offset: new AMap.Pixel(0, -5), //设置文本标注偏移量
      // content: `<div class='info'>
      //           <p style="font-size:16px;margin-top:0px;background: linear-gradient(90deg, rgba(11,249,254,.3) 0%, rgba(0,13,59,0.19) 100%);padding:8px 10px;line-height:20px">${
      //             item.name
      //           }</p>
      //           <p style="font-size: 18px;color: #FFAC09;margin:0 10px 10px 10px">${
      //             showLabel.value ? "总泊车位：" : "消费："
      //           } ${item.consumption}${showLabel.value ? "个" : "亿"} ${
      //   showLabel.value ? "空闲车位：" : "客流："
      // }${item.passenger}${showLabel.value ? "个" : "万"}</p>
      //           </div>`, //设置文本标注内容
      // content: `<div class='info'>
      //           <p style="font-size:16px;margin-top:0px;background: linear-gradient(90deg, rgba(11,249,254,.3) 0%, rgba(0,13,59,0.19) 100%);padding:8px 10px;line-height:20px">${
      //             item.name
      //           }</p>
      //           <p style="font-size: 18px;color: #FFAC09;margin:0 10px 10px 10px">${"总泊车位："} ${
      //   item.consumption
      // }${"个"} ${"空闲车位："}${item.passenger}${"个"}</p>
      //           </div>`, //设置文本标注内容
      content: `<div class='info'>
                <div style="padding: 13px 0 0 12px;font-family: PangMenZhengDaoBiaoTiTiMianFeiBan;font-weight: 400;font-size: 20px;color: #FFBD13;">${item.name}</div>
                  <div style="display: flex; gap: 10px;padding: 20px 40px;text-align: center;font-family:PangMenZhengDaoBiaoTiTiMianFeiBan;font-weight: 400;font-size: 20px;color: #FFFFFF;line-height: 30px;text-shadow: 0px 0px 9px #9FD1FF;">
                    <div>总泊车位：<span style="color: #FFAC09;">${item.consumption}</span>个</div>
                    <div>空闲车位：<span style="color: #FFAC09;">${item.passenger}</span>个</div>
                  </div>`, //设置文本标注内容
    })
    marker.on('click', (res) => {
      message.success(res.target._opts.extData.name)
      map.value.setZoomAndCenter(18, [
        res.target._opts.extData.longitude,
        res.target._opts.extData.latitude + 0.001,
      ])
    })
    markerList.push(marker)
  })
  map.value.add(markerList)
  markers.value = markerList
}
onMounted(() => {
  initAMap()
})

onUnmounted(() => {
  map.value?.destroy()
})
</script>
<style>
#container {
  width: 100%;
  min-height: 1080px;
  height: 100vh;
}

.amap-marker-label {
  background: url('@/assets/mapTitle-new.png');
  background-size: 100% 100%;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid #ccc;
  /* border-radius: 5px; */
  /* padding: 5px 15px; */
  font-size: 18px;
  color: #ffffff;
  border: none;
}

.amap-logo {
  display: none !important;
}

.amap-copyright {
  display: none !important;
}

.amap-layer {
  /* background: #ffffff; */
  /* background: url('@/assets/bg.png'); */
  background-size: 100% 100%;
}
</style>
<style lang="scss" scoped>
.mapLayout {
  position: relative;
  pointer-events: auto;

  .mapstyle_class {
    position: absolute;
    bottom: 400px;
    right: 510px;
    z-index: 0;
    // pointer-events: none;
    display: flex;
    flex-direction: column;
  }
}
</style>
