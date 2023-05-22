import {Menu} from 'antd';
import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {GithubOutlined, TwitterOutlined} from "@ant-design/icons";
import './index.css'
import {getEthPrice} from "@utils";

const EthPrice = () => {
    const [ethPrice, setEthPrice] = useState(null);
    useEffect(() => {
        const fetchPrice = async () => {
            const price = await getEthPrice();
            setEthPrice(price);
        };
        fetchPrice();
        const interval = setInterval(fetchPrice, 10000);
        return () => clearInterval(interval);
    }, []);
    if (ethPrice === null) {
        return <div>Loading ETH Price...</div>;
    }
    return <div>ETH Price: ${ethPrice}</div>
}
const MenuHeader = () => {
    const items = [
        {
            label: 'zkSync',
            key: 'zksync',
        },
        {
            label: 'Stark',
            key: 'stark',
        },
        {
            label: 'LayerZero',
            key: 'layer',
        },
        {
            label: 'Mirror',
            key: 'mirror',
        },
        {
            label: 'Deposit',
            key: 'deposit',
        },
       
        {
            label: <EthPrice/>,
            key: 'ethPrice',
        }
    ];
    const navigate = useNavigate();
    const location = useLocation();
    const [current, setCurrent] = useState(location.pathname.replace('/', '') || 'zksync');
    const onClick = (e) => {
        setCurrent(e.key);
    };
    useEffect(() => {
        if (location.pathname.replace('/', '') === 'twitter' || location.pathname.replace('/', '') === 'github') {
            return;
        }
        setCurrent(location.pathname.replace('/', '') || 'zksync');
    }, [location.pathname]);

    useEffect(() => {
        if (current === 'twitter' || current === 'github') {
            return;
        }
        navigate(`/${current}`);
    }, [current]);

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            style={{
                display: 'flex',
                justifyContent: 'center'
            }}
            className="custom-menu"
            items={items}
        >
        </Menu>
    );

};
export default MenuHeader;
