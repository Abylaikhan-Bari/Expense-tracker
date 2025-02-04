import axios from "axios";

export interface Transaction {
    id?: number;
    dateTime: string;
    sum: number;
    category: string;
    comment: string;
    author: string;
}

const API_URL = "http://localhost:5002/transactions";  // Adjust if your backend runs on a different port

export const getTransactions = async (): Promise<Transaction[]> => {
    const { data } = await axios.get(API_URL);
    return data;
};

export const saveTransaction = async (transaction: Transaction): Promise<Transaction> => {
    const { data } = await axios.post(API_URL, transaction);
    return data;
};

export const deleteTransaction = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};
