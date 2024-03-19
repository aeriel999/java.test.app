
import { Input, Space } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import {useNavigate} from "react-router-dom";

const { Search } = Input;

const SearchField  = () => {
    const navigate = useNavigate();
    const onSearch: SearchProps['onSearch'] = (searchTerm) => {

        navigate(`/categories/search/${searchTerm}`);
    };
    return (
        <Space direction="horizontal">
            <Search
                placeholder="input category name"
                onSearch={onSearch}
                style={{ width: 200, margin: 15 }}
                enterButton
            />

        </Space>
    )

};

export default SearchField;