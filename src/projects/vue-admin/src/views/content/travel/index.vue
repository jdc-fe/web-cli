<template>
  <div class="travel">
    <c-title text="出行百科" />
    <c-table
      class="table"
      :options="options"
      :columns="columns"
      :fetch="initData"
      ref="table"
    >
      <template v-slot:search>
        <div class="search-content">
          <c-form
            :formData="search"
            :items="formItems"
            :formProps="formProps"
            labelWidth=""
            ref="form"
          />
          <el-button
            type="primary"
            class="search-btn"
            @click="searchList"
          >搜索</el-button>
          <el-button
            type="primary"
            class="btn"
            @click="resetList"
          >重置</el-button>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="addTravel"
            class="btn new"
          >
            新增百科
          </el-button>
        </div>
      </template>
    </c-table>
  </div>
</template>

<script>
import { getTravelideaList, delteTravelidea } from '@/api/content';

export default {
  data() {
    return {
      columns: [
        { prop: 'travelTitle', label: '标题' },
        { prop: 'travelType', label: '类型', formatter: this.formatterHasType },
        { prop: 'publishDate', label: '发布时间' },
        { prop: 'sourceType', label: '来源', formatter: this.formatterSource },
        { prop: 'isTop', label: '是否置顶', formatter: this.formatterWarn }
      ],
      search: {
        keyword: '',
        sourceType: '',
        tripEncyclopedia: '0'
      },
      formProps: {
        inline: true
      },
      formItems: [
        {
          label: '标题关键字：',
          prop: 'keyword',
          pattern: 'input',
          props: {
            placeholder: '请输入标题'
          }
        },
        {
          label: '来源：',
          prop: 'sourceType',
          pattern: 'select',
          props: {
            list: [
              { label: '原创', value: '1' },
              { label: '非原创', value: '0' }
            ],
          }
        },
        {
          label: '类型：',
          prop: 'tripEncyclopedia',
          pattern: 'select',
          props: {
            list: [
              {
                value: '0',
                label: '出行百科'
              }
            ]
          }
        }
      ],
    };
  },
  created() {
    this.options = [
      {
        label: '编辑',
        showConfig: { rowName: 'isTop', rowValues: ['0', '1'] },
        onClick: this.edit
      },
      {
        label: '删除',
        showConfig: { rowName: 'isTop', rowValues: ['0', '1'] },
        onClick: this.delete
      }
    ];
  },
  methods: {
    async initData(params) {
      const obj = { ...this.search, ...params };
      const { data } = await getTravelideaList(obj);
      return { list: data.records, total: data.total };
    },
    formatterSource(data) {
      const { sourceType } = data;
      return ['非原创', '原创'][sourceType];
    },
    formatterHasType(data) {
      const { travelType } = data;
      return ['出行百科'][travelType - 1];
    },
    formatterWarn(data) {
      const { isTop } = data;
      return ['否', '是'][isTop];
    },
    searchList() {
      this.$refs.table.loadList();
    },
    resetList() {
      this.search = {
        keyword: '',
        source: '',
        tripEncyclopedia: '0'
      };
      this.$refs.table.loadList();
    },
    edit(row) {
      this.$router.push(
        {
          path: 'newTravel',
          query: {
            id: row.id
          }
        }
      );
    },
    delete(row) {
      this.confirmBox(`确定要删除${row.travelTitle}吗?`, () => {
        const obj = {
          id: row.id,
          type: '1'
        };
        delteTravelidea(obj).then(() => {
          this.$message.success('删除成功!');
          this.$refs.table.loadList();
        });
      });
    },
    addTravel() {
      this.$router.push('newTravel');
    }
  }
};
</script>
<style lang="scss" scoped>
@import "variable";
.travel {
  padding: 0 $--main-padding;
}
.table {
  margin-top: 32px;
}
.form {
  margin: 0;
}
.search-content {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
.btn,
.search-btn {
  height: 40px;
  margin-top: -8px;
}
.new {
  margin-left: auto;
}
</style>
