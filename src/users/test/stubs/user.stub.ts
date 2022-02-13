type returnedUser = {
    id: string;
    username: string;
    seller: boolean;
    address: Address;
}
type Address = {
    addr1: string;
    
    addr2?: string;
    
    city: string;
    
    state: string;
    
    country: string;
    
    zip: string;
}
export const userStub = (): returnedUser => {
    return {
        id: "22323",
        username: "flex",
        seller: false,
        address: {
            addr1: "lag",
            city: "lag",
            state: "lag",
            country: "lags",
            zip: "00100"
        }
    }
}