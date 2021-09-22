import { Heartbeat as Design } from '../../designs/heartbeat'
import { Frame } from '../../components/Frame'
import { getSandbox } from '../../utils/ssr'

const Page = (props) => (
    <Frame>
        <Design {...props}/>
    </Frame>
)
export const getServerSideProps = getSandbox

export default Page