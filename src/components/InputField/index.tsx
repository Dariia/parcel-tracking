import React from 'react';
import './inputField.scss';
import { Form } from "react-bootstrap";

interface Props {
  className?: string;
  labelText: string;
  dataTestId?: string;
  id: string;
}

const InputField: React.FC<Props> = ({ className, labelText, id, dataTestId }) => {
  return (
    <Form.Group className={className} data-testid={dataTestId}>
      <label
        className="pb-1 parcel_label"
        htmlFor={id}
        data-testid="form-label">
        { labelText }
      </label>
      <Form.Control
        data-testid="form-input"
        id={id}
        name={id}
        className="parcel_input"
        type="text"
      />
    </Form.Group>
  );
}

export default InputField;
