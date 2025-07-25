import React, {useId} from 'react'

const Input = React.forwardRef(function Input ({
    label, 
    type = 'text',
    className = '',
    ...props
    }, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1' htmlFor={id}>{label}
            </label>}
            <input 
            type={type}
            className={`p-4 rounded-full bg-white/10 text-white outline-none border border-transparent focus:border-white duration-200 ${className}`}
            ref = {ref}
            {...props}
            id={id}/>
        </div>
    )
})

export default Input