// src/components/ImageCarousel.tsx
import Carousel from "react-material-ui-carousel";
import { Box } from "@mui/material";

interface ImageCarouselProps {
  images: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  return (
    <Carousel>
      {images.map((img, index) => (
        <Box key={index} sx={{ height: 300 }}>
          <img src={img} alt={`image-${index}`} style={{ width: "100%", objectFit: "cover" }} />
        </Box>
      ))}
    </Carousel>
  );
}
