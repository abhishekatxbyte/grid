import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Input } from 'antd';
import { CSS } from '@dnd-kit/utilities';
import { MenuOutlined } from '@ant-design/icons';
const EditableContext = React.createContext(null);
import {
    useSortable,
} from '@dnd-kit/sortable';
export const Row = ({ children, ...props }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: props['data-row-key'],
    });
    const style = {
        ...props.style,
        transform: CSS.Transform.toString(
            transform && {
                ...transform,
                scaleY: 1,
            },
        ),
        transition,
        ...(isDragging
            ? {
                position: 'relative',
                zIndex: 9,
            }
            : {}),
    };
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>

            <tr {...props} ref={setNodeRef} style={style} {...attributes}>
                {React.Children.map(children, (child) => {
                    if (child.key === 'sort') {
                        return React.cloneElement(child, {
                            children: (
                                <MenuOutlined
                                    ref={setActivatorNodeRef}
                                    style={{
                                        touchAction: 'none',
                                        cursor: 'move',
                                    }}
                                    {...listeners}
                                />
                            ),
                        });
                    } else {
                        return (<EditableContext.Provider value={form}>{child}</EditableContext.Provider>);
                    }

                })}
            </tr>
        </Form>
    );
};
export const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);

    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({
                ...record,
                ...values,
            });
        } catch (errInfo) {
            // console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                    userSelect: 'none', // Add userSelect property to prevent text selection
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};
