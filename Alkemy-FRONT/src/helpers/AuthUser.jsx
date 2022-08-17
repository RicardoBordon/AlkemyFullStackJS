async function authUser() {
    await axios({
        baseURL: base,
        url: "login",
        method: "post",
        data: data,
        withCredentials: false,
      })
      .then(function (response) {
        if(response.data.id_users !== undefined){
          setDataUser(response.data);
        }
      }, [])
}

export default authUser;