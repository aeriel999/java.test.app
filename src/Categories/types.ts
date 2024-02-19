export interface ICategoryCreate {
    name: string;
    file: File | undefined;
    description: string;
}

export interface IUploadedFile {
    lastModified: number;
    lastModifiedDate: Date;
    name: string;
    originFileObj: File;
    percent: number;
    size: number;
    thumbUrl: string;
    type: string;
    uid: string;
}

export interface ICategoryItem {
    id: number;
    name: string;
    description: string;
    file: string;
}

export interface ICategoryEdit {
    id: number;
    name: string;
    file: File | undefined;
    description: string;
}

export  type FieldType = {
    name?: string;
    description?: string;
};