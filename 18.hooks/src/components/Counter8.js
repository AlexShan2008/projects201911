import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle, useLayoutEffect } from 'react';
/**
 * 如何使用hooks请求数据  以及如何使用async+await
 * loadMore加载下一页
 */
const limit = 5;
function useRequest(url) {
    //let limit = 5;//每页的条数 写死的
    let [loading, setLoading] = useState(false);
    let [offset, setOffset] = useState(0);
    let [data, setData] = useState([]);
    /*  async function loadMore() {
         setData(null);
         let newData = await fetch(`${url}?offset=${offset}&limit=${limit}`).then(response => response.json());
         setData([...data, ...newData]);
         setOffset(offset + newData.length);
     } */
    useEffect(() => {
        async function fetchData() {
            setData(null);
            let newData = await fetch(`${url}?offset=${offset}&limit=${limit}`).then(response => response.json());
            setData([...data, ...newData]);
            setOffset(offset + newData.length);
        }
        fetchData();
    }, [loading]);
    function loadMore() {
        setLoading(!loading);
    }
    //useEffect(loadMore, []);//加载第一页
    return [data, loadMore];
}

function App() {
    let [users, loadMore] = useRequest('http://localhost:8000/api/users');
    if (users === null || users.length == 0) {
        return <div>加载中....</div>
    }
    return (
        <>
            <ul>
                {
                    users.map((item, index) => (
                        <li key={item.id}>{item.id}:{item.name}</li>
                    ))
                }
            </ul>
            <button onClick={loadMore}>loadMore</button>
        </>
    )
}
export default App;