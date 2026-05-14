import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";
import { auth, db } from "../firebase";

function withTimeout(promise, timeoutMs) {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error("Firestore request timed out"));
    }, timeoutMs);
  });

  return Promise.race([promise, timeoutPromise]).finally(() => {
    clearTimeout(timeoutId);
  });
}

export async function submitBookingRequest(bookingPayload) {
  if (!auth.currentUser) {
    await withTimeout(signInAnonymously(auth), 15000);
  }

  const payload = {
    ...bookingPayload,
    userId: auth.currentUser?.uid ?? null,
    email: auth.currentUser?.email ?? null,
    status: "Pending",
    createdAt: serverTimestamp(),
    createdAtClient: new Date().toISOString(),
  };

  const docRef = await withTimeout(
    addDoc(collection(db, "bookings"), payload),
    15000,
  );

  return {
    status: "success",
    booking: { ...bookingPayload, status: "Pending", id: docRef.id },
    id: docRef.id,
  };
}
