<template>
<div class="a_page_2">
    <div class="bg-div">
      <!-- <div class="animate-bg" :class="{'animate-step':deerStep}" ref="deer"/> -->
      <div class="audio">
        <VueAudio
          ref="audioss"
          :audioCurrentTime="playtime"
          :theUrl="audios.url"
          :theControlList="audios.controlList"
          :titleCurr="2"
          :routerUrl="router"
          :menuList="menuList"
        ></VueAudio>
      </div>
      <div class="page2-content">
        <div class="content">
             <div class="content-match-cardList" >
               <div class="list-group" v-for="item in cardBaseList" :key="item.id"  >
                    <img  :src="item.imgSrc" class="bgImg"/>
                    <!-- <draggable :group='{name:"group1",put:true}' class="dragList" :list="cardBaseList" :sort="true">
                          <span class="each-pic item" v-for="item in arr1" :key="item.id">{{item.name}}</span>
                    </draggable> -->
                </div>
                <div class="list-group list-other" >
                    <img  src="../../../assets/images/commonImg/p9-img1.png" class="bgImg"/>
                </div>
              </div>
              <div class="content-match-base">
                  <div class="each-pic" v-for="item in arr" :key="item.id">
                      <img :src="item.imgSrc"/>
                  </div>
                  <!-- <draggable v-for="item in arr" :key="item.id" :list="arr" class="each-pic"  
                      :option="{group:'group'+item.groupId}" :move="move" @end="onEnd">
                    <transition-group>
                    <div class="move" :key="'answer'+item.id" :id="'answer'+item.id">
                        <img :src="item.imgSrc"/>
                    </div>
                    </transition-group>
                  </draggable> -->
              </div>
             
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import VueAudio from "../../../components/toyTrainMenu";

export default{
	name:'try',
  components: {
    VueAudio ,draggable
  },
	data(){
		return{
			isRolling:false,
      value1: 50,
      audios: {
        url: "./static/mp3/level1/level1-01.mp3",
        controlList: "noDownload noSpeed onlyOnePlaying"
      },
      rightAudios:'./static/mp3/music.mp3',
      errorAudios:'./static/mp3/click.mp3',
      playtime: {
        time: 0.5,
        randem: Math.random(1000),
        stopTime: 2.4
      },
      router: "course1page10",
      option1: {
          filter: ".move",
          scroll: false,
          sortable: false
      },
      option2: {
          group: "aaa",
          filter: ".move",
          scroll: false,
          sortable: false
      },
      menuList:[//右侧菜单
          {
            routerUrl:'L1Course1Day1Page1',
            imgSrc:require('../../../assets/images/commonImg/menu/theme-vocan-menu-voca.png')
          },
          {
            routerUrl:'L1Course1Day1Page2',
            imgSrc:require('../../../assets/images/commonImg/menu/theme-vocan-menu-lookchoose.png')
          },
          {
            routerUrl:'index?id=L1Course1',
            imgSrc:require('../../../assets/images/commonImg/menu/theme-vocan-menu-back.png')
          }
      ],
      first_Item:'',//首次翻转Index
      oldRoll_Index:'',
      arr1:[],
      arr2:[],
      arr3:[],
      arr:[{
          imgSrc:require('@/assets/images/commonImg/p9-img3.png'),
          beginTime: 5.3,
          endTime: 1.5,
          groupId:1,
          name:'A',
          isRolling:false,
        },{
          imgSrc:require('@/assets/images/commonImg/p9-img4.png'),
          beginTime:3,
          endTime:1.5,
          groupId:2,
           name:'b',
          isRolling:false,
        },{
          imgSrc:require('@/assets/images/commonImg/p9-img5.png'),
          beginTime: 7.8,
          endTime: 1.6,
          groupId:2,
           name:'B',
          isRolling:false,
        },{
          imgSrc:require('@/assets/images/commonImg/p9-img6.png'),
          beginTime: 10.6,
          endTime: 1.4,
          groupId:1,
          name:'a',
          isRolling:false,
      }],
      cardBaseList:[{
          imgSrc:require('@/assets/images/commonImg/p9-img10.png'),
          beginTime: 7.8,
          endTime: 1.6,
          groupId:3,
          isRolling:false,
        },{
          imgSrc:require('@/assets/images/commonImg/p9-img11.png'),
          beginTime:3,
          endTime:1.5,
          groupId:1,
          isRolling:false,
        },{
          imgSrc:require('@/assets/images/commonImg/p9-img2.png'),
          beginTime: 5.3,
          endTime: 1.5,
          groupId:2,
          isRolling:false,
        },{
          imgSrc:require('@/assets/images/commonImg/p9-img9.png'),
          beginTime: 5.3,
          endTime: 1.5,
          groupId:2,
          isRolling:false,
        },{
          imgSrc:require('@/assets/images/commonImg/p9-img8.png'),
          beginTime: 5.3,
          endTime: 1.5,
          groupId:2,
          isRolling:false,
        }
      ],
      flag: false,
      timerList: [],
      deerStep: true,
      drag: false
		}
	},
  //  watch: {
  //     cardList:{
  //       handler:function(newVal,oldVal){
  //         console.log(newVal)
  //         this.cardList = newVal;
  //       },
  //       deep: true
  //     },
  //     cardBaseList:{
  //       handler:function(newVal,oldVal){
  //         console.log(newVal)
  //         this.cardBaseList = newVal;
  //       },
  //       deep: true
  //     }
  // },
  methods:{
    onStart(){
      console.log('start')
        this.drag=true;
    },
    move({relatedContext, draggedContext}) {
        console.log('move');
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        return (
            (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
        );
    },
      //拖拽结束事件
    onEnd(evt) {
        var that = this;
        var TzTagName = evt.item.id;
        var TzTag = TzTagName.substring(0, 1);
        var oldIndex = evt.oldIndex;
        this.isOldIndex = oldIndex;
        if (evt.to.parentElement.className == "curBaseTr") {
          if (evt.to.children[0].id == evt.item.id) {
            this.beginMusicAndEnd("right");
            this[evt.to.children[0].id] = true;
            this.currentAnswer++;
          } else {
            this.beginMusicAndEnd("wrong");
          }
          if (this.currentAnswer >= this.answerCount) {
            that.deerQuestion = false;
            that.deerStep = true;
            this.beginMusicAndEnd("over");
          }
        }
    },
    beginMusicAndEnd(item,index){
      let that = this;
      that.cardList[index].isRolling = true;
      // if(!!!that.first_Item){
      //   console.log('first')
      //   that.first_Item = item;
      // }else{
      //     console.log(that.first_Item);
      //     if(item.groupId !=that.first_Item.groupId){
      //       console.log('不匹配')
      //       // that.audios.url = that.errorAudios;
      //       setTimeout(() => {
      //           that.cardList[index].isRolling = false;
      //       }, 1500);
      //     }else{
      //       console.log('匹配');
      //       // that.audios.url = that.rightAudios;
      //       that.first_Item = '';
      //     }
      // }
   
      this.playtime.randem = Math.random(1000);
      that.playtime.time = that.cardList[index].beginTime; 
      that.playtime.stopTime = that.cardList[index].endTime;
     
      that.flag = true;
      that.$refs.audioss.startPlay();
    },
    clearTimer() {
      for (let i = 0; i <= this.timerList.length; i++) {
        window.clearTimeout(this.timerList[i]);
      }
      this.timerList.splice(0, this.timerList.length);
    }
  },
  mounted(){
    // console.log('mounted');
    var that = this;
    // that.cardList.sort(function () { 
    //   return Math.random() - 0.5; 
    // }); 
    // that.cardBaseList.sort(function () { 
    //   return Math.random() - 0.5; 
    // }); 

    // console.log(that.cardList);
    // console.log(that.cardBaseList);
  },
}
</script>

<style lang='less'>
@import "../../../assets/css/index";
@import "../../../assets/css/toyTrain";
@rem: 128rem;

img{
  display: inline-block;
  width: 100%;
}
.a_page_2 {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  .content{
    position: relative;
    width: 1090/@rem !important;
    margin: 0 auto;
    .content-match-cardList,.content-match-base{
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
    }
    .content-match-cardList{
        .scale(1120, 200);
        .pos-a(210, 0, 3);
        .list-group{
            width: 199/@rem;
            height: 182/@rem;
        }
        .list-group:first-child{
            width: 157/@rem;
        }
        .list-other{
          width: 284/@rem;
          height: 182/@rem;
        }
    }
    .content-match-base{
        .scale(1120, 200);
        .pos-a(525, 0, 3);
        .each-pic{
            width: 157/@rem;
            height: 182/@rem;
        }
    }
  }
}
</style>

