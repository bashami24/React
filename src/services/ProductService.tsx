const apiBaseURL = "http://localhost:9017/";

export function getAllProductsAPI() {
    return fetch(apiBaseURL + "product", {
        method: "GET",
        mode: "cors"
    });
}

export function addProductAPI( Name: string, price: number, seller: number) {
    return fetch(apiBaseURL + "product", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: Name, price, seller })
    });
}

export function deleteProductAPI(id: number){
    return fetch (apiBaseURL + `product/${id}`,{
        method:"DELETE",
        mode: "cors"
    });
}

export const updateProductAPI = async (id: number, newName: string, newPrice: number, Seller: number): Promise<void> => {
    try {
        await fetch(apiBaseURL +`product/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id, name: newName, price: newPrice, sellerId: Seller})
        });
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};