import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../ui/Button"
import PostList from "../list/PostList"

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 720px;

    & > * {
        :not(:last-child){
            margin-bottom: 16px;
        }
    }
`;



function MainPage(props){

    const [postList, setPostList] = useState([]);
    const navigate = useNavigate();

    const getPostListData = () => {
        fetch('/posts', {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {
              throw new Error('네트워크 응답이 실패하였습니다.');
            }
            
            return response.json(); // JSON 형식의 응답을 파싱합니다.
        })
        .then(data => {
            setPostList(data);
        })
        .catch(error => {
            console.error('에러 발생');
            console.log(error);
        });
    }

    useEffect(() => { 
        getPostListData();
    }, []);

    return(
        <Wrapper>
            <Container>
                <Button 
                    title="글 작성하기"
                    onClick={() => {
                        navigate("/post-write");
                    }}
                />
            </Container>

            <PostList 
                posts={postList || []} // postList가 빈 값일 경우 []로 표출하도록 해야함 아니면 오류 발생
                onClickItem={(item) => {
                    navigate(`/post/view/${item.id}`);
                }}
            />
        </Wrapper>
    );
} 

export default MainPage;