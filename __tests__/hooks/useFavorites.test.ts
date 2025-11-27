/**
 * @format
 * Tests for useFavorites hook
 */

import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useFavorites, usePhraseIsFavorite } from '../../src/hooks/useFavorites';

// Store subscribe callback for testing
let mockSubscribeCallback: (() => void) | null = null;

// Mock FavoritesService
jest.mock('../../src/services/FavoritesService', () => ({
  __esModule: true,
  default: {
    initialize: jest.fn().mockResolvedValue(undefined),
    isFavorite: jest.fn().mockReturnValue(false),
    toggleFavorite: jest.fn().mockResolvedValue(true),
    getFavoriteRefs: jest.fn().mockReturnValue([]),
    getCount: jest.fn().mockReturnValue(0),
    subscribe: jest.fn((callback) => {
      mockSubscribeCallback = callback;
      return jest.fn(); // unsubscribe
    }),
  },
}));

// Mock JsonAudioService
jest.mock('../../src/services/JsonAudioService', () => ({
  __esModule: true,
  default: {
    getPhrase: jest.fn().mockReturnValue(null),
    getPhrasesByCategory: jest.fn().mockReturnValue([]),
  },
}));

// Import after mocks
import FavoritesService from '../../src/services/FavoritesService';

describe('useFavorites', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with loading true', async () => {
    const { result } = renderHook(() => useFavorites());

    // Initially loading
    expect(result.current.loading).toBe(true);

    // Wait for initialization
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it('should initialize FavoritesService on mount', async () => {
    renderHook(() => useFavorites());

    await waitFor(() => {
      expect(FavoritesService.initialize).toHaveBeenCalled();
    });
  });

  it('should call isFavorite from FavoritesService', async () => {
    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    result.current.isFavorite('basic_needs', 'bn_water');

    expect(FavoritesService.isFavorite).toHaveBeenCalledWith('basic_needs', 'bn_water');
  });

  it('should call toggleFavorite from FavoritesService', async () => {
    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.toggleFavorite('basic_needs', 'bn_water');
    });

    expect(FavoritesService.toggleFavorite).toHaveBeenCalledWith('basic_needs', 'bn_water');
  });

  it('should subscribe to FavoritesService changes', async () => {
    renderHook(() => useFavorites());

    await waitFor(() => {
      expect(FavoritesService.subscribe).toHaveBeenCalled();
    });
  });
});

describe('usePhraseIsFavorite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should check if phrase is favorite on mount', async () => {
    renderHook(() => usePhraseIsFavorite('basic_needs', 'bn_water'));

    await waitFor(() => {
      expect(FavoritesService.initialize).toHaveBeenCalled();
      expect(FavoritesService.isFavorite).toHaveBeenCalledWith('basic_needs', 'bn_water');
    });
  });

  it('should toggle favorite status', async () => {
    const { result } = renderHook(() => usePhraseIsFavorite('basic_needs', 'bn_water'));

    await act(async () => {
      await result.current.toggle();
    });

    expect(FavoritesService.toggleFavorite).toHaveBeenCalledWith('basic_needs', 'bn_water');
  });
});
