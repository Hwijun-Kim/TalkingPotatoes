<template>
  <div class="containerlogin">
    <div class="logo-container">
      <img class="logo" :src="logo" alt="Logo" />
    </div>
    <div class="login-form">
      <div class="input-group">
        <label for="id" style="font-size: 25px; font-weight: bold">ID</label>
        <input
          id="id"
          type="text"
          v-model="id"
          style="margin-left: 74px; background-color: #fafaf5"
        />
      </div>
      <br />
      <div class="input-group">
        <label for="password" style="font-size: 25px; font-weight: bold"
          >PW</label
        >
        <input
          id="password"
          type="password"
          v-model="password"
          style="margin-left: 60px; background-color: #fafaf5"
        />
        <br />
        <button @click="login" type="button" class="btn btn-outline">
          Login
        </button>
      </div>
      <!-- <br />
      <button @click="login" type="button" class="btn btn-outline">
        Login
      </button> -->
    </div>
  </div>
</template>

<script>
import logo from "../assets/TalkingPotatoes_logo.jpg";

export default {
  name: "Login",
  data() {
    return {
      id: "",
      password: "",
      logo,
    };
  },
  methods: {
    login() {
      if (this.id === "test" && this.password === "1234") {
        // 올바른 ID와 비밀번호인 경우 홈 페이지로 이동
        this.$router.push({ name: "Home" });
        console.log("로그인 성공");
      } else {
        // 잘못된 ID 또는 비밀번호인 경우 경고 메시지 출력
        console.log("로그인 실패");
      }
    },
  },
};
</script>

<style scoped>
.containerlogin {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f0ecca;
}

.logo-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  max-height: 600px;
}

.login-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* 가운데 정렬을 위해 수정 */
}

.input-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 430px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: white;
  color: black;
  border-radius: 0.25rem;
  cursor: pointer;
  text-align: center;
  margin-top: 3rem;
  width: 530px;
  background-color: #fafaf5;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  /* margin-left: 43px; */
}

button:hover {
  background-color: #f0f0f0;
}

/* 추가된 CSS: 작은 화면에서 로고가 위로 올라가도록 설정 */
@media screen and (max-width: 600px) {
  .containerlogin {
    flex-direction: column;
    justify-content: flex-start;
  }

  .login-form {
    align-items: center;
  }
}
</style>
