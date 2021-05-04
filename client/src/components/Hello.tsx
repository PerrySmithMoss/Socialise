import { useHelloQuery } from "../generated/graphql"

const Hello: React.FC = () => {
    const { data, loading } = useHelloQuery();

    if(loading || !data) {
        return <div> Loading...</div>
    }

    return <div>{data.hello}</div>
}

export default Hello