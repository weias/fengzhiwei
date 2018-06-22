<template>
  <div slot="content">
    <!--<div class="split"></div>-->
    <div style="text-align: center">
      <i class="el-icon-arrow-left" style="float: left" v-if="!isFirst" @click="toback"/>
      <span >{{ isFirst ? "选择品牌" : "选择车系" }}</span>
      <i class="el-icon-close" style="float: right" @click="close"/>
    </div>
    <div class="view-wrapper">
      <div class="index-list-wrapper">
        <div ref="lal" class="index-list">
          <scroll
            ref="indexList"
            :listen-scroll="listenScroll"
            :probe-type="probeType"
            :list="currentData"
            :click="true"
            :scrollbar="true"
            :mouseWheel="true"
            @scroll="scroll">
            <div class="index-list-content" ref="content">
              <div ref="groups">
                <div v-for="group in currentData" ref="listGroup">
                  <h2 class="index-list-anchor">{{group.name}}</h2>
                  <div
                    class="index-list-item border-bottom-1px"
                    v-for="item in group.items"
                    @click="selectItem(item)">
                    <img v-if="isFirst" style="width: 40px;height: 40px;vertical-align: middle" v-lazy="item.imgurl" >
                    {{item.name}}
                  </div>
                </div>
              </div>
            </div>
          </scroll>
          <div class="index-list-nav" v-if="isFirst">
            <ul>
              <div v-for="(item, index) in shortcutList" :data-index="index" :class="{active: currentIndex === index}" @click="onShortcut(item, index)">{{item}}</div>
            </ul>
          </div>
          <div class="index-list-fixed" ref="fixed" v-show="fixedTitle">
            {{fixedTitle}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    getData,
    addClass,
    removeClass
  } from '../commons/dom'

  import Scroll from './Scroll'

  const TITLE_HEIGHT = 50
  const SUBTITLE_HEIGHT = 40

  export default {
    components: {
      Scroll
    },
    props: {
      isOnlyBrand: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isFirst: true,
        currentIndex: 0,
        scrollY: -1,
        diff: -1,
        brands: [],
        currentData: [],
        brand: {}
      }
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
      this.listHeight = []
    },
    mounted () {
      setTimeout(() => {
        this._calculateHeight()
        this.brandList()
      }, 20)
    },
    computed: {
      fixedTitle() {
        if (this.scrollY > -TITLE_HEIGHT) {
          return ''
        }
        return this.currentData[this.currentIndex] ? this.currentData[this.currentIndex].name : ''
      },
      shortcutList() {
        return this.currentData.map((group) => {
          return group.name.substr(0, 1)
        })
      }
    },
    methods: {
      toback() {
        this.currentData = this.brands;
        this.isFirst = true;
      },
      close() {
        this.$emit('dialogClose');
      },
      refresh() {
        this.$refs.indexList.refresh()
      },
      selectItem(item) {
        if (this.isOnlyBrand) {
          this.$emit('setBrand', { idBrand:item.id, nameBrand:item.name });
//          this.currentData = this.brands;
//          this.isFirst = true;
        } else {
          if (this.brands == this.currentData) {
            this.brand = item;
            this.seriesList(item.id)
          } else {
            this.$emit('setBrand', { idBrand:this.brand.id, nameBrand:this.brand.name, idSeries:item.id, nameSeries:item.name });
//            this.currentData = this.brands;
//            this.isFirst = true;
          }
        }
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      onShortcut(anchorIndex, index) {
        this._scrollTo(index)
      },
      _calculateHeight() {
        const list = this.$refs.listGroup
        if (!list) {
          return
        }
        this.listHeight = []
        let height = TITLE_HEIGHT
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      _scrollTo(index) {
        if (!index && index !== 0) {
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        this.$refs.indexList.scrollToElement(this.$refs.listGroup[index], 100)
        this.scrollY = this.$refs.indexList.scroll.y
      },
      brandList() {
        this.$axios({
          url: "v1/commons/brand-list",
          method: "POST",
          data: {
          }
        }).then(res => {
          if (res.data.status == 2000) {
            let ret = []
            res.data.data.forEach((brandGroup) => {
              let group = {}
              group.name = brandGroup.letter
              group.items = []
              brandGroup.sublist.forEach((brand) => {
                let item = {}
                item.id = brand.id
                item.name = brand.name
                item.imgurl = brand.imgurl
                group.items.push(item)
              })
              ret.push(group)
            })
            this.brands = ret;
            this.currentData = ret;
            this.isFirst = true;
          } else {
            this.$message.error(res.data.message);
          }
        });
      },
      seriesList(id) {
        this.$axios({
          url: "v1/commons/series-list",
          method: "POST",
          data: {
            id: id
          }
        }).then(res => {
          if (res.data.status == 2000) {
            let ret = []
            res.data.data.forEach((seriesGroup) => {
              let group = {}
              group.name = seriesGroup.name
              group.items = []
              seriesGroup.sublist.forEach((series) => {
                let item = {}
                item.id = series.id
                item.name = series.name
                group.items.push(item)
              })
              ret.push(group)
            })
            this.currentData = ret;
            this.isFirst = false;
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    watch: {
      currentData() {
        setTimeout(() => {
          this._calculateHeight()
        }, 20)
      },
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < SUBTITLE_HEIGHT) ? newVal - SUBTITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      },
      scrollY(newY) {
        const listHeight = this.listHeight
        // 当滚动到顶部，newY>0
        if (newY > -TITLE_HEIGHT) {
          this.currentIndex = 0
          return
        }
        // 在中间部分滚动
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            this.diff = height2 + newY
            return
          }
        }
        // 当滚动到底部，且-newY大于最后一个元素的上限
        this.currentIndex = listHeight.length - 2
      }
    }
  }
</script>

<style lang='less' scoped>
  .content {
    left: 0;
    top: 0;
    margin: 0;
    padding: 0;
    position:absolute;
  }
  .view-wrapper {
    width: 100%;
    height: 100%;
  }
  .index-list-wrapper {
    width: 100%;
    height: 100%;
  }
  .index-list {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .list-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background: #fff;
  }
  .index-list-content {
    background: #fff;
    border-radius: 2px;
  }
  .index-list-title {
    padding: 14px 16px;
    font-size: 14px;
    line-height: 1.6;
    color: #333;
  }
  .index-list-anchor {
    padding: 16px 16px 10px 16px;
    line-height: 1;
    font-size: 14px;
    color: #999;
    background: #f7f7f7;
  }
  .index-list-item {
    position: relative;
    height: 50px;
    line-height: 50px;
    padding: 0 16px;
    font-size: 14px;
    color: #333;
  }
  .index-list-item_active {
    background: rgba(0, 0, 0, .04);
  }
  .index-list-fixed {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    padding: 16px 16px 10px 16px;
    box-sizing: border-box;
    font-size: 14px;
    line-height: 1;
    color: #999;
    background: #f7f7f7;
  }
  .index-list-nav {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-family: Helvetica;
  }
</style>
