const axios = require('axios');
import {
  loginUser,
  registerUser,
  logoutUser,
  auth,
  addToCart,
  getCartDetails,
  removeCartItem,
  onSuccessBuy,
} from './actions';

jest.mock('axios');

describe('Auth Actions', () => {
  it('should dispatch LOGIN_USER action with payload', async () => {
    const userData = { username: 'testuser', password: 'password' };
    const expectedPayload = { };

    axios.post.mockResolvedValue({ data: expectedPayload });

    const dispatch = jest.fn();
    await loginUser(userData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'LOGIN_USER',
      payload: expectedPayload,
    });
  });

  it('should dispatch REGISTER_USER action with payload', async () => {
    const userData = { username: 'testuser', password: 'password' };
    const expectedPayload = {  };

    axios.post.mockResolvedValue({ data: expectedPayload });

    const dispatch = jest.fn();
    await registerUser(userData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'REGISTER_USER',
      payload: expectedPayload,
    });
  });

  it('should dispatch LOGOUT_USER action with payload', async () => {
    const expectedPayload = { };

    axios.get.mockResolvedValue({ data: expectedPayload });

    const dispatch = jest.fn();
    await logoutUser()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'LOGOUT_USER',
      payload: expectedPayload,
    });
  });

  it('should dispatch AUTH_USER action with payload', async () => {
    const expectedPayload = { };

    axios.get.mockResolvedValue({ data: expectedPayload });

    const dispatch = jest.fn();
    await auth()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'AUTH_USER',
      payload: expectedPayload,
    });
  });

  it('should dispatch ADD_TO_CART action with payload', async () => {
    const productId = '123';
    const expectedPayload = {  };

    axios.post.mockResolvedValue({ data: expectedPayload });

    const dispatch = jest.fn();
    await addToCart(productId)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'ADD_TO_CART',
      payload: expectedPayload,
    });
  });

  it('should dispatch GET_CART_DETAILS action with payload', async () => {
    const cartData = [];
    const expectedPayload = { docs: [] };

    axios.post.mockResolvedValue({ data: expectedPayload });

    const dispatch = jest.fn();
    await getCartDetails(cartData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'GET_CART_DETAILS',
      payload: expectedPayload,
    });
  });

  it('should dispatch REMOVE_CART_ITEM action with payload', async () => {
    const productId = '123';
    const cartData = { cart: [], cartDetails: [] };
    const expectedPayload = {  };

    axios.post.mockResolvedValue({ data: cartData });

    const dispatch = jest.fn();
    await removeCartItem(productId)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'REMOVE_CART_ITEM',
      payload: expectedPayload,
    });
  });

  it('should dispatch ON_SUCCESS_BUY action with payload', () => {
    const data = { };
    const expectedAction = {
      type: 'ON_SUCCESS_BUY',
      payload: data,
    };

    expect(onSuccessBuy(data)).toEqual(expectedAction);
  });
});
