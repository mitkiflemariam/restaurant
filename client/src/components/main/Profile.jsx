import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

function Profile({ user }) {
  // Default image URL (replace with your preferred default image)
  //   const defaultImageUrl = "https://example.com/default-profile-pic.png";
  const defaultImageUrl = "https://github.com/shadcn.png";

  return (
    <Avatar className="h-16 w-16">
      <AvatarImage
        src={user.imageUrl || defaultImageUrl} // Use default if imageUrl is falsy
        alt={user.name || "User"} // Fallback for alt text
      />
      <AvatarFallback>{user.initials || "UN"}</AvatarFallback>{" "}
      {/* Fallback initials */}
    </Avatar>
  );
}

export default Profile;
