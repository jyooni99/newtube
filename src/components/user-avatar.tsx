import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

const avatarVariants = cva("rounded-full", {
  variants: {
    size: {
      default: "h-9 w-9",
      xs: "h-4 w-4",
      sm: "h-6 w-6",
      lg: "h-10 w-10",
      xl: "h-[160px] w-[160px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface UserAvatarProps extends VariantProps<typeof avatarVariants> {
  imageUrl: string;
  name: string;
  className?: string;
  onClick?: () => void;
}

function UserAvatar({ imageUrl, name, className, onClick, size }: UserAvatarProps) {
  return (
    <Avatar onClick={onClick}>
      <AvatarImage
        src={imageUrl}
        alt={name}
        className={cn(avatarVariants({ size }), className)}
      />
    </Avatar>
  );
}

export default UserAvatar;
