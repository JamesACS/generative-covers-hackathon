export const getSandbox = async (context) => {
    const url = new URL(context.query?.sandbox || 'https://codesandbox.io/s/floating-laptop-q23sw')
    // TODO: make this not bad
    const apiUrl = `https://codesandbox.io/${url.pathname.replace('/s/', '/api/v1/sandboxes/')}/slim`

    const res = await fetch(apiUrl)
    const data = await res.json()

    return {
      props: data
    }
}