export type PostType = {
  id: number;
  image_url: string;
  image_url_type: string;
  caption: string;
  timestamp: Date;
  likes: LikeType[];
  creator: PostCreatorDisplayType;
  comments: CommentType[];
};

export type PostCreatorDisplayType = {
  username: string;
  id: number;
};

export type CommentType = {
  id: number;
  username: string;
  text: string;
  likes: LikeType[];
  timestamp: Date;
};

export type UserDataType = {
  access_token: string;
  token_type: 'bearer';
  user_id: number;
  username: string;
};

export type LikeType = {
  user_id: number;
  post_id: number;
};
