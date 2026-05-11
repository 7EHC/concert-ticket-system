export interface Concert {
  id: string;
  title: string;
  artist: string;
  venue: string;
  date: string;
  description: string;
  price: number;
  imageUrl: string;
  ticketTypes: TicketType[];
  availableTickets: number;
}

export interface TicketType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  available: number;
}

export interface Booking {
  id: string;
  concertId: string;
  userId: string;
  ticketTypeId: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}