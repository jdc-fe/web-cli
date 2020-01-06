<template>
  <div class='my-upload'>
    <el-upload
      class='uploader'
      action
      :show-file-list='false'
      accept='.png, .jpg'
      :before-upload='beforeUpload'
      :http-request='uploadFile'
      :style="imageStyle"
    >
      <div v-if="imageUrl" class="img-box" :style="imageStyle">
        <div
          class="img-bg"
          :style="`background: url(${imageUrl}) no-repeat center`"
        ></div>
      </div>
      <template v-if="!uploading">
        <!-- 第一次上传图片 -->
        <div v-if="!imageUrl" class="upload-text">
          <div>
            <i class='el-icon-plus uploader-icon' />
            <p class='text'>上传照片</p>
          </div>
        </div>
        <!-- 非第一次上传图片 -->
        <div v-else class="upload-mask">
          <div>
            <i class='el-icon-plus uploader-icon' />
            <p class='text'>上传照片</p>
          </div>
        </div>
      </template>

      <!-- 加载中 -->
      <template v-else>
        <div class="loading">
          <i class="el-icon-loading" />
        </div>
      </template>
    </el-upload>
    <div class="text-container">
      <p class='size-text'>图片尺寸：{{ `${width} * ${height}`}}</p>
      <p class='size-text'>图片格式：jpg，png</p>
    </div>
    <p v-show='showErrorText && !imageUrl' class='error-text'>请选择文件</p>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      deafult: '',
      type: String
    },
    height: {
      deafult: '',
      type: String
    },
    imageUrl: {
      deafult: '',
      type: String
    },
    showErrorText: {
      deafult: false,
      type: Boolean
    },
    uploading: {
      deafult: false,
      type: Boolean
    },
    imgSize: { // 默认3M
      deafult: 3,
      type: Number
    }
  },
  computed: {
    imageStyle() {
      const { width, height } = this;
      if (!width || !height) return false;
      const w = (Number(width.split('px')[0])).toFixed(0);
      const h = (Number(height.split('px')[0])).toFixed(0);
      if (w <= 100 || h <= 100) {
        return { width: `${w * 2}px`, height: `${h * 2}px` };
      }
      // 图片较大时显示宽高缩小1/2，太小时宽高放大2
      if (w >= 720 || h >= 500) {
        return { width: `${w / 2}px`, height: `${h / 2}px` };
      }
      return { width: `${w}px`, height: `${h}px` };
    }
  },
  methods: {
    beforeUpload(file) {
      const { imgSize = 3 } = this;
      const typeArr = ['image/jpg', 'image/jpeg', 'image/png'];
      const result = typeArr.filter(i => file.type === i);
      const isJPGPNG = result.includes(file.type);
      if (!isJPGPNG) {
        this.$message.error('上传头像图片只能是 JPG或PNG格式!');
        return false;
      }
      const isMaxM = file.size / 1024 / 1024 < imgSize;
      const errText = imgSize >= 1 ? `证件大小不能超过 ${imgSize}MB!` : `证件大小不能超过 ${imgSize * 1024}KB!`;
      if (!isMaxM) this.$message.error(errText);
      return isJPGPNG && isMaxM;
    },
    uploadFile(file) {
      this.$emit('uploadFile', file.file);
    }
  }
};
</script>

<style lang='scss'>
@import 'variable';
.my-upload {
  position: relative;
}
.uploader {
  border: 1px solid $--border-color-base;
  border-radius: 6px;
  background-color: $--color-white;
  cursor: pointer;
  position: relative;
}
.img-bg {
  width: 100%;
  height: 100%;
  background-size: 100% auto!important;
}
.upload-text, .upload-mask {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  & > div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.uploader-icon {
  display: block;
  color: $--color-primary;
  font-size: 24px;
}
.upload-mask {
  & > div {
    display: none;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    & > div {
      display: block;
    }
  }
}
.upload-text .text,
.upload-mask .text {
  color: $--color-primary;
  font-size: 12px;
  height: 32px;
  line-height: 32px;
}
.text-container {
  text-align: left;
}
.size-text {
  color: rgba(156, 161, 174, 1);
  font-size: 14px;
  height: 24px;
  line-height: 24px;
  white-space: nowrap;
}
.error-text {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
}
.loading {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  & > i {
    font-size: 32px;
    position: absolute;
    top: 40%;
    left: 40%;
  }
}
</style>
