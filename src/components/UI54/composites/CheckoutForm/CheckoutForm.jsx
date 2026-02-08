import { useState } from 'react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { H3 } from './StyledComponents';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CheckoutForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <H3>Checkout Information</H3>
      <FormField>
        <Label>Name</Label>
        <Input name="name" type="text" value={formData.name} onChange={handleChange} required />
      </FormField>
      <FormField>
        <Label>Email</Label>
        <Input name="email" type="email" value={formData.email} onChange={handleChange} required />
      </FormField>
      <FormField>
        <Label>Address</Label>
        <Input name="address" type="text" value={formData.address} onChange={handleChange} required />
      </FormField>
      <FormField>
        <Label>City</Label>
        <Input name="city" type="text" value={formData.city} onChange={handleChange} required />
      </FormField>
      <FormField>
        <Label>ZIP Code</Label>
        <Input name="zip" type="text" value={formData.zip} onChange={handleChange} required />
      </FormField>
      <Button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Proceed to Payment'}
      </Button>
    </FormContainer>
  );
};
CheckoutForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CheckoutForm;

// Styled Components
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  color: #ffffff;
`;
