
import { Seller } from '../models/Seller';

const apiBaseURL = "http://localhost:9017/";

export function getAllSellersAPI() {
    return fetch(apiBaseURL + "seller", {
        method: "GET",
        mode: "cors"
    });
}

export function addSellerAPI(name: string, id: number) {
    return fetch(apiBaseURL + "seller", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, id })
    });
}