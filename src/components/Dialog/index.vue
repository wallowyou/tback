<template>
  <el-dialog
    v-if="isVisible"
    :title="title"
    :visible.sync="isVisible"
    class="modal-custom"
    :custom-class="'dialog-'+ size"
    top="0"
    @close="close"
    @open="open"
  >
    <div class="modal-body">
      <!-- 此处放模态框主体内容 -->
      <slot />
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'md'
    },
    title: {
      type: String,
      default: '提示'
    }
  },
  data() {
    return {
      isVisible: false
    }
  },
  mounted() {
  },
  methods: {
    showModal() {
      this.isVisible = true
    },
    hideModal() {
      this.isVisible = false
    },
    close() {
      this.$emit('closecallback')
    },
    open() {
      this.$emit('opencallback')
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/components/zzx-dialog.scss";
.el-dialog__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  .dialog-md {
    width: 560px;
    /* 此处解决ie11模态框不水平居中问题 */
    margin: 0;
  }
  .dialog-sm {
    width: 560px;
    margin: 0;
  }
}
</style>
