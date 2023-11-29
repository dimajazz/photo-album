import { useClickOutside } from 'hooks/useClickOutside';

import './modal.css';

export const Modal = (props: ModalProps) => {
  const { isModalShown = false, setIsModalShown, children } = props;

  const refModal = useClickOutside({
    isElementActive: isModalShown,
    setIsElementActive: setIsModalShown,
  });

  return (
    <>
      {isModalShown && (
        <div className='modalWrapper'>
          <div className='modal' ref={refModal}>
            <div className='modalBody'>{children}</div>
            <button
              title='close'
              type='button'
              onClick={() => setIsModalShown(false)}
              className='closeBtn'
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

type ModalProps = {
  isModalShown: boolean;
  setIsModalShown: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element;
};
