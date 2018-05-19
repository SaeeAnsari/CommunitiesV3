
import { NgModule } from '@angular/core';

import { MarkerNewPostComponentModule } from './marker-new-post-component/marker-new-post-component.module';
import { UserCommentsComponentModule } from './user-comments-component/user-comments-component.module';
import { UserPostActionComponentModule } from './user-post-action-component/user-post-action-component.module';
import { UserPostsComponentModule } from './user-posts-component/user-posts-component.module';
import { UserTagComponentModule } from './user-tag-component/user-tag-component.module';
import { UserSearchItemComponentModule } from './user-search-item-component/user-search-item-component.module';
import { NewCommentComponentModule } from './new-comment-component/new-comment-component.module';
import { LoginComponentModule } from './login-component/login-component.module';
import { RegisterUserComponentModule } from './register-user-component/register-user-component.module';
import { CommunityItemComponentModule } from './community-item/community-item.module';
import { UploadedMediaPostComponentModule } from './uploaded-media-post/uploaded-media-post.module';
import { NewEventComponentModule } from './new-event/new-event.module';
import { ImageUploadComponentModule } from './image-upload/image-upload.module';
import { VideoUploadComponentModule } from './video-upload/video-upload.module';
import { LocalGalleryUploadComponentModule } from './local-gallery-upload/local-gallery-upload.module';
import { SocialSharingPopoverComponentModule } from './social-sharing-popover/social-sharing-popover.module';
import { EventPostComponentModule } from './event-post/event-post.module';
import { ForgetPasswordComponentModule } from './forget-password/forget-password.module';
import { CreateTopicComponentModule } from './create-topic/create-topic.module';
import { ViewTopicsComponentModule } from './view-topics/view-topics.module';


@NgModule({
    declarations: [
        
    ],
    imports: [
        UserSearchItemComponentModule,
        MarkerNewPostComponentModule,
        UserCommentsComponentModule,
        UserPostActionComponentModule,
        UserPostsComponentModule,
        UserTagComponentModule,
        NewCommentComponentModule,
        LoginComponentModule,
        RegisterUserComponentModule,
        CommunityItemComponentModule,
        UploadedMediaPostComponentModule,
        NewEventComponentModule,
        ImageUploadComponentModule,
        VideoUploadComponentModule,
        LocalGalleryUploadComponentModule,
        SocialSharingPopoverComponentModule,
        EventPostComponentModule,
        ForgetPasswordComponentModule,
        CreateTopicComponentModule,
        ViewTopicsComponentModule
    ],
    exports: [
        
    ]
})
export class ComponentsModule { }
