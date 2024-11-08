import { Box, Typography, Button, IconButton } from "@mui/material";
import { useState } from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentForm, { IComment } from "./CommentForm";

interface CommentItemProps {
    comment: IComment;
    postId: string;
    userId: string;
    addReply: (parentId: string, newReply: IComment) => void;
    handleDeleteComment: (commentId: string) => void;
}

export default function CommentItem({ comment, postId, userId, addReply, handleDeleteComment }: CommentItemProps) {
    const [replying, setReplying] = useState(false);
    const [showReplies, setShowReplies] = useState(false);

    const toggleReplies = () => setShowReplies(!showReplies);

    return (
        <Box sx={{ marginBottom: "1rem", marginLeft: comment.parentCommentId ? "2rem" : 0 }}>
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

            <Button size="small" onClick={() => setReplying(!replying)} sx={{ color: "#3b82f6", marginLeft: "1rem" }}>
                Responder
            </Button>

            {comment.replies && comment.replies.length > 0 && (
                <Button size="small" onClick={toggleReplies} sx={{ color: "#3b82f6", marginLeft: "1rem" }}>
                    {showReplies ? "Ocultar respuestas" : "Ver respuestas"}
                </Button>
            )}

            {replying && (
                <Box sx={{ marginLeft: "2rem", marginTop: "0.5rem" }}>
                    <CommentForm
                        postId={postId}
                        userId={userId}
                        addComment={(newReply) => addReply(comment._id, newReply)}
                        parentCommentId={comment._id}
                    />
                </Box>
            )}

            {showReplies && comment.replies && comment.replies.map((reply) => (
                <CommentItem
                    key={reply._id}
                    comment={reply}
                    postId={postId}
                    userId={userId}
                    addReply={addReply}
                    handleDeleteComment={handleDeleteComment}
                />
            ))}
        </Box>
    );
}
