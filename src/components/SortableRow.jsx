import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
const SortableRow = ({ record, children, ...props }) => {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: record.key }); // Use 'ID' as the identifier

    const style = {
        ...props.style,
        transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
        transition,
        ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
    };

    return (
        <SortableContext.Item {...props} {...attributes} id={record.key}>
            <tr ref={setNodeRef} style={style}>
                {React.Children.map(children, (child) => {
                    if (child && child.props && child.props.dataIndex === 'sort') {
                        return React.cloneElement(child, {
                            children: (
                                <Button
                                    style={{ touchAction: 'none', cursor: 'move' }}
                                    {...listeners}
                                >
                                    Drag
                                </Button>
                            ),
                        });
                    }
                    return child;
                })}
            </tr>
        </SortableContext.Item>
    );
};
export default SortableRow;