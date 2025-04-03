import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

function Profile({ user }) {
  // Default image URL (replace with your preferred default image)
  //   const defaultImageUrl = "https://example.com/default-profile-pic.png";
  const defaultImageUrl = "https://github.com/shadcn.png";

  return (
    <Avatar className="h-12 w-12">
      {/* <AvatarImage
        src={user.imageUrl || defaultImageUrl} // Use default if imageUrl is falsy
        alt={user.name || "User"} // Fallback for alt text
      /> */}
      <AvatarFallback>{user.imageUrl || user.initials}</AvatarFallback>{" "}
      {/* Fallback initials */}
    </Avatar>
  );
}

export default Profile;
