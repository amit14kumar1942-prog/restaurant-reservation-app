import { collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { Reservation } from "../types";

const RESERVATIONS_COLLECTION = "estate_reservations";

export const saveReservationToFirestore = async (reservation: Omit<Reservation, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, RESERVATIONS_COLLECTION), {
      ...reservation,
      createdAt: serverTimestamp(),
      status: 'Confirmed'
    });
    return docRef.id;
  } catch (error) {
    console.warn("Firestore write fallback (local mock mode):", error);
    return "MOCK-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
};

export const fetchRecentReservations = async (max: number = 5): Promise<Reservation[]> => {
  try {
    const q = query(collection(db, RESERVATIONS_COLLECTION), orderBy("createdAt", "desc"), limit(max));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Reservation[];
  } catch (error) {
    console.warn("Firestore fetch fallback:", error);
    return [];
  }
};
