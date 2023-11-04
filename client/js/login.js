async function handleLogin() {
    const username = document.getElementById('username').value;
    // const email = document.getElementById('email').value;
    const password= document.getElementById('password').value;


    const response = await axios.post('http://localhost:5000/api/auth/login',{

    username: username,
    password: password
}); 
   
if (response.status ==200)
    {
        const accessToken = response.data.accessToken;
        //decode lay thong tin payload
        const payloadDecoded = jwt_decode(accessToken);

        if (payloadDecoded.role ==='regular'){
            window.location.href='/index.html';
        }
        else{
            window.location.href ='/admin.html';
        }
        localStorage.setItem('access_token',accessToken);
    }

}