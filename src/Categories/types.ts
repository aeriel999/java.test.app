export interface ICategoryCreate {
    name: string;
    file: File;
    description: string;
}

export interface ICategoryItem {
    id: number;
    name: string;
    description: string;
    file: string;
}

export  type FieldType = {
    name?: string;
    description?: string;
};