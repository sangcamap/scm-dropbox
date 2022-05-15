import React, {memo} from 'react'

export default memo(function ComB() {
  console.log("render B");
  return (
    <div>ComB</div>
  )
})


