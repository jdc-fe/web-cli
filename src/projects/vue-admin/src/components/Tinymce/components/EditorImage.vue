<template>
  <div class="upload-container">
    <el-button
      :style="{background:color,borderColor:color}"
      icon="el-icon-upload"
      size="mini"
      type="primary"
      @click=" dialogVisible=true"
    >
      上传
    </el-button>
    <el-dialog
      :visible.sync="dialogVisible"
      title="文件上传"
      append-to-body
    >
      <div v-loading="loading">
        <el-upload
          :multiple="true"
          :file-list="fileList"
          :show-file-list="true"
          :on-remove="handleRemove"
          :before-upload="beforeUpload"
          :http-request="upload"
          class="editor-slide-upload"
          :action="url"
          accept=".pdf, .png, .jpg, .mp4"
        >
          <el-button size="small" type="primary">
            点击上传
          </el-button>
        </el-upload>
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="handleSubmit">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/api/request';

export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    },
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
      type: 'img',
      loading: false
    };
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess);
    },
    async upload(param) {
      const { file } = param;
      const formData = new FormData();
      this.loading = true;
      // 文件对象
      formData.set('file', file);
      try {
        const { data: { fileUrl } } = await request({
          url: '/policyforPC/uploadfile2oss',
          method: 'post',
          data: formData
        });
        this.loading = false;
        const { uid } = file;
        const objKeyArr = Object.keys(this.listObj);
        // eslint-disable-next-line no-plusplus
        for (let i = 0, len = objKeyArr.length; i < len; i++) {
          if (this.listObj[objKeyArr[i]].uid === uid) {
            this.listObj[objKeyArr[i]].url = fileUrl;
            this.listObj[objKeyArr[i]].hasSuccess = true;
            return;
          }
        }
      } catch (error) {
        this.loading = false;
      }
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v]);
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有文件上传完成后再操作!');
        return;
      }
      this.$emit('successCBK', arr);
      this.listObj = {};
      this.fileList = [];
      this.dialogVisible = false;
    },
    // handleSuccess(response, file) {
    //   const { uid } = file
    //   const objKeyArr = Object.keys(this.listObj)
    //   // eslint-disable-next-line no-plusplus
    //   for (let i = 0, len = objKeyArr.length; i < len; i++) {
    //     if (this.listObj[objKeyArr[i]].uid === uid) {
    //       this.listObj[objKeyArr[i]].url = response.files.file
    //       this.listObj[objKeyArr[i]].hasSuccess = true
    //       return
    //     }
    //   }
    // },
    handleRemove(file) {
      const { uid } = file;
      const objKeyArr = Object.keys(this.listObj);
      // eslint-disable-next-line no-plusplus
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]];
          return;
        }
      }
    },
    beforeUpload(file) {
      // eslint-disable-next-line no-underscore-dangle
      const _self = this;
      const fileName = file.uid;
      this.listObj[fileName] = {};
      return new Promise((resolve, reject) => {
        _self.listObj[fileName] = {
          hasSuccess: false, uid: file.uid, type: file.type.indexOf('video/') === -1 ? 'img' : 'video'
        };
        resolve(true);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
