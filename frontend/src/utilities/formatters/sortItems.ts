import { CommentType, PostType } from 'types/types';
import {
  OLDEST,
  NEWEST,
  MOST_POPULAR,
  BIGGEST_DEBATE,
} from 'constants/constants';

export const sortItems = (props: SortProps) => {
  const { items, sortType } = props;
  let sortedItems;

  switch (sortType) {
    case OLDEST:
      sortedItems = [...items].sort((prevItem, NextItem) => {
        const prevItemDate = new Date(`${prevItem.timestamp}`).getTime();
        const NextItemDate = new Date(`${NextItem.timestamp}`).getTime();
        return prevItemDate - NextItemDate;
      });
      return sortedItems;
    case NEWEST:
      sortedItems = [...items].sort((prevItem, NextItem) => {
        const prevItemDate = new Date(`${prevItem.timestamp}`).getTime();
        const NextItemDate = new Date(`${NextItem.timestamp}`).getTime();
        return NextItemDate - prevItemDate;
      });
      return sortedItems;
    case MOST_POPULAR:
      sortedItems = [...items].sort((prevItem, NextItem) => {
        return NextItem.likes.length - prevItem.likes.length;
      });
      return sortedItems;
    case BIGGEST_DEBATE:
      const newitemsArray: PostType[] = [...items] as PostType[];
      newitemsArray.sort((prevItem: PostType, NextItem: PostType) => {
        return NextItem.comments.length - prevItem.comments.length;
      });
      return newitemsArray;
    default:
      sortedItems = [...items].sort((prevItem, NextItem) => {
        const prevItemDate = new Date(`${prevItem.timestamp}`).getTime();
        const NextItemDate = new Date(`${NextItem.timestamp}`).getTime();
        return prevItemDate - NextItemDate;
      });
      return sortedItems;
  }
};

export type SortProps = {
  items: PostType[] | CommentType[];
  sortType: SortType;
};

export type SortType =
  | typeof OLDEST
  | typeof NEWEST
  | typeof MOST_POPULAR
  | typeof BIGGEST_DEBATE;
