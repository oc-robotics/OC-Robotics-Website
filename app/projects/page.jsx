import React from 'react'
import { getAllProjects } from '@/lib/projectsData'
import DefaultProjects from './defaultProjects'

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <DefaultProjects projects={projects} />
  )
}