export interface Story {
    id: number,
    userID: number,
    title: string,
    longDescription: string,
    imageURL: string,
    storyExternalURL,
     actions:{
         likeCount: number,
         dislikeCount: number,
         viewCount: number    
    }   
}
