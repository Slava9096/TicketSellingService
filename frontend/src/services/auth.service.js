import http from "../http-common";
function login(user) {
  var data = {
    username: user.username,
    password: user.password
  };
  return http
    .post("/login", data)
    .then(response => {
      if (response.data.accessToken) {

        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
}

function logout() {
  localStorage.removeItem('user');
}

function register(user) {
  var data = {
    username: user.username,
    password: user.password,
    email: user.email,
    name: user.name,
    role: "user"
  };
  console.log(data)
  return http.post("/register", data);
}

function refreshToken(user) {
  var data = {
    username: user.username
  };
  return http
    .post("/refreshToken", data)
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
}

function jwtDecrypt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

function tokenAlive(exp) {
  if (Date.now() >= exp * 1000) {
    return false;
  }
  return true;
}

export default {
  login: login,
  logout: logout,
  register: register,
  refreshToken: refreshToken,
  jwtDecrypt: jwtDecrypt,
  tokenAlive: tokenAlive
};
