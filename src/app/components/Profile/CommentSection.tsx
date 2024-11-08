import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import CommentForm, { IComment } from "./CommentForm";
import CommentItem from "./CommentItem";

interface CommentSectionProps {
    postId: string;
    userId: string;
}

export default function CommentSection({ postId, userId }: CommentSectionProps) {
    const [comments, setComments] = useState<IComment[]>([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/comments?postId=${postId}`);
                if (!res.ok) throw new Error("Failed to fetch comments.");
                const data = await res.json();
                if (data.success) {
                    setComments(data.data);
                }
            } catch (error) {
                console.error("Error loading comments:", error);
            }
        };
        fetchComments();
    }, [postId]);

    const addComment = (newComment: IComment) => {
        setComments((prevComments) => [newComment, ...prevComments]);
    };

    const addReply = (parentId: string, newReply: IComment) => {
        const updatedComments = comments.map(comment => {
            if (comment._id === parentId) {
                return {
                    ...comment,
                    replies: [...(comment.replies || []), newReply],
                };
            } else if (comment.replies) {
                return {
                    ...comment,
                    replies: addReplyToNestedComment(comment.replies, parentId, newReply),
                };
            }
            return comment;
        });
        setComments(updatedComments);
    };

    const addReplyToNestedComment = (commentsArray: IComment[], parentId: string, newReply: IComment): IComment[] => {
        return commentsArray.map(comment => {
            if (comment._id === parentId) {
                return {
                    ...comment,
                    replies: [...(comment.replies || []), newReply],
                };
            } else if (comment.replies) {
                return {
                    ...comment,
                    replies: addReplyToNestedComment(comment.replies, parentId, newReply),
                };
            }
            return comment;
        });
    };

    const handleDeleteComment = async (commentId: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/comments/${commentId}`, { method: "DELETE" });
            if (res.ok) {
                const updatedComments = removeCommentFromNested([...comments], commentId);
                setComments(updatedComments);
            } else {
                console.error("Failed to delete comment");
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const removeCommentFromNested = (commentsArray: IComment[], commentId: string): IComment[] => {
        return commentsArray
            .filter(comment => comment._id !== commentId)
            .map(comment => ({
                ...comment,
                replies: comment.replies ? removeCommentFromNested(comment.replies, commentId) : [],
            }));
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>Comentarios</Typography>
            {comments.map(comment => (
                <CommentItem
                    key={comment._id}
                    comment={comment}
                    postId={postId}
                    userId={userId}
                    addReply={addReply}
                    handleDeleteComment={handleDeleteComment}
                />
            ))}
            <CommentForm postId={postId} userId={userId} addComment={addComment} />
        </Box>
    );
}
