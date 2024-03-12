const apiBaseURL = "http://localhost:9017/";

export function getAllProductsAPI() {
    return fetch(apiBaseURL + "product", {
        method: "GET",
        mode: "cors"
    });
}

export function addProductAPI(id: number, Name: string, price: number, sellerId: number) {
    return fetch(apiBaseURL + "product", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, name: Name, price, sellerId })
    });
}

export function deleteProductAPI(id: number){
    return fetch (apiBaseURL + `product/${id}`,{
        method:"DELETE",
        mode: "cors"
    });
}

export const updateProductAPI = async (newid: number, newName: string, newPrice: number, newSellerId: number): Promise<void> => {
    try {
        await fetch(`${apiBaseURL}/products/${newid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: newid, name: newName, price: newPrice, sellerId: newSellerId })
        });
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};