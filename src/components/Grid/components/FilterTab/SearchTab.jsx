import { Button, Input, Space } from 'antd';
import React, { useRef } from 'react'
import { SearchOutlined } from '@ant-design/icons'

const SearchTab = ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close, dataIndex, setSearchedColumn, setSearchText }) => {

    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters, confirm) => {
        clearFilters();
        confirm();
        setSearchedColumn('');
        setSearchText('');
    };
    return (
        <div
            style={{
                padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
        >
            <Input
                ref={searchInput}
                placeholder={`Search ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                style={{
                    marginBottom: 8,
                    display: 'block',
                }}
            />
            <Space>
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{
                        width: 90,
                    }}
                >
                    Search
                </Button>
                <Button
                    onClick={() => clearFilters && handleReset(clearFilters, confirm)}
                    size="small"
                    style={{
                        width: 90,
                    }}
                >
                    Reset
                </Button>
                <Button
                    type="link"
                    size="small"
                    onClick={() => {
                        close();
                    }}
                >
                    Close
                </Button>
            </Space>
        </div >
    )
}

export default SearchTab