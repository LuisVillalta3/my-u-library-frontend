import React from 'react'
import { Breadcrumbs, Container, Link, Paper, Typography } from '@mui/material'
import { MainLayout } from '../../layouts/MainLayout'
import { BreadcrumbItem, Heading } from '../../components/Heading'

export const Users = () => {
  const items: BreadcrumbItem[] = [
    { title: 'Users', current: true },
  ]
  return (
    <MainLayout>
      <Heading title='Users' items={items} />
    </MainLayout>
  )
}
