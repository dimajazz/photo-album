import { useState, useEffect } from 'react';

import { Post } from 'components/post/post';
import { CreateNewPost } from 'components/createNewPost/createNewPost';

import { BASE_APP_URL } from 'constants/constants';
import { PostType } from 'types/types';
import './postsContainer.css';

export const PostsContainer = () => {
    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect(() => {
        const getAllPosts = async () => {
            try {
                const response = await fetch(BASE_APP_URL + 'post/all');
                const posts = await response.json();

                if (response.ok && posts) {
                    posts.sort((postPrev: PostType, postNext: PostType) => {
                        const timePrev = new Date(postPrev.timestamp).getTime();
                        const timeNext = new Date(postNext.timestamp).getTime();
                        return timeNext - timePrev;
                    });
                    setPosts(posts);
                }
            } catch (error: any) {
                console.error(error.message);
            }
        };
        getAllPosts();
    }, []);

    return (
        <>
            <CreateNewPost />

            <div className='posts-container'>
                {posts.length ? (
                    posts.map((post) => <Post {...post} key={post.id} />)
                ) : (
                    <p className='no-posts'>
                        There are no Photos here yet. Add yours. Be first.
                    </p>
                )}
            </div>
        </>
    );
};
