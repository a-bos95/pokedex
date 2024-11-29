import { useRef, forwardRef, useEffect } from 'react'
import { createPortal } from 'react-dom';

function Modal({ onSubmit }, ref) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!localStorage.getItem('userName')) {
      dialogRef.current?.showModal();
    }
  }, []);

  const handleSubmit = (e) => {
    const name = ref.current.value.trim();
    if (name) {
      localStorage.setItem('userName', name);
      onSubmit(name);
      dialogRef.current?.close();
    }
  };
  
  return createPortal(
    <dialog ref={dialogRef} className='backdrop:bg-black/50 backdrop:backdrop-blur-md absolute z-20 top-1/2'>
      <form onSubmit={handleSubmit} className='prose justify-self-center p-10 bg-primary flex flex-col z-20'>
        <h2 className='text-white'>What's your name?</h2>
        <input 
          type="text" 
          className='input input-bordered input-secondary w-full max-w-xs' 
          placeholder='Please enter your name' 
          ref={ref}
        />
        <button 
          type='submit' 
          className='btn btn-secondary mt-5 self-center'
        >
          Submit
        </button>
      </form>
    </dialog>, 
    document.querySelector('#modal')
  )
}

export default forwardRef(Modal);