import RoomDetails from "@/components/RoomDetails";
import { NavbarDemo } from "@/components/ui/Navbar";

export default function RoomPage({ params }: { params: { id: string } }) {
  return(
  <>  <NavbarDemo />
  <RoomDetails params={params} />
  </>

  );
}