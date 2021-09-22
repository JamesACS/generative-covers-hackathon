import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '../components/Layout'

import { Pixels } from '../designs/pixels'
import { Heartbeat } from '../designs/heartbeat'
import { HeartbeatGradient } from '../designs/heartbeat_gradient'
import { Text } from '../designs/text'
import { Wave } from '../designs/wave'
import { Lines } from '../designs/lines'
import { getSandbox } from '../utils/ssr'

const Design = ({ href, children, seed, title }) => {
  return (
    <div id={seed}>
      <Link href={href}>
        <a onClick={(event) => {
          if (event.metaKey) {
            event.preventDefault()
            const canvas = event.currentTarget.querySelector('canvas')
            const data = canvas.toDataURL('image/png')
            const anchor = document.createElement('a')
            anchor.setAttribute('download', `${title}-${seed}.png`)
            anchor.setAttribute('href', data)
            anchor.click()
          }
        }}>
          {children}
        </a>
      </Link>
    </div>

  )
}

const IndexPage = (props) => {
  console.log(props)
  const router = useRouter()
  const sandbox = router.query.sandbox || ''

  const withSandboxQuery = (path: string): string => {
    const qs = new URLSearchParams()
    qs.append('sandbox', sandbox as string)
    return `${path}?${qs}`
  }

  return (
    <Layout title="Home">
      <div className="search">
        <div className="container">
          <h1>Generative covers</h1>
          <form onSubmit={(event) => {
            event.preventDefault()
            const sandboxUrl = event.target?.url?.value;
            const qs = new URLSearchParams()
            qs.append('sandbox', sandboxUrl)
            window.location.replace(window.location.pathname + '?' + qs)
          }}>
            <input defaultValue={sandbox} name="url" placeholder="Your Sandbox URL" onBlur={(event) => console.log(event.target.value)} />
          </form>
        </div>
      </div>
      <div className="home">
        <div className="container">
          <Design href={withSandboxQuery("/designs/pixels")} seed={props.sha} title={props.title} >
            <Pixels {...props} />
          </Design>
          <Design href={withSandboxQuery("/designs/wave")} seed={props.sha} title={props.title} >
            <Wave {...props} />
          </Design>
          <Design href={withSandboxQuery("/designs/text")} seed={props.sha} title={props.title} >
            <Text {...props} />
          </Design>
          <Design href={withSandboxQuery("/designs/heartbeat")} seed={props.sha} title={props.title} >
            <Heartbeat {...props} />
          </Design>
          <Design href={withSandboxQuery("/designs/heartbeat_gradient")} seed={props.sha} title={props.title} >
            <HeartbeatGradient {...props} />
          </Design>
          <Design href={withSandboxQuery("/designs/lines")} seed={props.sha} title={props.title} >
            <Lines {...props} />
          </Design>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = getSandbox

export default IndexPage
