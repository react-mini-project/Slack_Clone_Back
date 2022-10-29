const MembersRepository = require('../repository/members.repository');

class MembersController {
    membersService = new this.membersService();

    loginMembers = async(req,res,next)=>{
        const {accessToken} = req.body; //값 확인을 위해 body로 token 값을 받아준다.


	let kakaoProfile; //값을 수정해주어야 하므로 const가 아닌 let 사용

	try{ //axios 모듈을 이용하여 Profile 정보를 가져온다.
            kakaoProfile = await axios.get('https://kapi.kakao.com/v2/user/me', {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                }
            })
     } catch (err) {
          return res.send(errResponse(baseResponse.ACCESS_TOKEN_VERIFICATION_FAILURE));
     }


//최종적으로 kakaoProfile로 부터 얻은 정보를 통하여 해당 이메일의 존재여부를 확인하여 준 후,
//로그인 성공 혹은 존재하지 않는다는 결과를 뱉어준다.
    }

}