import instance from ".";

export const register = (data)=>{
    console.log(data)
    return instance.post('/register', data)
}
export const login = (data)=>{
    return instance.post('/login', data)
}