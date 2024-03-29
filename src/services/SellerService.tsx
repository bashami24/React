


const apiBaseURL = "http://localhost:9005/";

export function getAllSellersAPI() {
    return fetch(apiBaseURL + "seller", {
        method: "GET",
        mode: "cors"
    });
}

export function addSellerAPI( id: number , seller: string,) {
    return fetch(apiBaseURL + "seller", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, seller })
    });
}