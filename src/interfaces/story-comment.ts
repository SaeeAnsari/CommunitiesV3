export interface StoryComment {
    id: number,
    storyID: number,
    userID: number,
    comment: string,
    likeCount: number,
    dislikeCount: number,
    viewCount: number,
    timestamp: Date,    
    userDisplayName: string,
    userProfileImage: string
}
