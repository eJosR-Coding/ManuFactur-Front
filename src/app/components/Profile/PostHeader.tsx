// src/components/PostHeader.tsx
import { Box, Typography } from "@mui/material";

interface PostHeaderProps {
  title: string;
  createdAt: string;
}

export default function PostHeader({ title, createdAt }: PostHeaderProps) {
  return (
    <Box sx={{ padding: "1rem 0" }}>
      <Typography variant="h5" fontWeight="bold" sx={{ color: "#fff" }}>
        {title}
      </Typography>
      <Typography variant="caption" color="gray">
        {new Date(createdAt).toLocaleString()}
      </Typography>
    </Box>
  );
}
