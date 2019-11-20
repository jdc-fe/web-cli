// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import VClork from '@/components/VClork.vue';
import track from '@/directives/track';
import { getObject, getArray } from '@/api/demo';

export default {
  name: 'home',
  data: () => ({
    object: {},
    list: [],
  }),
  directives: { track },
  components: {
    HelloWorld, VClork
  },
  async created() {
    this.object = await getObject();
    this.list = await getArray();
  },
};
