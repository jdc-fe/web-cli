import store from '@/store';

export default {
  /* eslint-disable */
  inserted(el, binding, vnode) {
    const authority = store.getters && store.getters.authority;
    const functionCodes = authority.filter(item => item.type === 1).map(item => item.functionCode);
    const { value } = binding;
    if (value) {
      const hasPermission = functionCodes.includes(value.toString());
      if (!hasPermission) {
        // eslint-disable-next-line no-unused-expressions
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error('需要functionCode! 例如： v-permission="6"');
    }
  }
};
