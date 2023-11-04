import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TextInput from '../ui/TextInput';
import Button from '../ui/Button';

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

    :not(:last-child) {
        margin-bottom: 16px;
    }
`;

function PostWritePage(props) {
    const navigate = useNavigate();
    const [post, setPost] = useState({
        title: '',
        content: ''
    });
    const { title, content } = post;

    const onChange = (event) => {
      const { name, value } = event.target; //event.target에서 name과 value만 가져오기
      setPost({
        ...post,
        [name]: value,
      });
    };

    const savePost = () => {
        fetch('/post', {
            method: 'POST',
            headers: {//test
                'Content-Type': 'application/json', // 데이터 형식 지정
            },
            body: JSON.stringify(post)
        })
        .then(response => {
            if (!response.ok) {
              throw new Error('네트워크 응답이 실패하였습니다.');
            }
            return response.json();
        })
        .then(data => {
            alert("글 등록이 성공하였습니다.");
            navigate('/');
        })
        .catch(error => {
            console.error('에러 발생');
        });
    }

    return (
        <Wrapper>
            <Container>
                <TextInput
                    height={20}
                    name="title"
                    value={title}
                    onChange={onChange}
                ></TextInput>

                <TextInput
                    height={480}
                    name="content"
                    value={content}
                    onChange={onChange}
                ></TextInput>

                <Button
                    title='글 작성하기'
                    onClick={savePost}
                />
            </Container>
        </Wrapper>
    );
}

export default PostWritePage;