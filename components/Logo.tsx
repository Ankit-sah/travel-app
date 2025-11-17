import Link from "next/link";
import Image from "next/image";
import { Plane, Compass, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "compass" | "mappin" | "image";
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
  href?: string;
}

const iconVariants = {
  default: Plane,
  compass: Compass,
  mappin: MapPin,
};

const sizeClasses = {
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

const textSizeClasses = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-2xl",
};

export function Logo({
  variant,
  size = "md",
  showText = true,
  className,
  href = "/",
}: LogoProps) {
  // Get variant from env or use prop/default
  const logoVariant =
    variant ||
    (process.env.NEXT_PUBLIC_LOGO_VARIANT as "default" | "compass" | "mappin" | "image") ||
    "default";

  const Icon = logoVariant === "image" ? null : iconVariants[logoVariant];
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Travel App";

  // If using image variant, check for logo path in env
  if (logoVariant === "image" && process.env.NEXT_PUBLIC_LOGO_PATH) {
    return (
      <Link href={href} className={cn("flex items-center space-x-2", className)}>
        <Image
          src={process.env.NEXT_PUBLIC_LOGO_PATH}
          alt={siteName}
          width={size === "sm" ? 32 : size === "md" ? 40 : 48}
          height={size === "sm" ? 32 : size === "md" ? 40 : 48}
          className="object-contain"
        />
        {showText && (
          <span className={cn("font-bold", textSizeClasses[size])}>{siteName}</span>
        )}
      </Link>
    );
  }

  return (
    <Link href={href} className={cn("flex items-center space-x-2", className)}>
      {Icon && <Icon className={cn(sizeClasses[size], "text-primary")} />}
      {showText && <span className={cn("font-bold", textSizeClasses[size])}>{siteName}</span>}
    </Link>
  );
}

