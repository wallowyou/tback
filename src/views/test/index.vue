<template>
  <div class="content">
    <div class="content-button">
      <div class="button-left">
        <el-button type="primary" size="small">批量发起核对</el-button>
        <el-button type="primary" size="small">批量核对完成</el-button>
        <el-button type="primary" size="small">批量核对撤销</el-button>
      </div>
      <div class="button-right">
        <el-button type="primary" size="small">导出</el-button>
      </div>
    </div>
    <el-table
      ref="multipleTable"
      border
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column prop="id" label="订单编号" align="center" />
      <el-table-column prop="shopId" label="客户编号" align="center" />
      <el-table-column prop="shopName" label="客户名称" align="center" />
      <el-table-column prop="nameitem" label="商品" align="center">
        <template slot-scope="scope">
          <ul class="goods-list">
            <li v-for="item in scope.row.nameitem" :key="item.id">{{ item.name }}</li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column prop="nameitem" label="价格" align="center">
        <template slot-scope="scope">
          <ul class="goods-list">
            <li v-for="item in scope.row.nameitem" :key="item.id">{{ item.price }}</li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column prop="nameitem" label="数量" align="center">
        <template slot-scope="scope">
          <ul class="goods-list">
            <li v-for="item in scope.row.nameitem" :key="item.id">{{ item.num }}</li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column prop="nameitem" label="单位" align="center">
        <template slot-scope="scope">
          <ul class="goods-list">
            <li v-for="item in scope.row.nameitem" :key="item.id">{{ item.unit }}</li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column prop="money" label="核对金额" align="center" />
      <el-table-column prop="money" label="核对金额" align="center" />
      <el-table-column prop="totalMoney" label="总金额" align="center" />
      <el-table-column prop="check" label="核对" align="center" />
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          shopId: '0004',
          shopName: '牧原公司',
          money: 1000,
          totalMoney: 9000,
          check: '已核对',
          nameitem: [
            {
              id: 1,
              name: '牛奶',
              price: 50,
              num: 30,
              unit: '箱'
            },
            {
              id: 2,
              name: '牛奶',
              price: 50,
              num: 30,
              unit: '箱'
            }
          ]
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    }
  }
}
</script>
<style>
.content-button {
  display: flex;
  justify-content: space-between;
}
.search-form {
	display: flex;
	justify-content: space-around;
}
.form-item {
	display: flex;
}
.goods-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
}

.goods-list > li {
  padding: 5px 0;
  text-align: center;
  position: relative;
}

.goods-list > li::after {
  content: "";
  position: absolute;
  height: 1px;
  width: 100%;
  background: #ebeef5;
  bottom: -4px;
  left: 0;
}
.el-table .el-table_1_column_6 .cell,
.el-table .el-table_1_column_7 .cell,
.el-table .el-table_1_column_8 .cell,
.el-table .el-table_1_column_9 .cell {
  /* padding: 0 !important; */
}
.el-table--border th.gutter:last-of-type {
    display: block!important;
    width: 17px!important;
  }
</style>

