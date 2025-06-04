import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent Tests', () => {
  it('should not render dialog', () => {
    // Arrange
    const message = 'Test message';
    const props = {
      title: 'Test dialog',
      onAccept: vi.fn(),
      onClose: vi.fn(),
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
      isOpen: false,
      children: <h1>{message}</h1>,
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it.each<{ value: string }>([
    { value: undefined },
    { value: null },
    { value: '' },
  ])(
    'should render the confirmation dialog with empty title, childrens and buttons',
    ({ value }) => {
      // Arrange
      const props = {
        title: value,
        onAccept: vi.fn(),
        onClose: vi.fn(),
        labels: {
          closeButton: value,
          acceptButton: value,
        },
        isOpen: true,
        children: value,
      };

      // Act
      render(<ConfirmationDialogComponent {...props} />);

      // Assert
      expect(
        screen.getByRole('heading', { level: 2, name: '' })
      ).toBeInTheDocument();
      expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
      expect(screen.getAllByRole('button', { name: '' }).length).toEqual(2);
    }
  );

  it('should render the confirmation dialog with correct title, message and buttons', () => {
    // Arrange
    const message = 'Test message';
    const props = {
      title: 'Test dialog',
      onAccept: vi.fn(),
      onClose: vi.fn(),
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
      isOpen: true,
      children: <h1>{message}</h1>,
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    expect(
      screen.getByRole('heading', { level: 2, name: props.title })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: message })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: props.labels.closeButton })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: props.labels.acceptButton })
    ).toBeInTheDocument();
  });

  it('should call onAccept when it clicks on Accept button', async () => {
    // Arrange
    const message = 'Test message';
    const props = {
      title: 'Test dialog',
      onAccept: vi.fn(),
      onClose: vi.fn(),
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
      isOpen: true,
      children: <h1>{message}</h1>,
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const acceptButton = screen.getByRole('button', {
      name: props.labels.acceptButton,
    });

    // Assert
    expect(props.onAccept).not.toHaveBeenCalled();

    await userEvent.click(acceptButton);

    expect(props.onAccept).toHaveBeenCalled();
  });

  it('should call onClose when it clicks on Close button', async () => {
    // Arrange
    const message = 'Test message';
    const props = {
      title: 'Test dialog',
      onAccept: vi.fn(),
      onClose: vi.fn(),
      labels: {
        closeButton: 'Close',
        acceptButton: 'Accept',
      },
      isOpen: true,
      children: <h1>{message}</h1>,
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const closeButton = screen.getByRole('button', {
      name: props.labels.closeButton,
    });

    // Assert
    expect(props.onClose).not.toHaveBeenCalled();

    await userEvent.click(closeButton);

    expect(props.onClose).toHaveBeenCalled();
  });
});
