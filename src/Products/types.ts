export interface IProductCreate {
    name: string;
    price: number;
    description: string;
    category_id: number;
    files: File[];
}

export interface IProductItem {
    id: number;
    name: string;
    price: number;
    description: string;
    category_id: number;
    files: string[];
}

export interface IGetProducts {
    list: IProductItem[],
    totalCount: number
}

export interface IProductSearch{
    name?: string,
    description?: string,
   categoryId?: number,
    page: number,
    size: number
}

export interface ICategoryName {
    id: number,
    name: string,
}

export interface IProductEdit {
    id?: number | undefined;
    name: string,
    price: string,
    description: string,
    newPhotos: IProductEditPhoto[] | null,
    oldPhotos: IProductEditPhoto[] | null,
    category_id: number,
}

export interface IProductEditPhoto{
    photo: string | undefined,
    priority: number,
}