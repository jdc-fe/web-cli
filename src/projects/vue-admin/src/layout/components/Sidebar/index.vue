<template>
  <div
    :class="{'has-logo':showLogo}"
    @mouseenter="openMenu"
    @mouseleave="closeMenu"
  >
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper" class="scrollbar">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.sideBarBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.subMenuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="(route, idx) in routes"
          :key="idx"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
      <hamburger
        v-if="siderbarClickOpen"
        id="hamburger-container"
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '@/store';
import Logo from './Logo';
import SidebarItem from './SidebarItem';
import Hamburger from '@/components/Hamburger';
import { siderbarClickOpen } from '@/config/element.config';
import variables from '@/theme/variable.scss';

export default {
  components: { SidebarItem, Logo, Hamburger },
  data: () => ({
    siderbarClickOpen
  }),
  computed: {
    ...mapGetters([
      'sidebar',
      'routes'
    ]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  methods: {
    openMenu() {
      if (this.siderbarClickOpen) return;
      store.dispatch('app/openSideBar');
    },
    closeMenu() {
      if (this.siderbarClickOpen) return;
      store.dispatch('app/closeSideBar', { withoutAnimation: false });
    },
    toggleSideBar() {
      if (!this.siderbarClickOpen) return;
      this.$store.dispatch('app/toggleSideBar');
    }
  }
};
</script>

<style lang="scss" scoped>
.scrollbar {
  position: relative;
}
.hamburger-container {
  padding: 0;
  line-height: 30px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: background .3s;
  -webkit-tap-highlight-color:transparent;

  &:hover {
    background: rgba(0, 0, 0, .025)
  }
}
</style>
