// src/components/ReplyList.tsx
import { Box, Typography, IconButton, Button } from "@mui/material";
import { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentForm, { IComment } from "./CommentForm";

interface ReplyListProps {
  replies: IComment[];
  postId: string;
  userId: string;
  addReply: (newReply: IComment) => void;
}

export default function ReplyList({ replies, postId, userId, addReply }: ReplyListProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  return (
    <Box sx={{ marginLeft: "2rem", marginTop: "0.5rem" }}>
      {replies.map((reply) => (
        <Box key={reply._id} sx={{ marginBottom: "0.5rem" }}>
          <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "#1f2937", padding: "0.5rem", borderRadius: "8px" }}>
            <Typography variant="body1" sx={{ marginRight: "auto" }}>{reply.body}</Typography>
            <IconButton color="primary">
              <ThumbUpIcon fontSize="small" />
            </IconButton>
          </Box>
          <Typography variant="caption" color="gray" sx={{ marginLeft: "1rem" }}>
            {reply.user.username} - {new Date(reply.createdAt).toLocaleString()}
          </Typography>

          <Button size="small" onClick={() => setReplyingTo(reply._id)} sx={{ color: "#3b82f6", marginLeft: "1rem" }}>
            Responder
          </Button>

          {replyingTo === reply._id && (
            <Box sx={{ marginLeft: "2rem", marginTop: "0.5rem" }}>
              <CommentForm postId={postId} userId={userId} addComment={addReply} parentCommentId={reply._id} />
            </Box>
          )}

          {/* Mostrar respuestas anidadas de la respuesta actual */}
          {reply.replies && reply.replies.length > 0 && (
            <ReplyList replies={reply.replies} postId={postId} userId={userId} addReply={addReply} />
          )}
        </Box>
      ))}
    </Box>
  );
}
