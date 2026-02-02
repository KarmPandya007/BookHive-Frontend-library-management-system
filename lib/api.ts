export const API_BASE_URL = "https://book-hive-backend-library-managemen.vercel.app/api";

export interface Book {
    _id: string;
    title: string;
    author: string;
    description: string;
    category: string;
    isbn: string;
    totalCopies: number;
    availableCopies: number;
    issuedCount: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ApiResponse {
    success: boolean;
    count: number;
    allBooks: Book[];
}
