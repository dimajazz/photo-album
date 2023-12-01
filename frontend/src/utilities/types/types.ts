export type PostType = {
  id: number;
  image_url: string;
  image_url_type: string;
  caption: string;
  timestamp: Date;
  creator: PostCreatorDisplayType;
  comments: CommentType[];
};

export type PostCreatorDisplayType = {
  username: string;
};

export type CommentType = {
  username: string;
  text: string;
  timestamp: Date;
};

export type UserDataType = {
  access_token: string;
  token_type: 'bearer';
  user_id: number;
  username: string;
};
