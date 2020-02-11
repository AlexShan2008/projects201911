import Link from 'umi/link';
export default function () {
  return (
    <ul>
      <li>
        <Link to="/users/detail/1">张三</Link>
      </li>
      <li>
        <Link to="/users/detail/2">李四</Link>
      </li>
    </ul >
  );
}
