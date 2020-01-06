<template>
  <div class="new-travel">
    <el-breadcrumb class="bread-crumb">
      <el-breadcrumb-item :to="{ path: '/content/travel' }">
        出行百科
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <c-form
      :formData="formData"
      :items="formItems"
      labelWidth="160px"
      class="form"
      ref="form"
    >
      <template v-slot:bannerUpload>
        <c-upload
          width="590px"
          height="290px"
          class="upload"
          @uploadFile="upload"
          :imageUrl="formData.bigimgUrl"
          :uploading="uploading"
        />
      </template>
    </c-form>
    <div class="item response-item">
      <p class="name">正文：</p>
      <div class="value">
        <template>
          <tinymce
            v-model="formData.travelContent"
            :width="580"
            :height="700"
            class="tinymce"
          />
        </template>
      </div>
    </div>
    <div class="goTop">
      <el-checkbox v-model="checked">置顶</el-checkbox>
      <span>（置顶后，文章会显示在非置顶文章前面）</span>
    </div>
    <el-button
      type="primary"
      class="submit"
      @click="submit"
      :disabled="disabled"
    >
      提交
    </el-button>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce';
import { sourceOptions } from '@/config/options';
// eslint-disable-next-line
import { addTravelidea, editTravelidea, getDetailTravelidea } from '@/api/content';
import { upload } from '@/api/uploadFile';

export default {
  components: { Tinymce },
  data: () => ({
    disabled: false,
    uploading: false,
    formItems: [
      {
        label: '标题：',
        prop: 'travelTitle',
        pattern: 'input',
        props: {
          placeholder: '请输入标题'
        },
        rules: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ]
      },
      {
        label: '来源：',
        prop: 'sourceType',
        pattern: 'radio',
        props: {
          list: sourceOptions
        },
        rules: [
          { required: true, trigger: 'change' }
        ]
      },
      {
        label: '类型：',
        prop: 'travelType',
        pattern: 'select',
        props: {
          list: [
            {
              value: '1',
              label: '出行百科'
            }
          ]
        },
        rules: [
          { required: true, trigger: 'change' }
        ]
      },
      {
        label: '简图：',
        prop: 'bigimgUrl',
        pattern: 'slot',
        slotName: 'bannerUpload',
        // rules: [
        //   { required: true, message: '请上传简图', trigger: 'change' }
        // ]
      },
      {
        label: '概要：',
        prop: 'travelRemark',
        pattern: 'input',
        props: {
          type: 'textarea'
        },
        rules: [
          { required: true, message: '请输入概要', trigger: 'change' }
        ]
      }
    ],
    title: '新增百科',
    checked: false,
    formData: {
      source: '',
      travelContent: '',
      travelType: '1',
      travelTitle: '',
      sourceType: '1',
      bigimgUrl: '',
      travelRemark: '',
      isTop: '0',
    },
    hasJumpArr: {
      label: '',
      prop: 'source',
      pattern: 'input',
      props: {
        placeholder: '请输入来源'
      },
      rules: [
        { required: true, message: '请输入来源', trigger: 'blur' }
      ]
    },
  }),
  watch: {
    checked(val) {
      if (val === true) {
        this.formData.isTop = '1';
      } else {
        this.formData.isTop = '0';
      }
    },
    /* eslint-disable */
    'formData.sourceType': function (val) {
      if (val === '0') {
        this.formItems.splice(2, 0, this.hasJumpArr);
      } else {
        this.formItems.splice(2, 1);
      }
    }
  },
  created () {
    if (this.$route.query.id) {
      this.title = '编辑百科';
      const obj = { id: this.$route.query.id };
      getDetailTravelidea(obj).then((res) => {
        this.formData = res.data;
        if (this.formData.isTop === '1') {
          this.checked = true
        } else {
          this.checked = false
        }
      });
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate().then(() => {
        this.disabled = true;
        if (this.$route.query.id) {
          this.editForm()
        } else {
          this.submitForm()
        }
      }).catch(() => { });
    },
    submitForm () {
      const obj = {
        ...this.formData,
        id: this.$route.query.id
      };
      addTravelidea(obj).then(() => {
        this.disabled = false;
        this.$message.success('新增成功');
        this.$router.push('/content/travel');
      }).catch(() => {
        this.disabled = false;
      });
    },
    editForm () {
      const obj = {
        ...this.formData,
        id: this.$route.query.id
      };
      editTravelidea(obj).then(() => {
        this.disabled = false;
        this.$message.success('修改成功');
        this.$router.push('/content/travel');
      }).catch(() => {
        this.disabled = false;
      });
    },
    async upload (file) {
      const form = new FormData();
      form.append('file', file);
      this.uploading = true;
      const { fileUrl } = await upload(form);
      this.uploading = false;
      this.$set(this.formData, 'bigimgUrl', fileUrl);
    }
  },
};
</script>
<style lang="scss">
.new-travel .el-form-item__content {
  width: 400px;
  .el-date-editor.el-input {
    width: 400px;
  }
}
</style>
<style lang="scss" scoped>
@import "variable";
.new-travel {
  padding: 0 $--main-padding;
}
.form {
  width: 800px;
  text-align: left;
  margin-top: $--gutter-content;
}
.upload {
  // width: 375px;
  // height: 180px;
  margin-bottom: 42px;
}
.upload-icon {
  width: 100px;
  height: 100px;
  margin-bottom: 42px;
}
.submit {
  width: 200px;
  margin-bottom: 40px;
}
.item {
  display: flex;
  height: 40px;
  line-height: 40px;
  margin: 0 auto 30px;
}
.name {
  width: 120px;
}
.response-item {
  height: auto;
}
.response-item .name {
  margin-top: 22px;
}
.text-area {
  width: 1000px;
  margin-top: $--main-margin;
}
.tinymce {
  margin-top: $--main-margin;
}
.goTop {
  margin-bottom: 30px;
  span {
    color: $--color-danger;
  }
}
</style>
