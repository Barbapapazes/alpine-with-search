import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

interface Section {
  // Path to the section
  id: string
  // Title of the section
  title: string
  // Content of the section
  content: string
}

const HEADING = /^h([1-6])$/
const isHeading = (tag: string) => HEADING.test(tag)

export function splitPageIntoSections(page: ParsedContent) {
  const sections: Section[] = []

  sections.push({
    id: page._path as string,
    title: page.title as string,
    content: '',
  })

  // No section
  let section = 0
  for (const item of page.body.children) {
    if (item.tag && isHeading(item.tag)) {
      const title = extractTextFromAst(item)

      sections.push({
        id: `${page._path as string}#${item.props!.id}`,
        title,
        content: '',
      })

      section += 1
    }
    else if (item.tag) {
      sections[section].content += extractTextFromAst(item)
    }
  }

  return sections
}

function extractTextFromAst(node: any) {
  let text = ''

  // Get text from markdown AST
  if (node.type === 'text')
    text += node.value

  // Do not explore children
  if (node.tag === 'code' || node.tag === 'style')
    return ''

  // Explore children
  if (node.children) {
    for (const child of node.children)
      text += ` ${extractTextFromAst(child)}`
  }

  return text.trim()
}
