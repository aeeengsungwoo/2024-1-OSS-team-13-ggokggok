import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 393px;
  padding: 50px 0px;
  margin : 50px 0px;
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
  padding: 0px 20px;
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
    margin-top: 250px;
    &:hover {
      opacity: 0.8;
    }
  }
`;



export const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

export const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: #1d9bf0;
  }
`;

export default function CreateAccount(){
    const nav = useNavigate();
    const [isLoading,setLoading]= useState(false);

    const [name,setName] = useState("");
    const [nickname, setNick] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [error, setError] = useState("");

    const onChange = (e) => {
        const {
            target: {name, value},
        } = e;

        if(name === "name"){
            setName(value);
        }else if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }else if(name === "nick"){
            setNick(value);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if(name === "" || email==="" || password === "" || isLoading) return;

        try {
            setLoading(true);
            //회원가입
            nav("/");

        } catch (e) {
            //에러처리
            console.error("Error occurred:", e);
        } finally {
          setLoading(false);
        }
       
    };

    return(
      
        <Wrapper>
            <Title>회원가입</Title>
            <Form onSubmit={onSubmit}>
                <Input name="name" value = {name} onChange={onChange} placeholder="본명" type="text" required/>
                <Input name="nick" value={nickname} onChange={onChange} placeholder="닉네임" type="text" required/>
                <Input name="email" value={email} onChange={onChange} placeholder="이메일" type="email" required/>
                <Input name="password" value={password} onChange={onChange} placeholder="비밀번호" type="password" required/>
                <Input style={{backgroundColor: "#A3CCAA"}} type="submit" value= "회원가입" />
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
        </Wrapper>
      
    );
}