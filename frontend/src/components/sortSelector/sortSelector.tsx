import {
  OLDEST,
  NEWEST,
  MOST_POPULAR,
  BIGGEST_DEBATE,
} from 'constants/constants';
import { SortType } from 'formatters/sortItems';
import './sortSelector.css';

export const SortSelector = (props: SortSelectorProps) => {
  const { selectedValue, setSelectedValue, targetType, isDisabled } = props;  

  return (
    <div className="sort">
        <h4 className='title'>Sort by:</h4>
        <select
        className='sort-selector'
        value={selectedValue}
        name='sort'
        disabled={isDisabled}
        onChange={(event) => setSelectedValue(event?.target.value as SortType)}
        >
        <option value={NEWEST}>NEWEST</option>
        <option value={OLDEST}>OLDEST</option>
        <option value={MOST_POPULAR}>MOST_POPULAR</option>
        {targetType === 'post' && (
            <option value={BIGGEST_DEBATE}>BIGGEST_DEBATE</option>
        )}
        </select>
    </div>
  );
};

type SortSelectorProps = {
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<SortType>>;
  targetType: 'post' | 'comment';
  isDisabled: boolean
};
