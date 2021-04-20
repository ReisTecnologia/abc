import React from 'react'
import { useQuery } from '@apollo/client'
import { LessonsPage } from './LessonsPage'
import { Spinner } from '_shared/Spinner'
import { LESSONS_QUERY } from './LESSONS_QUERY'

export const LessonsPageLoader = () => {
  const { data, refetch, loading, error } = useQuery(LESSONS_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  if (error) {
    console.error(error)
  }

  return loading ? (
    <Spinner />
  ) : data && data.lessons ? (
    <LessonsPage lessons={data.lessons} refetch={refetch} />
  ) : null
}
