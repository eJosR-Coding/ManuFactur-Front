import { Box, Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentSection from './CommentSection';

interface IPost {
    _id: string;
    title: string;
    body: string;
    user: { _id: string; username: string };
    imageUrl?: string;
    createdAt: string;
}

interface PostProps {
    post: IPost;
    userId: string;
    onDelete: (postId: string) => void;
}

export default function Post({ post, userId, onDelete }: PostProps) {
    const handleDelete = () => {
        onDelete(post._id);
    };

    return (
        <Card sx={{ mb: 3, backgroundColor: '#1f2937', color: '#fff' }}>
            <CardContent>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    {post.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    By - {post.user.username} - {new Date(post.createdAt).toLocaleString()}
                </Typography>
                {post.imageUrl && (
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            paddingTop: "56.25%", // Relación de aspecto 16:9
                            backgroundColor: "#f0f0f0",
                            backgroundImage: `url(${post.imageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderRadius: "8px",
                            overflow: "hidden",
                            my: 2
                        }}
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.0))",
                            }}
                        />
                    </Box>
                )}
                <Typography variant="body1" sx={{ mt: 1 }}>
                    {post.body}
                </Typography>
                {userId === post.user._id && (
                    <IconButton color="error" onClick={handleDelete} sx={{ mt: 2 }}>
                        <DeleteIcon />
                    </IconButton>
                )}
            </CardContent>
            <Box sx={{ padding: '1rem' }}>
                <CommentSection postId={post._id} userId={userId} />
            </Box>
        </Card>
    );
}
