import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import Form from 'react-bootstrap/Form';
import type { FormControlProps } from 'react-bootstrap/FormControl';

// Merge FormControlProps and native input props, omitting conflicts from HTML attributes
type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, keyof FormControlProps> &
  FormControlProps & {
    label: string;
    error?: string;
    isLoading?: boolean;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, value, isLoading, ...rest }, ref) => {
    return (
      <Form.Group className="mb-3 w-100">
        <Form.Label htmlFor={label}>{label}</Form.Label>
        <div className="position-relative d-flex flex-column align-items-center justify-content-center">
          <Form.Control
            id={label}
            ref={ref}
            isInvalid={!!error}
            value={value}
            {...rest}
          />
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
          {isLoading && (
            <div className="position-absolute end-0 pe-3">
              <div className="spinner-border spinner-border-sm text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </Form.Group>
    );
  }
);

Input.displayName = 'Input';
