import SearchTab from './FilterTab/SearchTab'
import FilterTab from './FilterTab/FilterTab'
import { SearchOutlined, FilterOutlined, MenuOutlined } from '@ant-design/icons'
import { Tabs } from 'antd';
import Highlighter from 'react-highlight-words';
import React, { useState } from 'react'

const getColumnSearchProps = (dataIndex) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [leftPinnedColumns, setLeftPinnedColumns] = useState([]);
    const [rightPinnedColumns, setRightPinnedColumns] = useState([]);
    return (
        {
            filterSearch: true,

            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => {

                const onChange = (key) => {
                    console.log(key);
                };
                const items = [
                    {
                        key: '1',
                        label: <div style={{ width: '100%', margin: 0 }}> <SearchOutlined style={{ margin: 0, padding: '6px' }} /></div>,
                        children: <SearchTab dataIndex={dataIndex} setSelectedKeys={setSelectedKeys} selectedKeys={selectedKeys} confirm={confirm} clearFilters={clearFilters} close={close} setSearchText={setSearchText} setSearchedColumn={setSearchedColumn} />,
                    },
                    {
                        key: '2',
                        label: <div style={{ width: '100%', margin: 0 }}> <FilterOutlined style={{ margin: 0, padding: '6px' }} /></div>,
                        children: <FilterTab dataIndex={dataIndex} leftPinnedColumns={leftPinnedColumns} rightPinnedColumns={rightPinnedColumns} setLeftPinnedColumns={setLeftPinnedColumns} setRightPinnedColumns={setRightPinnedColumns} />,
                    },

                ];
                return <Tabs defaultActiveKey="1" items={items} style={{
                    padding: 8,
                    minWidth: 250,
                }} onChange={onChange} />
            },
            filterIcon: (filtered) => (
                <MenuOutlined
                    style={{
                        color: filtered ? '#1677ff' : '#22222',
                    }}
                />
            ),
            onFilter: (value, record) =>
                record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownOpenChange: (visible) => {
                if (visible) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
            render: (text) =>
                searchedColumn === dataIndex ? (
                    <Highlighter
                        highlightStyle={{
                            backgroundColor: '#ffc069',
                            padding: 0,
                        }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ''}
                    />
                ) : (
                    text
                ),
        }
    )
}

export default getColumnSearchProps