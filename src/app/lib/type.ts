export interface APIResposneModel {
    message: string,
    result: string,
    data: any
}

export interface Product {
    productId: number;
    productSku: string;
    productName: string;
    productPrice: number;
    productShortName: string;
    productDescription: string;
    createdDate: string;
    deliveryTimeSpan: string;
    categoryId: number;
    productImageUrl: string;
    categoryName: string;
}

export interface Category {
    categoryId: number;
    categoryName: string;
    parentCategoryId: number;
    userId?: any;
}