import type { TaskKey } from '@/lib/site-config'

export const editableTaskLabels: Partial<Record<TaskKey, string>> = {
  listing: 'Places',
  sbm: 'Reads',
}

export function editableTaskLabel(task: TaskKey, fallback: string) {
  return editableTaskLabels[task] || fallback
}

export function editableTaskLabelLower(task: TaskKey, fallback: string) {
  return editableTaskLabel(task, fallback).toLowerCase()
}
