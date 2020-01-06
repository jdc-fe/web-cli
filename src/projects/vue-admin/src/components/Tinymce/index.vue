<template>
  <div
    :class="{fullscreen:fullscreen}"
    class="tinymce-container"
    :style="{width:containerWidth}"
  >
    <textarea :id="tinymceId" class="tinymce-textarea"/>
    <!-- <div class="editor-custom-btn-container">
      <editorImage
        :url="url"
        color="#1890ff"
        class="editor-upload-btn"
        @successCBK="imageSuccessCBK"
      />
    </div> -->
  </div>
</template>

<script>
/**
 * docs:
 * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
 */
// import editorImage from './components/EditorImage'
import plugins from './plugins/index';
import toolbar from './toolbar';
import request from '@/api/request';

const { tinymce } = window;
export default {
  name: 'Tinymce',
  // components: { editorImage },
  props: {
    id: {
      type: String,
      default() {
        return `vue-tinymce-${+new Date()}${(Math.random() * 1000).toFixed(0)}`;
      }
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    height: {
      type: [Number, String],
      required: false,
      default: 360
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    },
    url: {
      type: String,
      default: 'https://httpbin.org/post'
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        en: 'en',
        zh: 'zh_CN',
        es: 'es_MX',
        ja: 'ja'
      }
    };
  },
  computed: {
    language() {
      return this.languageTypeList.zh;
    },
    containerWidth() {
      const { width } = this;
      if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
        return `${width}px`;
      }
      return width;
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(
          () => window.tinymce.get(this.tinymceId).setContent(val || '')
        );
      }
      if (this.hasChange && this.hasInit) this.$emit('change');
    },
    language() {
      this.destroyTinymce();
      this.$nextTick(() => this.initTinymce());
    }
  },
  mounted() {
    this.initTinymce();
  },
  activated() {
    this.initTinymce();
  },
  deactivated() {
    this.destroyTinymce();
  },
  destroyed() {
    this.destroyTinymce();
  },
  methods: {
    showLoading(modal) {
      Object.assign(modal.style, {
        'z-index': 65537,
        opacity: 0.8,
        background: 'rgba(255,255,255,.9)',
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center'
      });
      modal.innerHTML = `<div class="el-loading-mask">
                          <div class="el-loading-spinner">
                            <svg viewBox="25 25 50 50" class="circular">
                              <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
                            </svg>
                            <p class="el-loading-text">文件上传中</p>
                          </div>
                        </div>`;
    },
    hideLoading(modal) {
      modal.style['z-index'] = 65535;
    },
    fetchAppLinkLists() {
      return [
        {
          title: '文章',
          value: 'article'
        },
        {
          title: '场景页',
          value: 'scenePage'
        },
        {
          title: '应用',
          value: 'application'
        }
        // {
        //   title: '链接',
        //   value: 'url'
        // }
      ];
    },
    initTinymce() {
      // eslint-disable-next-line no-underscore-dangle
      const _this = this;
      tinymce.init({
        language: this.language,
        language_url: this.language === 'en' ? '' : `https://cdn.jsdelivr.net/npm/tinymce-lang/langs/${this.language}.js`,
        selector: `#${this.tinymceId}`,
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins,
        images_upload_url: false,
        file_picker_types: 'media,image',
        end_container_on_empty_block: true,
        link_context_toolbar: false,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        // eslint-disable-next-line
        fontsize_formats: '8px 10px 12px 14px 16px 18px 24px 36px 40px 44px 48px 52px 56px 60px 64px 68px 72px 76px 80px 84px 88px 92px 96px',
        lineheight_formats: '8px 10px 12px 14px 16px 18px 24px 36px 40px',
        // eslint-disable-next-line
        font_formats: "微软雅黑='微软雅黑';宋体='宋体';黑体='黑体';仿宋='仿宋';楷体='楷体';隶书='隶书';幼圆='幼圆';Arial='Arial';",
        // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        nonbreaking_force_tab: true,
        applink_list: (success) => {
          const links = _this.fetchAppLinkLists();
          success(links);
        },
        init_instance_callback: (editor) => {
          if (_this.value) {
            editor.setContent(_this.value);
          }
          _this.hasInit = true;
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true;
            this.$emit('input', editor.getContent());
          });
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state;
          });
        },
        file_picker_callback(cb, value, meta) {
          const types = { media: 'video/*', image: 'image/*' };
          const modal = document.querySelector('#mce-modal-block');
          // 创建一个隐藏的type=file的文件选择input
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', types[meta.filetype]);
          // eslint-disable-next-line func-names
          input.onchange = function () {
            const file = this.files[0];
            const formData = new FormData();
            _this.showLoading(modal);
            // 文件对象
            formData.set('file', file);
            try {
              request({
                url: '/backend/banner/uploadFile',
                method: 'post',
                data: formData
              }).then(({ data: { fileUrl } }) => {
                cb(fileUrl, {
                  title: file.name,
                  style: 'object-fit: cover;',
                  width: '100%',
                  height: 'auto'
                });
                _this.hideLoading(modal);
              });
            } catch (error) {
              _this.hideLoading(modal);
            }
          };
          // 触发点击
          input.click();
        }
      });
    },
    destroyTinymce() {
      const tinym = window.tinymce.get(this.tinymceId);
      if (this.fullscreen) {
        tinym.execCommand('mceFullScreen');
      }
      if (tinym) {
        tinym.destroy();
      }
    },
    setContent(value) {
      tinymce.get(this.tinymceId).setContent(value);
    },
    getContent() {
      tinymce.get(this.tinymceId).getContent();
    },
    imageSuccessCBK(arr) {
      // eslint-disable-next-line no-underscore-dangle
      const _this = this;
      arr.forEach((v) => {
        let content = '';
        if (v.type === 'video') {
          content = `<video style="object-fit: cover;" controls>
                      <source src="${v.url}" type="video/mp4">
                      您的浏览器不支持 video 标签。
                  </video>`;
        } else {
          content = `<img class="wscnph" src="${v.url}" >`;
        }
        tinymce.get(_this.tinymceId).insertContent(content);
      });
    }
  }
};
</script>

<style scoped lang='scss'>
.tinymce-container {
  position: relative;
  line-height: normal;
  /deep/ .mce-i-applink{
    background: white url(./images/applink.png) 16px 16px;
    background-size:cover;
  }
}
.tinymce-container /deep/ .mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
#mce-modal-block {
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-loading-spinner {
    top: 50%;
    margin-top: -21px;
    width: 100%;
    text-align: center;
    position: absolute;
}
/deep/.mce-container,
/deep/.mce-container *,
/deep/.mce-widget,
/deep/.mce-widget *,
/deep/.mce-reset {
  white-space: normal!important;
}
</style>
