<template>
  <div>
    <div class="search-box">
      <slot name="search" />
    </div>
    <el-table v-loading="loading" :data="list">
      <el-table-column
        v-for="(item, idx) in columns"
        :key="idx"
        align="center"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :formatter="item.formatter"
        :filters="item.filterData"
        :filter-method="item.filterHandler"
        :className="item.prop"
      >
        <template slot-scope="slotScope">
          <slot v-if="item.slot" :name="item.slot" v-bind="slotScope"></slot>
          <span v-if="!item.slot">
            <!-- eslint-disable-next-line -->
            {{ item.formatter ? (item.formatter(slotScope.row) || '--') : (slotScope.row[item.prop] || '--') }}
          </span>
        </template>
      </el-table-column>
      <el-table-column v-if="options.length" label="操作">
        <template slot-scope="{row}">
      <!--  注释：i.showConfig.rowValues.includes(row[i.showConfig.rowName])" -->
      <!--  注释： 这行代码是用来判断不同状态下显示不同按钮 -->
          <el-button
            v-for="(i, idx) in options"
            :key="idx"
            type="text"
            v-show="i.showConfig.rowValues.includes(row[i.showConfig.rowName])"
            @click="i.onClick(row)"
          >
            {{ i.label }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="currentPage"
      :limit.sync="pageSize"
      @pagination="loadList"
    />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination';

export default {
  components: { Pagination },
  props: {
    // ['columns', 'refresh', 'fetch'],
    columns: { required: true, type: Array },
    options: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    fetch: Function
  },
  data: () => ({
    loading: false,
    total: 0,
    currentPage: Number(sessionStorage.getItem('page')) || 1,
    pageSize: 10,
    list: []
  }),
  watch: {
    data(newVal) {
      if (newVal && newVal.length > 0) {
        this.list = newVal;
      }
    }
  },
  created() {
    const { list = [] } = this;
    if (list.length === 0) this.loadList();
    this.$nextTick(() => {
    });
  },
  methods: {
    async loadList() {
      try {
        const { currentPage, pageSize } = this;
        this.loading = true;
        const { list, total } = await this.fetch({ currentPage, pageSize });
        this.list = list;
        this.total = total;
        // 解决删除最后一页仅一条数据时，页面显示为空的情况。应该跳转到前一页
        if (list.length === 0) {
          if (currentPage === 1) {
            this.loading = false;
            return;
          }
          this.currentPage += -1;
          if (this.currentPage <= 1) this.currentPage = 1;
          this.loadList();
        }
      } catch (e) {
        this.$log.info(e);
      }
      this.loading = false;
    },
    refresh() {
      this.loadList();
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'variable';
.search-box {
  padding: 0 $--main-padding;
  text-align: left;
}
</style>
