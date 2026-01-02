"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Upload, Sparkles, RefreshCw, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

// Avatar style configurations
const AVATAR_STYLES = [
  {
    id: "notionists",
    name: "Notion Style",
    provider: "dicebear",
    style: "notionists",
  },
  {
    id: "lorelei",
    name: "Lorelei",
    provider: "dicebear",
    style: "lorelei",
  },
  {
    id: "avataaars",
    name: "Avataaars",
    provider: "dicebear",
    style: "avataaars",
  },
  {
    id: "shapes",
    name: "Shapes",
    provider: "dicebear",
    style: "shapes",
  },
  {
    id: "thumbs",
    name: "Thumbs",
    provider: "dicebear",
    style: "thumbs",
  },
  {
    id: "fun-emoji",
    name: "Fun Emoji",
    provider: "dicebear",
    style: "fun-emoji",
  },
  {
    id: "vercel",
    name: "Gradient",
    provider: "vercel",
    style: "vercel",
  },
] as const;

type AvatarStyle = (typeof AVATAR_STYLES)[number]["id"];

interface AvatarGeneratorProps {
  seed: string;
  onAvatarChange?: (avatarUrl: string | null) => void;
  defaultStyle?: AvatarStyle;
  size?: number;
  className?: string;
}

const generateAvatarUrl = (
  provider: string,
  style: string,
  seed: string,
  size: number = 128
): string => {
  const encodedSeed = encodeURIComponent(seed || "default");

  if (provider === "vercel") {
    return `https://avatar.vercel.sh/${encodedSeed}?size=${size}`;
  }

  return `https://api.dicebear.com/8.x/${style}/svg?seed=${encodedSeed}&size=${size}&backgroundColor=transparent`;
};

// Upload to Cloudinary via API route
async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload/avatar", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Upload failed");
  }

  return result.data.url;
}

export function AvatarGenerator({
  seed,
  onAvatarChange,
  defaultStyle = "notionists",
  size = 96,
  className,
}: AvatarGeneratorProps) {
  const [selectedStyle, setSelectedStyle] = useState<AvatarStyle>(defaultStyle);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [randomSuffix, setRandomSuffix] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const currentStyleConfig = AVATAR_STYLES.find((s) => s.id === selectedStyle)!;

  const avatarUrl = useMemo(() => {
    if (customImage) return customImage;

    return generateAvatarUrl(
      currentStyleConfig.provider,
      currentStyleConfig.style,
      seed + randomSuffix,
      size * 2
    );
  }, [seed, randomSuffix, customImage, currentStyleConfig, size]);

  const handleStyleChange = (styleId: AvatarStyle) => {
    setSelectedStyle(styleId);
    setCustomImage(null);
    const styleConfig = AVATAR_STYLES.find((s) => s.id === styleId)!;
    const newUrl = generateAvatarUrl(
      styleConfig.provider,
      styleConfig.style,
      seed + randomSuffix,
      size * 2
    );
    onAvatarChange?.(newUrl);
  };

  const handleRandomize = () => {
    const suffix = `-${Date.now()}`;
    setRandomSuffix(suffix);
    setCustomImage(null);
    const newUrl = generateAvatarUrl(
      currentStyleConfig.provider,
      currentStyleConfig.style,
      seed + suffix,
      size * 2
    );
    onAvatarChange?.(newUrl);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Use JPG, PNG, GIF, or WebP");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB");
      return;
    }

    setIsUploading(true);

    try {
      // Upload to Cloudinary
      const cloudinaryUrl = await uploadToCloudinary(file);

      setCustomImage(cloudinaryUrl);
      onAvatarChange?.(cloudinaryUrl);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsUploading(false);
      // Reset input so same file can be selected again
      e.target.value = "";
    }
  };

  const handleRemoveCustom = () => {
    setCustomImage(null);
    const newUrl = generateAvatarUrl(
      currentStyleConfig.provider,
      currentStyleConfig.style,
      seed + randomSuffix,
      size * 2
    );
    onAvatarChange?.(newUrl);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <label className="text-sm font-medium">Profile Picture</label>

      <div className="flex items-start gap-6">
        {/* Avatar Preview */}
        <div className="relative group">
          <div
            className={cn(
              "relative flex items-center justify-center overflow-hidden rounded-full",
              "ring-2 ring-offset-2 ring-offset-background",
              "ring-primary/20 group-hover:ring-primary/40",
              "transition-all duration-300 ease-out",
              "shadow-lg shadow-primary/5",
              isUploading && "opacity-50"
            )}
            style={{ width: size, height: size }}>
            {isUploading ? (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" />
              </div>
            ) : avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Avatar preview"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <Sparkles className="h-6 w-6 text-muted-foreground animate-pulse" />
              </div>
            )}
          </div>

          {/* Floating badge */}
          {!customImage && !isUploading && (
            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
              <Sparkles className="h-3 w-3" />
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex-1 space-y-3">
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-2 relative overflow-hidden"
              disabled={isUploading}
              asChild>
              <label>
                {isUploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                {isUploading ? "Uploading..." : "Upload"}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/gif,image/webp"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="sr-only"
                />
              </label>
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRandomize}
              disabled={isUploading}
              className="gap-2 text-muted-foreground hover:text-foreground">
              <RefreshCw className="h-4 w-4" />
              Randomize
            </Button>

            {customImage && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemoveCustom}
                disabled={isUploading}
                className="gap-2 text-destructive hover:text-destructive">
                Remove
              </Button>
            )}
          </div>

          {/* Style Selector */}
          {!customImage && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Choose a style</p>
              <TooltipProvider delayDuration={100}>
                <div className="flex flex-wrap gap-1.5">
                  {AVATAR_STYLES.map((style) => {
                    const previewUrl = generateAvatarUrl(
                      style.provider,
                      style.style,
                      seed + randomSuffix,
                      48
                    );
                    const isSelected = selectedStyle === style.id;

                    return (
                      <Tooltip key={style.id}>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            onClick={() => handleStyleChange(style.id)}
                            disabled={isUploading}
                            className={cn(
                              "relative h-9 w-9 rounded-lg overflow-hidden",
                              "ring-2 ring-offset-1 ring-offset-background",
                              "transition-all duration-200",
                              "hover:scale-110 hover:z-10",
                              "disabled:opacity-50 disabled:cursor-not-allowed",
                              isSelected
                                ? "ring-primary shadow-md"
                                : "ring-transparent hover:ring-muted-foreground/30"
                            )}>
                            <img
                              src={previewUrl}
                              alt={style.name}
                              className="h-full w-full object-cover"
                            />
                            {isSelected && (
                              <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
                                <Check className="h-4 w-4 text-primary drop-shadow-md" />
                              </div>
                            )}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="text-xs">
                          {style.name}
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </TooltipProvider>
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            {customImage
              ? "Custom image uploaded to cloud"
              : "Auto-generated  • JPG, PNG, GIF up to 2MB"}
          </p>
        </div>
      </div>
    </div>
  );
}

export { generateAvatarUrl, AVATAR_STYLES };
export type { AvatarStyle };
