import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import CommentList from '../list/CommentList';
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

const PostContainer = styled.div`
    padding: 8px 16px;
    border: 1px solid grey;
    border-radius: 8px;
`;

const TitleText = styled.p`
    font-size: 28px;
    font-weight: 500;
`;

const ContentText = styled.p`
    font-size: 20px;
    line-height: 32px;
    white-space: pre-wrap;
`;

const CommentLabel = styled.p`
    font-size: 16px;
    font-weight: 500;
`;

function PostViewPage(props) {
    const navigate = useNavigate();
    const {postId} = useParams();
    const [comment, setComment] = useState({
        post_id: postId,
        content: ''
    });
    const [post, setPost] = useState({
        id: '',
        title: '',
        content: ''
    });
    const [commentList, setCommentList] = useState([]);

    const getPostData = () => {
        fetch('/post/'+postId, {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {
              throw new Error('네트워크 응답이 실패하였습니다.');
            }
            return response.json(); // JSON 형식의 응답을 파싱합니다.
        })
        .then(data => {
            setPost(data);
        })
        .catch(error => {
            console.error('에러 발생');
            console.log(error);
        });
    }

    const getCommentListData = () => {
        fetch('/comments/'+postId, {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {
              throw new Error('네트워크 응답이 실패하였습니다.');
            }
            return response.json(); // JSON 형식의 응답을 파싱합니다.
        })
        .then(data => {
            setCommentList(data);
        })
        .catch(error => {
            console.error('에러 발생');
            console.log(error);
        });
    }

    const onChange = (event) => {
        const { name, value } = event.target; //event.target에서 name과 value만 가져오기
        setComment({
          ...comment,
          [name]: value,
        });
      };

    const saveComment = () => {
        fetch('/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // 데이터 형식 지정
            },
            body: JSON.stringify(comment)
        })
        .then(response => {
            if (!response.ok) {
              throw new Error('네트워크 응답이 실패하였습니다.');
            }
            return response.json(); // JSON 형식의 응답을 파싱합니다.
        })
        .then(data => {
            alert("댓글이 등록되었습니다.");
            getCommentListData();
        })
        .catch(error => {
            console.error('에러 발생');
            console.log(error);
        });
    }

    useEffect(() => { 
        getPostData();
        getCommentListData();
    }, []);

    return (
        <Wrapper>
            <Container>
                <Button
                    title='뒤로 가기'
                    onClick={() => {
                        navigate('/');
                    }}
                />
                <PostContainer>
                    <TitleText>{post.title}</TitleText>
                    <ContentText>{post.content}</ContentText>
                </PostContainer>

                <CommentLabel>댓글</CommentLabel>
                <CommentList comments={commentList || []} />

                <TextInput
                    height={40}
                    name="content"
                    value={comment.content}
                    onChange={onChange}
                />
                <Button
                    title='댓글 작성하기'
                    onClick={saveComment}
                />
            </Container>
        </Wrapper>
    );
}

export default PostViewPage;