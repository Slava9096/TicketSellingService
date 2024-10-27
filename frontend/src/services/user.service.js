import http from "../http-common";

function getUserBoard() {
  return http.get("/userBoard");
}
async function getUser(id) {
  var user;
  await http.get("/user/" + id)
    .then(response => {
      user = response.data;
    })
    .catch(e => {
      console.log(e);
    });
  return user;
}

export default {
  getUserBoard: getUserBoard,
  getUser: getUser
};
