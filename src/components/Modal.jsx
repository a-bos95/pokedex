import {useRef, forwardRef} from 'react'
import { createPortal } from 'react-dom';

function Modal({isOpen}, ref) {
  const dialogRef = useRef()

  return createPortal(
    <dialog ref={dialogRef} open={isOpen}>
      <div className='prose justify-self-center p-10 bg-primary flex flex-col z-20'>
        <h2 className='text-white'>What's your name?</h2>
        <input type="text" ref={ref} className='input input-bordered input-secondary w-full max-w-xs' placeholder='Please enter your name'/>
        <form method='dialog' className='flex flex-col'>
            <button className='btn btn-secondary mt-5 self-center'>Submit</button>
        </form>
      </div>
    </dialog>, document.querySelector('#modal')
  )
}

export default forwardRef(Modal);