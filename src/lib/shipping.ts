export type ShippingCalculation = {
    baseFee: number;
    weightFee: number;
    totalShipping: number;
    isFree: boolean;
    taxAmount: number;
};

export function calculateShipping(
    totalItemsPrice: number,
    state: string,
    items: { weight: string; quantity: number }[]
): ShippingCalculation {
    // 1. FREE SHIPPING THRESHOLD
    if (totalItemsPrice >= 1500) {
        return { baseFee: 0, weightFee: 0, totalShipping: 0, isFree: true, taxAmount: totalItemsPrice * 0.12 };
    }

    // 2. PARSE TOTAL WEIGHT (in grams)
    let totalWeightGrams = 0;
    items.forEach(item => {
        const weightStr = item.weight.toLowerCase();
        let grams = 0;
        
        if (weightStr.includes('kg')) {
            grams = parseFloat(weightStr.replace('kg', '')) * 1000;
        } else if (weightStr.includes('g')) {
            grams = parseFloat(weightStr.replace('g', ''));
        } else {
            // Default to 500g if unknown
            grams = 500;
        }
        totalWeightGrams += grams * item.quantity;
    });

    // 3. REGIONAL RATES
    // South India states (lower shipping cost)
    const southIndiaStates = ['karnataka', 'kerala', 'tamil nadu', 'andhra pradesh', 'telangana', 'goa'];
    const isSouthIndia = southIndiaStates.includes(state.toLowerCase());
    
    const baseFee = 50;
    const ratePer500g = isSouthIndia ? 40 : 80;
    const weightFee = Math.ceil(totalWeightGrams / 500) * ratePer500g;
    
    const totalShipping = baseFee + weightFee;
    const taxAmount = (totalItemsPrice + totalShipping) * 0.12;

    return {
        baseFee,
        weightFee,
        totalShipping,
        isFree: false,
        taxAmount
    };
}
