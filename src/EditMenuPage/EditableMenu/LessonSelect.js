import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client'
import { LESSONS_QUERY } from './LESSONS_QUERY'
import { Spinner } from 'shared/Spinner'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`
export const LabelWrapper = styled.label`
  padding-right: 8px;
`

export const LessonSelect = ({ onSelect }) => {
  const { data, loading } = useQuery(LESSONS_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  const handleChange = (e) => {
    onSelect(e.target.value)
  }
  const lessons = data && data.lessons ? data.lessons : []

  return (
    <Wrapper>
      {loading ? (
        <Spinner />
      ) : (
        <Wrapper>
          <LabelWrapper>Escolha aulas para adicionar ao menu:</LabelWrapper>
          <select onChange={handleChange} value={''}>
            <option value={null}>{null}</option>
            {lessons.map(({ id, name }) => (
              <option value={id} key={id}>
                {name}
              </option>
            ))}
          </select>
        </Wrapper>
      )}
    </Wrapper>
  )
}

LessonSelect.propTypes = {
  onSelect: PropTypes.func,
}
