<template>
  <nav>
    <div class="top" >
      <h1><router-link to="/">GTRIS</router-link></h1>
      <div class="select-wrapper">
        <select
          class="version"
          v-for="(versionItem, versionIndex) in versionItems"
          :key="`version-item-${versionIndex}`"
        >
          <option value="">{{ versionItem.name }}</option>
        </select>
      </div>
    </div>
    <div class="menu">
      <div class="menu-item">
        <router-link to="/"><i class="fal fa-book"></i>Guide</router-link>
      </div>
      <div class="menu-item">
        <router-link to="/"><i class="gi gi-history"></i>Timeline</router-link>
      </div>
      <div class="divider"></div>
      <div class="folder-name">Global</div>
      <div class="menu-item">
        <router-link to="/">Color System</router-link>
      </div>
      <div class="folder-name">Components(NEW)</div>
      <div
        class="menu-item"
        v-for="(menuItem, menuIndex) in menuItems"
        :key="`menu-item-${menuIndex}`"
      >
        <router-link
          :to="`/${versionItems[currentVersion].name}/component/${menuItem.title}`"
          >{{ menuItem.title }}</router-link
        >
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "sidenav",
  data() {
    return {
      menuItems: [],
      versionItems: [],
      currentVersion: 0
    };
  },
  created() {
    this.$_getMenu();
  },
  methods: {
    async $_getMenu() {
      await this.$store.dispatch("Map/SET_MAP");
      await this.$store.dispatch("Map/SET_TAG");
      this.menuItems = await this.$store.getters["Map/getComponentsMenu"];
      this.versionItems = this.$store.getters["Map/getVersion"];
      if (this.$route.params.version) {
        this.currentVersion = (await this.$route.params.version)
          ? this.versionItems.indexOf(this.$route.params.version)
          : 0;
      }
      await this.$eventHub.$emit("MENU_API_LOADED");
    }
  }
};
</script>

<style lang="scss" scoped>
$leftSpace: 40px;
$rightSpace: 30px;
nav {
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px $rightSpace 20px $leftSpace;
    h1 > a {
      font-size: 30px;
      font-weight: normal;
    }

    .select-wrapper {
      position: relative;
      vertical-align: middle;
      &:after {
        font-family: "gi-icons";
        content: "\e954";
        font-size: 0.5em;
        height: 24px;
        line-height: 24px;
        position: absolute;
        top: 0px;
        right: 10px;
        color: #909090;
        pointer-events: none;
      }
      select {
        background: #f6f6f6;
        border: 0;
        border-radius: 12px;
        min-width: 70px;
        height: 24px;
        font-size: 13px;
        padding-left: 9px;
        padding-right: 24px;
        outline: 0;
        color: $body-text-color;
        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-appearance: none;
        -o-appearance: none;
        appearance: none;
      }
      select::-ms-expand {
        display: none;
      }
    }
  }
  .divider {
    margin: 20px $rightSpace;
    height: 1px;
    background: #e6e6e6;
  }
  .folder-name {
    padding: 0 $rightSpace 0 $leftSpace;
    margin: 30px 0 10px;
    font-size: 12px;
    color: #909090;
  }
  .menu-item {
    > a {
      @include truncateFlexChild();
      display: flex;
      align-items: center;
      padding: 0 $rightSpace 0 $leftSpace;
      height: 36px;
      &:hover,
      &:focus {
        background-color: #eff4fc;
        color: #2985db;
      }
      > i {
        margin-right: 7px;
      }
    }
  }
}
</style>
