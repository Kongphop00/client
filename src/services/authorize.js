const authentication = (res) => {
    if (window !=='undefined') {
        sessionStorage.setItem("token",JSON.stringify(res.data.token))
        sessionStorage.setItem("user",JSON.stringify(res.data.username))
    }
} 

const getToken=()=>{
    if (window !=='undefined') {
        if (sessionStorage.getItem("token")) {
            return JSON.parse(sessionStorage.getItem("token"))
        } else {
            return false
        }
    }
}

const getUser=()=>{
    if (window !=='undefined') {
        if (sessionStorage.getItem("user")) {
            return JSON.parse(sessionStorage.getItem("user"))
        } else {
            return false
        }
    }
}

const logOut=()=>{
    if (window !=='undefined') {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
    }
}

export {authentication,getToken,getUser,logOut}
