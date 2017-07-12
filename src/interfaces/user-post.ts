export interface UserPost {
    storyID:number;
    title:string;
    text:string;
    imageURL?: string;
    likeCount? : number;
    dislikeCount?: number;
    commentsCount?: number;
    totalViews?: number;
    userID:number;
    userFullName:string;
    postDate:string;
    userProfileImage:string;
    storyExternalURL:string;
}
