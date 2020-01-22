<template>
  <!-- Sidebar  -->
  <nav id="sidebar" :class="{ active: !sidebar }">
    <!-- <div class="sidebar-header">
      <h3>CRC VCC</h3>
      <strong>CV</strong>
    </div> -->

    <div
      class="sidebar-header"
      :class="{ 'tw-p-2': sidebar, 'tw-p-1': !sidebar }"
    >
      <b-link :to="{ name: 'home' }">
        <b-img
          v-if="sidebar"
          class="full-logo"
          src="../../assets/logo-full.png"
          fluid
          alt="logo"
        ></b-img>
        <b-img
          v-if="!sidebar"
          class="mini-logo"
          src="../../assets/logo.png"
          fluid
          alt="logo"
        ></b-img>
      </b-link>
    </div>

    <ul class="list-unstyled components">
      <li
        v-for="(section, section_index) in menu"
        :key="section.title"
        active-class="active"
      >
        <b-link v-if="section.link" :to="section.link">
          <i class="fas" :class="[section.icon]"></i>
          <span class="icon-text" v-if="sidebar">
            {{ section.title }}
          </span>
        </b-link>
        <b-link
          v-if="sidebar && section.links.length"
          v-b-toggle="'collapse-' + section_index"
          data-toggle="collapse"
          aria-expanded="false"
          class="dropdown-toggle"
        >
          <i class="fas" :class="[section.icon]"></i>
          <span class="icon-text" v-if="sidebar">
            {{ section.title }}
          </span>
        </b-link>
        <b-collapse
          v-if="sidebar && section.links.length"
          :id="'collapse-' + section_index"
        >
          <ul class="list-unstyled">
            <li v-for="link in section.links" :key="link.name">
              <b-link :to="link">
                {{ link.title }}
              </b-link>
            </li>
          </ul>
        </b-collapse>

        <b-dropdown
          v-if="!sidebar && section.links.length"
          dropright
          offset="15"
          size="lg"
          variant="link"
          toggle-class="text-decoration-none"
          no-caret
        >
          <template v-slot:button-content>
            <i class="fas" :class="[section.icon]"></i>
            <span class="tw-inline-block tw-ml-1">
                <i class="fas fa-caret-down fa-sm"></i>
            </span>
          </template>
          <b-dropdown-item
            v-for="link in section.links"
            :key="link.name"
            :to="link"
            >{{ link.title }}</b-dropdown-item
          >
        </b-dropdown>
      </li>
      <li>
        <b-link @click="logout()">
          <i class="fas fa-times"></i>
          <span class="icon-text" v-if="sidebar">
            Sign Out
          </span>
        </b-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      drawer: true,
      menu: [
        {
          title: "Dashboard",
          icon: "fa-home",
          collapsible: true,
          link: { name: "dashboard", params: {}, query: {} },
          links: []
        },
        {
          title: "Examples",
          icon: "fa-th-large",
          collapsible: true,
          links: [
            { title: "Components", name: "components", params: {}, query: {} },
            { title: "Map", name: "map", params: {}, query: {} },
            { title: "Charts", name: "charts", params: {}, query: {} }
          ]
        },
        {
          title: "Profile",
          icon: "fa-user",
          collapsible: true,
          link: { name: "user", params: {}, query: {} },
          links: []
        },
        {
          title: "Users",
          icon: "fa-users",
          collapsible: false,
          link: { name: "users", params: {}, query: {} },
          links: []
        }
      ]
    };
  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapState(["sidebar"])
  },
  methods: {
    ...mapActions(["setBaseComponent", "clearAuthorizationToken"]),
    ...mapActions("user", ["setUser"]),
    goTo(route) {
      this.$router.push(route);
    },
    toggle: function() {
      this.drawer = !this.drawer;
    },
    logout: function() {
      this.clearAuthorizationToken();
      this.setUser({});

      this.$notify({
        text: "You have been logged out",
        duration: 10000,
        type: "warn"
      });

      this.$router.push({
        name: "home"
      });
    }
  }
};
</script>

<style>
/* ---------------------------------------------------
    SIDEBAR STYLE
----------------------------------------------------- */

.wrapper {
  display: flex;
  align-items: stretch;
}

#sidebar {
  min-width: 250px;
  max-width: 250px;
  min-height: 100vh;
  border-right: 1px solid #ccc;
  background: white;
  /* color: #fff; */
  transition: all 0.3s;
}

#sidebar.active {
  min-width: 80px;
  max-width: 80px;
  text-align: center;
}

#sidebar.active .sidebar-header h3,
/* #sidebar.active .sidebar-header .mini-logo, */
#sidebar.active .CTAs {
  display: none;
}

#sidebar.active .sidebar-header strong
/* #sidebar.active .sidebar-header .full-logo */
 {
  display: block;
}

#sidebar ul li a {
  text-align: left;
}

#sidebar.active ul li a {
  padding: 20px 10px;
  text-align: center;
  font-size: 0.85em;
}

#sidebar.active ul li a i {
  margin-right: 0;
  display: block;
  font-size: 1.8em;
  margin-bottom: 5px;
}

#sidebar.active ul ul a {
  padding: 10px !important;
}

#sidebar.active .dropdown-toggle::after {
  top: auto;
  bottom: 10px;
  right: 50%;
  -webkit-transform: translateX(50%);
  -ms-transform: translateX(50%);
  transform: translateX(50%);
}

/* #sidebar .sidebar-header {
  padding: 20px;
} */

#sidebar .sidebar-header strong {
  display: none;
  font-size: 1.8em;
}

#sidebar ul.components {
  padding: 20px 0;
}

a.disabled {
  pointer-events: none;
}

#sidebar ul li a {
  padding: 10px;
  font-size: 1.1em;
  display: block;
  background: white;
  color: gray;
  text-transform: uppercase;
}

#sidebar ul li a:hover {
  color: #ccc;
  background: white;
}

#sidebar ul li a i {
  margin-right: 10px;
}

#sidebar ul li.active > a,
a[aria-expanded="true"] {
  color: #fff;
  background: #6d7fcc;
}

a[data-toggle="collapse"] {
  position: relative;
}

.dropdown-toggle::after {
  display: block;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

ul ul a {
  font-size: 0.9em !important;
  padding-left: 30px !important;
  background: #6d7fcc;
}

ul.CTAs {
  padding: 20px;
}

ul.CTAs a {
  text-align: center;
  font-size: 0.9em !important;
  display: block;
  border-radius: 5px;
  margin-bottom: 5px;
}

a.download {
  background: #fff;
  color: #7386d5;
}

a.article,
a.article:hover {
  background: #6d7fcc !important;
  color: #fff !important;
}

/* ---------------------------------------------------
    CONTENT STYLE
----------------------------------------------------- */

#content {
  width: 100%;
  padding: 20px;
  min-height: 100vh;
  transition: all 0.3s;
}

/* ---------------------------------------------------
    MEDIAQUERIES
----------------------------------------------------- */

@media (max-width: 768px) {
  #sidebar {
    min-width: 80px;
    max-width: 80px;
    text-align: center;
    margin-left: -80px !important;
  }
  .dropdown-toggle::after {
    top: auto;
    bottom: 10px;
    right: 50%;
    -webkit-transform: translateX(50%);
    -ms-transform: translateX(50%);
    transform: translateX(50%);
  }
  #sidebar.active {
    margin-left: 0 !important;
  }
  #sidebar .sidebar-header h3,
  #sidebar.active .icon-text,
  #sidebar .CTAs {
    display: none;
  }
  #sidebar .sidebar-header strong {
    display: block;
  }
  #sidebar ul li a {
    padding: 20px 10px;
  }
  #sidebar ul li a span {
    font-size: 0.85em;
  }
  #sidebar ul li a i {
    margin-right: 0;
    display: block;
  }
  #sidebar ul ul a {
    padding: 10px !important;
  }
  #sidebar ul li a i {
    font-size: 1.3em;
  }
  #sidebar {
    margin-left: 0;
  }
  #sidebarCollapse span {
    display: none;
  }
}
</style>
