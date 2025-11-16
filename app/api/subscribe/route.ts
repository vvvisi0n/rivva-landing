import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email required" }), {
        status: 400,
      });
    }

    await addDoc(collection(db, "waitlist"), {
      email,
      createdAt: serverTimestamp(),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error saving email:", error);
    return new Response(JSON.stringify({ error: "Failed to save" }), {
      status: 500,
    });
  }
}
