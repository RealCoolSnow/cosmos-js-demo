import React from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from '@/store'
import { asyncAddNumber } from '@/store/counter/thunk'

const Counter = () => {
  const counter = useSelector((state: RootState) => state.counter.n)
  const dispatch = useDispatch<Dispatch>()
  return (
    <>
      <div
        onClick={() => dispatch(asyncAddNumber(1))}
        className="py-2 text-center text-white rounded-sm bg-green-500 active:bg-green-300"
      >
        Click me - {counter}
      </div>
      {/* <Button onClick={this.props.dec}>dec-{this.props.counter}</Button> */}
    </>
  )
}

export default Counter
