export default function authHeader() {
    const access_token = JSON.parse(localStorage.getItem('access_token') ?? "");
    return { 'x-access-token': access_token };
    //return { Authorization: 'Bearer ' + accessToken };
}
