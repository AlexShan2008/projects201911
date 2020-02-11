export default function (props) {
    console.log(props);
    let id = props.match.params.id;
    if (id === 1) {

    } else {//无权限
        router.push('/login');
    }
    return (
        <div>
            ID: {props.match.params.id}
        </div>
    );
}
