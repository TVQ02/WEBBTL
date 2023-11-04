const userModel = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const register = async (req, res) => {    
    try {
    
    const {username, password, email } = req.body;

    await userModel.create({
        username: username,
        password: bcrypt.hashSync(password,10),
        email: email,
        role: 'regular',
    });
    return res.status(200).send('register user');
    
    } catch (error) {
        console.log('error',error);
    }
    
    
};
const login = async (req, res) => {
    const user = await userModel.findOne({username: req.body.username});
    if(!user){
        return res.status(400).send('Invalid Username or Password');
    }
    
    
    const isPassvalid = bcrypt.compareSync(req.body.password, user.password);
    if(!isPassvalid)
    {
        return res.status(400).send('Invalid Username or Password');
    }
//     return res.status(200).send('login success');
// }

const jwtToken = jwt.sign({
    _id: user.id,
    username: user.username,
    role: user.role
}, 'jwtSecret',{
    expiresIn: 10
})

    return res.status(200).send({
    accessToken: jwtToken
});
}

module.exports = {
    register: register,
    login: login
};