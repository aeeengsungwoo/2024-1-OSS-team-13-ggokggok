
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";


const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 393px;
  padding: 50px 0px;
`;

const Title = styled.h1`
  font-size: 30px;
  color: #534340;
  
`;

const Form = styled.form`
  align-items: center;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  text-align: center;
`;


const Input = styled.input`
  padding:0px 20px;
  border: 1px solid #E8E8E8;
  border-radius: 8px;
  height: 50px;
  width: 303px;
  font-size: 16px;
  background-color: #F6F6F6;

  &[type="submit"] {
    width: 343px;
    height: 51px;
    cursor: pointer;
    border-radius: 50px;
    color: white;
    margin-top: 370px;
    &:hover {
      opacity: 0.8;
    }
  }
`;



const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: #1d9bf0;
  }
`;

export default function Login() {
  const nav = useNavigate();
  const [isLoading, setLoading] = useState(false);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");


  

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if(email==="" || password === "" || isLoading) return;


    const postData = {
      "username" : email,
      "password" : password,
    };

    try {
        setLoading(true);

        const fetchData = async () => {
          try {
            const response = await axios.post("https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/user/login/",postData);
            console.log('data');
            console.log(response);
            if(response.data.success == true){
              sessionStorage.clear();
              sessionStorage.setItem('user', JSON.stringify(response.data));
              console.log(sessionStorage.getItem("user"));
              //sessionStorage.setItem("token", token);



              {/* 
                    sessionStorage.clear();
                    setSavedLoginId(sessionStorage.getItem("loginId"));
                    setSavedLoginPassword(sessionStorage.getItem("loginPassword"));
            */}
              
              nav("/");
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }

        }
        fetchData();

    } catch (e) {
        //에러처리
        console.error("Error occurred:", e);
    } finally {
      setLoading(false);
    }
   
  };

  const onChange = async (e) => {
  
    const {
        target: {name, value},
    } = e;


    if(name === "email"){
        setEmail(value);
    }else if(name === "password"){
        setPassword(value);
    }
  };

  return (
    
    <Wrapper>
      <Title>로그인</Title>

      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="이메일"
          type="text"
          required
        />
        <Input
          onChange={onChange}
          value={password}
          name="password"
          placeholder="비밀번호"
          type="password"
          required
        />
        
        <Link to = "/create-account" style={{ textDecoration: "none"}}><div color="A3CCAA">회원가입</div></Link>
        <Input style={{backgroundColor: "#A3CCAA"}} type="submit" value={isLoading ? "Loading..." : "로그인"} />
        
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
    </Wrapper>
  );
}
