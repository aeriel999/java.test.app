import {Status} from "../../utils/enums";


export interface IBlogState {
    post: IPost | null,
    postList: IPost[] | null,
    status: Status;
}
export interface IPost{
    id: number,
    title: string,
    shortDescription: string,
    description: string,
    meta: string,
    urlSlug: string,
    categoryId: number,
    categoryName: string,
    postedOn: string,
    modified: string | null,
    tags: ITagForShowPostDTO[] | null
}

export interface ITagForShowPostDTO{
    id: number,
    name: string,
}

export interface IBlogCategory{
    id: number,
    name: string,
    description: string,
}

export  interface ITag{
    id: number,
    name: string,
    description: string,
    urlSlug: string,
}

