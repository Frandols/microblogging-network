export default function createdPostToast(content: string) {
  const shortedContent = content.substring(0, 15)

  return `Successfully created post: "${shortedContent}..."`
}
