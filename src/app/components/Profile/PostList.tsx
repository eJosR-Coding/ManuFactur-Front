import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import Post from './Post';
import { IPost } from '../../types/post';

interface PostListProps {
    posts: IPost[];
    setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
    userId: string;
}

export default function PostList({ posts, setPosts, userId }: PostListProps) {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPosts = async (page = 1) => {
        try {
            const res = await fetch(`http://localhost:5000/api/posts?page=${page}&limit=5`);
            if (!res.ok) {
                throw new Error(`Error ${res.status}: ${res.statusText}`);
            }
            const data = await res.json();
            if (data.success) {
                // Filtrar posts para evitar duplicados
                setPosts((prevPosts) => {
                    const newPosts = data.data.filter((newPost: IPost) => 
                        !prevPosts.some((prevPost) => prevPost._id === newPost._id)
                    );
                    return [...prevPosts, ...newPosts];
                });
                setTotalPages(data.totalPages);
                setPage(data.currentPage);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);  

    const handleLoadMore = () => {
        if (page < totalPages) {
            fetchPosts(page + 1);
        }
    };

    const deletePost = async (postId: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/posts/${postId}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success) {
                setPosts((prevPosts) => prevPosts.filter(post => post._id !== postId));
            } else {
                console.error("Error deleting post:", data.message);
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <Box sx={{ maxWidth: '600px', margin: 'auto', mt: 3 }}>
            {posts.map(post => (
                <Post key={post._id} post={post} userId={userId} onDelete={deletePost} />
            ))}
            {page < totalPages && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLoadMore}
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Cargar más
                </Button>
            )}
        </Box>
    );
}
