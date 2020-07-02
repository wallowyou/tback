<template>
  <div :class="['table-wrap', `table-wrap-${size}`]">
    <!-- <el-scrollbar class="table-scrollbar"> -->
    <el-table
      v-loading="tableLoading"
      :data="tableData"
      stripe
      empty-text="暂无数据"
      header-row-class-name="table-header-custom"
    >
      <!-- options选项可以设置是否显示选择选项 -->
      <template v-if="options.showSelect">
        <el-table-column type="selection" width="55" />
      </template>
      <template v-for="(col, index) in columns">
        <el-table-column
          :key="index"
          :prop="col.key"
          :label="col.title"
          :width="col.width"
          :formatter="col.formatter"
          :show-overflow-tooltip="options.showToolTip"
          align="center"
        >
          <template slot-scope="scope">
            <template v-if="col.operations">
              <el-button
                v-for="(operator, oIndex) in col.operations"
                :key="oIndex"
                size="normal"
                type="text"
                @click="operator.handleOperate(scope.row)"
              ><svg-icon :icon-class="operator.type" />{{ operator.title }}</el-button>
            </template>
            <template v-else-if="col.render">
              <Render :row="scope.row" :column="col" :index="index" :render="col.render" />
            </template>
            <template v-else-if="'slot' in col">
              <slot :row="scope.row" :column="col" :index="index" :name="col.slot" />
            </template>
            <template v-else>
              <template v-if="col.formatter">
                {{ col.formatter(scope.row) }}
              </template>
              <template v-else>
                {{ scope.row[col.key] }}
              </template>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- </el-scrollbar> -->
    <!-- 此处为分页条 -->
    <div v-if="pagination" class="table-pagination">
      <slot />
      <el-pagination
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :current-page.sync="currentPage"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>
<script>
/*
  @des
  1. 此组件是自定义的基于el-table封装的table组件,
     组件的属性有size, columns, searchParams， url, options等,其他属性可以后期根据需要增加
  2. 组件columns属性的详解, columns是一个描述表格数据列的对象数组，
    每一列是一个对象,其中formatter和operations为可选的
  3. 组件的getData是一个Promise，可以用来自定义获取数据的函数
  eg: {
    key: '',
    title: '',
    width:'',
    formatter: Function,
    operations: {
       {
          type: "primary",
          title: "编辑",
          handleOperate: this.handleOperaterEdit
        },
        {
          type: "danger",
          title: "删除",
          handleOperate: this.handleOperaterDelete
        }
    }
  }
  * [TODO] 之后考虑是否添加行内编辑功能
*/
import { get } from '@/utils/request.js'
import Render from './render.js'
export default {
  name: 'ZzxTable',
  components: { Render },
  props: {
    size: {
      type: String,
      default: 'lg'
    },
    columns: {
      type: Array,
      default() {
        return []
      },
      required: true
    },
    getData: {
      type: Function, // 一个函数 返回值为Promise对象
      default() {
      }
    },
    searchParams: {
      type: Object,
      default() {
        return {}
      }
    },
    url: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default() {
        return {
          showSelect: false, // 是否支持列表项选中功能
          showToolTip: true // 是否支持列表项选中功能
        }
      }
    },
    // 关于分页的
    pagination: {
      type: Boolean,
      default: true
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30]
      }
    }
  },
  data() {
    return {
      total: 0, // 总条数
      pageSize: 10, // 每页的数据
      currentPage: 1, // 当前页数
      tableData: [],
      tableLoading: true
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    // 默认获取数据方式
    searchData() {
      // 此固定的表格参数名称根据后台统一设置
      const params = {
        pageNum: this.currentPage, // 当前页数
        pageSize: this.pageSize // 每页的页数
      }
      const realParams = { ...params, ...this.searchParams }
      return get(this.url, realParams)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.loadData()
    },
    handlePageChange(val) {
      this.currentPage = val
      this.loadData()
    },
    // 获取数据
    loadData() {
      // nextTick 函数接收一个回调函数 cb，在下一个 DOM 更新循环之后执行
      this.$nextTick(async() => {
        try {
          let res
          if (!this.url) {
            res = await this.getData()
          } else {
            res = await this.searchData()
          }
          this.tableData = res.data.content
          this.total = res.data.total
        } catch (error) {
          console.log(error)
        } finally {
          this.tableLoading = false
        }
      })
    },
    // 刷新表格数据
    refreshData() {
      this.currentPage = 1
      this.loadData()
    }
  }
}
</script>
<style lang="scss">
@import "@/styles/components/zzx-table.scss";
</style>
