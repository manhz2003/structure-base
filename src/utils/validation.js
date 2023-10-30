const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NUMBER = /^[0-9]{10}$/;
const PRICE = /^[0-9]*$/;

export const regex = {
  email: EMAIL,
  number: NUMBER,
  price: PRICE,
};
