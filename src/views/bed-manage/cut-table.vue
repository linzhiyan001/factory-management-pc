<!-- 裁床表 -->
<template>
  <div class="cut-table">
    <div class="cut-table-top">
      <div class="title">
        裁床表
      </div>
      <div class="size">
        <div class="desc">
          每点击一次添加一次尺码
        </div>
        <div class="list">
          <div
            v-for="(item, index) in sizes"
            :key="index"
            class="item"
            @click="sizeClick(item)"
          >
            {{ item.size_name }}
          </div>
        </div>
      </div>
      <div class="t1">
        <div class="size size2">
          <div class="desc">
            每点击一次添加一次颜色
          </div>
          <div class="list2">
            <div
              v-for="(item, index) in colors"
              :key="index"
              class="item"
              @click="colorClick(item)"
            >
              {{ item.color_name }}
            </div>
          </div>
        </div>
        <div class="tableWrap">
          <div
            v-if="sizeCheck.length == 0 && colorCheck.length == 0"
            class="noData"
          >
            请点击添加尺码及颜色进行设置裁床表
          </div>
          <div v-else class="table">
            <div class="left">
              <div :class="switch1 || switch2 ? 'th th_height' : 'th'">
                颜色/尺码
              </div>
              <div v-if="switch5" class="th">
                <!-- 倍数 -->
              </div>
              <div class="th" v-for="(item, index) in colorCheck" :key="index">
                <i
                  class="el-icon-delete"
                  @click="colorDel(item, index)"
                  name="trash"
                  size="18"
                  color="#333"
                ></i>
                {{ index + 1 }}:{{ item.color_name }}
              </div>
              <div class="th">
                合计
              </div>
            </div>
            <div class="right">
              <!-- 第一行 -->
              <div class="tr">
                <div
                  v-if="switch7"
                  :class="switch1 || switch2 ? 'td td_heigth_r' : 'td'"
                >
                  款式
                </div>
                <div
                  v-if="switch6"
                  :class="switch1 || switch2 ? 'td td_heigth_r' : 'td'"
                >
                  层号
                </div>
                <div
                  v-if="switch5"
                  :class="switch1 || switch2 ? 'td td_heigth_r' : 'td'"
                >
                  倍数
                </div>
                <div
                  :class="switch1 || switch2 ? 'td td_heigth' : 'td'"
                  v-for="(item, index) in sizeCheck"
                  :key="index"
                >
                  <div class="td_top">
                    <i class="el-icon-delete" @click="sizeDel(item, index)"></i>
                    {{ item.size_name }}
                  </div>
                  <div v-if="switch1 || switch2" class="td_bottom">
                    <div v-if="switch1">
                      扎数
                    </div>
                    <div v-if="switch2">
                      扎号
                    </div>
                    <div>
                      数量
                    </div>
                  </div>
                </div>
                <div :class="switch1 || switch2 ? 'td td_heigth_r' : 'td'">
                  合计
                </div>
              </div>
              <!-- 倍数行 -->
              <div v-if="switch5" class="tr">
                <div v-if="switch6" class="td">
                  <!-- 层数 -->
                </div>
                <div class="td">
                  倍数
                </div>
                <div
                  :class="switch1 || switch2 ? 'td td_width' : 'td'"
                  v-for="(item, index) in sizeCheck"
                  :key="index"
                >
                  <input
                    type="number"
                    v-model="item.multiple"
                    @input="inputChange1"
                    @focus="inputFocus1(index)"
                    @blur="inputBlur1"
                    placeholder="倍数"
                  />
                </div>
              </div>
              <!-- 款式 -->
              <div
                class="tr"
                v-for="(item2, index2) in colorCheck"
                :key="index2"
              >
                <div v-if="switch7" class="td">
                
                  <el-select
                    v-model="item2.style_id"
                    placeholder="请选择"
                    style="width: 80%;"
					@change="elSelectFn"
                  >
                    <el-option
                      v-for="item3 of styleselectOptions"
                      :key="item3.id+''"
                      :label="item3.style_name"
                      :value="item3.id+''"
                    ></el-option>
                  </el-select>
                </div>
                <!-- 层数 -->
                <div v-if="switch6" class="td">
                  <input
                    type="number"
                    v-model="item2.layer_number"
                    @input="inputChange5"
                    @focus="inputFocus5(index2)"
                  />
                </div>
                <!-- 倍数 -->
                <div v-if="switch5" class="td">
                  <input
                    type="number"
                    v-model="item2.multiple"
                    @input="inputChange2"
                    @focus="inputFocus2(index2)"
                    @blur="inputBlur2"
                    placeholder="倍数"
                  />
                </div>
                <!-- 数量 -->
                <div
                  :class="switch1 || switch2 ? 'td td_width' : 'td'"
                  v-for="(item1, index1) in sizeCheck"
                  :key="index1"
                >
                  <!-- 扎数 -->
                  <input
                    v-if="switch1"
                    type="number"
                    v-model="
                      list[index1 + 1 + index2 * sizeCheck.length - 1]
                        .bundle_number
                    "
                    @input="inputChange3"
                    @focus="inputFocus3(index1, index2)"
                  />
                  <!-- 扎号 -->
                  <input
                    v-if="switch2"
                    type="number"
                    v-model="
                      list[index1 + 1 + index2 * sizeCheck.length - 1].bundle_no
                    "
                    @input="inputChange4"
                    @focus="inputFocus4(index1, index2)"
                  />
                  <!-- 数量 -->
                  <input
                    type="number"
                    v-model="
                      list[index1 + 1 + index2 * sizeCheck.length - 1].quantity
                    "
                    @input="inputChange"
                    @focus="inputFocus(index1, index2)"
                  />
                </div>
                <div class="td">
                  {{ item2.total || 0 }}
                </div>
              </div>
              <!-- 末尾行 -->
              <div class="tr">
                <div v-if="switch6" class="td">
                  <!-- 层数 -->
                </div>
                <div v-if="switch5" class="td">
                  <!-- 倍数 -->
                </div>
                <div
                  :class="switch1 || switch2 ? 'td td_width' : 'td'"
                  v-for="(item, index) in sizeCheck"
                  :key="index"
                >
                  {{ item.total || 0 }}
                </div>
                <div class="td" style="font-weight: bold;">
                  {{ tableSum }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="oprate">
          <div class="top">
            <div class="left">
              从
              <input maxlength="5" type="number" v-model="bundleStart" />
              扎起
            </div>
          </div>
          <div class="bottom">
            <el-form>
              <div class="form23">
                <el-form-item label="自定义扎数" labelWidth="95">
                  <el-switch
                    v-model="switch1"
                    @change="change1"
                    size="16"
                    activeColor="#ff590c"
                  ></el-switch>
                </el-form-item>
                <el-form-item label="自定义扎号" labelWidth="95">
                  <el-switch
                    v-model="switch2"
                    @change="change2"
                    size="16"
                    activeColor="#ff590c"
                  ></el-switch>
                </el-form-item>
                <el-form-item label="行复制" labelWidth="95">
                  <el-switch
                    v-model="switch3"
                    @change="change3"
                    size="16"
                    activeColor="#ff590c"
                  ></el-switch>
                </el-form-item>
                <el-form-item label="列复制" labelWidth="95">
                  <el-switch
                    v-model="switch4"
                    @change="change4"
                    size="16"
                    activeColor="#ff590c"
                  ></el-switch>
                </el-form-item>
                <el-form-item label="倍数模式" labelWidth="95">
                  <el-switch
                    v-model="switch5"
                    @change="change5"
                    size="16"
                    activeColor="#ff590c"
                  ></el-switch>
                </el-form-item>
                <el-form-item label="自定义层号" labelWidth="95">
                  <el-switch
                    v-model="switch6"
                    @change="change6"
                    size="16"
                    activeColor="#ff590c"
                  ></el-switch>
                </el-form-item>
                <el-form-item label="款式" labelWidth="95">
                  <el-switch
                    v-model="switch7"
                    size="16"
                    activeColor="#ff590c"
                  ></el-switch>
                </el-form-item>
              </div>
            </el-form>
            <div class="bottom">
              <span>总扎数：{{ tablebundle_number }}</span>
              <span>总数：{{ tableSum }}</span>
            </div>
            <div class="right">
				
					<div class="btn" @click="clearTable">
						清空裁床表
					</div>
				</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cut-table',
  props: {
    // 尺码
    sizes: {
      type: Array,
      default: function () {
        return []
      },
    },
    // 颜色
    colors: {
      type: Array,
      default: function () {
        return []
      },
    },
    // 款式
    styleselectOptions: {
      type: Array,
      default: function () {
        return []
      },
    },

    // 款式id
    style_id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      list: [],
      sizeCheck: [], //点击尺寸
      colorCheck: [], //点击颜色
      item: {
        style_id: '', //款式id
        size_id: 25, //尺码id
        color_id: 18, //颜色id
        bundle_number: 1, //捆数
        multiple: 1, //倍数
        quantity: 1, //数量
        layer_number: 1, //层数
        total: 1, //总件数
        bundle_no: 1, //扎号
      },
      sizeIndex: '', //输入框
      colorIndex: '', //输入框
      tableValue: [], //输入框值
      tableSum: 0, //合计
      tablebundle_number: 0, //捆数扎数
      bundleStart: 1, //从几扎起
      switch1: false,
      switch2: false,
      switch3: true,
      switch4: false,
      switch5: false,
      switch6: false,
      switch7: false,

      multipleIndex_x: '', //倍数-横坐标
      multipleIndex_y: '', //倍数-纵坐标
    }
  },
  mounted() {
    setTimeout((res) => {
      console.log(this.size)
      console.log(this.color)
    }, 1000)
  },
  methods: {
    // 尺码点击
    sizeClick(item) {
      console.log(item, 22)
      this.sizeCheck.push({
        id: item.id,
        size_name: item.size_name,
        total: 0,
      })
      if (this.sizeCheck.length == 1 && this.colorCheck.length == 0) {
      } else if (this.sizeCheck.length == 1 && this.colorCheck.length >= 1) {
        for (let i = 0; i < this.colorCheck.length; i++) {
          this.list.push({
            quantity: 0,
            style_id:  this.colorCheck[i].style_id,

            bundle_number: 1,
            size_id: item.id,
            size_name: item.size_name,
            color_id: this.colorCheck[i].id,
            color_name: this.colorCheck[i].color_name,
          })
        }
      } else if (this.sizeCheck.length > 1 && this.colorCheck.length >= 1) {
        for (let i = 0; i < this.colorCheck.length; i++) {
          this.list.splice(this.sizeCheck.length * (i + 1) - 1, 0, {
            quantity: 0,
            style_id:  this.colorCheck[i].style_id,

            bundle_number: 1,
            size_id: item.id,
            size_name: item.size_name,
            color_id: this.colorCheck[i].id,
            color_name: this.colorCheck[i].color_name,
          })
        }
      }
      this.setbundle_no()
    },
    // 颜色点击
    colorClick(item) {
      // console.log(item);
      this.colorCheck.push({
        id: item.id,
        color_name: item.color_name,
        total: 0,
        style_id:this.style_id +'',

        layer_number: this.colorCheck.length + 1, //层数
      })
      if (this.colorCheck.length == 1 && this.sizeCheck.length == 0) {
      } else if (this.colorCheck.length >= 1 && this.sizeCheck.length >= 1) {
        for (let i = 0; i < this.sizeCheck.length; i++) {
          this.list.push({
            quantity: 0,
           
            bundle_number: 1,
            size_id: this.sizeCheck[i].id,
            size_name: this.sizeCheck[i].size_name,
            color_id: item.id,
            color_name: item.color_name,
          })
        }
      }
      this.setbundle_no()
    },
    // 尺码删除
    sizeDel(item, index) {
      // console.log(item,index);
      for (let i = this.colorCheck.length; i > 0; i--) {
        this.list.splice((i - 1) * this.sizeCheck.length + index, 1)
      }
      this.sizeCheck.splice(index, 1)
      this.setbundle_no()
    },
    // 颜色删除
    colorDel(item, index) {
      // console.log(item,index);
      for (
        let i = (index + 1) * this.sizeCheck.length - 1;
        i > index * this.sizeCheck.length - 1;
        i--
      ) {
        this.list.splice(i, 1)
      }
      this.colorCheck.splice(index, 1)
      this.setbundle_no()
    },
    // 列表变化,整理扎号
    setbundle_no() {
      for (let i = 0; i < this.list.length; i++) {
        // this.list[i].bundle_no = i + 1 //扎号
        this.list[i].style_id = this.style_id +''//款式id
        // this.list[i].bundle_number = 1 //捆数扎数
      }
      console.log(this.list)
    },
    // 数量输入变化
    inputChange(e) {
      console.log
      var value = e.target.value
      value = value && !isNaN(Number(value)) ? Number(value) : ''

      // 行复制
      if (this.switch3 && this.list.length > 0) {
        // console.log('下标行', this.colorIndex)
        for (
          let i = this.colorIndex * this.sizeCheck.length;
          i < (this.colorIndex + 1) * this.sizeCheck.length;
          i++
        ) {
          this.list[i].quantity = value
        }
      }

      // 列复制
      if (this.switch4 && this.list.length > 0) {
        console.log('下标列', this.sizeIndex)
        for (let i = 0; i < this.colorCheck.length; i++) {
          this.list[this.sizeCheck.length * i + this.sizeIndex].quantity = value
        }
      }
    },
    // 输入框获取焦点-获取横纵下标
    inputFocus(index1, index2) {
      this.sizeIndex = index1
      this.colorIndex = index2
    },
    // 自定义扎数
    change1(e) {
      console.log(this.bundleStart)
      if (this.switch1) {
        this.switch2 = false
      }
      this.listChange()
    },
    // 自定义扎号
    change2(e) {
      if (this.switch2) {
        this.switch1 = false
      }
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].bundle_no = i + Number(this.bundleStart) //扎号
      }
      this.$forceUpdate()
    },
    // 行复制
    change3(e) {},
    // 列复制
    change4(e) {},
    // 倍数
    change5(e) {},
    // 自定义层号
    change6(e) {
      // for (let i = 0; i < this.colorCheck.length; i++) {
      // 	this.colorCheck[i].layer_number = i + 1
      // }
      // this.$forceUpdate()
    },
    // 倍数-横坐标
    inputFocus1(index) {
      this.multipleIndex_x = index
    },
    // 倍数-横坐标-失去焦点
    inputBlur1(e) {
      var value = e.target.value
      // 如果为000默认设置空
      if (Number(value) == 0) {
        this.sizeCheck[this.multipleIndex_x].multiple = ''
      }
    },
    // 倍数-横坐标输入
    inputChange1(e) {
      var value = e.target.value
      value = value && !isNaN(Number(value)) ? Number(value) : 0
      this.sizeCheck[this.multipleIndex_x].multiple = value
      for (let i = 0; i < this.colorCheck.length; i++) {
        if (this.colorCheck[i].multiple) {
          this.list[
            (i + 1) * this.sizeCheck.length -
              (this.sizeCheck.length - (this.multipleIndex_x + 1)) -
              1
          ].quantity = this.colorCheck[i].multiple * value
        }
      }
    },
    // 倍数-纵坐标
    inputFocus2(index) {
      this.multipleIndex_y = index
    },
    // 倍数-纵坐标-失去焦点
    inputBlur2(e) {
      var value = e.target.value
      // 如果为000默认设置空
      if (Number(value) == 0) {
        this.colorCheck[this.multipleIndex_y].multiple = ''
      }
    },
    // 倍数-纵坐标输入
    inputChange2(e) {
      console.log(e.target.value)
      var value = e.target.value
      value = value && !isNaN(Number(value)) ? Number(value) : 0
      this.colorCheck[this.multipleIndex_y].multiple = value
      for (let i = 0; i < this.sizeCheck.length; i++) {
        if (this.sizeCheck[i].multiple) {
          this.list[this.multipleIndex_y * this.sizeCheck.length + i].quantity =
            this.sizeCheck[i].multiple * value
        }
      }
    },
    // 扎数-输入变化
    inputChange3(e) {
      var value = e.target.value
      value = value && !isNaN(Number(value)) ? Number(value) : 0
    },
    // 扎数-获取横纵下标
    inputFocus3(index1, index2) {
      console.log(index1, index2)
    },
    // 扎号-输入变化
    inputChange4(e) {
      var value = e.target.value
      value = value && !isNaN(Number(value)) ? Number(value) : 0
    },
    // 扎号-获取横纵下标
    inputFocus4(index1, index2) {
      console.log(index1, index2)
    },
    // 层号-输入变化
    inputChange5(e) {
      var value = e.target.value
      value = value && !isNaN(Number(value)) ? Number(value) : 0
      this.listChange()
    },
	elSelectFn(){
		this.listChange()
		this.colorCheck.forEach((e,idx)=>{
			this.list[idx].style_id=e.style_id
		})
		

	},
    // 层号-获取横纵下标
    inputFocus5(index1, index2) {
      console.log(index1, index2)
    },
    listChange() {
      // 计算尺寸合计
      for (let i = 1; i < this.sizeCheck.length + 1; i++) {
        var total = 0
        for (let j = 1; j < this.colorCheck.length + 1; j++) {
          if (this.switch1) {
            // 开启扎数-数量和
            total +=
              Number(
                this.list[
                  j * this.sizeCheck.length - (this.sizeCheck.length - i) - 1
                ].quantity,
              ) *
              Number(
                this.list[
                  j * this.sizeCheck.length - (this.sizeCheck.length - i) - 1
                ].bundle_number,
              )
          } else {
            // 尺寸-数量和
            total += Number(
              this.list[
                j * this.sizeCheck.length - (this.sizeCheck.length - i) - 1
              ].quantity,
            )
          }
        }
        this.sizeCheck[i - 1].total = total
      }
      // 计算颜色合计
      for (let i = 0; i < this.colorCheck.length; i++) {
        var total = 0
        for (
          let j = i * this.sizeCheck.length;
          j < (i + 1) * this.sizeCheck.length;
          j++
        ) {
          if (this.switch1) {
            // 开启扎数-数量和
            total +=
              Number(this.list[j].quantity) * Number(this.list[j].bundle_number)
          } else {
            // 颜色-数量和
            total += Number(this.list[j].quantity)
          }
          this.list[j].layer_number = this.colorCheck[i].layer_number
          this.list[j].total =total
        }
        this.colorCheck[i].total = total
      }
      // 合计
      var tableSum = 0
      var tablebundle_number = 0
      for (let i = 0; i < this.list.length; i++) {
        // 数量 如果开头0 去除
        if (this.list[i].quantity.length > 1) {
          this.list[i].quantity = this.list[i].quantity.replace(/\b(0+)/gi, '')
        }
        // 数量 如果为空默认设置1
        // if (this.list[i].quantity === '') {
        // 	this.list[i].quantity = 1
        // }
        // 扎数 如果开头0 去除
        if (this.list[i].bundle_number.length > 1) {
          this.list[i].bundle_number = this.list[i].bundle_number.replace(
            /\b(0+)/gi,
            '',
          )
        }
        // 扎数 如果为空默认设置1
        // if (this.list[i].bundle_number === '') {
        // 	this.list[i].bundle_number = 1
        // }
        // 扎数合计-不为0的项
        if (Number(this.list[i].quantity) != 0) {
          tablebundle_number += Number(this.list[i].bundle_number)
        }
        if (this.switch1) {
          // 开启扎数-数量和
          tableSum +=
            Number(this.list[i].quantity) * Number(this.list[i].bundle_number)
        } else {
          // 数量和
          tableSum += Number(this.list[i].quantity)
        }
      }
      this.tableSum = tableSum
      this.tablebundle_number = tablebundle_number
      this.$forceUpdate()
      this.$emit('saveTableList', this.list, this.sizeCheck, this.colorCheck,tableSum,tablebundle_number)
    },
    // 查看裁床表
    divTable() {
      // uni.navigateTo({
      // 	url: '/pages/scan/cuttingSheets?id='+ 1 + '&type=1'
      // })
    },
    // 清空裁床表
    clearTable() {
      this.colorCheck = []
      this.sizeCheck = []
      this.list = []
    },
  },
  watch: {
    list: {
      handler(newData, oldData) {
        console.log(newData, oldData)
        // console.log(this.sizeCheck)
        // console.log(this.colorCheck)
        this.listChange()
      },
      immediate: true,
      deep: true,
    },
    sizeCheck: {
      handler(newData, oldData) {
        if (this.sizeCheck && this.sizeCheck.length > 0) {
          for (let i = 0; i < this.sizeCheck.length; i++) {
            // 如果开头0 去除
            if (
              this.sizeCheck[i].multiple &&
              this.sizeCheck[i].multiple.length > 1
            ) {
              this.sizeCheck[i].multiple = this.sizeCheck[i].multiple.replace(
                /\b(0+)/gi,
                '',
              )
            }
          }
        }
        this.$forceUpdate()
      },
      immediate: true,
      deep: true,
    },
    colorCheck: {
      handler(newData, oldData) {
        if (this.colorCheck && this.colorCheck.length > 0) {
          for (let i = 0; i < this.colorCheck.length; i++) {
            // 如果开头0 去除
            if (
              this.colorCheck[i].multiple &&
              this.colorCheck[i].multiple.length > 1
            ) {
              this.colorCheck[i].multiple = this.colorCheck[i].multiple.replace(
                /\b(0+)/gi,
                '',
              )
            }
          }
        }
        this.$forceUpdate()
      },
      immediate: true,
      deep: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.cut-table {
  width: 100%;
  padding-bottom: calc(90px + constant(safe-area-inset-bottom));
  padding-bottom: calc(90px + env(safe-area-inset-bottom));
  height: auto;
  margin-top: 20px;
  background: #fff;

  div,
  span {
    font-size: 14px;
  }

  .cut-table-top {
    border: 1px solid #d1d1d1;

    .title {
      padding: 12px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #d1d1d1;
    }

    .size {
      padding: 10px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #d1d1d1;

      .desc {
        margin-bottom: 6px;
      }

      .list {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        .item {
          padding: 0px 10px;
          color: #ed6d00;
          border: 1px solid #ed6d00;
          background: #fdf0e5;
          border-radius: 10px;
          margin: 0 10px;
          cursor: pointer;
        }
      }
      .list2 {
        .item {
          cursor: pointer;

          padding: 0px 10px;
          color: #ed6d00;
          border: 1px solid #ed6d00;
          background: #fdf0e5;
          border-radius: 10px;
          margin: 10px;
        }
      }
    }
    .size2 {
      padding: 20px;
      width: 200px;
      border-right: 1px solid #d1d1d1;
      span-align: center;
    }

    .tableWrap {
      border-bottom: 1px solid #d1d1d1;

      .table {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        position: relative;

        .left {
          width: 140px;

          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          align-items: flex-start;
          justify-content: flex-start;
          background-color: white;

          .th {
            display: flex;
            align-items: center;
            justify-content: center;
            outline: 1px solid #d1d1d1;
            width: 140px;
            height: 50px;
            // box-sizing: content-box;
          }

          .th_height {
            width: 140px;
            height: 100px;
          }
        }

        .right {
          max-width: 90%;
          overflow-x: auto;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          outline: 1px solid #d1d1d1;
        }

        .tr {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;

          .td {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            overflow: hidden;
            width: 140px;
            flex-shrink: 0;
            outline: 1px solid #d1d1d1;
            height: 50px;
            // box-sizing: border-box;

            .td_top {
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .td_bottom {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;

              div {
                width: 140px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            }

            input {
              span-align: center;
              font-size: 14px;
            }
          }

          .td_heigth {
            width: 280px;
            height: 100px;
          }

          .td_heigth_r {
            width: 140px;
            height: 100px;
          }

          .td_width {
            width: 280px;
            height: 50px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;

            input {
              width: 140px;
            }
          }
        }
      }
    }
  }
  .bottom {
    padding: 6px;

    span {
      font-weight: bold;
      margin-right: 20px;
    }
  }
  .oprate {
    border: 1px solid #d1d1d1;

    .top {
      padding: 20px;
      border-bottom: 1px solid #d1d1d1;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      justify-content: space-between;

      .left {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        justify-content: flex-start;

        input {
          width: 84px;
          font-size: 14px;
          padding: 10px;
          border: 1px solid #f1f1f1;
        }
      }

      .right {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        justify-content: space-between;

        .btn {
          padding: 0px 10px;
          color: #ed6d00;
          border: 1px solid #ed6d00;
          background: #fdf0e5;
          border-radius: 10px;
          margin: 0 10px;
          margin-left: 40px;
        }
      }
    }

    .bottom {
      padding: 20px;

      .form {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
      }
    }
  }
}
.t1 {
  display: flex;
  justify-content: space-between;
  .tableWrap {
    width: 70%;
    padding: 20px;
  }
  input {
    border: 1px solid #dcdfe6 !important;
    width: 82% !important;
    height: 38px !important;
    border-radius: 8px !important;
    margin: 0 10px !important;
    text-align: center !important;
  }
  input[type='number'] {
    -moz-appearance: none; /* Firefox */
    -webkit-appearance: none; /* Safari 和 Chrome */
    appearance: none; /* 标准属性 */
    border: none; /* 移除边框 */
    background: transparent; /* 移除背景 */
    outline: none; /* 移除聚焦时的轮廓 */
    width: 100%; /* 根据需要调整宽度 */
    padding: 0; /* 移除内边距 */
    font: inherit; /* 继承字体样式 */
  }

  /* 隐藏增加和减少按钮 */
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
i {
  cursor: pointer;
}
.right {
					display: flex;
					align-items: center;
					flex-wrap: nowrap;
					justify-content: space-between;

					.btn {
						padding: 5px 10px;
						color: #ed6d00;
						border: 1px solid #ed6d00;
						background: #fdf0e5;
            cursor: pointer;
						border-radius: 10px;
						margin: 0 10px;
						margin-left: 40px;
					}
				}
</style>
