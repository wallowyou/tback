<template>
  <div class="app-container">
    <div class="handle-row">
      <el-button type="primary" size="md" @click="handleAdd">创建活动</el-button>
    </div>
    <div class="table-row">
      <zzx-table ref="myTable" :columns="columns" :url="'/console/taogoldList'" :search-params="form" size="lg" />
    </div>
    <zzx-dialog ref="addModal" title="新建活动">
      <el-form ref="addForm" :model="addForm" label-width="100px">
        <el-row>
          <el-col :sm="12">
            <el-form-item label="活动名称">
              <el-input v-model="addForm.taoName" class="modal-input" />
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="标题">
              <el-input v-model="addForm.title" class="modal-input" />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="dialog-footer">
          <el-button class="modal-btn" @click="closeAddModal">取 消</el-button>
          <el-button class="modal-btn" type="primary">确 定</el-button>
        </div>
      </el-form>
    </zzx-dialog>
  </div>
</template>

<script>
import api from '@/api/index.js'
import zzxTable from '@/components/Table/ZzxTable.vue'
import zzxDialog from '@/components//Dialog/index.vue'
import { parseTime } from '@/utils/index'
export default {
  components: {
    zzxTable,
    zzxDialog
  },
  data() {
    return {
      columns: [
        {
          key: 'id',
          title: 'id'
        },
        {
          key: 'taoCode',
          title: '活动code'
        },
        {
          key: 'taoName',
          title: '活动名称'
        },
        {
          key: 'startTime',
          title: '开始时间',
          formatter: (row) => {
            const time = new Date(row.startTime)
            const str = parseTime(time)
            return str
          }
        },
        {
          key: 'endTime',
          title: '结束时间',
          formatter: (row) => {
            const time = new Date(row.endTime)
            const str = parseTime(time)
            return str
          }
        },
        {
          key: '',
          title: '操作',
          operations: [
            {
              type: 'detail',
              title: '详情',
              handleOperate: this.handleOperaterEdit
            },
            {
              type: 'delete',
              title: '删除',
              handleOperate: this.handleOperaterDelete
            }
          ]
        }
      ],
      form: {},
      addForm: {
        taoName: '',
        title: ''
      }
    }
  },
  created() {

  },
  methods: {
    createAct() {
      api.createAct({}).then(res => {
        console.log(res)
      })
    },
    // 新增
    handleAdd() {
      this.showAddModal()
    },
    showAddModal() {
      this.$refs.addModal.showModal()
    },
    closeAddModal() {
      this.$refs.addModal.hideModal()
    }
  }
}
</script>
<style lang="scss">
.handle-row {
  margin: 15px;
}

</style>
