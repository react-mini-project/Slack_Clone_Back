const { response } = require("express");
const express = require("express");
const router = express.Router();
const request = require('request')
const jwt = require('jsonwebtoken')

const MembersController = require('../controller/members');
const membersController=new MembersController();

router.post('/login',membersController.loginMembers);

passport.use(
    'kakao-login',
    new KakaoStrategy(
        {
            clientID: '[8f02b12f8a9b0f8b87b7b181613ab7bc]',
            clientSecret: '[SECRET KEY]',
            callbackURL: '[CALL BACK URI] (ex: /auth/kakao/callback)',
        },
        function (accessToken, refreshToken, profile, done) {
            result = {
                accessToken: accessToken,
                refreshToken: refreshToken,
                profile: profile,
            };
            console.log('KakaoStrategy', result);
            return done;
        },
    ),
);

app.post('/users/kakao-login', user.kakaoLogin);
app.get('/kakao', passport.authenticate('kakao-login'));
app.get('/auth/kakao/callback', 
passport.authenticate('kakao-login', 
    {
     failureRedirect: '/auth',
      successRedirect: '/' 
    }
));



module.exports=router;

// module.exports = {
//     getProfile(accessToken) {
//         return new Promise((resolve,reject)=>{
//             request(
//                 {
//                     headers:{
//                         "Authorization":`Bearer ${accessToken}`,
//                         "Content-Type":`application/s-www-form-urlencoded;charset=utf-8`
//                     },
//                     url:'https://kapi.kakao.com/v2/user/me',
//                     method:"GET",
//                 },
//                 (error,reponse,body)=>{
//                     if(!error&&response.statusCode===200){
//                         resolve(body)
//                     }
//                     reject(error)
//                 }
//             )
//         })
//     }
// }

