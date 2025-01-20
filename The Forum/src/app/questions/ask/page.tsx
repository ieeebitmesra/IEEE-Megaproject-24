import React from 'react'
import QuestionForm from '@/components/QuestionForm'

const page = () => {
  return (
    <div className='w-[70vw] justify-center mx-auto my-0 mb-10 py-20'>
      <h1 className='m-10 text-4xl '>Ask a Question</h1>
      <QuestionForm />
    </div>
  )
}

export default page
