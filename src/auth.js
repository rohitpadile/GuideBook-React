const auth = () => {

  const setToken = (token) => {
    localStorage.setItem("token", token);
  };
    
  const getToken = () => {
    return localStorage.getItem("token");
  };

  const removeToken = () => {
    localStorage.removeItem("token");
  };

  const isLoggedIn = () => {
    return !!getToken();
  };

  return {
    setToken,
    getToken,
    removeToken,
    isLoggedIn,
  };
};

export default auth();
