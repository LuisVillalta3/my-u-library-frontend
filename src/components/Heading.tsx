import React from 'react'
import { Breadcrumbs, Container, Link, Paper, Typography } from '@mui/material'

type Props = {
  title: string,
  items?: BreadcrumbItem[]
}

export type BreadcrumbItem = {
  title: string,
  href?: string,
  current?: boolean,
}

export const Heading: React.FC<Props> = ({ title, items }) => {
  return (
    <Paper elevation={3} sx={{ flexGrow: 1, p: 3 }}>
      <Container>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>

        {items && items.length > 0 && (
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Dashboard
            </Link>
            {items.map((item: BreadcrumbItem) => (
              <BreadcrumbItemLink {...item} key={item.title} />
            ))}
          </Breadcrumbs>
        )}
      </Container>
    </Paper>
  )
}

const BreadcrumbItemLink: React.FC<BreadcrumbItem> = ({ title, current, href }) => {
  if (current) {
    return <Typography color="text.primary">{title}</Typography>
  }

  return <Link underline="hover" color="inherit" href={href}>{title}</Link>
}
