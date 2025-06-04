import { renderHook, act, waitFor } from '@testing-library/react';
import { useConfirmationDialog } from './confirmation-dialog.hook';

describe('ConfirmationDialogHook Tests', () => {
  it('should return default values', () => {
    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert

    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual({
      id: '',
      name: '',
    });
    expect(result.current.onAccept).toEqual(expect.any(Function));
    expect(result.current.onClose).toEqual(expect.any(Function));
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
  });

  it('should create an empty item when it calls onAccept', async () => {
    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onAccept();
    });

    // Assert
    await waitFor(() => {
      expect(result.current.itemToDelete).toEqual({ id: '', name: '' });
    });
  });

  it('should update isOpen when it calls onClose', async () => {
    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onClose();
    });

    // Assert
    await waitFor(() => {
      expect(result.current.isOpen).toEqual(false);
    });
  });

  it('should update isOpen and itemToDelete when it calls onOpenDialog', async () => {
    // Arrange
    const item = {
      id: '1',
      name: 'Test Item',
    };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(item);
    });

    // Assert
    await waitFor(() => {
      expect(result.current.isOpen).toBe(true);
      expect(result.current.itemToDelete).toEqual(item);
    });
  });
});
