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
    categoryUrlSlug: string | null,
    tags: ITagForShowPostDTO[] | null
}
export interface IGetPosts {
    list: IPost[],
    totalCount: number

}

export interface IGetPostsByCategory {
    list: IPost[],
    totalCount: number
    categoryName: string | null,
    categoryDescription: string | null,
}

export interface IGetPostsByTag {
    list: IPost[],
    totalCount: number
    tagName: string | null,
    tagDescription: string | null,
}
export interface ITagForShowPostDTO{
    id: number,
    name: string,
    urlSlug: string
}

export interface IBlogShow{
    page: number,
    pageSize: number
}

export interface IBlogShowByCategory{
    page: number,
    pageSize: number,
    categoryId: number
}

export interface IBlogShowByTag{
    page: number,
    pageSize: number,
    tagId: number
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

