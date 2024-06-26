import { styled } from "styled-components";
import logo from "../../../others/img/logo-icon.png"
import leftlogo from "../../../others/img/left-button.png"
import { Wrapper, Title, LogoImage, TitleDiv, ExtraButton, BackButton } from "../../../styles/Styles"
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import StarRating from "../../../components/starrating";


const SubTitle = styled.h2`
  font-size: 20px;
  margin-left: 0px;
  text-align: left;
  padding: 20px 0;
`;

const ContentBox = styled.div`
  height: 143px;
  width: 95%;
  border: 1px solid #C9B6A9;
  border-radius: 10px;
  margin: 15px 0 0;
  padding: 15px;
`;

const ContentBox2 = styled.div`
  height: 550px;
  width: 100%;
  border: 1px solid #FFFFFF;
  border-radius: 10px;
  margin: 15px 0 0;
  overflow: auto;

  > div {
    font-size: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #C9B6A9;
   
  }

  h3 {
    color: black;
    padding: 5px 0;

  }

  p {
    font-size: 14px;
    padding: 5px 0 15px;
  
  }
`;


const ContentImg = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 10px;
  margin: 0 10px 0 0;
`;

const WriteBtn = styled.div`
    border: none;
    background-color: white;
    color: #A3CCAA;
    font-size: 16px;
    font-weight: bold;
`;  

export default function Place_info(){

    const [data, setData] = useState(null);

    const {id} = useParams();


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app//place/post/");
          const foundData = response.data.find(item => item.id === parseInt(id)); // id를 정수로 변환하여 일치하는 데이터 찾기
          setData(foundData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, [id]); 

    function formatTimestamp(timestamp) {
      const date = new Date(timestamp);
    
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");
    
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
  
    return (
        <Wrapper>
          <Title>
            <div><BackButton><img src={leftlogo}/></BackButton></div>
            <TitleDiv><LogoImage src={logo} alt="Logo" /><span>우리 지역</span></TitleDiv>
          </Title>            
            <SubTitle>
            <h2>우리 지역 소식</h2>
              <ContentBox2>
                {data ? (
                  <div>
                    <h1>{data.title}</h1><br></br>
                    <h1>{data.address}</h1><br></br>
                    <StarRating 
                      totalStars={5} 
                      selectedStars={data.review}
                    />
                    <h3>{formatTimestamp(data.date)}</h3><br></br>       
                    <h2>{data.content}</h2>       
                  </div>   
                ): (<></>)}
                </ContentBox2>
            </SubTitle>
        </Wrapper>
    );
}
