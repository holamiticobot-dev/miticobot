import { Suspense } from "react";
import Chat from "@/components/Chat";

export default function ChatPage() {
  return (
    <div style={{ overflow: "hidden", height: "calc(100vh - 68px)" }}>
      <Suspense>
        <Chat />
      </Suspense>
    </div>
  );
}
