import { Box, Typography, Button, IconButton } from "@mui/material";
import { useState } from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentForm, { IComment } from "./CommentForm";

interface CommentListProps {
    comments: IComment[];
    postId: string;
    userId: string;
    addComment: (newComment: IComment) => void;
    updateComments: (updatedComments: IComment[]) => void;
}

export default function CommentList({ comments, postId, userId, addComment, updateComments }: CommentListProps) {
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [showReplies, setShowReplies] = useState<{ [key: string]: boolean }>({});

    const toggleReplies = (commentId: string) => {
        setShowReplies((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
    };

    const addReply = (parentId: string, newReply: IComment) => {
        const updatedComments = addCommentToNestedComment([...comments], parentId, newReply);
        updateComments(updatedComments);
        setReplyingTo(null); // Cerrar el formulario de respuesta después de añadir el comentario
    };

    const addCommentToNestedComment = (commentsArray: IComment[], parentId: string, newReply: IComment): IComment[] => {
        return commentsArray.map((comment) => {
            if (comment._id === parentId) {
                return {
                    ...comment,
                    replies: [...(comment.replies || []), newReply],
                };
            } else if (comment.replies) {
                return {
                    ...comment,
                    replies: addCommentToNestedComment(comment.replies, parentId, newReply),
                };
            }
            return comment;
        });
    };

    const handleDeleteComment = async (commentId: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/comments/${commentId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                const updatedComments = removeCommentFromNested([...comments], commentId);
                updateComments(updatedComments);
            } else {
                console.error("Failed to delete comment");
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const removeCommentFromNested = (commentsArray: IComment[], commentId: string): IComment[] => {
        return commentsArray
            .filter((comment) => comment._id !== commentId)
            .map((comment) => ({
                ...comment,
                replies: comment.replies ? removeCommentFromNested(comment.replies, commentId) : [],
            }));
    };

    return (
        <Box sx={{ marginTop: "1rem" }}>
            {comments.map((comment) => (
                <Box key={comment._id} sx={{ marginBottom: "1rem", marginLeft: comment.parentCommentId ? "2rem" : 0 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "#2d3748",
                            padding: "0.5rem",
                            borderRadius: "8px",
                        }}
                    >
                        <Typography variant="body1" sx={{ marginRight: "auto" }}>{comment.body}</Typography>
                        <IconButton color="primary">
                            <ThumbUpIcon fontSize="small" />
                        </IconButton>
                        {userId === comment.user._id && (
                            <IconButton onClick={() => handleDeleteComment(comment._id)} color="error">
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        )}
                    </Box>
                    <Typography variant="caption" color="gray" sx={{ marginLeft: "1rem" }}>
                        {comment.user.username} - {new Date(comment.createdAt).toLocaleString()}
                    </Typography>

                    <Button size="small" onClick={() => setReplyingTo(comment._id)} sx={{ color: "#3b82f6", marginLeft: "1rem" }}>
                        Responder
                    </Button>

                    {comment.replies && comment.replies.length > 0 && (
                        <Button
                            size="small"
                            onClick={() => toggleReplies(comment._id)}
                            sx={{ color: "#3b82f6", marginLeft: "1rem" }}
                        >
                            {showReplies[comment._id] ? "Ocultar respuestas" : "Ver respuestas"}
                        </Button>
                    )}

                    {replyingTo === comment._id && (
                        <Box sx={{ marginLeft: "2rem", marginTop: "0.5rem" }}>
                            <CommentForm
                                postId={postId}
                                userId={userId}
                                addComment={(newReply) => addReply(comment._id, newReply)}
                                parentCommentId={comment._id}
                            />
                        </Box>
                    )}

                    {showReplies[comment._id] && comment.replies && (
                        <Box sx={{ marginLeft: "2rem", marginTop: "0.5rem" }}>
                            {comment.replies.map((reply) => (
                                <CommentList
                                    key={reply._id}
                                    comments={[reply]}
                                    postId={postId}
                                    userId={userId}
                                    addComment={addComment}
                                    updateComments={updateComments}
                                />
                            ))}
                        </Box>
                    )}
                </Box>
            ))}
        </Box>
    );
}
