<template>
  <div class="user">
    <c-title text="用户管理" />
    <c-table
      ref="table"
      class="table"
      :columns="columns"
      :fetch="initData"
      :options="options"
    >
      <template v-slot:search>
        <div class="search-content">
          <c-form
            :formData="formData"
            :items="formItems"
            :formProps="formProps"
            labelWidth="85px"
            ref="form"
            class="form"
          />
          <el-button
            type="primary"
            class="search-btn"
            @click="searchList"
          >
            搜索
          </el-button>
          <el-button
            type="primary"
            class="btn"
            @click="resetList"
          >
            重置
          </el-button>
        </div>
      </template>
      <template v-slot:status="slotProps">
        <div>
          <!-- eslint-disable-next-line -->
          <span :class="`userStatus ${slotProps.row.lockStatus === 0 ? 'green' : 'red'}`">
          </span>
          <span>{{ slotProps.row.lockStatus === 0 ? '正常' : '已冻结' }}</span>
        </div>
      </template>
    </c-table>
  </div>
</template>

<script>
import { getUserList, freezeUser } from '@/api/user';
import { userSourceOptins } from '@/config/options';
import { parseTime } from '@/utils/formatTime';

export default {
  data() {
    return {
      columns: [
        { prop: 'userName', label: '姓名' },
        { prop: 'nickName', label: '昵称' },
        { prop: 'phoneMobile', label: '手机号码' },
        { prop: 'createDate', label: '注册时间' },
        { prop: 'userSource', label: '用户来源' },
        { prop: 'lockStatus', label: '状态', slot: 'status' }
      ],
      formData: {
        keyword: '',
        sourceApp: '0',
        datePicker: [],
      },
      formProps: {
        inline: true
      },
      formItems: [
        {
          label: '关键词：',
          prop: 'keyword',
          pattern: 'input',
          props: {
            placeholder: '姓名、昵称或手机号'
          }
        },
        {
          label: '用户来源：',
          prop: 'sourceApp',
          pattern: 'select',
          props: {
            placeholder: '请选择用户来源',
            list: userSourceOptins
          }
        },
        {
          label: '注册时间：',
          prop: 'datePicker',
          pattern: 'date',
          props: {
            type: 'datetimerange',
            startPlaceholder: '开始时间',
            endPlaceholder: '结束日期'
          }
        }
      ],
    };
  },
  created() {
    this.options = [
      {
        label: '冻结',
        showConfig: { rowName: 'lockStatus', rowValues: [0] },
        onClick: this.freezeStatus
      },
      {
        label: '解冻',
        showConfig: { rowName: 'lockStatus', rowValues: [1] },
        onClick: this.changeStatus
      }
    ];
  },
  methods: {
    async initData(params) {
      const obj = { ...this.formData, ...params };
      const { data } = await getUserList(obj);
      return { list: data.records, total: data.total };
    },
    resetList() {
      this.formData = {
        keyword: '',
        sourceApp: '',
        datePicker: []
      };
      this.$refs.table.loadList();
    },
    freezeStatus(row) {
      const obj = {
        id: row.registrationId,
        type: '2'
      };
      this.confirmBox('确定要冻结吗?', () => {
        freezeUser(obj).then(() => {
          this.$message.success('冻结成功!');
          this.$refs.table.loadList();
        }).catch(() => { });
      });
    },
    changeStatus(row) {
      const obj = {
        id: row.registrationId,
        type: '1'
      };
      this.confirmBox('确定要解冻吗?', () => {
        freezeUser(obj).then(() => {
          this.$message.success('解冻成功!');
          this.$refs.table.loadList();
        }).catch(() => { });
      });
    },

    // 搜索
    searchList() {
      Object.assign(this.formData, {
        ...this.formData,
        keyword: this.formData.keyword,
        sourceApp: this.formData.sourceApp,
        registerStart:
          this.formData.datePicker[0] && parseTime(this.formData.datePicker[0]),
        registerEnd:
          this.formData.datePicker[1] && parseTime(this.formData.datePicker[1])
      });
      this.$refs.table.loadList();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "variable";
.user {
  padding: 0 $--main-padding;
}
.table {
  margin-top: 32px;
}
.search-content {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
.userStatus {
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  margin-right: $--main-margin;
}
.green {
  background-color: $--color-success;
}
.btn,
.search-btn {
  height: 40px;
  margin-top: -8px;
}
.red {
  background-color: $--color-danger;
}
</style>
