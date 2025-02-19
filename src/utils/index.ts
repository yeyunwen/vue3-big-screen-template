export * from './fitSize'

// 获取assets静态资源
export const getAssetsFile = (url: string) => {
  console.log(
    'new URL(`../assets/${url}`, import.meta.url)',
    new URL(`../assets/${url}`, import.meta.url),
    import.meta.url,
    url,
    `../assets/${url}`,
  )

  return new URL(`../../assets/${url}`, import.meta.url).href
}
