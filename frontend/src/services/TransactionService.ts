import axios from "axios";

export interface Transaction {
    id?: number;
    dateTime: string;
    sum: number;
    category: string;
    comment: string;
    author: string;
}

const API_URL = "http://localhost:5002/transactions";

export const fetchTransactions = async (): Promise<Transaction[]> => {
    const { data } = await axios.get(API_URL);
    return data;
};

export const addTransaction = async (transaction: Transaction) => {
    await axios.post(API_URL, transaction);
};

export const deleteTransaction = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
};
