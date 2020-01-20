<template>
  <!-- Sidebar  -->
  <nav id="sidebar" :class="{ active: !sidebar }">
    <div class="sidebar-header">
      <h3>Bootstrap Sidebar</h3>
      <strong>BS</strong>
    </div>

    <ul class="list-unstyled components">
      <li class="active">
        <a
          href="#homeSubmenu"
          data-toggle="collapse"
          aria-expanded="false"
          class="dropdown-toggle"
        >
          <i class="fas fa-home"></i>
          Home
        </a>
        <ul class="collapse list-unstyled" id="homeSubmenu">
          <li>
            <a href="#">Home 1</a>
          </li>
          <li>
            <a href="#">Home 2</a>
          </li>
          <li>
            <a href="#">Home 3</a>
          </li>
        </ul>
      </li>
      <li>
        <a href="#">
          <i class="fas fa-briefcase"></i>
          About
        </a>
        <a
          href="#pageSubmenu"
          data-toggle="collapse"
          aria-expanded="false"
          class="dropdown-toggle"
        >
          <i class="fas fa-copy"></i>
          Pages
        </a>
        <ul class="collapse list-unstyled" id="pageSubmenu">
          <li>
            <a href="#">Page 1</a>
          </li>
          <li>
            <a href="#">Page 2</a>
          </li>
          <li>
            <a href="#">Page 3</a>
          </li>
        </ul>
      </li>
      <li>
        <a href="#">
          <i class="fas fa-image"></i>
          Portfolio
        </a>
      </li>
      <li>
        <a href="#">
          <i class="fas fa-question"></i>
          FAQ
        </a>
      </li>
      <li>
        <a href="#">
          <i class="fas fa-paper-plane"></i>
          Contact
        </a>
      </li>
    </ul>

    <ul class="list-unstyled CTAs">
      <li>
        <a
          href="https://bootstrapious.com/tutorial/files/sidebar.zip"
          class="download"
          >Download source</a
        >
      </li>
      <li>
        <a href="https://bootstrapious.com/p/bootstrap-sidebar" class="article"
          >Back to article</a
        >
      </li>
    </ul>
  </nav>

  <!-- <div class="sidebar" :class="{ expanded: sidebar }">
    <div class="sidebar-sticky">
      <b-link :to="{ name: 'home' }">
        <b-img
          v-if="sidebar"
          src="../../assets/logo-full.png"
          fluid
          alt="logo"
        ></b-img>
        <b-img v-else src="../../assets/logo.png" fluid alt="logo"></b-img>
      </b-link>
      <br />

      <div v-for="(section, section_index) in menu" :key="section.title">
        <ul class="nav flex-column" v-if="sidebar">
          <li class="nav-item">
            <b-dropdown-header class="sidebar-heading">
              <span style="font-size: 100%" v-if="section.icon">
                  <i class="fas" :class="[section.icon]"></i>
              </span>
              <span v-if="sidebar">
                  {{ section.title }}
              </span>
            </b-dropdown-header>
          </li>
          <li class="nav-item" v-for="link in section.links" :key="link.title">
            <b-link class="nav-link" :to="{ name: link.name }">
              {{ link.title }}
            </b-link>
          </li>
        </ul>

        <ul class="nav flex-column" v-if="!sidebar">
          <li class="nav-item">
            <b-dropdown-header class="sidebar-heading">
              <i class="fas fa-2x" :class="[section.icon]"></i>
            </b-dropdown-header>
          </li>
        </ul>

        <hr v-if="section_index < menu.length - 1" />
      </div>

      <div class="container-fluid m-0 p-0">
          <div class="row m-0 p-0" v-for="(section, section_index) in menu" :key="section.title">
              <div class="text-center" :class="{'col': sidebar, 'col mx-0 py-1 border-top p-0': !sidebar}">
                  <i class="fas fa-lg" :class="[section.icon]"></i>
              </div>
              <div class="col" v-if="sidebar">
                  {{ section.title }}
              </div>
          </div>
      </div>

    </div>
  </div> -->
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
          icon: "fa-th-large",
          collapsible: true,
          links: [{ title: "Main", name: "dashboard", params: {}, query: {} }]
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
          title: "User",
          icon: "fa-user",
          collapsible: true,
          links: [{ title: "Profile", name: "user", params: {}, query: {} }]
        },
        {
          title: "Manage",
          icon: "fa-users",
          collapsible: false,
          links: [{ title: "Users", name: "users", params: {}, query: {} }]
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
  background: #7386d5;
  color: #fff;
  transition: all 0.3s;
}

#sidebar.active {
  min-width: 80px;
  max-width: 80px;
  text-align: center;
}

#sidebar.active .sidebar-header h3,
#sidebar.active .CTAs {
  display: none;
}

#sidebar.active .sidebar-header strong {
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

#sidebar .sidebar-header {
  padding: 20px;
  background: #6d7fcc;
}

#sidebar .sidebar-header strong {
  display: none;
  font-size: 1.8em;
}

#sidebar ul.components {
  padding: 20px 0;
  border-bottom: 1px solid #47748b;
}

#sidebar ul li a {
  padding: 10px;
  font-size: 1.1em;
  display: block;
}

#sidebar ul li a:hover {
  color: #7386d5;
  background: #fff;
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
