export const loginAction = (payload) => {
  return {
    type: 'LOGIN',
    payload: payload
  };
};

export const userLoggedIn = (user) => {
  return {
    type: 'USER_LOGGEDIN',
    payload: user,
  };
};

export const getUser = () =>{
  return {
    type: 'GET_USER'
  }
}
