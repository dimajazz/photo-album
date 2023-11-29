import defaultImg from 'assets/statis/sheep-default-img.jpg';
import './card.css';

export const Card = (props: CardProps) => {
  const { title, imgUrl, children } = props;
  const onImgError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = defaultImg;
  };
  return (
    <div className='card'>
      <div className='card-header'>
        <img
          src={imgUrl}
          className='card-img'
          onError={onImgError}
          alt='photo'
        />
        <h3 className='card-title'>{title}</h3>
      </div>
      <div className='card-body'>{children}</div>
    </div>
  );
};

type CardProps = {
  title: string;
  imgUrl: string;
  children?: JSX.Element;
};
