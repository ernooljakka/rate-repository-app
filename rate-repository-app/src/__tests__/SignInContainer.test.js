import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import SignInContainer from '../components/ForTesting/SignInContainer';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      render(<SignInContainer onSubmit={onSubmit} />);

      const usernameInput = screen.getByTestId('usernameInput');
      const passwordInput = screen.getByTestId('passwordInput');
      const submitButton = screen.getByTestId('submitButton');

      fireEvent.changeText(usernameInput, 'kalle');
      fireEvent.changeText(passwordInput, 'password123');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password123',
        });
      });
    });
  });
});
