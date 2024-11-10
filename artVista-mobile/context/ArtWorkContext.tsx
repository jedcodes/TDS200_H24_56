import { ArtworkAction, ArtworkState } from "@/types/type";
import { createContext, ReactNode, useState } from "react";

const ArtworkContext = createContext<Partial<ArtworkState & ArtworkAction>>({});

export const ArtworkProvider = ({ children }: { children: ReactNode }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [hashtags, setHashtags] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  const undateImageUrl = (imageUrl: string) => setImageUrl(imageUrl);
  const updateDescription = (description: string) =>
    setDescription(description);

  const value = {
    imageUrl,
    description,
    category,
    hashtags,
    progress,
    undateImageUrl,
    updateDescription,
  };

  return (
    <ArtworkContext.Provider value={value}>{children}</ArtworkContext.Provider>
  );
};
