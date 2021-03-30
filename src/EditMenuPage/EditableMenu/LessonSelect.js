import React from 'react'
import PropTypes from 'prop-types'

export const LessonSelect = ({ onSelect, lessons, defaultSelect }) => {
  const handleChange = (e) => {
    let splitTargetValue = e.target.value.split(',')

    onSelect(splitTargetValue[0], splitTargetValue[1])
  }

  return (
    <>
      <select onChange={handleChange} value={defaultSelect}>
        <option value={null}>{null}</option>
        {lessons.map(({ id, name, image }) => (
          <option value={`${id},${image}`} key={id}>
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
