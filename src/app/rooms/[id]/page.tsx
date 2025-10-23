import RoomDetails from "@/components/RoomDetails";

export default function RoomPage({ params }: { params: { id: string } }) {
  return <RoomDetails params={params} />;
}