import { FieldRenderProps } from 'react-final-form';
import { HexColorPicker } from 'react-colorful';
import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';

type Props = FieldRenderProps<string>;

const ColorPickerAdapter = ({ input, meta, ...rest }: Props) => {
  const [color, setColor] = useState('');
  const [open, setOpen] = useState(false);

  const handleColorChange = (color: string) => {
    setColor(color);
    input.onChange(color);
  };

  useEffect(() => {
    if (input.value) {
      setColor(input.value);
    }
  }, []);

  return (
    <div className="color-picker">
      <TextField
        {...input}
        {...meta}
        {...rest}
        value={color}
        disabled={true}
        onClick={() => {
          setOpen(!open);
        }}
      />

      {open && (
        <HexColorPicker
          onPointerLeave={() => {
            setOpen(false);
          }}
          color={color}
          onChange={handleColorChange}
        />
      )}
    </div>
  );
};

export default ColorPickerAdapter;
