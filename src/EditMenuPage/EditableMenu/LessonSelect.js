import React, { useRef } from 'react'
import PropTypes from 'prop-types'

export const LessonSelect = ({ onSelect, lessons, defaultSelect }) => {
  const ref = useRef()
  const handleChange = (e) => {
    onSelect(e.target.value)
    ref.current.value = null
  }

  return (
    <>
      <select ref={ref} onChange={handleChange} value={defaultSelect}>
        <option value={null}>{null}</option>
        {lessons.map(({ id, name }) => (
          <option value={id} key={id}>
            {name}
          </option>
        ))}
      </select>
    </>
  )
}

LessonSelect.propTypes = {
  onSelect: PropTypes.func,
  lessons: PropTypes.array,
  defaultSelect: PropTypes.string,
}
