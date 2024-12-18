import {Button, InputNumber} from 'antd';
import {FaMinus, FaPlus} from 'react-icons/fa';

interface QuantityControlProps {
    value: number;
    onChange: (value: number) => void;
    onIncrement: () => void;
    onDecrement: () => void;
}

const QuantityControl = ({value, onChange, onIncrement, onDecrement}: QuantityControlProps) => (
    <div style={{display: 'flex', alignItems: 'center'}}>
        <Button
            onClick={onDecrement} icon={<FaMinus/>}
            disabled={value <= 1}
        />
        <InputNumber
            min={1}
            value={value}
            onChange={onChange}
            style={{
                width: 60, textAlign: 'center'
            }}
            readOnly
        />
        <Button
            onClick={onIncrement} icon={<FaPlus/>}
            disabled={value >= 1000}
        />
    </div>
);

export default QuantityControl;
