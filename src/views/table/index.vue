<template>
  <div class="app-container">
    <div class="handle-row">
      <el-row>
        <el-col :sm="4">
          <el-button type="primary" size="small" @click="handleAdd">创建活动</el-button>
        </el-col>
        <el-col :sm="4">
          <el-upload
            class="upload-demo"
            action="http://59.110.63.141:8888/console/upload"
            multiple
            :limit="3"
            :on-success="uploadSuccess"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-col>
      </el-row>

    </div>
    <div class="table-row">
      <zzx-table ref="myTable" :columns="columns" :url="'/console/taogoldList'" :search-params="form" size="lg" />
    </div>
    <zzx-dialog ref="addModal" title="新建活动">
      <el-form ref="baseInfo" label-width="100px">
        <el-row>
          <el-col :sm="12">
            <el-form-item label="活动名称">
              <el-input v-model="baseInfo.taoName" class="modal-input" />
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="标题">
              <el-input v-model="baseInfo.title" class="modal-input" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="24">
            <el-form-item label="图片地址">
              <el-input v-model="baseInfo.posters" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="24">
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="baseInfo.startTime"
                type="datetime"
                placeholder="开始时间"
                class="modal-input"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="24">
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="baseInfo.endTime"
                type="datetime"
                placeholder="结束时间"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="24">
            活动商品
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="24">
            <div v-for="(item,index) in preferentialDtoList" :key="index" class="goods-wrap">
              <el-row>
                <el-col :sm="12">
                  <el-form-item label="商品名称">
                    <el-input v-model="item.goodsName" class="modal-input" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12">
                  <el-form-item label="海报地址">
                    <el-input v-model="item.poster" class="modal-input" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="12">
                  <el-form-item label="库存">
                    <el-input v-model="item.stock" type="number" class="modal-input" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12">
                  <el-form-item label="原价信息">
                    <el-input v-model="item.originPriceMsg" class="modal-input" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="12">
                  <el-form-item label="原价商品地址">
                    <el-input v-model="item.originGoodsUrl" class="modal-input" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12">
                  <el-form-item label="现价商品信息">
                    <el-input v-model="item.currentPriceMsg" class="modal-input" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :sm="12">
                  <el-form-item label="现价">
                    <el-input v-model="item.currentPrice" class="modal-input" />
                  </el-form-item>
                </el-col>
                <el-col :sm="12" style="text-align: center">
                  <el-button type="danger" icon="el-icon-delete" circle @click="removeGood(index)" />
                </el-col>
              </el-row>
            </div>
            <el-row>
              <el-col :sm="24" style="text-align: center">
                <el-button type="primary" icon="el-icon-plus" circle @click="addGood" />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <div class="dialog-footer">
          <el-button class="modal-btn" @click="closeAddModal">取 消</el-button>
          <el-button class="modal-btn" type="primary" @click="addAct">确 定</el-button>
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
            }
          ]
        }
      ],
      form: {},
      fileList: [],
      baseInfo: {
        taoName: '',
        title: '',
        posters: '',
        startTime: '',
        endTime: ''
      },
      preferentialDtoList: [
        {
          goodsName: '',
          poster: '',
          stock: 0,
          originPriceMsg: '',
          originGoodsUrl: '',
          currentPriceMsg: '',
          currentPrice: ''
        }
      ]
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
    },
    handleOperaterEdit(row) {
      const taocode = row.taoCode
      this.getDetail(taocode)
    },
    getDetail(taocode) {
      api.getActDetail(taocode).then(res => {
        console.log(res)
      })
    },
    uploadSuccess(res, file, fileList) {
      if (parseInt(res.status) === 0) {
        this.fileList = []
        this.$message({
          message: '文件上传成功',
          type: 'success'
        })
      } else {
        this.fileList = []
        this.$message({
          message: '文件上传失败',
          type: 'error'
        })
      }
    },
    addGood() {
      this.preferentialDtoList.push({
        goodsName: '',
        poster: '',
        stock: 0,
        originPriceMsg: '',
        originGoodsUrl: '',
        currentPriceMsg: '',
        currentPrice: ''
      })
    },
    removeGood(index) {
      this.preferentialDtoList.splice(index, 1)
    },
    addAct() {
      console.log(this.baseInfo, this.preferentialDtoList)
      api.createAct({ baseInfo: this.baseInfo, preferentialDtoList: this.preferentialDtoList }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="scss">
.handle-row {
  margin: 15px;
}
.el-date-editor--datetime {
  .el-input__inner {
    padding: 0 30px;
  }
}
.goods-wrap {
  border-bottom: 1px solid #cccccc;
}

</style>
