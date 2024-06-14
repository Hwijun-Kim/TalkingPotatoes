<template>
  <!-- Header -->
  <header id="header_pj">
    <nav class="navbar">
      <!-- Talking Potatoes의 로고 -->
      <div class="navbar_logo">
        <img src="/images/potato.png" height="50px" width="40px" />
      </div>
      <!-- navbar menu 구성 -->
      <ul class="navbar_menu">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Home' }"
            >Home</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'TotalView' }"
            >Total View</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Summary' }"
            >Summary</router-link
          >
        </li>
      </ul>
      <!-- navbar icons -->
      <ul class="navbar_icons">
        <li>
          <router-link class="nav-link" :to="{ name: 'CreateItem' }"
            ><i
              class="fa-solid fa-circle-plus"
              id="createItem"
              style="font-size: 30px"
            ></i
          ></router-link>
        </li>
        <li>
          <router-link class="nav-link" :to="{ name: 'Profile' }"
            ><i
              class="fa-solid fa-user"
              id="profile"
              style="font-size: 30px"
            ></i
          ></router-link>
        </li>
        <li>
          <a @click="logout">
            <i class="fa-solid fa-right-from-bracket"
              id="logout"
              style="font-size: 30px"
            ></i>
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    logout() {
      // 로그아웃 시 localStorage에서 로그인 상태 제거
      localStorage.removeItem('isLoggedIn');
      // 로그인 페이지로 리디렉션
      this.$router.push({ name: 'Login' });
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');

.navbar {
  font-family: 'Jua', sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f0ecca;
  padding: 6px 40px;
  width: 100vw;
}

.navbar_logo {
  padding-right: 30px;
}

a {
  text-decoration: none;
  color: black;
}

.navbar_menu {
  display: flex;
  list-style: none;
  padding-left: 0;
  margin-right: auto;
}

.navbar_menu li {
  padding: 8px 50px;
  color: black;
  font-weight: bold;
  font-size: 20px;
}

.navbar_menu li a:hover {
  color: rgb(179, 137, 79);
}

.navbar_icons {
  list-style: none;
  color: black;
  display: flex;
}

.navbar_icons li {
  padding: 5px 30px;
  size: 20px;
}

.fa-solid fa-eye {
  float: right;
}

/* #header_pj {width:100%; height:var(--height-top); z-index:50;} */
</style>