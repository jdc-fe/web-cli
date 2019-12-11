// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import VClork from '@/components/VClork.vue';
import track from '@/directives/track';
import { getObject, getArray } from '@/api/demo';

export default {
  name: 'home',
  data: () => ({
    object: {},
    pageList: {
      list: [],
      total: 0
    },
  }),
  directives: { track },
  components: {
    HelloWorld, VClork
  },
  methods: {
    async genMockData() {
      this.object = await getObject();
      this.pageList = await getArray();
    }
  },
  created() {
    this.genMockData();
  },
};
