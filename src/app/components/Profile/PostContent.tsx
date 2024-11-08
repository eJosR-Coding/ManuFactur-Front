// src/components/PostContent.tsx
import { Typography } from "@mui/material";

interface PostContentProps {
  body: string;
}

export default function PostContent({ body }: PostContentProps) {
  return (
    <Typography variant="body1" sx={{ color: "#fff", padding: "1rem 0" }}>
      {body}
    </Typography>
  );
}
