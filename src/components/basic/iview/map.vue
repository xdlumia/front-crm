<template>
    <div class="map-page">
        <div v-if="center.lng && center.lat">
            <baidu-map
                id="map"
                :center="center"
                :zoom="16"
                :min-zoom="13"
                :max-zoom="18"
                @ready="readyMap"
                ak="VUE12CTGHAEPrD1mnc2q25jD612plVfn"
            >
                <bm-local-search
                    :location="center"
                    :pageCapacity="10"
                    :nearby="nearby"
                    :keyword="tabData[currentTabIndex].title"
                    @searchcomplete="searchcomplete"
                    :autoViewport="false"
                    :panel="false"
                    :forceLocal="true"
                ></bm-local-search>
                <bm-overlay
                    pane="floatPane"
                    :class="['map-overlay-icon', 'map-overlay-icon-' + currentTabIndex]"
                    :data-index="index"
                    v-for="(item, index) in resulte.Ar"
                    :key="item.uid"
                    @initialize="initialize"
                ></bm-overlay>
            </baidu-map>
        </div>
    </div>
</template>

<script>
// import { BaiduMap, BmLocalSearch, BmOverlay } from 'vue-baidu-map'

export default {
    // components:{
    //     BaiduMap,
    //     BmLocalSearch,
    //     BmOverlay
    // },
    props: {
        center: {
            type: Object
        }
    },
    data () {
        return {
            currentTabIndex: 0,
            tabData: [
                {
                    title: '教育'
                },
                {
                    title: '医院'
                },
                {
                    title: '地铁'
                },
                {
                    title: '公交'
                },
                {
                    title: '银行'
                },
                {
                    title: '休闲'
                },
                {
                    title: '购物'
                },
                {
                    title: '健身'
                },
                {
                    title: '美食'
                }
            ],
            resulte: {},
            nearby: {
                center: {},
                radius: 1500
            }
        }
    },

    mounted () {
        this.nearby.center = this.center
    },

    methods: {
        readyMap () {
        },
        searchcomplete (data) {
            this.resulte = data
        },
        initialize ({ el, BMap, map }) {
            let index = el.dataset.index
            const pixel = map.pointToOverlayPixel(new BMap.Point(this.resulte.Ar[index].point.lng, this.resulte.Ar[index].point.lat))
            el.style.left = pixel.x - 13 + 'px'
            el.style.top = pixel.y - 32 + 'px'
        },

        handleClick (item, index) {
            this.currentTabIndex = index
        }
    },
    watch: {
        center: {
            handler (val, oldval) {

            },
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>
    #map {
        width: 100%;
        height: calc(100vh - 50px);

        .map-overlay-icon {
            width: 25px;
            height: 30px;
            background-size: cover;
            position: absolute;
        }
    }
    .map-page {
        .map-tab-box {
            bottom: 0;
            height: 50px;
            width: 100%;
            background: rgba(51, 51, 51, 0.9);
            overflow-x: auto;
            .map-tab-item {
                width: 67px;
                height: 50px;
            }

            .map-tab-icon {
                width: 26px;
                height: 20px;
                margin: 7px auto 0;
                background-size: 100%;
                transition: background-position 0.3s;
            }

            .c-icon {
                background-position: 0 -20px;
            }
        }
    }
</style>
