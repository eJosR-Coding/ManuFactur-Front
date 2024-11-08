// src/components/PostItem.tsx
import { Card, CardContent, Box } from "@mui/material";
import PostHeader from "./PostHeader";
import ImageCarousel from "./ImageCarousel";
import PostContent from "./PostContent";
import CommentSection from "./CommentSection";

interface PostItemProps {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
  images: string[];
  userId: string;
}

export default function PostItem({ _id, title, body, createdAt, images, userId }: PostItemProps) {
  return (
    <Card sx={{ maxWidth: 960, marginBottom: "2rem", backgroundColor: "#1f2937", color: "#fff" }}>
      <CardContent>
        <PostHeader title={title} createdAt={createdAt} />
        {images.length > 0 && <ImageCarousel images={images} />}
        <PostContent body={body} />
        <Box sx={{ padding: "1rem 0" }}>
          {/* Aquí puedes agregar botones de like, share, etc. */}
        </Box>
        <CommentSection postId={_id} userId={userId} />
      </CardContent>
    </Card>
  );
}
